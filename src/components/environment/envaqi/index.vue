<template>
  <div class="cus-body">
    <div class="cus-cont">
      <div class="chart-wrap">
        <e-charts ref="chart" :options="chartOption" autoresize />
        <div class="status-bar"></div>
      </div>
      <div class="recent-air-box">
        <h4>近7日空气质量</h4>
        <ul class="air-line">
          <li class="air-item" v-for="item in recent7Air" :key="item.date">
            <i :class="`air-level-icon level${item.level}`"></i>
            <p class="air-num">{{ item.date }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import bus from "@/api/bus.js";
import ECharts from "vue-echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/line";
import "echarts/lib/chart/pie";
import "echarts/lib/chart/gauge";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/geo";
import "echarts/lib/component/legend";
import "echarts/lib/component/title";
import "echarts/lib/component/visualMap";
import "echarts/lib/component/dataset";
import "echarts/lib/component/graphic";
import { visUrl, getUrlParames } from "@/common";
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
export default {
  name: "EnvAQI",
  components: {
    ECharts,
  },
  props: {
    option: Object,
    component: Object,
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      date: [
        this.dayjs().subtract(30, "day").format("YYYY-MM-DD"),
        this.dayjs().format("YYYY-MM-DD"),
      ],
      recent7Air: [],
      queryParams: {
        serialNumber: "",
      },
      avgPm25: "",
      pm25: "",
      pm10: "",
      devList: [],
      chartOption: {
        tooltip: {
          formatter: "{a} <br/>{c} {b}",
        },
        series: [
          {
            name: "边框",
            type: "gauge",
            z: 3,
            min: 0,
            max: 500,
            splitNumber: 10,
            radius: "71%",
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                width: 10,
                color: [
                  [0.07, "#42E4FB"],
                  [0.15, "#EEB437"],
                  [0.23, "#FF7C16"],
                  [0.3, "#EE175B"],
                  [0.5, "#9036FA"],
                  [1, "#A41200"],
                ],
              },
            },
            axisLabel: {
              show: false,
            },
            axisTick: {
              // 坐标轴小标记
              show: false,
            },
            splitLine: {
              show: false,
            },
            pointer: {
              show: false,
            },
            detail: {
              show: false,
            },
            data: [{ value: 0, name: "" }],
          },
          {
            name: "均值",
            type: "gauge",
            z: 3,
            min: 0,
            max: 500,
            splitNumber: 10,
            radius: "70%",
            axisLine: {
              show: false,
              lineStyle: {
                width: 10,
                color: [
                  [0.07, "#42E4FB"],
                  [0.15, "#EEB437"],
                  [0.23, "#FF7C16"],
                  [0.3, "#EE175B"],
                  [0.5, "#9036FA"],
                  [1, "#A41200"],
                ],
              },
            },
            axisTick: {
              length: 10,
              lineStyle: {
                color: "#42E4FB",
              },
            },
            splitLine: {
              length: 10,
              lineStyle: {
                color: "#42E4FB",
              },
            },
            axisLabel: {
              borderRadius: 2,
              color: "#42E4FB",
              padding: 3,
            },
            title: {
              color: "#ffffff",
              offsetCenter: [0, "90%"],
            },
            // pointer: {
            //   color: 'auto'
            // },
            detail: {
              fontWeight: "normal",
              color: "#42E4FB",
              // fontSize: '15',
              offsetCenter: [0, "40%"],
            },
            data: [{ value: 40, name: "PM2.5今日均值" }],
            title: {
              offsetCenter: [0, "70%"], //设置完成率位置
              color: "#fff",
            },
          },
          {
            name: "pm2.5",
            type: "gauge",
            center: ["15%", "55%"],
            radius: "55%",
            min: 0,
            max: 500,
            splitNumber: 7,
            axisLabel: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              length: 4,
              lineStyle: {
                color: "#42E4FB",
              },
            },
            splitLine: {
              length: 6,
              lineStyle: {
                color: "#42E4FB",
              },
            },
            pointer: {
              width: 5,
            },
            itemStyle: {
              color: "#1CC8FE",
            },
            title: {
              color: "#ffffff",
              offsetCenter: [0, "60%"],
            },
            detail: {
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontWeight: "normal",
              color: "#42E4FB",
              fontSize: "15",
              offsetCenter: [0, "40%"],
            },
            data: [{ value: 1.5, name: "pm2.5" }],
          },
          {
            name: "pm10",
            type: "gauge",
            center: ["85%", "55%"],
            radius: "55%",
            min: 0,
            max: 500,
            splitNumber: 7,
            axisLabel: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              length: 4,
              lineStyle: {
                color: "#42E4FB",
              },
            },
            splitLine: {
              length: 6,
              lineStyle: {
                color: "#42E4FB",
              },
            },
            pointer: {
              width: 5,
            },
            itemStyle: {
              color: "#1CC8FE",
            },
            title: {
              color: "#ffffff",
              offsetCenter: [0, "60%"],
            },
            detail: {
              fontWeight: "normal",
              color: "#42E4FB",
              fontSize: "15",
              offsetCenter: [0, "40%"],
            },
            data: [{ value: 1.5, name: "PM10" }],
          },
        ],
      },
    };
  },
  created() {
    axios.defaults.headers.common["Authorization"] = getUrlParames("token");
  },
  mounted() {},

  methods: {
    dayRecord() {
      let url = `/prod-api/wisdomScreen/dust/wsDust/dustCodeTableAnalysis`;
      axios
        .get(url, {
          params: {
            equipmentNo: this.serialNumber,
          },
        })
        .then((res) => {
          if (res.data.code === 200) {
            let { avgPm25, pm25, pm10 } = res.data.data;
            this.chartOption.series[1].data[0].value = avgPm25 || 0;
            this.chartOption.series[2].data[0].value = pm25 || 0;
            this.chartOption.series[3].data[0].value = pm10 || 0;

            bus.$emit("IsCollapse", res.data.data);
            // this.setChartData(row.pm25,row.pm10,row.avgPm25);
          }
        });
      let url2 = `/prod-api/wisdomScreen/dust/wsDust/airQualitySevenDays`;
      axios
        .get(url2, {
          params: {
            equipmentNo: this.serialNumber,
          },
        })
        .then((res) => {
          if (res.data.code === 200) {
            let recent7Air = res.data.rows.map((e) => {
              return {
                level: this.getAirLevel(Number(e.pm25)),
                date: e.recordTime,
              };
            });
            this.recent7Air = recent7Air;
            // this.setChartData()
          }
        });
    },
    getAirLevel(pm25) {
      const range = [0, 35, 95, 115, 150, 250, 500];
      let level = 0;
      for (const r of range) {
        if (pm25 >= r) {
          level += 1;
        }
      }
      return level;
    },
  },
  computed: {
    ...mapGetters({
      serialNumber: "envSN",
    }),
    fontSize() {
      return (this.option.fontSize || 30) + "px";
    },
  },
  watch: {
    serialNumber: function () {
      this.dayRecord();
    },
  },
};
</script>
<style lang="scss" scoped>
.cus-body {
  .cus-cont {
    margin-top: 0;
    padding: 0 20px;
    box-sizing: border-box;
    .chart-wrap {
      width: 100%;
      height: calc(100% - 148px);
      position: relative;
      .status-bar {
        position: absolute;
        width: 504px;
        height: 44px;
        background: url("~@/assets/air-status-bar.png") no-repeat center
          center/100%;
        left: 50%;
        margin-left: -252px;
        bottom: 20px;
      }
      .echarts {
        width: 100%;
        height: 100%;
      }
    }
    .recent-air-box {
      width: 100%;
      height: 138px;
      background: url("~@/assets/recent_7_air_bg.png") no-repeat center top;
      background-size: 100% auto;
      padding: 0 20px;
      box-sizing: border-box;
      h4 {
        color: #00deff;
        font-size: 14px;
        padding-top: 22px;
        padding-bottom: 8px;
        font-weight: normal;
      }
      .air-line {
        width: 100%;
        display: flex;
        justify-content: space-evenly;
        height: 54px;
        background: url("~@/assets/arrow_line.png") no-repeat center;
        background-size: contain;
        .air-item {
          width: 48px;
          height: 54px;
          position: relative;
          .air-level-icon {
            display: block;
            width: 48px;
            height: 54px;
            &.level1 {
              background: url("~@/assets/air_level1.png") no-repeat center/100%
                auto;
            }
            &.level2 {
              background: url("~@/assets/air_level2.png") no-repeat center/100%
                auto;
            }
            &.level3 {
              background: url("~@/assets/air_level3.png") no-repeat center/100%
                auto;
            }
            &.level4 {
              background: url("~@/assets/air_level4.png") no-repeat center/100%
                auto;
            }
            &.level5 {
              background: url("~@/assets/air_level5.png") no-repeat center/100%
                auto;
            }
          }
          .air-num {
            color: #ffffff;
            font-size: 14px;
            width: 100%;
            position: absolute;
            bottom: -25px;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
