<template>
  <div class="piebody"> 
      <div>
          <video src="https://v.qq.com/x/cover/k18dkv9d6d3ra6q.html" loop="loop" controls="controls" width="100%" height="100%" ></video>
      </div>
    <div class="jl-chart"  :id="`chart${option.domId}`"></div>
  </div>
</template>
<script>
export default {
  name: "video",
  data() {
    return {
      option:{title:'2111',
        domId:'002'      
      }
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