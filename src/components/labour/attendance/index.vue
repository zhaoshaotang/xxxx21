<template>
  <div class="cus-body">
    <div class="cus-header" style="z-index: 999">
      <span class="cus-title">
        <span>{{ option.title }}</span>
      </span>
      <div class="daytime" style="text-align: right">
        <el-form inline>
          <el-form-item>
            <el-button
              :autofocus="true"
              style="
                border-top-left-radius: 15%;
                border-bottom-left-radius: 15%;
              "
              :class="{ 'is-active': dateDay }"
              @click="month(1)"
              checked
              >按日</el-button
            >
            <el-button
              style="
                border-top-right-radius: 15%;
                border-bottom-right-radius: 15%;
              "
              :class="{ 'is-active': !dateDay }"
              @click="month(2)"
              >按月</el-button
            >
          </el-form-item>
          <el-form-item>
            <el-date-picker
            v-if="dateDay"
              v-model="value2"
              type="daterange"
              @change="change(1)"
              value-format="yyyy-MM-dd"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            >
            </el-date-picker>
            <el-date-picker
             v-if="!dateDay"
              v-model="value2"
              @change="change(2)"
              value-format="yyyy-MM"
              type="monthrange"
              range-separator="至"
              start-placeholder="开始月份"
              end-placeholder="结束月份">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!--考勤模块-->
    <div class="piebody kaoqin">
      <div class="kk1">平均出勤率：{{ averageAttendanceRate }}%</div>
      <div class="kk2">平均在岗人数：{{ averageOnTheJobNumber }}</div>
      <div
        style="display: inline-block; width: 25%; height: 100%"
        id="chartsPie"
      ></div>
      <!--原图下面是柱形图-->
      <!-- <div
        v-loading="loading"
        element-loading-background="rgba(0,0,0,0.2)"
        style="
          display: inline-block;
          width: 75%;
          margin-top: 67px;
          padding-right: 30px;
        "
        id="chartsTia"
      ></div> -->
      <div class="chart-wrap">
        <ECharts
          @click="handlePieSelectChange1"
          ref="chart"
          class="chartson"
          :options="pieOption"
          autoresize
        />
      </div>
      <more-data
        :dialogFlag.sync="dialogFlag"
        :projectId="queryParams.projectId-0"
        :companyId="queryParams.companyId"
        :timeAttendance="queryParams.timeAttendance"
        :dateType="queryParams.dateType"
        :trendTypeName="queryParams.trendTypeName"
      />
    </div>
  </div>
</template>
<script>
import MoreData from "./more";
import ECharts from "vue-echarts";
import { visUrl, getUrlParames } from "@/common";
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
export default {
  name: "attendance",
  components: {
    ECharts,
    MoreData,
  },
  props: {
    option: Object,
    component: Object,
  },
  computed: {
    averageAttendanceNumbercomputed() {
      return this.averageAttendanceNumber;
    },
  },
  data() {
    return {
      dialogFlag: false,
      loading: true,
      type: "daterange",
      value2: null,
      dateDay: true,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      averageAttendanceRate: null,
      averageOnTheJobNumber: null,
      averageAttendanceNumber: null,
      queryParams: {
        projectId: null,
        companyId: null,
        timeAttendance: "",
        dateType: 1,
        trendTypeName: "",
      },
      // 第一个图option
      chartOption: {
        series: [
          {
            name: "遥感解译信息",
            type: "pie",

            radius: ["40%", "50%"],
            center: ["46%", "50%"],
            startAngle: 225,
            color: [
              new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#262795",
                },
                {
                  offset: 1,
                  color: "#2B2CB4",
                },
              ]),
              "transparent",
            ],
            labelLine: {
              normal: {
                show: false,
              },
            },
            label: {
              normal: {
                position: "center",
              },
            },
            data: [
              {
                value: 75,
                name: "平均出勤人数",
                label: {
                  normal: {
                    formatter: "平均出勤人数",
                    textStyle: {
                      color: "#16D0FF",
                      fontSize: 14,
                    },
                  },
                },
              },
              {
                value: 25,
                name: "%",
                label: {
                  normal: {
                    formatter: "\n\n" + this.averageAttendanceNumber,
                    textStyle: {
                      color: "#16D0FF",
                      fontSize: 25,
                    },
                  },
                },
              },
              {
                value: 0,
                name: "%",
                label: {
                  normal: {
                    formatter: "",
                    textStyle: {
                      color: "#fff",
                      fontSize: 16,
                    },
                  },
                },
              },
            ],
          },
        ],
      },
      // 第二个图option
      pieOption: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
            label: {
              show: true,
            },
          },
        },
        grid: {
          left: "4%",
          top: "18%",
          right: "5%",
          bottom: "84",
        },
        legend: {
          data: ["出勤", "在岗", "出勤率"],
          top: "4%",
          textStyle: {
            color: "#1FC3CE",
            fontSize: 14,
          },
        },
        xAxis: {
          data: [
          ],
          axisLine: {
            show: true, //隐藏X轴轴线
            lineStyle: {
              color: "#3d5269",
              width: 1,
            },
          },
          axisLabel: {
            textStyle: {
              fontFamily: "Microsoft YaHei",
              color: "#396A87", //X轴文字颜色
              fontSize: 14,
            },
            lineHeight: 30,
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
            showDetail: false,
            fillerColor: "#1b90fe",
            handleSize: "10%",
            textStyle: true,
            bottom: "0",
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
            name: "单位：项",
            nameTextStyle: {
              color: "#fff",
              fontSize: 14,
            },
            splitLine: {
              show: true,
              lineStyle: {
                width: 1,
                color: "#3d5269",
              },
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#396A87",
                fontSize: 14,
              },
            },
          },
          {
            type: "value",
            name: "使用率%",
            nameTextStyle: {
              color: "#396A87",
              fontSize: 14,
            },
            position: "right",
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#396A87",
                width: 2,
              },
            },
            axisLabel: {
              show: true,
              formatter: "{value} %", //右侧Y轴文字显示
              textStyle: {
                color: "#396A87",
                fontSize: 14,
              },
            },
          },
        ],
        series: [
          {
            name: "出勤",
            type: "bar",
            barWidth: '40%',
            
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgb(57,89,255,1)",
                  },
                  {
                    offset: 1,
                    color: "rgb(46,200,207,1)",
                  },
                ]),
              },
            },
            data: [],
          },
          {
            name: "在岗",
            type: "bar",
            barWidth: '40%',
           
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#E29052",
                  },
                  {
                    offset: 1,
                    color: "#FA5A53",
                  },
                ]),
              },
            },
            data: [],
          },
          {
            name: "出勤率",
            type: "line",
            yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
            showAllSymbol: true, //显示所有图形。
            symbol: "circle", //标记的图形为实心圆
            symbolSize: 6, //标记的大小
            itemStyle: {
              //折线拐点标志的样式
              color: "#26D9FF",
              borderColor: "#26D9FF",
              width: 2,
              shadowColor: "#26D9FF",
              shadowBlur: 2,
            },
            lineStyle: {
              color: "#26D9FF",
              width: 2,
              shadowBlur: 2,
            },
            data: [],
          },
        ],
      },
    };
  },
  created() {
    if(getUrlParames("userType") == 1){ //项目级
      this.queryParams.projectId = getUrlParames("userId")-0;
    }else{//企业级
      this.queryParams.companyId = getUrlParames("userId");
    }
    axios.defaults.headers.common["Authorization"] = getUrlParames("token");
    this.value2 = [
      this.dayjs().subtract(30, "day").format("YYYY-MM-DD"),
      this.dayjs().format("YYYY-MM-DD"),
    ];
    this.averageAttendance(1); //出勤模块 饼状图
    this.attendanceColumnar(1); //出勤模块 柱状图
  },

  methods: {
    handlePieSelectChange1(e) {
      this.queryParams.timeAttendance = e.name;
      this.queryParams.trendTypeName = e.name + "出勤人员信息";
      this.dialogFlag = true;
    },
    month(type) {
      if (type == 1) {
        this.dateDay = true;
        this.value2 = [
          this.dayjs().subtract(30, "day").format("YYYY-MM-DD"),
          this.dayjs().format("YYYY-MM-DD"),
        ];
           this.averageAttendance(type); //出勤模块 饼状图
      this.attendanceColumnar(type); //出勤模块 柱状图
      } else {
        this.dateDay = false;
        this.value2 = [
          this.dayjs().subtract(365, "day").format("YYYY-MM-DD"),
          this.dayjs().format("YYYY-MM-DD"),
        ];
      }
      this.averageAttendance(type); //出勤模块 饼状图
      this.attendanceColumnar(type); //出勤模块 柱状图
   
    },
    averageAttendance(type) {
      this.queryParams.dateType = type;
      let url = `/prod-api/wisdomScreen/labour/wsLabour/averageAttendance`;
      axios
        .get(url, {
          params: {...this.queryParams, startDate: this.value2[0], endDate: this.value2[1]},
        })
        .then((res) => {
          if (res.data.code === 200) {
            let row = res.data.data;
            this.averageAttendanceRate = row.averageAttendanceRate;
            this.averageOnTheJobNumber = row.averageOnTheJobNumber;
            this.averageAttendanceNumber = row.averageAttendanceNumber;
            this.chartOption.series[0].data[1].label.normal.formatter =
              "\n\n" + this.averageAttendanceNumber;
            this.addPie("chartsPie", this.chartOption); //重新渲染
          }
        });
    },
    attendanceColumnar(type) {
      this.queryParams.dateType = type;
      let url = `/prod-api/wisdomScreen/labour/wsLabour/attendanceColumnar`;
      axios
        .get(url, {
          params: {...this.queryParams, startDate: this.value2[0], endDate: this.value2[1]},
        })
        .then((res) => {
          if (res.data.code === 200) {
            let chartData = res.data.rows;
            // this.pieOption.xAxis.data = chartData.map((e) => e.timeAttendance);
            this.pieOption.series[0].data = chartData.map(
              (e) => e.attendanceNum
            );
            this.pieOption.series[1].data = chartData.map((e) => e.onTheJobNum);
            this.pieOption.series[2].data = chartData.map(
              (e) => e.attendanceRate
            );
           
            let daralist=chartData.map((e) => e.timeAttendance);
        
           this.pieOption.xAxis.data= daralist.map((item)=>{
            return item.slice(5)
          })

            this.addPie("chartsTia", this.pieOption); //重新渲染
          }
        });
    },
    addPie(id, option) {
      let pieOne = echarts.init(document.getElementById(id));
      pieOne.setOption(option);
    },
    change(type) {
      
      if (type == 1){
         this.averageAttendance(type); //出勤模块 饼状图
         this.attendanceColumnar(type); //出勤模块 柱状图
      }else{
         this.averageAttendance(type); //出勤模块 饼状图
         this.attendanceColumnar(type); //出勤模块 柱状图
      }
      
    },
  },
};
</script>
<style scoped>
.is-active {
  background-color: #1b90fe;
  color: #fff;
}
.el-button {
  height: 32px;
  width: 66px;
  padding: 0px;
  border: 1px solid #0772a3;
}
.el-button + .el-button {
  margin-left: 0px;
}
.el-range-editor .el-range-input {
  background-color: #0c2577 !important;
}

.el-button:focus,
.el-button:hover {
  color: #fff;
  background-color: #1b90fe;
}

.date-pick-box {
  display: block;
  width: 220px;
  /* float: right; */
  clear: both;
  z-index: 999999;
}
.el-date-editor {
  width: 231px;
  background: rgba(0, 77, 233, 0.2);
  border: 1px solid #004de9;
}
.el-range-input {
  background-color: transparent !important;
  color: #ffffff !important;
}
.el-range-separator {
  color: #ffffff;
}
.date-pick-box .el-range-editor--mini .el-range-input {
  background-color: transparent !important;
}
</style>
<style>
.el-range-editor .el-range-input {
  background-color: transparent !important;
}
.kaoqin {
  position: relative !important;
}
.kk1 {
  position: absolute;
  top: 50px;
  left: 54px;
  color: white;
}
.kk2 {
  position: absolute;
  top: 222px;
  left: 45px;
  color: white;
}
/* .kaoqin div:nth-child(3) div canvas {
  /* 考勤模块左侧饼状图 */
  /* width: 130% !important;
  left: 26% !important;
} */ 
.daytime {
  padding-right: 20px;
}
.el-date-range-picker {
  z-index: 999999;
}
.chart-wrap {
  width: 75%;
}
.chartson {
  padding-left: 37px;
  margin-top: 67px;
  width: 90%;
  height: 78%;
}
</style>