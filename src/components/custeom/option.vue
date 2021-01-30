<!-- 自定义配置 -->
<template>
  <div>
    <el-form-item label="字体大小">
      <avue-input-number v-model="main.activeObj.fontSize"></avue-input-number>
    </el-form-item>
    <el-form-item label="更新组件">
      <el-button size="mini" type="primary" @click="update">更新组件</el-button>
    </el-form-item>
  </div>
</template>

<script>
import { getMenu } from "@/api/visual"
export default {
  inject: ["main"],
  data(){
    return {
    }
  },
  mounted(){
    console.log(this.main)
    this.getDate()
  },
  methods:{
    update(){
      let url = this.main.activeObj.url
      this.getDate(url)
    },
    getDate(prame){
      getMenu(prame).then((res) => {
        this.main.activeObj.data = res.data.data
        console.log(res.data.data)
        // if(res.code === 200){
        //   this.main.activeOption.data = this.getData = res.data.data
        // }
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style>
</style>