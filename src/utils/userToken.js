//配置接口
// export const url = 'http://39.103.140.108:8777/prod-api'
// export const visUrl = 'http://39.103.140.108:8777/prod-api'

//提取url里的参数
const getUrlParames = function (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

//判断token是否存在
const isExitToken = function () {
    // 缓存 没有token则从url判断
    let token = localStorage.getItem("token");
    if (token == null || token == "") {
        token = getUrlParames("token");
    }
    if (token == null) {
        return false;
    }
    //写入缓存
    localStorage.setItem("token", token);
    return true;
}

//获取token
const getToken = function () {
    return localStorage.getItem("token");
}
export default {
    getUrlParames,
    isExitToken,
    getToken
}