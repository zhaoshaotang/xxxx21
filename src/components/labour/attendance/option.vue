<!-- 自定义配置 -->
<template>
  <div>
    <el-form-item label="板块名称">
      <avue-input v-model="main.activeObj.title"></avue-input>
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