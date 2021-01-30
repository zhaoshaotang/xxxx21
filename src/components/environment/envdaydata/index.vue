<template>
  <div class="cus-body">
    <div class="cus-header">
      <div class="cus-title">
        <span>{{ option.title }}</span>
      </div>
    </div>
    <div class="cus-cont">
      <div class="control-box">
        <div class="day-type">
          <el-radio-group v-model="pmType" @change="setChartData" size="mini">
            <el-radio-button :label="1">温度</el-radio-button>
            <el-radio-button :label="2">湿度</el-radio-button>
            <el-radio-button :label="3">噪音</el-radio-button>
            <el-radio-button :label="4">风速</el-radio-button>
          </el-radio-group>
        </div>
        <div class="date-pick-box">
          <el-date-picker
            size="mini"
            :clearable="false"
            :editable="false"
            v-model="datetime"
            value-format="yyyy-MM-dd"
            type="date"
            @change="dayRecord"
            :picker-options="pickerOptions"
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
  name: "EnvDayData",
  components: {
    ECharts,
  },
  props: {
    option: Object,
    component: Object,
  },
  data() {
    return {
      pmType: 1,
      chartData: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      datetime: this.dayjs().format("YYYY-MM-DD"), //开始时间
      devList: [],
      chartOption: {
        tooltip: {
          //提示框组件
          trigger: "axis",
          axisPointer: {
            type: "line",
          },
        },
        dataZoom: [
          {
            type: "inside",
            startValue:30,
            // start: 0,
            // end: 40,
          },
          {
            type: "slider",
            height: 15,
             start: 60,
            borderColor: "transparent",
            fillerColor: "#1b90fe",
            handleSize: 0,
            backgroundColor: "#1A4994",
            showDetail: false,
            showDataShadow: false,
            bottom: 15,
          },
        ],
        grid: {
          top: "15%",
          left: "10%",
          right: "2%",
          bottom: "30%",
          // containLabel: true
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
            name:"",
            type: "value",
            nameGap:11,
            nameTextStyle: {
              fontSize: 12,
              color: "#FFFAFA",
              fontFamily: 'Microsoft YaHei',
            },
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
            name: "",
            type: "line",
            smooth: true, //是否平滑
            symbolSize: 0,
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
              show: false,
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
        ],
      },
    };
  },
  created() {
    axios.defaults.headers.common["Authorization"] = getUrlParames("token");
  },
  mounted() {
    this.dayRecord();
  },
  methods: {
    dayRecord() {
      let url = `/prod-api/wisdomScreen/dust/wsDust/dataAnalysis`;
      axios
        .get(url, {
          params: {
            equipmentNo: this.serialNumber,
            datetime: this.datetime,
          },
        })
        .then((res) => {
          if (res.data.code === 200) {
            let chartData = res.data.rows;
            this.chartData = chartData;
            this.setChartData();
          }
        });
    },
    setChartData() {
      this.chartOption.xAxis[0].data = this.chartData.map((e) =>
        e.recordTime.slice(-8, -3)
      );
      switch (this.pmType) {
        case 1:
          this.chartOption.yAxis[0].name = "单位:(℃)",
          this.chartOption.series[0].data = this.chartData.map(
            (e) => e.temperature
          );
          break;
        case 2:
          this.chartOption.yAxis[0].name = "单位:(%RH)",
          this.chartOption.series[0].data = this.chartData.map(
            (e) => e.humidity
          );
          break;
        case 3:
          this.chartOption.yAxis[0].name = "单位:(db)",
          this.chartOption.series[0].data = this.chartData.map((e) => e.noise);
          break;
        case 4:
          this.chartOption.yAxis[0].name = "单位:(m/s)",
          this.chartOption.series[0].data = this.chartData.map(
            (e) => e.windSpeed
          );
          break;
      }
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
    display: flex;
    justify-content: space-between;
    padding-top: 20px;
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
  }
  .chart-wrap {
    width: 100%;
    height: calc(100% - 50px);
    position: relative;
    .echarts {
      width: 100%;
      height: 100%;
    }
  }
}
.date-pick-box {
  width: 124px;
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
.el-input--mini .el-input__inner{
  background-color: transparent !important;
}
</style>
