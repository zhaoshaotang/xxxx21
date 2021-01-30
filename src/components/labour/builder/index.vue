<template>
  <div class="cus-body">
    <div class="cus-header">
      <span class="cus-title">
        <span>{{ option.title }}</span>
      </span>
      <div id="builder">
        <el-row style="margin-top: 18px">
          <el-button
            @click="analysisTypeQuery(1)"
            :class="{ bgc: index == 1 }"
            style="border-top-left-radius: 15%; border-bottom-left-radius: 15%"
            >地区</el-button
          >
          <el-button @click="analysisTypeQuery(2)" :class="{ bgc: index == 2 }"
            >年龄</el-button
          >
          <el-button @click="analysisTypeQuery(3)" :class="{ bgc: index == 3 }"
            >性别</el-button
          >
          <el-button
            @click="analysisTypeQuery(4)"
            :class="{ bgc: index == 4 }"
            style="
              border-top-right-radius: 15%;
              border-bottom-right-radius: 15%;
            "
            >民族</el-button
          >
        </el-row>
      </div>
      <!-- <ul class="uul">
        <li class="lli" v-for="arrObj in arrObj" :key="arrObj.value">{{ arrObj.value }}</li>
      </ul> -->
    </div>
    <div class="piebody">
      <div class="jl-chart" :id="`chart${option.domId}`"></div>
    </div>
    <more-data
      :dialogFlag.sync="dialogFlag"
      :projectId="params.projectId-0"
      :companyId="params.companyId"
      :analysisType="params.analysisType"
      :regionName="params.regionName"
      :ageGroup="params.ageGroup"
      :genderType="params.genderType"
      :nationCode="params.nationCode"
      :trendTypeName="params.trendTypeName"
    />
  </div>
</template>
<script>
import MoreData from "./more";
import ECharts from "vue-echarts";
import { getbuilder } from "@/api/laborpage";
import { visUrl, getUrlParames } from "@/api/httpClient.js";
import axios from "axios";
export default {
  name: "builder",
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
      // arrObj:value,
      params: {
        projectId: null,
        companyId: null,
        analysisType: 1,
        regionName: "",
        ageGroup: null,
        genderType: null,
        nationCode: null,
        trendTypeName: "",
      },
      chartDom: Date.parse(new Date()),
    };
  },
  created() {
    if (getUrlParames("userType") == 1) {
      //项目级
      this.params.projectId = getUrlParames("userId")-0;
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
    this.constructionWorker();
  },
  methods: {
    analysisTypeQuery(type) {
      this.params.analysisType = type;
      this.index = type;
      this.constructionWorker();
    },
    constructionWorker() {
      let url = `/prod-api/wisdomScreen/labour/wsLabour/constructionWorker`;
      axios
        .get(url, {
          params: this.params,
        })
        .then((res) => {
          let arrObj = [];
          let typeName = [];
          let title = null;
          if (res.data.code === 200) {
            let rows = res.data.rows;
            for (var i = 0; i < rows.length; i++) {
              if (this.params.analysisType == 1) {
                arrObj.push({
                  name: rows[i].regionName,
                  value: rows[i].regionNumber,
                  regionName: rows[i].regionName,
                });
                typeName.push(rows[i].regionName);
              }
              if (this.params.analysisType == 2) {
                arrObj.push({
                  name: rows[i].ageGroupName,
                  value: rows[i].ageGroupNumber,
                  ageGroup: rows[i].ageGroup,
                });
                typeName.push(rows[i].ageGroupName);
              }
              if (this.params.analysisType == 3) {
                arrObj.push({
                  name: rows[i].genderTypeName,
                  value: rows[i].genderNumber,
                  genderType: rows[i].genderType,
                });
                typeName.push(rows[i].genderTypeName);
              }
              if (this.params.analysisType == 4) {
                arrObj.push({
                  name: rows[i].nationName,
                  value: rows[i].nationNumber,
                  nationCode: rows[i].nationCode,
                });
                typeName.push(rows[i].nationName);
              }
            }
            if (this.params.analysisType == 1) {
              title = "地区";
            }
            if (this.params.analysisType == 2) {
              title = "年龄";
            }
            if (this.params.analysisType == 3) {
              title = "性别";
            }
            if (this.params.analysisType == 4) {
              title = "民族";
            }
            this.addPie(arrObj, typeName, title);
          }
        });
    },
    addPie(arrObj, typeName, title) {
      let pieOne = echarts.init(
        document.getElementById(`chart${this.option.domId}`)
      );
      var colorList = [
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
          text: title,
          top: "58%",
          left: "26%",
          padding: [10, 30, 0, 0],
          textStyle: {
            color: "#fff",
          },
        },
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c}人 ({d}%)",
        },
        legend: {
          formatter: function (name) {
            let className = "upRate";
            let rateIcon = "▲";
            if (arrObj && arrObj.length) {
              for (var i = 0; i < arrObj.length; i++) {
                if (name === arrObj[i].name) {
                  if (arrObj[i].rate < 0) {
                    className = "downRate";
                    // rateIcon = '▼'
                  }
                  return name + " " + arrObj[i].value + "人";
                }
              }
            }
          },
          type: "scroll",
          orient: "vertical",
          itemWidth: 16,
          itemHeight: 10,
          height:125,
          top: "30%",
          left: "60%",
          right: "20%",
          bottom: "20%",
          textStyle: {
            color: "#fff",
          },
        },
        series: [
          {
            type: "pie",
            center: ["30%", "60%", "100%", "100%"],
            radius: ["45%", "55%"],
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
      //点击事件；
      pieOne.off("click");
      pieOne.on("click", (param) => {
        if (this.params.analysisType == 1) {
          this.params.trendTypeName = param.data.name + "在岗人员信息";
          this.params.regionName = param.data.regionName;
        } else if (this.params.analysisType == 2) {
          this.params.trendTypeName = param.data.name + "在岗人员信息";
          this.params.ageGroup = param.data.ageGroup;
        } else if (this.params.analysisType == 3) {
          this.params.trendTypeName = param.data.name + "在岗人员信息";
          this.params.genderType = param.data.genderType;
        } else if (this.params.analysisType == 4) {
          this.params.trendTypeName = param.data.name + "在岗人员信息";
          this.params.nationCode = param.data.nationCode;
        }
        this.dialogFlag = true;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
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
.lli {
  list-style: none;
  padding-top: 6%;
}
.uul {
  margin-top: 13%;
  margin-left: 75%;
}
</style>