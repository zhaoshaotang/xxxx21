import httpClient from './httpClient'


//新增&修改
// const saveVisual = (data) => request({
//   url: url + '/panel/visual/saveVisualConfig',
//   method: 'post',
//   data: data
// })

//删除
// export const removeVisual = (id) => request({
//   url: url + '/panel/visual/removeVisualConfig?ids=' + id,
//   method: 'post',
// })

// export const getJlbartwo = (params) => request({
//   url: 'https://www.easy-mock.com/mock/5faddd2a90e2202de96ccea5/chartstwo/charts',
//   method: 'get',
//   params: params
// })


/**
 * 跨域跳转后获取大屏菜单
 * @param {请求参数} data 
 */
const getConfigList = function (data) {
  return httpClient.post('panel/visual/getConfigList', data);
}


/**
 * 新增&修改
 * @param {请求参数} data 
 */
export const saveVisual = (data) => {
  return httpClient.post('/panel/visual/saveVisualConfig', data);
}

/**
 * 删除
 * @param {id} id 
 */
export const removeVisual = (id) => {
  let _url = `panel/visual/removeVisualConfig?ids=${id}`;
  return httpClient.post(_url, {});
}

/**
 * 
 * @param {参数} params 
 */
const getJlbartwo = function (params) {
  let _url = `$https://www.easy-mock.com/mock/5faddd2a90e2202de96ccea5/chartstwo/charts${params}`;
  return httpClient.get(_url);
}

//跨域跳转后获取大屏菜单
export const getMenuPost = (data) => {
  return httpClient.post("panel/visual/getConfigList", data);
}

export default {
  getConfigList,
  getJlbartwo
}


// export const getList = (params) => request({
//   url: url + '/visual/list',
//   method: 'get',
//   params: params  
// });

// export const copyObj = (id) => request({
//   url: url + '/visual/copy',
//   method: 'post',
//   params: {
//     id: id
//   }
// });

// export const updateComponent = (data) => request({
//   url: url + '/visual/update',
//   method: 'post',
//   data: data
// });

// export const getCategory = (params) => request({
//   url: url + '/category/list',
//   method: 'get',
//   params: params
// })

// export const getObjBlock = (params) => request({
//   url: url + '/visual/detail',
//   // url: url + '/panel/visual/detail',
//   method: 'get',
//   params: params
// })

// export const getObj = (id) => request({
//   url: url + '/visual/detail',
//   // url: url + '/panel/visual/design',
//   method: 'get',
//   params: {
//     id:id
//   }
// })

// export const uploadImg = (file) => request({
//   url: url + '/visual/put-file',
//   method: 'post',
//   data: 'file=' + file,
//   headers: { "Content-Type": "multipart/form-data" }
// });

// export const addObj = (data) => request({
//   url: url + '/visual/save',
//   method: 'post',
//   data: {
//     visual: {
//       password: data.password,
//       category: data.category,
//       status: data.status,
//       title: data.title,
//     },
//     config: {
//       detail: JSON.stringify({
//         name: data.title,
//         width: data.width,
//         height: data.height,
//         scale: 1,
//         backgroundImage: '/img/bg/bg1.png',
//         url: '',
//         mark: {},
//         gradeShow: false,
//         gradeLen: 30,
//       }),
//       component: '[]'
//     },
//   }
// });

// export const updateComponent = (data) => request({
//   url: url + '/visual/update',
//   method: 'post',
//   data: data
// });

// export const updateObj = (data) => request({
//   url: url + '/visual/update',
//   method: 'post',
//   data: {
//     "visual": {
//       "id": data.id,
//       "password": data.password,
//       "category": data.category,
//       "status": data.status,
//       "title": data.title,
//     }
//   }
// });

// export const delObj = (id) => request({
//   url: url + '/visual/remove',
//   method: 'post',
//   params: {
//     ids: id
//   }
// });

// export const getMenu = (url) => request({
//   url:url,
//   method: 'get'
// });

// //跨域跳转后获取大屏菜单
// export const getMenuPost = (url,data) => request({
//   url: url,
//   method: 'post',
//   data: data
// });
