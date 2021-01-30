<template>
  <div class="cus-body">
    <div class="cus-header">
      <div class="cus-title">
        <span>{{ option.title }}</span>
      </div>
    </div>
    <div class="cus-cont">
      <div class="control-box">
        <div class="date-pick-box">
          <el-date-picker
            size="mini"
            :clearable="false"
            :editable="false"
            @change="dayRecord"
            v-model="date"
            :picker-options="pickerOptions"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="-"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          >
          </el-date-picker>
        </div>
      </div>
      <div class="chart-wrap">
        <e-charts ref="chart" :options="chartOption" autoresize />
      </div>
    </div>
  </div>
</template>
<script>
import bus from '@/api/bus.js';
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
import "echarts/lib/component/markLine";
import { visUrl, getUrlParames } from "@/common";
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
export default {
  name: "EnvWindHistory",
  components: {
    ECharts,
  },
  props: {
    option: Object,
    component: Object,
  },
  data() {
    return {
      date: [
        this.dayjs().subtract(30, "day").format("YYYY-MM-DD"),
        this.dayjs().format("YYYY-MM-DD"),
      ],
      datalistwind:[],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
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
        grid: {
          top: "25%",
          left: "10%",
          right: "2%",
          bottom: "25%",
          // containLabel: true
        },
        dataZoom: [
          {
            type: "inside",
            startValue:15,
            // start: 0,
            // end: 40,
          },
          {
            type: "slider",
            height: 15,
             start: 40,
            borderColor: "transparent",
            fillerColor: "#1b90fe",
            handleSize: 0,
            backgroundColor: "#1A4994",
            showDetail: false,
            showDataShadow: false,
            bottom: 15,
          },
        ],
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
            name: "单位:(m/s)",
            type: "value",
            min: 0,
            // max: 140,
            splitNumber: 4,
            nameTextStyle: {
              fontSize: 12,
              color: "#FFFAFA",
              fontFamily: "Microsoft YaHei",
            },
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
            name: "",
            type: "line",
            smooth: true, //是否平滑
            symbolSize: 0,
            lineStyle: {
              normal: {
                color: "#0080ff",
                shadowColor: "rgba(0, 0, 0, .3)",
                shadowBlur: 0,
                shadowOffsetY: 5,
                shadowOffsetX: 5,
              },
            },
             	markLine: {
                symbol: "none",
                data: [
                  {
                    silent: false,
                    yAxis: 0.6,
                    lineStyle: {
                      color: "#FA3934",
                      width: 4,
                      type: "solid"
                    }
                  },
                  {
                    silent: true,
                    yAxis: 0.3,
                    lineStyle: {
                      color: "#41df72",
                      width: 4,
                      type: "solid"
                    }
                  }
                ],
                label: {
                  show :false,
                  fontSize: 12,
                  position: "end",
                
                }
              },
            label: {
              show: false,
            },
            itemStyle: {
              color: "#0080ff",
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
                      color: "rgba(0,128,255,0.3)",
                    },
                    {
                      offset: 1,
                      color: "rgba(0,128,255,0)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(0,128,255, 0.9)",
                shadowBlur: 20,
              },
            },
            data: [502.84, 205.97, 332.79, 281.55, 398.35, 214.02],
          },
        ],
      },
    };
  },
  created() {
    axios.defaults.headers.common["Authorization"] = getUrlParames("token");
    bus.$on('IsCollapse',(data)=>{
     this.datalistwind.push(data); 
     this.chartOption.series[0].markLine.data[0].yAxis=this.datalistwind.map((e) => e.alarmWindSpeed);
     this.chartOption.series[0].markLine.data[1].yAxis=this.datalistwind.map((e) => e.earlyWindSpeed); 
    
  })
  },
  mounted() {
    this.dayRecord();
  },
  methods: {
    dayRecord() {
      let url = `/prod-api/wisdomScreen/dust/wsDust/windSpeedTrend`;
      axios
        .get(url, {
          params: {
            equipmentNo: this.serialNumber,
            startTime: this.date[0],
            endTime: this.date[1],
          },
        })
        .then((res) => {
          if (res.data.code === 200) {
            let chartData = res.data.rows;
            this.chartOption.xAxis[0].data = chartData.map((e) => e.recordTime);
            this.chartOption.series[0].data = chartData.map((e) => e.windSpeed);
          }
        });
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
  padding: 15px;
  box-sizing: border-box;
  .control-box {
    position: absolute;
    right: 20px;
    top: 40px;
    z-index: 99;
    /*width: 100%;*/
    .day-type {
      display: inline-block;
      margin: 0 20px 0 10px;
      /deep/.el-radio-button__inner {
        background: none;
        border-color: #428be5;
        color: #eeeeee;
      }
      /deep/.el-radio-button__orig-radio:checked + .el-radio-button__inner {
        background-color: #409eff;
      }
    }
    .date-pick-box {
      width: 220px;
      /deep/.el-date-editor {
        width: 100%;
        background: rgba(0, 77, 233, 0.2);
        border: 1px solid #004de9;
        .el-range-input {
          background-color: transparent !important;
          color: #ffffff !important;
        }
        .el-range-separator {
          color: #ffffff;
        }
      }
    }
  }
  .chart-wrap {
    width: 100%;
    height: 100%;
    position: relative;
    .echarts {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
