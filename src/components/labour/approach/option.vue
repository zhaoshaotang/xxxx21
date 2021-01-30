
<template>
  <div>
    <el-form-item label="板块名称">
      <avue-input v-model="main.activeObj.title"></avue-input>
    </el-form-item>
	<el-form-item label="指标1">
	  <avue-input v-model="main.activeObj.dataName.icon1"></avue-input>
	</el-form-item>
	<el-form-item label="指标2">
	  <avue-input v-model="main.activeObj.dataName.icon2"></avue-input>
	</el-form-item>
	<el-form-item label="指标3">
	  <avue-input v-model="main.activeObj.dataName.icon3"></avue-input>
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
  },
  methods:{}
}
</script>

<style>
</style>

