//配置接口
// export const url = 'http://39.103.140.108:8777/prod-api'
// export const visUrl = 'http://39.103.140.108:8777/prod-api'

//提取url里的参数
export function getUrlParames(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)','i');  
    var r = window.location.search.substr(1).match(reg);  
    if (r != null) {
        return unescape(r[2]);
    }  
    return null;
} 