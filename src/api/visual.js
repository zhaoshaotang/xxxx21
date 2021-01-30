

//需要改

import { parseComponent } from 'vue-template-compiler';
import  httpClient from './httpClient'
// var request = window.axios;

//------------------大屏菜单------------------
//菜单列表
export const getMenuPost = (data) => httpClient.post("panel/visual/getConfigList",data);

//新增&修改
export const saveVisual = (data) => httpClient.post("panel/visual/saveVisualConfig",data);
 
//删除
export const removeVisual = (id) => httpClient.post('panel/visual/removeVisualConfig?ids='+id,{});




//------------------大屏设计（从后台跳转前台）------------------
//2.0看板设计build

export const getObjBlock = (params) => httpClient.post("visual/detail",params);

//原系统build
export const getObj = (id) => httpClient.get("visual/detail?id="+id);

//---------------------------------------------------------

export const getList = (params) => httpClient.get('visual/list'+params);

export const copyObj = (id) => httpClient.post("visual/copy",{id:id});

export const getCategory = (params) => httpClient.get("category/list",params);

export const uploadImg = (file) => httpClient.upload("visual/put-file",file);

export const addObj = (data) => httpClient.post("visual/save",
{
  visual: {
    password: data.password,
    category: data.category,
    status: data.status,
    title: data.title,
  },
  config: {
    detail: JSON.stringify({
      name: data.title,
      width: data.width,
      height: data.height,
      scale: 1,
      backgroundImage: 'img/bg/bg1.png',
      url: '',
      mark: {},
      gradeShow: false,
      gradeLen: 30,
    }),
    component: '[]'
  },
})

export const updateComponent = (data) => httpClient.post("visual/update",data);

export const updateObj = (data) => httpClient.post("visual/update", {
  "visual": {
    "id": data.id,
    "password": data.password,
    "category": data.category,
    "status": data.status,
    "title": data.title,
  }
})

export const delObj = (id) => httpClient.post("visual/remove", {
  ids: id
});

export const getMenu = (url) => httpClient.get(url);

//———————首页人员管理—————————
export const pieTwo = (params) => 
httpClient.post("prod-api/wisdomScreen/home/wsHome/projectPersonnel",
params);
