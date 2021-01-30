<!-- 自定义配置 -->
<template>
  <div>
	  <el-collapse accordion>
		<el-collapse-item title="幻灯片设置">
<!-- 			<el-form-item label="显示标题">
			 <el-checkbox v-model="main.activeObj.mainPpt" checked>{{main.activeObj.mainPpt === false ? '关闭' : '开启'}}</el-checkbox>
			</el-form-item> -->
		   <el-form-item label="显示标题">
			  <avue-switch v-model="main.activeObj.mainPpt"></avue-switch>
			</el-form-item>
			<el-form-item label="幻灯片宽度">
				<el-slider v-model="main.activeObj.width" :max="100":min="80"></el-slider>
			</el-form-item>
			<el-form-item label="幻灯片高度">
				<el-slider v-model="main.activeObj.height" :max="100":min="80"></el-slider>
			</el-form-item>
			<el-form-item label="幻灯片上边距">
			  <el-slider class="block" v-model="main.activeObj.margintop" :max="100"></el-slider>
			</el-form-item>
			<el-form-item label="显示缩略图">
			  <avue-switch v-model="main.activeObj.imageBtn"></avue-switch>
			</el-form-item>
			<el-form-item label="动态线条">
			  <avue-switch v-model="main.activeObj.dynLine"></avue-switch>
			</el-form-item>
		</el-collapse-item>
	</el-collapse>
  </div>
</template>

<script>
export default {
  inject: ["main"],
  data(){
    return {

    }
  },
  created(){
    
    this.main.activeObj.domId = this.main.activeObj.index
  },
  mounted(){
    console.log(this.main.activeObj.imageBtn)
  },
  methods:{}
}
</script>

<style>
</style>