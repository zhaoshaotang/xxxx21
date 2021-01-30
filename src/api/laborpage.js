

import httpClient from './httpClient'

export const getList =function(params){
  //get 的标准参数是在 url上面
  return httpClient.get(`category/list${params}`);
}


export const getbuilder =function(params){
  //get 的标准参数是在 url上面
  return httpClient.get(`/map/list${params}`);
}

export const getjobtrends =function(params){
  //get 的标准参数是在 url上面
  return httpClient.get(`/prod-api/wisdomScreen/labour/wsLabour/personnelProfile${params}`);
}
export const getjobtrends1 =function(params){
  //get 的标准参数是在 url上面
  return httpClient.get(`/prod-api/wisdomScreen/labour/wsLabour/personnelProfile${params}`);
}
export const getspecies =function(params){
  //get 的标准参数是在 url上面
  return httpClient.get(`/map/list${params}`);
}
export const getsubcontract =function(params){
  //get 的标准参数是在 url上面
  return httpClient.get(`/map/list${params}`);
}
// //人员进出场
// export const getLists = (params) => httpClient({
//     url: url + '/map/list',
//     method: 'get',
//     params: params
//   });
// //建筑工人分析
//   export const getbuilder = (params) => httpClient({
//     url: url + '/map/list',
//     method: 'get',
//     params: params
//   });
 
//  //左上角大组件作业人员趋势
// export const getjobtrends = (params) => httpClient({
//   url:'/prod-api/wisdomScreen/labour/wsLabour/personnelProfile',
//   method: 'get',
//   params: params
// });
//   export const getjobtrends1 = (params) => httpClient({
//     url: '/prod-api/wisdomScreen/labour/wsLabour/personnelProfile',
//     method: 'get',
//     params: params
//   });
// //工种分析

// export const getspecies = (params) => httpClient({
//   url: url + '/map/list',
//   method: 'get',
//   params: params
// });
// //分包单位
// export const getsubcontract = (params) => httpClient({
//   url: url + '/map/list',
//   method: 'get',
//   params: params
// });
