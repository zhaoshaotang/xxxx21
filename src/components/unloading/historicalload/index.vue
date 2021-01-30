<template>
  <div class="cus-body">
    <div class="cus-header">
      <span class="cus-title">
        <span>{{ option.title }}</span>
      </span>
    </div>
    <div class="piebody">
      <div class="jl-chart" :id="`chart${option.domId}`"></div>
    </div>
  </div>
</template>
<script>
import { visUrl, getUrlParames } from "@/api/httpClient.js";
import axios from "axios";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "historicalload",
  props: {
    option: Object,
    component: Object,
  },
  data() {
    return {
      // params: {
      //   equipmentNo: 1908120494,
      // },
      chartDom: Date.parse(new Date()),
    };
  },
  created() {
    axios.defaults.headers.common["Authorization"] = getUrlParames("token");
    if (this.option.domId === null) {
      this.option.domId = this.chartDom;
    }
  },
  mounted() {
    this.unloadingHistoricalWeight();
  },
  computed: {
    ...mapGetters({
      serialNumber: "unloadSN",
    }),
  },
  watch: {
    serialNumber: function () {
      this.unloadingHistoricalWeight();
    },
  },
  methods: {
    unloadingHistoricalWeight() {
      let url = `/prod-api/wisdomScreen/unloading/wsUnloading/unloadingHistoricalWeight`;
      axios
        .get(url, {
          params: {
            equipmentNo: this.serialNumber,
          },
        })
        .then((res) => {
          if (res.data.code === 200) {
            let insertTimes = [];
            let currentWeights = [];
            let rows = res.data.rows;
            for (var i = 0; i < rows.length; i++) {
              insertTimes.push(rows[i].insertTime);
              currentWeights.push(rows[i].currentWeight);
            }
            this.addPie(insertTimes, currentWeights);
          }
        });
    },
    addPie(insertTimes, currentWeights) {
      let pieOne = echarts.init(
        document.getElementById(`chart${this.option.domId}`)
      );
      var option = {
        title: {
          text: "单位（kg）",
          textStyle: {
            color: "#ffffff",
          },

          top: "3%",
          left: "9%",
        },
        tooltip: {
          //提示框组件
          trigger: "axis",
          axisPointer: {
            type: "line",
          },
        },
        xAxis: {
          type: "category",
          data: insertTimes,
          axisLine: {
            //  改变x轴颜色
            lineStyle: {
              color: "#26D9FF",
            },
            splitArea: {
              // show: true,
              color: "#f00",
              lineStyle: {
                color: "#f00",
              },
            },
            axisLabel: {
              color: "#fff",
            },
            splitLine: {
              show: false,
            },
            boundaryGap: false,
            data: insertTimes,
          },
        },
        dataZoom: [
                {
                  start: 10,
                  type: "inside",
                  end: 40,
                  zoomOnMouseWheel: true,
                },
                {
                  type: "slider",
                  realtime: true,
                  fillerColor: "#1b90fe",
                  handleSize: "10%",
                  textStyle: true,
                  bottom: "2%",
                  borderColor: "#1769c3",
                  backgroundColor: "#1a4896",
                },
                {
                  type: "inside",
                  realtime: true,
                },
              ],
        yAxis: [
          {
            type: "value",
            min: 0,
            // max: 140,
            splitNumber: 4,
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(255,255,255,0.1)",
              },
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: true,
              margin: 20,
              textStyle: {
                color: "#ffffff",
              },
            },
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "单位/KG",
            type: "line",
            smooth: true,
            showAllSymbol: false,
            symbolSize: 0,
            lineStyle: {
              normal: {
                color: "#00ca95",
                shadowColor: "rgba(0, 0, 0, .3)",
                shadowBlur: 0,
                shadowOffsetY: 5,
                shadowOffsetX: 5,
              },
            },
            itemStyle: {
              color: "#00ca95",
              borderColor: "#fff",
              borderWidth: 3,
              shadowColor: "rgba(0, 0, 0, .3)",
              shadowBlur: 0,
              shadowOffsetY: 2,
              shadowOffsetX: 2,
            },
            tooltip: {
              show: true,
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(0,202,149,0.3)",
                    },
                    {
                      offset: 1,
                      color: "rgba(0,202,149,0)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(0,202,149, 0.9)",
                shadowBlur: 20,
              },
            },
            data: currentWeights,
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
};
</script>
<style >
</style>
