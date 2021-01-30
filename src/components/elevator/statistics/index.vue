<template>
  <div class="cus-body">
    <div class="cus-header">
      <span class="cus-title">
        <span>{{ option.title }}</span>
      </span>
      <div id="Subcontract">
        <el-row style="margin-left: 60%; margin-top: 20px">
          <el-button
            @click="alarmDaysType(1)"
            :class="{ bgc: index == 1 }"
            style="border-top-left-radius: 15%; border-bottom-left-radius: 15%"
            >近7日</el-button
          >
          <el-button
            @click="alarmDaysType(2)"
            :class="{ bgc: index == 2 }"
            style="
              border-top-right-radius: 15%;
              border-bottom-right-radius: 15%;
            "
            >近30日</el-button
          >
        </el-row>
      </div>
    </div>
    <div class="piebody">
      <div class="jl-chart" :id="`chart${option.domId}`"></div>
    </div>
    <more-data
      :dialogFlag.sync="dialogFlag"
      :projectId="params.projectId-0"
      :companyId="params.companyId"
      :alarmType="params.alarmType"
      :Day="Day"
    />
  </div>
</template>
<script>
import MoreData from "./more";
import { visUrl, getUrlParames } from "@/api/httpClient.js";
import axios from "axios";
export default {
  name: "statistics",
  components: {
    MoreData,
  },
  props: {
    option: Object,
    component: Object,
  },
  data() {
    return {
      dialogFlag: false,
      index: 1,
      Day: "",
      params: {
        projectId: null,
        companyId: null,
        alarmDays: 1,
        alarmType: "",
      },
      alarmTypeName: null,
      alarmNumber: null,
      chartDom: Date.parse(new Date()),
    };
  },
  created() {
    if (getUrlParames("userType") == 1) {
      //项目级
      this.params.projectId = getUrlParames("userId");
    } else {
      //企业级
      this.params.companyId = getUrlParames("userId");
    }
    axios.defaults.headers.common["Authorization"] = getUrlParames("token");

    if (this.option.domId === null) {
      this.option.domId = this.chartDom;
    }
  },
  mounted() {
    this.elevatorAlarm();
  },
  methods: {
    alarmDaysType(type) {
      this.Day = type;
      this.index = type;
      this.params.alarmDays = type;
      //点击出现弹框，先不管
      this.elevatorAlarm();
    },
    elevatorAlarm() {
      let url = `/prod-api/wisdomScreen/elevator/wsElevator/elevatorAlarm`;
      axios
        .get(url, {
          params: this.params,
        })
        .then((res) => {
          if (res.data.code === 200) {
            let rows = res.data.rows;
            let arrObj = [];
            for (var i = 0; i < rows.length; i++) {
              arrObj.push({
                name: rows[i].alarmTypeName,
                value: rows[i].alarmNumber,
                alarmType: rows[i].alarmType,
              });
            }
            this.addPie(arrObj);
          }
        });
    },
    addPie(arrObj) {
      let pieOne = echarts.init(
        document.getElementById(`chart${this.option.domId}`)
      );
      var colorList = ["#00ecab", "#ab3bdf", "#f28510", "#d0e129", "#106bfb"];
      var option = {
        title: {
          top: "56%",
          left: "25%",
          textStyle: {
            color: "#fff",
          },
        },
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c}次 ({d}%)",
        },
        legend: {
          orient: "vertical",
          itemWidth: 16,
          itemHeight: 10,
          top: "35%",
          left: "65%",
          textStyle: {
            color: "#fff",
          },
          data: arrObj.name,

          formatter: function (name) {
            let className = "upRate";
            let rateIcon = "▲";
            if (arrObj && arrObj.length) {
              for (var i = 0; i < arrObj.length; i++) {
                if (name === arrObj[i].name) {
                  if (arrObj[i].rate < 0) {
                    className = "downRate";
                  }
                  return name + " " + " " + arrObj[i].value + "次";
                }
              }
            }
          },
        },
        series: [
          {
            type: "pie",
            roseType: "radius",
            center: ["35%", "50%", "40%", "40%"],
            radius: ["30%", "80%"],
            itemStyle: {
              normal: {
                color: function (params) {
                  return colorList[params.dataIndex];
                },
              },
            },
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            labelLine: {
              show: false,
            },
            data: arrObj,
          },
        ],
      };
      pieOne.setOption(option);
      let chartDom = document.getElementsByTagName("avue-draggable");
      chartDom.onresize = function () {
        pieOne.resize();
      };
      //点击事件；5为查询数据类型
      pieOne.off("click");
      pieOne.on("click", (param) => {
        this.params.alarmType = param.data.alarmType;
        this.dialogFlag = true;
      });
    },
  },
};
</script>
<style >
.el-button {
  height: 32px;
  width: 66px;
  padding: 0px;
  border: 1px solid #0772a3;
}
.el-button + .el-button {
  margin-left: 0px;
}

.el-button:focus,
.el-button:hover {
  color: #fff;
  background-color: #1b90fe;
}
.bgc {
  color: #fff;
  background-color: #1b90fe;
}
</style>