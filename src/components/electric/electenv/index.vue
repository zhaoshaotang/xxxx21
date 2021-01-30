<template>
  <div class="cus-body">
    <div class="cus-header">
      <div class="cus-title">
        <span>{{ option.title }}</span>
      </div>
    </div>
    <div class="cus-cont">
      <div class="chart-wrap">
        <div class="chart-control">
          <div class="type-tab">
            <div
              @click="selEnvType(1)"
              :class="queryParams.type === 1 ? 'tab-item active' : 'tab-item'"
            >
              电箱温度监控
            </div>
            <div
              @click="selEnvType(2)"
              :class="queryParams.type === 2 ? 'tab-item active' : 'tab-item'"
            >
              电箱PM10监控
            </div>
          </div>
          <div class="his-btn" @click="openMore">历史记录</div>
          <div class="sel-wrap">
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
            <div class="day-type">
              <el-radio-group
                v-model="queryParams.dayOrMonth"
                @change="typeAndDayOrMonth"
                size="mini"
              >
                <el-radio-button :label="1">按日</el-radio-button>
                <el-radio-button :label="2">按月</el-radio-button>
              </el-radio-group>
            </div>
          </div>
        </div>
        <e-charts ref="chart" :options="chartOption" autoresize />
      </div>
    </div>
    <more-data
      :dialogFlag.sync="dialogFlag"
      :devList="devList"
      :devSn="queryParams.serialNumber"
      :projectId="queryParams.projectId-0"
      :companyId="queryParams.companyId"
    />
  </div>
</template>
<script>
import MoreData from "./more";
import ECharts from "vue-echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/line";
import "echarts/lib/chart/pie";
import "echarts/lib/component/dataZoom";
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
  name: "ElectEnv",
  components: {
    ECharts,
    MoreData,
  },
  props: {
    option: Object,
    component: Object,
  },
  data() {
    return {
      dialogFlag: false,
      wds: [],
      pm10s: [],
      times: [],
      queryParams: {
        type: 1,
        serialNumber: "",
        dayOrMonth: "1",
        projectId: null,
        companyId: null,
      },
      devList: [],
      chartOption: {
        dataZoom: [
          {
            type: "inside",
            startValue:12,
            // start: 0,
            // end: 10,
          },
          {
            type: "slider",
            start: 80,
            height: 15,
            borderColor: "transparent",
            fillerColor: "#1b90fe",
            handleSize: 0,
            backgroundColor: "#1A4994",
            showDetail: false,
            showDataShadow: false,
            bottom: 40,
          },
        ],
        tooltip: {
          //提示框组件
          trigger: "axis",
          axisPointer: {
            type: "line",
          },
        },
        grid: {
          left: 15,
          right: 15,
          bottom: 60,
          top: 40,
          padding: "0 0 10 0",
          containLabel: true,
        },

        xAxis: [
          {
            type: "category",
            boundaryGap: true, //坐标轴两边留白
            data: [],
            axisLabel: {
              interval: 0, //设置为 1，表示『隔一个标签显示一个标签』
              margin: 15,
              textStyle: {
                color: "#fff",
                fontStyle: "normal",
                fontFamily: "微软雅黑",
                fontSize: 12,
              },
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: "#fff",
                opacity: 0.2,
              },
            },
            splitLine: {
              show: false,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            splitNumber: 3,
            axisLabel: {
              textStyle: {
                color: "#fff",
                fontStyle: "normal",
                fontFamily: "微软雅黑",
                fontSize: 12,
              },
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: ["#fff"],
                opacity: 0.06,
              },
            },
          },
        ],
        series: [
          {
            name: "",
            type: "line",
            data: [],
            smooth: true,
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
                      color: "rgba(6, 239, 11, 0.3)",
                    },
                    {
                      offset: 0.8,
                      color: "rgba(6, 239, 11, 0)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(0, 0, 0, 0.1)",
                shadowBlur: 10,
              },
            },
            itemStyle: {
              normal: {
                color: "#06EF0B",
              },
            },
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
    this.serialNumberList();
  },
  methods: {
    openMore() {
      this.dialogFlag = true;
    },
    serialNumberList() {
      let url = `/prod-api/wisdomScreen/elecbox/wsElecbox/serialNumber/list`;
      axios
        .get(url, {
          params: this.queryParams,
        })
        .then((res) => {
          if (res.data.code === 200) {
            let rows = res.data.data;
            for (var i = 0; i < rows.length; i++) {
              this.devList.push({
                value: rows[i].serialNumber,
              });
              this.queryParams.serialNumber = rows[0].serialNumber;
            }
            this.typeAndDayOrMonth();
          }
        });
    },
    selEnvType(type) {
      this.queryParams.type = type;
      this.typeAndDayOrMonth();
    },
    onChangeStripe() {
      this.typeAndDayOrMonth();
    },
    typeAndDayOrMonth() {
      let url = `/prod-api/wisdomScreen/elecbox/wsElecbox/typeAndDayOrMonth`;
      axios
        .get(url, {
          params: this.queryParams,
        })
        .then((res) => {
          if (res.data.code === 200) {
            const result = res.data.data;
            if (this.queryParams.type == 1) {
              this.chartOption.xAxis[0].data = result.map((e) => e.time);
              this.chartOption.series[0].data = result.map((e) => e.wd || 0);
            } else {
              this.chartOption.xAxis[0].data = result.map((e) => e.time);
              this.chartOption.series[0].data = result.map((e) => e.pm10 || 0);
            }
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
    .chart-control {
      height: 105px;
      z-index: 99;
      position: relative;
      .type-tab {
        width: 490px;
        height: 44px;
        background: url("~@/assets/electab_bg.png") no-repeat center;
        background-size: cover;
        display: flex;
        justify-content: space-between;
        padding: 2px 4px;
        box-sizing: border-box;
        margin: 25px auto 0;
        .tab-item {
          line-height: 40px;
          width: calc(50% - 4px);
          text-align: center;
          color: #ffffff;
          &.active {
            border: 2px solid #00f6ff;
            box-sizing: border-box;
            line-height: 36px;
            box-shadow: inset 0 0 5px 1px #00f6ff;
            font-weight: bold;
          }
        }
      }
      .his-btn {
        position: absolute;
        right: 30px;
        top: 8px;
        /*display: inline-block;*/
        width: 103px;
        height: 36px;
        background: #0e2e9d;
        border-radius: 18px;
        line-height: 36px;
        color: #ffffff;
        font-size: 14px;
        text-align: center;
        cursor: pointer;
      }
      .sel-wrap {
        margin-top: 20px;
        text-align: right;
        .seldev-box {
          z-index: 99;
          display: inline-block;
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
    }
    .echarts {
      margin-top: -20px;
      width: 100%;
      height: calc(100% - 110px);
    }
  }
}
</style>
