<template>
  <div class="header">
    <div class="header-title">
      <div class="sys-name">
        <span @click="showTree"><span>{{sysName}}</span><i :class=" show === false ? 'el-icon-arrow-down':'el-icon-close'" ></i></span>
        <div class="org-cont" v-show="show === true">
          <section class="tree-cont">
            <el-tree :data="organizeData" :props="defaultProps" :expand-on-click-node="false" node-key="id" ref="tree" @node-click="handleNodeClick">
              <span :class="['custom-tree-node', data.auth===0?'disable': '']" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <span class="tree_right"></span>
              </span>
            </el-tree>
          </section>
        </div>
      </div>
      <div>
        <h2>{{ title }}</h2>
      </div>
      <div class="sys-info">
        <div id="time" style="font-size: 16px;color: #19CCFF;"></div>
        <div style="font-size: 18px;color: #00FEFB;">中台系统</div>
      </div>
    </div>
    <div class="menu-list">
      <ul>
        <!-- item.name === onLink ? 'idactive' : '' -->
        <li v-for="(item, index) in hadeConfig.menuItem" :key="index" :class="index == 0 ? active : ''" :id="item.name === onLink ? 'idactive' : ''" @click="goLink(item.name)">
          <template v-if="item.children.length">
            <a v-for="(item1, index) in item.children" v-if="index === 0" :key="index" :id="item1.name === on2Link ? 'id2active' : ''" @click="go2Link(item1.name)" :href="`/${seeType}/parentId=${item1.parentId}?id=${item.visualId}&configId=${item1.id}&userId=${userId}&userType=${userType}&token=${token}&see=${seeType}&title=${encodeURI(encodeURI(title))}`">{{ item.name }}</a>
          </template>
          <a v-else :href="`/${seeType}/${item.visualId}?id=${item.visualId}&configId=${ item.id }&userId=${userId}&userType=${userType}&token=${token}&see=${seeType}&title=${encodeURI(encodeURI(title))}`">{{ item.name }}</a>
          <ul v-if="item.children.length">
            <li v-for="(item1, index) in item.children" :key="index" :id="item1.name === on2Link ? 'id2active' : ''" @click="go2Link(item1.name)">
              <a :href="`/${seeType}/parentId=${item1.parentId}?id=${item.visualId}&configId=${item1.id}&userId=${userId}&userType=${userType}&token=${token}&see=${seeType}&title=${encodeURI(encodeURI(title))}`" class="btna">{{ item1.name }}</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { getUrlParames } from "@/api/httpClient.js"
import { hadeConfig } from "@/option/config"
import axios from "axios"

export default {
  inject: ["main"],
  data(){
    return {
      hadeConfig: hadeConfig,
      menuData: null,
      chartDom: Date.parse(new Date()),
      onLink: null,
      on2Link: null,
      active: null,
      token: null,
      seeType: null,
      title: null,
      sysName:null,
      //树插件
      show:false,
      orgName: '',
      organizeData: undefined,
      defaultProps: {
        children: "children",
        label: "label"
      },
      expandArr: [],
      userId: null,
      userType:null
    };
  },
  computed: {
    // param1(){
    //   return this.$route.query.form == 'system'
    // }
  },
  created() {
    axios.defaults.headers.common["Authorization"] = getUrlParames("token")
    this.seeType = getUrlParames("see")
    this.title = decodeURI(decodeURI(getUrlParames("title")))
    this.userId = getUrlParames("userId")
    this.userType = getUrlParames("userType")
    this.sysName = this.title
  },
  mounted() {
    this.token = getUrlParames("token")
    this.getMenuAxios()
    this.getUser()
    this.addTime()
    //当前页面菜单选项高亮显示
    this.onLink === "null" ? (this.active = "active") : ""
    this.onLink = localStorage.getItem("onLink")
    // if (this.$route.query.form == 'system') this.onLink = '首页'
    if (this.$route.query.form == 'system') this.goLink("首页");
    this.on2Link = localStorage.getItem("on2Link") 
  },
  methods: {
    getUser() {
      // 安科生物新建项目 获取列表
      let url = `/prod-api/system/enterprise/treeselect`;
      let parame = {
        enterpriseId: getUrlParames("userId"),
        type: getUrlParames("userType"),
      }
      axios.get(url).then((res) => {
        
        if (res.data.code === 200) {
          this.organizeData = res.data.data
        }
      })
    },
    // 节点单击事件
    handleNodeClick(handleData) {
      if (handleData.auth === 0) {
        return false
      }

      // if (handleData.children) {
      //   this.$message({
      //       message: '请选择子项',
      //       type: 'warning'
      //     });
      //   return false
      // }

      this.sysName = handleData.label
      this.title = this.sysName
      this.show = false

      let parData = {
        "organizationId": handleData.id,
        "type": handleData.type
      }
      axios.post('/prod-api/panel/visual/organizationSwitch',parData).then(async(res) => {
        if (res.data.code === 200 && res.data.data.visual !== null && res.data.data.config !== null) {
          let resData = res.data.data;
          let visualId = resData.visual.id
          let config_Id = resData.config.id
          let config_VisualId = resData.config.visualId
          //执行拼接url函数
          await this.getUrl(visualId,config_Id,config_VisualId,handleData)
        }else{
          this.$message({
            message: '请求数据不完整，请检查接口',
            type: 'warning'
          });
        }
      })
    },
    getUrl(visualId,config_Id,config_VisualId,handleData){
      //提取URL地址里的根地址
      let LOCALHOST=window.document.location.href;
      let PATHNAME=window.document.location.pathname;
      let SPLIT=LOCALHOST.indexOf(PATHNAME);
      let ROOTNAME=LOCALHOST.substring(0,SPLIT);

      //删除localStorage
      localStorage.removeItem("onLink")
      localStorage.removeItem("on2Link")

      //默认选中首页
      localStorage.setItem("onLink", '首页');
      this.onLink = localStorage.getItem("onLink");

      //拼接地址
      let href = `${ROOTNAME}/${getUrlParames("see")}/${visualId}?id=${config_VisualId}&configId=${config_Id}&userId=${handleData.id}&userType=${handleData.type}&token=${getUrlParames("token")}&see=${getUrlParames("see")}&title=${encodeURI(encodeURI(this.title))}`
      window.location.href = href
   },
    showTree(){
      this.show = !this.show
    },
    getMenuAxios() {
      let url = `/prod-api/panel/visual/getConfigList`;
      axios.post(url, { visualId: getUrlParames("id") }).then((res) => {
        if (res.data.code === 200) {
          this.hadeConfig.menuItem = this.handleTree(
            res.data.data,
            "id"
          );
        }
      });
    },
    goLink(name) {
      localStorage.setItem("onLink", name);
      this.onLink = localStorage.getItem("onLink");
    },
    go2Link(name) {
      localStorage.setItem("on2Link", name);
      this.on2Link = localStorage.getItem("on2Link");
    },
    addTime() {
      setInterval("document.getElementById('time').innerHTML=new Date().toLocaleString('chinese',{hour12:false});",1000)
    },
    onMenu() {
      this.onPage = null;
      this.onPage = "onPage";
    },
    handleTree(data, id, parentId, children, rootId) {
      id = id || "id";
      parentId = parentId || "parentId";
      children = children || "children";
      rootId = rootId || 0;
      //对源数据深度克隆
      const cloneData = JSON.parse(JSON.stringify(data));
      //循环所有项
      const treeData = cloneData.filter((father) => {
        let branchArr = cloneData.filter((child) => {
          //返回每一项的子级数组
          return father[id] === child[parentId];
        });
        branchArr.length > 0 ? (father.children = branchArr) : "";
        //返回第一层
        return father[parentId] === rootId;
      });
      return treeData != "" ? treeData : data;
    },
  },
};
</script>
<style lang="scss" scoped>
.menu-list {
  width: 100%;
  float: left;
  position: relative;
  z-index: 9999;
  > ul {
    padding: 0 2%;
  }
  li {
    float: left;
    list-style: none;
    a {
      font-size: 17px;
      padding: 0px 10px;
      color: #13beeb;
      font-weight: bold;
      display: block;
      height: 45px;
      line-height: 50px;
      border-bottom: 5px solid rgba(255, 255, 255, 0);
      background: url(/img/li-a-bg.png) no-repeat right 19px / auto 32%;
    }
    a:hover {
      color: #ffea00;
      border-bottom: 5px solid #ffea00;
    }
    ul {
        position: absolute;
        width: 93.1%;
        left: 0px;
        padding: 0 2%;
        display: none;
        background: rgba(6,39,98,0.9);
        margin: 0 1%;
      li {
        a {
          padding: 0 10px;
        }
      }
    }
  }
  li:hover ul {
    display: block;
  }
  li:hover > a {
    color: #ffea00;
    border-bottom: 5px solid #ffea00;
  }
}
li.active a,
#idactive > a,
#id2active a {
  color: #ffea00;
  border-bottom: 5px solid #ffea00;
}
#idactive > ul {
  display: block;
}
.menu-list li:last-child a {
  background: none;
}
.header {
  height: 156px;
}
.header-title {
  display: flex;
  justify-content: space-between;
  color: #fff;
  height: 72px;
  align-items: center;
  padding: 0 50px;
  .sys-info {
    display: flex;
    min-width: 237px;
    div {
      padding: 0 31px;
    }
  }
  .sys-name {
    width: 350px;
    height: 35px;
    position: relative;
    >span{ 
      cursor: pointer;
      line-height: 35px;
      width: 300px;
    
      >span{
        width: 250px;
        display: block;
        height: 35px;
        line-height: 35px;
        overflow: hidden;
        float: left;
      }
    }
    .org-cont{
      position: relative;
      z-index: 10000;
      margin-top: 15px;
      span {
        color: #fff;
      }
    }
  }
  .sys-name:hover{
    >span{
      color: #13beeb;
    }
    >i{
      color: #13beeb;
    }
  }
}
.menu-list > ul:hover #idactive ul {
  display: none;
}
.menu-list > ul #idactive:hover ul {
  display: block;
}
.menu-list > ul:hover {
  display: block;
}
.custom-tree-node.disable {
    opacity: 0.5;
    cursor: default;
}
.el-tree {
    border-radius: 5px;
    background: rgba(15, 53, 140, 0.9);
    box-shadow: 0 0 20px 10px rgba(0,15,49,1);
    padding: 10px 0px 10px 0;
}
/deep/.el-tree-node__content{
  padding-right: 10px;
  height: 30px;
}
/deep/.el-tree-node__content:hover{
  background-color: #1057b7;
}
/deep/.el-tree-node:focus>.el-tree-node__content{
  background-color: #1057b7;
}
/deep/.el-tree-node.is-current>.el-tree-node__content{
  background-color: #1057b7;
}
/deep/.custom-tree-node{
    white-space: normal!important;
    > span:first-child {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 260px;
    display: block;
  }
}
/deep/.custom-tree-node.disable{
opacity: 0.3;
}

</style>
<style>
.btna{
  font-size: 16px!important;
}
</style>