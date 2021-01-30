<!-- 自定义配置 -->
<template>
  <div>
    <el-form-item label="字体大小">
      <avue-input-number v-model="main.activeObj.fontSize" ></avue-input-number>
    </el-form-item>
    <el-form-item label="文字颜色">
      <avue-input-color v-model="main.activeObj.color"></avue-input-color>
    </el-form-item>
    <el-form-item label="左右内边距">
      <avue-input-number
        v-model="main.activeObj.paddinglr"
      ></avue-input-number>
    </el-form-item>
    <el-form-item label="上下内边距">
      <avue-input-number
        v-model="main.activeObj.paddingtb"
      ></avue-input-number>
    </el-form-item>
    <el-form-item label="编辑菜单">
      <el-button size="mini" type="primary" @click="showDialog">编辑</el-button>
    </el-form-item>
    <el-form-item>
      <li v-for="(item, index) in getData" :key="index" class="menu-item">
        <avue-input v-model="item.name" type="text" style="width:70%"></avue-input>
        <div class="setBar">
          <div style="width:33%">
            <el-button><button type="button" @click="editMenu(item)" class="del-btn"><i class="el-icon-edit"></i></button></el-button>
          </div>
          <div style="width:33%">
            <el-tooltip class="item" effect="dark" content="删除" placement="left">
              <el-button><button type="button" @click="delMenu(item.id)" class="del-btn"><i class="el-icon-delete"></i></button></el-button>
            </el-tooltip>
          </div>
          <div style="width:33%">
            <el-button v-if="index != 0"><button type="button" @click="upMenu(index)" class="del-btn"><i class="el-icon-caret-top"></i></button></el-button>
          </div>
          <div style="width:33%">
            <el-button v-if="index+1 != getData.length"><button type="button" @click="downMenu(index)" class="del-btn"><i class="el-icon-caret-bottom"></i></button></el-button>
          </div>
        </div>
      </li>
    </el-form-item>
    <el-form-item label="列表背景">
      <img
        v-if="main.activeObj.backgroundImage"
        :src="main.activeObj.backgroundImage"
        alt=""
        width="100%"
      />
      <el-input v-model="main.activeObj.backgroundImage">
        <div
          @click="main.handleOpenImg('activeObj.backgroundImage', 'border')"
          slot="append"
        >
          <i class="iconfont icon-img"></i>
        </div>
      </el-input>
    </el-form-item>
    <el-form-item label="更新">
      <el-button size="mini" type="primary" @click="update">更新组件</el-button>
    </el-form-item>
    <Dialog 
      :visible.sync="code.box"
      :type="code.type"
      :menuName = menuName
      :editState = editState
      @call-back= callback
    ></Dialog>
  </div>
</template>

<script>
import imglist from "../../page/group/imglist"
import { visUrl, getUrlParames } from "@/api/httpClient.js" 
import { getMenuPost, removeVisual } from "@/api/visual-jl"
import Dialog from "./dialog"
export default {
  inject: ["main"],
  components: {
    imglist,Dialog
  },
  data() {
    return {
      //接口返回
      getData: [],
      menuName: [],
      code: {
        box: false,
        type: '',
        obj: ''
      },
      editState:null
    }
  },
  mounted(type) {
    //从系统配置获取菜单数据
    this.getData = this.main.activeObj.data
    console.log(`${visUrl}${this.main.activeObj.url}?id=${getUrlParames('id')}`)
    //从后台获取菜单数据
    // this.getMenuList()
    setInterval(()=>{
      // this.update()
    },1000);
  },
  methods:{
    //刷新组件数据
    update(){
      this.getData = this.main.activeObj.data //调试
      this.getMenuList()
    },
    //获取菜单
    getMenuList(){
      let url = `${visUrl}${this.main.activeObj.url}`
      let data = {visualId: getUrlParames('id')}
      getMenuPost(url,data).then((res) => {
        this.main.activeObj.data = res.data.data
        this.getData = this.main.activeObj.data
      }).catch((err) => {
        console.log(err)
      })
    },
    callback(){
      this.getMenuList()
    },
    showDialog(){
      this.editState = 'add'
      this.code.box = true
    },
    //打开图库
    handleOpenImg(item, type) {
      this.$refs.imglist.openImg(item, type)
    },
    //删除菜单
    delMenu(id) {
      this.$confirm("此操作将删除当前大屏, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
      .then(() => {
        removeVisual(id).then((res) => {
            this.getMenuList()
            this.$message({
              type: "success",
              message: "删除成功!",
            });
        })
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除",
        });
      });
    },
     //编辑菜单
    editMenu(item) {
      this.menuName = item
      this.editState = 'edit'
      this.code.box = true
    },
    //位置上移
    upMenu(i){
      console.log(i)
      if(i!=0){
        this.getData[i] = this.getData.splice(i-1, 1, this.getData[i])[0];
      }
    },
    //位置下移
    downMenu(i){
      if(i < this.getData.length){
        this.getData[i] = this.getData.splice(i+1, 1, this.getData[i])[0];
      }
    }
  }
}
</script>

<style lang="scss" scoped>
li {
  list-style: none;
}
.menu-list li .el-input--mini:nth-child(2) {
  width: 60%;
}
.menu-list .el-input--mini {
  font-size: 12px;
  width: 35%;
}
.del-btn {
  width: 5%;
  display:block;
  border: 0;
  background: transparent;
  height: 100%;
  color: #ccc;
  cursor: pointer;
}
.del-btn:hover {
  color: brown;
}
.el-input--suffix .el-input__inner {
  padding-left: 5px;
  padding-right: 10px;
}
.el-input__icon {
  width: 10px;
}
.menu-title span {
  display: inline-block;
}
#menu-set .el-button--default,
#menu-set .el-dialog .el-button--default {
  background-color: transparent;
  color: #859094;
  border-color: #859094;
  padding: 0;
  border: 0;
}
#menu-set .el-button:focus,
#menu-set .el-button:hover {
  color: transparent;
  border-color: transparent;
  background-color: transparent;
}
#menu-set > *{
  margin-left: 10px!important;
  padding-right: 10px!important;
}
.menu-item {
  display: flex;
  margin-left:-50px;
}
.setBar{
  width:30%;
  display:flex;
  div{
    text-align: center;
    button{
      margin: 0;
      padding: 0;
      border: 0;
      background: transparent;
    }
  }
}
</style>