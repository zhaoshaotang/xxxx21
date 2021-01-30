<!-- 自定义配置 -->
<template>
  <div>
    <el-form-item label="板块名称">
      <avue-input v-model="main.activeObj.title"></avue-input>
    </el-form-item>
    <el-form-item label="显示标题">
		<avue-switch v-model="main.activeObj.titleShow"></avue-switch>
	</el-form-item>
  </div>
</template>

<script>
export default {
  inject: ["main"],
  data(){
    return {
    }
  },
  mounted(){
    
  }
}
</script>

<style>
</style>