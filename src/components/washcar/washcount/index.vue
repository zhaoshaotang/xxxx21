<template>
  <div class="cus-body">
    <div class="cus-header">
      <div class="cus-title">
        <span>{{ option.title }}</span>
      </div>
    </div>
    <div class="cus-cont">
      <div class="chart-wrap">
        <e-charts ref="chart" :options="chartOption" autoresize />
      </div>
    </div>
  </div>
</template>
<script>
import ECharts from "vue-echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/line";
import "echarts/lib/chart/pie";
import "echarts/lib/chart/map";
import "echarts/lib/chart/radar";
import "echarts/lib/chart/scatter";
import "echarts/lib/chart/effectScatter";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/polar";
import "echarts/lib/component/geo";
import "echarts/lib/component/legend";
import "echarts/lib/component/title";
import "echarts/lib/component/visualMap";
import "echarts/lib/component/dataset";
import { visUrl, getUrlParames } from "@/common";
import axios from "axios";
import { mapGetters } from 'vuex';
export default {
  name: "WashCount",
  components: {
    ECharts,
  },
  props: {
    option: Object,
    component: Object,
  },
  data() {
    return {
      chartOption: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            lineStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(0, 255, 233,0)",
                  },
                  {
                    offset: 0.5,
                    color: "rgba(255, 255, 255,1)",
                  },
                  {
                    offset: 1,
                    color: "rgba(0, 255, 233,0)",
                  },
                ],
                global: false,
              },
            },
          },
        },
        grid: {
          top: "15%",
          left: "5%",
          right: "5%",
          bottom: "15%",
          // containLabel: true
        },
        legend: {
          show: true,
          icon: "rect",
          right: 100,
          top: 40,
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            color: "#ffffff",
          },
          data: ["离场车辆", "未清洗车辆"],
        },
        xAxis: [
          {
            type: "category",
            axisLine: {
              show: true,
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
            data: ["01/12", "02/12", "03/12", "04/12", "05/12", "06/12"],
          },
        ],

        yAxis: [
          {
            name:"单位:(辆)",
            type: "value",
            nameTextStyle: {
              fontSize: 14,
              color: "#FFFAFA",
              fontFamily: "Microsoft YaHei",
            },
            min: 0,
            // max: 140,
            // splitNumber: 4,
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
            name: "离场车辆",
            type: "line",
            smooth: true, //是否平滑
            showAllSymbol: true,
            // symbol: 'image://./static/images/guang-circle.png',
            symbol: "circle",
            symbolSize: 15,
            lineStyle: {
              normal: {
                color: "#0FB3F3",
                shadowColor: "rgba(0, 0, 0, .3)",
                shadowBlur: 0,
                shadowOffsetY: 5,
                shadowOffsetX: 5,
              },
            },
            label: {
              show: true,
              position: "top",
              textStyle: {
                color: "#0FB3F3",
              },
            },
            itemStyle: {
              color: "#0FB3F3",
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
                      color: "rgba(0,179,244,0.3)",
                    },
                    {
                      offset: 1,
                      color: "rgba(0,179,244,0)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(0,179,244, 0.9)",
                shadowBlur: 20,
              },
            },
            data: [502.84, 205.97, 332.79, 281.55, 398.35, 214.02],
          },
          {
            name: "未清洗车辆",
            type: "line",
            smooth: true, //是否平滑
            showAllSymbol: true,
            // symbol: 'image://./static/images/guang-circle.png',
            symbol: "circle",
            symbolSize: 15,
            lineStyle: {
              normal: {
                color: "#D01A4A",
                shadowColor: "rgba(0, 0, 0, .3)",
                shadowBlur: 0,
                shadowOffsetY: 5,
                shadowOffsetX: 5,
              },
            },
            label: {
              show: true,
              position: "top",
              textStyle: {
                color: "#D01A4A",
              },
            },

            itemStyle: {
              color: "#d01a4a",
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
                      color: "rgba(208,26,74,0.7)",
                    },
                    {
                      offset: 0.8,
                      color: "rgba(208,26,74,0.1)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(0,0,0,0.01)",
                shadowBlur: 20,
              },
            },
            data: [281.55, 398.35, 214.02, 179.55, 289.57, 356.14],
          },
        ],
      },
    };
  },
  created() {
    axios.defaults.headers.common["Authorization"] = getUrlParames("token");
  },
  mounted() {
    this.washcarStatistics();
  },
  methods: {
    washcarStatistics() {
      let url = `/prod-api/wisdomScreen/carwash/wsCarwash/statistics`;
      axios
        .get(url, {
          params: {serialNumber: this.serialNumber},
        })
        .then((res) => {
          console.log(res.data.code === 200);
          if (res.data.code === 200) {
            const result = res.data.data
            this.chartOption.xAxis[0].data = result.map(e => e.date)
            this.chartOption.series[0].data = result.map(e => e.enterCarNum || 0) //已清洗数
            this.chartOption.series[1].data = result.map(e => e.unWashNum || 0) //未清洗数
          }
        });
    },
  },
  computed: {
    ...mapGetters({
      serialNumber: 'washSN'
    }),
    fontSize() {
      return (this.option.fontSize || 30) + "px";
    },
  },
  watch: {
    serialNumber: function () {
      this.washcarStatistics();
    }
  }
};
</script>
<style lang="scss" scoped>
.cus-body {
  .chart-wrap {
    width: 100%;
    height: 100%;
    .echarts {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
