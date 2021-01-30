<template>
  <div class="cus-body">
    <div class="cus-header">
      <span class="cus-title">
        <span>{{ option.title }}</span>
      </span>
      <div id="Subcontract">
        <el-row style="margin-left: 60%">
          <el-button
            @click="workTypeClick(1)"
            :class="{ bgc: index == 1 }"
            style="border-top-left-radius: 15%; border-bottom-left-radius: 15%"
            >实时</el-button
          >
          <el-button
            @click="workTypeClick(2)"
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
      <div class="jl-chart" :id="`chart${option.domId}`"></div>
    </div>
    <more-data
      :dialogFlag.sync="dialogFlag"
      :projectId="params.projectId-0"
      :companyId="params.companyId"
      :workType="params.workType"
      :timeType="params.timeType"
      :trendTypeName="params.trendTypeName"
    />
  </div>
</template>
<script>
import MoreData from "./more";
import ECharts from "vue-echarts";
import { visUrl, getUrlParames } from "@/api/httpClient.js";
import { getspecies } from "@/api/laborpage";
import axios from "axios";
export default {
  name: "species",
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
      arrObj: null,
      params: {
        projectId: null,
        companyId: null,
        timeType: 1,
        workType: "",
        trendTypeName: "",
      },
      personnelWorkType: null,
      personnelWorkTypeNum: null,
      workType: "",
      chartDom: Date.parse(new Date()),
    };
  },
  created() {
    if (this.option.domId === null) {
      this.option.domId = this.chartDom;
    }
    if (getUrlParames("userType") == 1) {
      //项目级
      this.params.projectId = getUrlParames("userId")-0;
    } else {
      //企业级
      this.params.companyId = getUrlParames("userId");
    }
    axios.defaults.headers.common["Authorization"] = getUrlParames("token");
    //在这里获取数据
  },
  mounted() {
    this.workTypeAnalysis();
  },
  methods: {
    workTypeClick(type) {
      this.params.timeType = type;
      this.index = type;
      this.workTypeAnalysis(type);
    },
    workTypeAnalysis(type) {
      let url = `/prod-api/wisdomScreen/labour/wsLabour/workTypeAnalysis`;
      axios
        .get(url, {
          params: this.params,
        })
        .then((res) => {
          let arrObj = [];
          if (res.data.code === 200) {
            let rows = res.data.rows;
            for (var i = 0; i < rows.length; i++) {
              arrObj.push({
                name: rows[i].personnelWorkType,
                value: rows[i].personnelWorkTypeNum,
                type: rows[i].workType,
              });
            }
            this.arrObj = arrObj;
            this.addPie(arrObj);
          }
        });
    },

    addPie(arrObj) {
      let pieOne = echarts.init(
        document.getElementById(`chart${this.option.domId}`)
      );

      var colorList = [
        "#37a2da",
        "#32c5e9",
        "#9fe6b8",
        "#ffdb5c",
        "#ff9f7f",
        "#fb7293",
        "#e7bcf3",
        "#8378ea",
        "#00ecab",
        "#ab3bdf",
        "#f28510",
        "#d0e129",
        "#106bfb",
        "#ad3adf",
        "#00e9ae",
        "#f39f19",
        "#2c97fd",
        "#a8b72f",
        "#0039bc",
        "#00f1ff",
        "#ff0d00",
        "#4e5336",
        "#0e5456",
      ];
      var option = {
        title: {
          top: "56%",
          left: "3%",
          textStyle: {
            color: "#fff",
          },
        },
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c}人 ({d}%)",
        },
        legend: {
          // orient: "vertical",
          type: "scroll",
          itemWidth: 16,
          itemHeight: 10,
          top: "22%",
          left: "47%",
          orient: "vertical",
          textStyle: {
            color: "#fff",
          },
          height:130,
          data: arrObj.value,
          formatter: function (name) {
            let className = "upRate";
            let rateIcon = "▲";
            if (arrObj && arrObj.length) {
              for (var i = 0; i < arrObj.length; i++) {
                if (name === arrObj[i].name) {
                  if (arrObj[i].rate < 0) {
                    className = "downRate";
                    rateIcon = "▼";
                  }
                  return name + arrObj[i].value + "人";
                }
              }
            }
          },
        },
        series: [
          {
            type: "pie",
            // roseType: "radius",
            center: ["25%", "50%", "40%", "0%"],
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
        if (this.params.timeType == 1) {
          this.params.trendTypeName = "现场" + param.data.name + "人员信息";
        } else {
          this.params.trendTypeName = "今日" + param.data.name + "人员信息";
        }
        this.params.workType = param.data.type;
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
/* .el-button:focus,
.el-button:hover {
  color: #fff;
  background-color: #1b90fe;
} */
.bgc {
  color: #fff;
  background-color: #1b90fe;
}
#beij {
  height: 180px;
  width: 150px;
  margin-left: 60%;
  overflow: hidden;
  overflow-y: scroll;
  white-space: nowrap;
}
li {
  text-align: left;
  list-style-type: none;
}
</style>
