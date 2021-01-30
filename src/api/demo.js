// 比如这需要封装 请求的接口

//导入 请求类 该类是一个 axios 实例 可以使用它后续的方法，详细自己看文档
import http from './httpClient';
import api from './reset';
/**
 * 这是一个无参数的接口
 */
const test = function(){

    // 在httpClient.js 创建的 axios实例下  host已经填充，只需要写后面的接口名称即可
    // axios baseURL 参数说明文档
    // 比如完整的  http://baidu.com/get 接口
    // 在继承了 httpClient.js 后 只需要写 接口 而不需要再写host地址
    //返回的依然是 axios.get 后的类型
    return http.get("get");
}

const test1 = function(){
    return http.get("get");
}
export const getJlbar = function (url, data) {

    return http(
        {
            method: "get",
            url: "/prod-api/wisdomScreen/elevator/wsElevator/queryDeviceDropDownBox",
            data: data,
        }
    );
}
//   export const getJlbar = (params) => api.get('/wisdomScreen/elevator/wsElevator/queryDeviceDropDownBox',params);
//导出去
export default {
   
}