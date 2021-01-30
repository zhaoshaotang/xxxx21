<template>
  <div class="cus-body">
    <div class="cus-header">
      <div class="cus-title">
        <span>{{ option.title }}</span>
      </div>
    </div>
    <div class="cus-cont">
      <div class="chart-wrap">
        <div class="seldev-box">
          <el-select
            size="small"
            v-model="queryParams.serialNumber"
            @change="onChangeStripe"
          >
            <el-option
              v-for="item in devList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="date-pick-box">
          <el-date-picker
            size="mini"
            :clearable="false"
            :editable="false"
            v-model="queryParams.beginTime"
            value-format="yyyy-MM-dd"
            type="date"
            @change="dayRecord"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </div>
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
  name: "ElectTrend",
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
      queryParams: {
        date: "",
        beginTime: this.dayjs().format("YYYY-MM-DD"), //开始时间
        serialNumber: "",
        projectId: null,
        companyId: null,
      },
      devList: [],
      chartOption: {
        tooltip: {
          //提示框组件
          trigger: "axis",
          axisPointer: {
            type: "line",
          },
        },
        legend: {
          data: ["有功电能(KWh)", "无功电能(KWh)"],
          orient: "horizontal",
          icon: "rect",
          show: true,
          right: 390,
          top: 20,
          itemWidth: 12,
          itemHeight: 12,
          textStyle: {
            color: "#ffffff",
          },
        },
        grid: {
          top: "15%",
          left: "5%",
          right: "5%",
          bottom: "15%",
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
            data: ["A", "B", "C", "D", "E", "F"],
          },
        ],

        yAxis: [
          {
            type: "value",
            min: 0,

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
            name: "有功电能(KWh)",
            type: "line",
            smooth: true, //是否平滑
            showAllSymbol: true,
            symbol: "circle",
            symbolSize: 15,
            lineStyle: {
              normal: {
                color: "#00b3f4",
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
                color: "#00b3f4",
              },
            },
            itemStyle: {
              color: "#00b3f4",
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
            name: "无功电能(KWh)",
            type: "line",
            smooth: true,
            showAllSymbol: true,

            symbol: "circle",
            symbolSize: 15,
            lineStyle: {
              normal: {
                color: "#00ca95",
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
                color: "#00ca95",
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
            data: [281.55, 398.35, 214.02, 179.55, 289.57, 356.14],
          },
        ],
      },
    };
  },
  created() {
    if (getUrlParames("userType") == 1) {
      //项目级
      this.queryParams.projectId = getUrlParames("userId");
    } else {
      //企业级
      this.queryParams.companyId = getUrlParames("userId");
    }
    axios.defaults.headers.common["Authorization"] = getUrlParames("token");
  },
  mounted() {
    this.dayRecord();
  },
  methods: {
    dayRecord() {
      let url = `/prod-api/wisdomScreen/elecbox/wsElecbox/serialNumber/list`;
      axios
        .get(url, {
          params: this.queryParams,
        })
        .then((res) => {
          if (res.data.code === 200) {
            let rows = res.data.data;
            this.devList = rows.map((e) => {
              return {
                value: e.serialNumber,
                label: e.serialNumber,
              };
            });
            if (!this.queryParams.serialNumber) {
              this.queryParams.serialNumber = rows[0].serialNumber;
            }
            this.wsElecboxDay();
          }
        });
    },
    onChangeStripe() {
      this.wsElecboxDay();
    },
    wsElecboxDay() {
      let url = `/prod-api/wisdomScreen/elecbox/wsElecbox/day`;
      axios
        .get(url, {
          params: this.queryParams,
        })
        .then((res) => {
          if (res.data.code === 200) {
            const result = res.data.data;
            this.chartOption.xAxis[0].data = result.map((e) => e.time);
            this.chartOption.series[0].data = result.map(
              (e) => e.activePower || 0
            ); //有功电能
            this.chartOption.series[1].data = result.map(
              (e) => e.reactivePower || 0
            ); //无功电能
          }
        });
    },
  },
  computed: {
    fontSize() {
      return (this.option.fontSize || 30) + "px";
    },
  },
};
</script>
<style lang="scss" scoped>
.cus-body {
  .chart-wrap {
    width: 100%;
    height: 100%;
    position: relative;
    .seldev-box {
      z-index: 99;
      position: absolute;
      top: 10px;
      right: 260px;
      width: 117px;
      height: 38px;
      background: url("~@/assets/seldev_bg.png") no-repeat center;
      background-size: contain;
      /deep/.el-select {
        width: 100%;
        height: 100%;
        .el-input__inner {
          height: 40px;
          line-height: 40px;
          color: #ffffff !important;
          background: none !important;
          border: none !important;
        }
      }
    }
    .date-pick-box {
      width: 220px;
      position: absolute;
      z-index: 99;
      right: 28px;
      top: 15px;
      /deep/.el-date-editor {
        width: 100%;
        background: rgba(0, 77, 233, 0.2);
        border: 1px solid #004de9;
        .el-input__inner {
          background-color: transparent !important;
          color: #ffffff !important;
        }
        .el-range-separator {
          color: #ffffff;
        }
      }
    }
    .echarts {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
