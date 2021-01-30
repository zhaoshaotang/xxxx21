import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import router from "../router";
import userToken from '../utils/userToken'

// 创建axios实例 Bearer
const http = function (opts) {
    let defOpts = {
        baseURL: process.env.VUE_APP_API_BASE_URL, // api 的 base_url
        timeout: 5000, // 请求超时时间
        headers: {
            Authorization:userToken.getToken()
        }
    }
    opts = Object.assign(defOpts, opts);
    let axiosClient= axios.create(opts);
    return axiosClient.request(opts);
}

const post = function (url, data, opts) {
    opts = Object.assign({
        url: url,
        data: data,
        method: "post"
    }, opts)
    return http(opts);
}

const get = function (url, data) {
    return http(
        {
            method: "get",
            url: url,
            data: data,
        }
    );
}

/**
 * 上传文件
 * @param {地址} url 
 * @param {文件} file 
 */
const upload = function (url, file) {
    let parm = {
        method: 'post',
        url: url,
        data: 'file=' + file,
        headers: {
            Authorization:userToken.getToken(),
            "Content-Type": "multipart/form-data"
        }
    }
    return http(parm);
}

export default {
    client: http,
    post,
    get,
    upload
}

export const visUrl = 'http://localhost:8081/prod-api'

export const getUrlParames =  (name)=> {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}
// request拦截器
// Http.interceptors.request.use(
//     config => {
//         return config
//     },
//     error => {
//         Promise.reject(error)
//     }
// )

// response 拦截器
// Http.interceptors.response.use(
//     response => {
//         /**
//          * code为非20000是抛错 可结合自己业务进行修改
//          */
//         const res = response.data;
//         const codeReg = /^20\d+/;
//         if (!codeReg.test(response.status)) {
//             Message.info({
//                 content: res.info
//             })
//             return Promise.reject('error')
//         } else {
//             //token失效 登录超时
//             if (res.code == -1) {
//                 Message.info({
//                     message: res.msg
//                 })
//                 router.replace({
//                     path: '/Login',
//                 })
//                 return false;
//             }
//             return response.data
//         }
//     },
//     error => {
//         console.log('err' + error) // for debug
//         //12 探测请求的 屏蔽
//         if (error.code != 12) {
//             Message.info({
//                 message: error.info
//             })
//         }
//         return Promise.reject(error)
//     }
// )


