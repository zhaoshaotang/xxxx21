<!-- 自定义配置 -->
<template>
  <div>
    <el-form-item label="板块名称">
      <avue-input v-model="main.activeObj.title"></avue-input>
    </el-form-item>
	<el-form-item label="设置高度">
		<avue-switch v-model="main.activeObj.setHeight"></avue-switch>
	</el-form-item>
	<el-form-item label="组件高度" v-show="main.activeObj.setHeight != true">
	  <el-slider class="block" v-model="main.activeObj.backgroundHeight" :max="800"></el-slider>
	</el-form-item>
	<el-form-item label="设置文本块">
		<avue-switch v-model="main.activeObj.info"></avue-switch>
	</el-form-item>
	<el-form-item label="文本块字号" v-show="main.activeObj.info != true">
	  <el-slider class="block" v-model="main.activeObj.infoSize" :max="19"></el-slider>
	</el-form-item>
	<el-form-item label="文本块行高" v-show="main.activeObj.info != true">
	  <el-slider class="block" v-model="main.activeObj.infoLineHeight" :max="28"></el-slider>
	</el-form-item>
	<el-form-item label="文本块上边距" v-show="main.activeObj.info != true">
	  <el-slider class="block" v-model="main.activeObj.infoPaddingTop" :max="30"></el-slider>
	</el-form-item>
  </div>
</template>

<script>
export default {
  inject: ["main"]
}
</script>

<style>
</style>