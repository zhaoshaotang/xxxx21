<template>
  <div class="cus-body">
    <div class="cus-header">
      <span class="cus-title">
        <span>{{ option.title }}</span>
      </span>
      <div id="Subcontract">
        <el-row style="margin-left: 60%">
          <el-button
            @click="subcontractorsType(1)"
            :class="{ bgc: index == 1 }"
            style="border-top-left-radius: 15%; border-bottom-left-radius: 15%"
            >实时</el-button
          >
          <el-button
            @click="subcontractorsType(2)"
            :class="{ bgc: index == 2 }"
            style="
              border-top-right-radius: 15%;
              border-bottom-right-radius: 15%;
            "
            >今日</el-button
          >
        </el-row>
      </div>
    </div>
    <div class="piebody">
      <div class="jl-chart adm" :id="`chart${option.domId}`"></div>
    </div>
    <more-data
      :dialogFlag.sync="dialogFlag"
      :projectId="params.projectId-0"
      :companyId="params.companyId"
      :timeType="params.timeType"
      :unitId="params.unitId"
      :trendTypeName="params.trendTypeName"
    />
  </div>
</template>
<script>
import MoreData from "./more";
import ECharts from "vue-echarts";
import { getsubcontract } from "@/api/laborpage";
import { visUrl, getUrlParames } from "@/api/httpClient.js";
import axios from "axios";
export default {
  name: "subcontract",
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
      index: 1,
      params: {
        projectId: 0,
        companyId: 0,
        timeType: 1,
        unitId: null,
        trendTypeName: "",
      },
      chartDom: Date.parse(new Date()),
    };
  },
  created() {
    if (getUrlParames("userType") == 1) {
      //项目级
      this.params.projectId = Number(getUrlParames("userId"));
      
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
    this.subcontractorsAnalysis();
  },
  methods: {
    subcontractorsType(type) {
      this.params.timeType = type;
      this.index = type;
      this.subcontractorsAnalysis(type);
    },
    subcontractorsAnalysis(type) {
      let url = `/prod-api/wisdomScreen/labour/wsLabour/subcontractorsAnalysis`;
      axios
        .get(url, {
          params: this.params,
        })
        .then((res) => {
          let arrObj = [];
          if (res.data.code === 200) {
            let rows = res.data.rows;
            let unitNumber = [];
            let unitTotalNumber = [];
            let unitName = [];
            let unitId = [];
            for (var i = 0; i < rows.length; i++) {
              unitNumber.push(rows[i].unitNumber);
              unitTotalNumber.push(rows[i].unitTotalNumber);
              unitName.push(rows[i].unitName);
              unitId.push(rows[i].unitId);
            }
            this.addPie(unitNumber, unitTotalNumber, unitName, unitId);
          }
        });
    },
    addPie(unitNumber, unitTotalNumber, unitName, unitId) {
      let pieOne = echarts.init(
        document.getElementById(`chart${this.option.domId}`)
      );
      var option = {
        grid: {
          width: "80%",
          left: "5%",
          right: "5%",
          // bottom: "5%",
          top: "25%",
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "none",
          },
          formatter: function (params) {
            return (
              params[0].name +
              "<br/>" +
              "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:rgba(36,207,233,0.9)'></span>" +
              params[0].seriesName +
              " : " +
              Number(params[0].value) +
              "<br/>"
            );
          },
        },
        dataZoom: [
          {
            type: "slider",
            yAxisIndex: 0,
            zoomLock: true,
            width: 10,
            showDetail: false,
            start: 0,
            end: 50,         
            handleSize: "110%",
            labelFormatter: function (value) { return ''; },
            handleStyle: {
              color: "#d3dee5",
            },
            borderColor: "#90979c",
          },
          {
            type: "inside",
            id: "insideY",
            yAxisIndex: 0,
            start: 0,
            end: 50,
            zoomOnMouseWheel: false,
            moveOnMouseMove: true,
            moveOnMouseWheel: true,
          },
        ],
        xAxis: {
          show: false,
          type: "value",
        },
        yAxis: [
          {
            type: "category",
            inverse: true,
            axisLabel: {
              show: true,
              textStyle: {
                color: "#fff",
              },
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            data: unitName,
          },
        ],
        series: [
          {
            name: "人数",
            type: "bar",
            zlevel: 1,
            itemStyle: {
              normal: {
                barBorderRadius: 30,
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
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
            barWidth: 20,
            barGap:'30%',
            data: unitNumber,
            rawdate: unitId,
          },
          {
            name: "背景",
            type: "bar",
            barWidth: 20,
            barGap: "-100%",
            barCategoryGap:'60%',
            //  data: [3, 3, 3, 3,3,3],　　//柱子的长度
            label: {
              show: true,
              position: "right",
              color: "#ffffff",
              formatter: function (params) {
                return unitNumber[params.dataIndex] + "/" + params.value;
              },
            },
            data: unitTotalNumber,
            rawdate: unitId,
            itemStyle: {
              normal: {
                color: "rgba(24,31,68,1)",
                // barBorderRadius: 30,
              },
            },
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
        if (this.params.timeType == 1) {
          this.params.trendTypeName = "现场" + param.name + "劳务分包人员信息";
        } else {
          this.params.trendTypeName = "今日" + param.name + "劳务分包人员信息";
        }
        this.params.unitId =
          option.series[param.seriesIndex].rawdate[param.dataIndex];
        this.dialogFlag = true;
      });
    },
  },
};
</script>
<style >
div::-webkit-scrollbar {
  background-color: #194894;
  position: absolute;
}
div::-webkit-scrollbar-thumb {
  background-color: #1b90fe;
}
.adm {
  overflow-x: hidden;
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

.bgc {
  color: #fff;
  background-color: #1b90fe;
}
</style>
