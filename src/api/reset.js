import Http from './httpClient.js';
import store from '../store';
import QS from 'qs'
//接口文档地址  https://docs.apipost.cn/view/f85681287cee1701#2762804
const ajaxUrl = process.env.NODE_ENV === 'development'
  // 测试接口地址
  ? 'http://zptonv3saasv1.udao.sh.cn/index'
  // 线上接口地址
  : 'http://zptonv3saasv1.udao.sh.cn/index';
export default {
	json(url, data, config){
   	    return Http.get(jsonUrl+url, data, config)
    },
    userPost(url,data,config){
        url = ajaxUrl+url;
        console.log(JSON.stringify(data));
	  	return Http.post(url, QS.stringify(data), config);
    },
    post(url,data,config) {
	  	url = ajaxUrl+url;
	  	var params = {
            Token:store.state.userInfo.token,
            phone:store.state.userInfo.phone,
            school_id:store.state.userInfo.school_id,
	  		...data
	  	}
	  	console.log(JSON.stringify(params));
	  	return Http.post(url, QS.stringify(params), config)
	},
	//图片上传
	upload(url, data) {
        const config = {
            headers: {
                //'Content-Type': 'multipart/form-data'
            }
        }
	  	return Http.post(ajaxUrl+url,data,config)
	}
}