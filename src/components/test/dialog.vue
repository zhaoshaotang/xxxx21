<template>
    <el-dialog title="新建菜单"
      :visible.sync="visible"
      :before-close="handleClose"
      width="20%">
    <el-form-item label="菜单名称" class="menu-list" id="menu-set">
      <avue-input type="text" v-model="editState == 'add' ? '' : menuName.name" style="width:100%"></avue-input>
    </el-form-item>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" size="small" @click="submit">确定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import "codemirror/theme/blackboard.css"
import "codemirror/lib/codemirror.css"
import "codemirror/addon/hint/show-hint.css"

let CodeMirror = require("codemirror/lib/codemirror")
require("codemirror/addon/edit/matchbrackets")
require("codemirror/addon/selection/active-line")
require("codemirror/addon/hint/show-hint")
import { visUrl, getUrlParames } from "@/api/httpClient.js"
import { saveVisual } from "@/api/visual-jl"
export default {
  name: "codeMirror",
  inject: ["main"],
  data () {
    return {
      editor: {},
      create: false,
      code: ''
    }
  },
  props: {
    visible: {
      type:Boolean,
      default: false
    },
    editState: {
      type:String
    },
    menuName:[Array,Object]
  },
  created(){
    console.log()
  },
  mounted(){
  },
  methods:{
    handleClose () {
      this.setVisible(false);
    },
    setVisible(val){
      this.$emit('update:visible', val);
    },
    //保存菜单
    submit(){
      if(this.editState === "add"){
        var  data = {
          config: {name: this.menuName.name, visualId: getUrlParames('id')},
          visual: {}
        }
      }
      if(this.editState === "edit"){
        var data = {
          config: {
            name: this.menuName.name, 
            visualId: getUrlParames('id'),
            id: this.menuName.id
          }, 
            visual: {}
        }
      }
      saveVisual(data).then((res) => {
        console.log(res.data === 200)
          this.main.activeObj.data = res.data.data
          this.menuName = this.main.activeObj.data
          this.$emit("call-back");
          this.$message({
            message: '新增成功',
            type: 'success'
          })
          this.setVisible(false);
      }).catch((err) => {
        console.log(err)
      })
    },
  }
}
</script>
<style lang="scss" scoped>

.menu-item {
  display: flex;
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