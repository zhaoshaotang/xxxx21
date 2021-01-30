import httpClient from './httpClient'

//列子

//发送POST
const xxx = function (params) {
  return httpClient.post("category/list", params);
}

//发送GET 接口 /
const xxxGet = function (params) {
  //get 的标准参数是在 url上面
  return httpClient.get(`category/list${params}`);
}

//
//简写模式我写的
// export const getList = (params) => httpClient.post("category/list",params);
export const getList = function (params) {
  //get 的标准参数是在 url上面
  return httpClient.get(`category/list${params}`);
}
export const getObj = function (params) {
  //get 的标准参数是在 url上面
  return httpClient.get(`category/detail${params}`);
}
// const addObj =function(params){
//   //get 的标准参数是在 url上面
//   return httpClient.get(`category/list${params}`);
// }

export const addObj = function (params) {
  return httpClient.post("/category/save", params);
}
export const updateObj = function (params) {
  return httpClient.post("/category/update", params);
}

export const delObj = function (id) {
  return httpClient.post("/category/remove", { ids: id });
}


// export default {
//   getList,
//   getObj,
//   addObj,
//   updateObj,
//   delObj

// }

// var request = window.axios;之前的
// export const getList = (params) => request({
//   url: url + '/category/list',
//   method: 'get',
//   params: params
// });
// export const getObj = (id) => request({
//   url: url + '/category/detail',
//   method: 'get',
//   params: {
//     id
//   }
// });

// export const addObj = (data) => request({
//   url: url + '/category/save',
//   method: 'post',
//   data: data
// });
// export const updateObj = (data) => request({
//   url: url + '/category/update',
//   method: 'post',
//   data: data
// });

// export const delObj = (id) => request({
//   url: url + '/category/remove',
//   method: 'post',
//   params: {
//     ids: id
//   }
// });
