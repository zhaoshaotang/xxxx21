<template>
  <div class="cus-body">
    <div class="cus-header">
      <span class="cus-title" v-if="option.titleShow">
        <span>{{ option.title }}</span>
      </span>
    </div>
    <div class="piebody">
      <div class="jl-chart" :id="`chart${option.domId}`"></div>
    </div>
  </div>
</template>
<script>
//visUrl：获取基础url；getUrlParames:获取url中的参数
import { visUrl, getUrlParames } from "@/api/httpClient.js";
import axios from "axios";
// import { getJlbartwo } from "@/api/visual-jl"
export default {
  name: "jlbartwo",
  props: {
    option: Object,
    component: Object,
  },
  data() {
    return {
      chartDom: Date.parse(new Date()),
      categories: null,
      series: null,
      params: {
        projectId: null,
        companyId: null,
      },
    };
  },
  computed: {
    fontSize() {
      return (this.option.fontSize || 30) + "px";
    },
    chartData() {
      return this.option.data;
    },
  },
  created() {
    if (this.option.domId === null) {
      this.option.domId = this.chartDom;
    }
  },
  mounted() {
    this.categories = this.option.data.categories;
    this.series = this.option.data.series;
    let that = this;

    setTimeout(function () {
      that.getCharts();
    }, 1000);
    if (getUrlParames("userType") == 1) {
      //项目级
      this.params.projectId = getUrlParames("userId");
    } else {
      //企业级
      this.params.companyId = getUrlParames("userId");
    }
    axios.defaults.headers.common["Authorization"] = getUrlParames("token");
  },
  methods: {
    getUrlParames(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) {
        return unescape(r[2]);
      }
      return null;
    },
    getCharts() {
      let url = `/prod-api/wisdomScreen/home/wsHome/intelligentDevice`;
      axios
        .get(url, {
          params: this.params,
        })
        .then((res) => {
          if (res.data.code === 200) {
            var equipmentNames = [];
            let equipmentNumbers = [];
            let rows = res.data.rows;
            for (var i = 0; i < rows.length; i++) {
              equipmentNames.push(rows[i].equipmentName);
              equipmentNumbers.push(rows[i].equipmentNumber);
            }
           
            this.addPie(equipmentNames, equipmentNumbers);
          }
        });
    },
    addPie(equipmentNames, equipmentNumbers) {
      let pieOne = echarts.init(
        document.getElementById(`chart${this.option.domId}`)
      );
      var option = {
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        textStyle: {
          "font-size": 18,
          fontWeight: "normal", //标题颜色
          color: "#fff",
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: equipmentNames,
            axisLabel:{
						     interval:0,//横轴信息全部显示
						    
						},
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            name: "单位:台",
            type: "value",
          },
        ],
        series: [
          {
            name: "智能设备",
            type: "bar",
            areaStyle: {},
            data: equipmentNumbers,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#00F6FF" }, //柱图渐变色
                  { offset: 0.5, color: "#005DEC" }, //柱图渐变色
                  //柱图渐变色
                ]),
              },
            },
          },
        ],
      };
        
      pieOne.setOption(option);
      let chartDom = document.getElementsByTagName("avue-draggable");
      console.log(chartDom);
      chartDom.onresize = function () {
        pieOne.resize();
      };
    },
  },
  watch: {},
};
</script>
<style lang="scss" scoped>
.piebody {
  width: 100%;
  height: 100%;
}
#pie-two {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
}
#pie-two-body {
  position: relative;
}
</style>