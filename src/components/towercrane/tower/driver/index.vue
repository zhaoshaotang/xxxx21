<template>
  <div class="piebody">

    <div class="jl-chart" :id="`chart${option.domId}`">    <el-row :gutter="20">
      <el-col :span="5"
        ><div class="grid-content bg-purple"></div
      ></el-col>
      <el-col :span="12"
        ><div class="grid-content bg-purple"></div
      ></el-col>
      <el-col :span="7"
        ><div class="grid-content bg-purple"></div
      ></el-col>
    </el-row> </div>
  </div>
</template>
<script>
export default {
  name: "driver",
  data() {
    return {
      option: { title: "3111", domId: "002" },
    };
  },
  created() {
    
  },
  mounted() {
    let that = this;
    setTimeout(function () {
      that.addPie();
    }, 500);
  },
  methods: {
    addPie() {
      let pieOne = echarts.init(
        document.getElementById(`chart${this.option.domId}`)
      );
      pieOne.setOption(option);
    },
  },
};
</script>
<style scoped>

</style>