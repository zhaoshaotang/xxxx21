
//需要改
import httpClient from './httpClient'

// const getList = function (params) {
//   return httpClient.get(`map/list`,params);
// }
const getObj = function (params) {
  return httpClient.get(`map/detail`,params);
}

const addObj = function (params) {
  return httpClient.post("map/save", params);
}
const updateObj = function (params) {
  return httpClient.post("map/updatee", params);
}

const delObj = function (id) {
  return httpClient.post("map/remove", {ids: id});
}

export default {
  getObj,
  addObj,
  updateObj,
  delObj
}


export const getList = (params) => httpClient.get("map/list",params);

// export const getObj = (id) => httpClient({
//   url: url + '/map/detail',
//   method: 'get',
//   params: {
//     id
//   }
// });

// export const addObj = (data) => httpClient({
//   url: url + '/map/save',
//   method: 'post',
//   data: data
// });
// export const updateObj = (data) => httpClient({
//   url: url + '/map/update',
//   method: 'post',
//   data: data
// });



// export const delObj = (id) => httpClient({
//   url: url + '/map/remove',
//   method: 'post',
//   params: {
//     ids: id
//   }
// });