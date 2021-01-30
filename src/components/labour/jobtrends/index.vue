<template>
  <!-- 从styles中的commponents中调用css样式 -->
  <div class="cus-body">
    <div class="cus-header">
      <div id="lwgl">
        <el-row :gutter="15">
          <el-col :span="3">
            <div
              @click="peopleNumber(1)"
              class="grid-content bg-purple"
              style="color: #08c7f1; font-size: 29px"
            >
              {{ sceneNumber }}
              <p>现场(人)</p>
            </div>
          </el-col>
          <el-col :span="3">
            <div
              @click="peopleNumber(2)"
              class="grid-content bg-purple"
              style="color: #08c7f1; font-size: 29px"
            >
              {{ attendanceTodayNumber }}
              <p>今日出勤(人)</p>
            </div>
          </el-col>
          <el-col :span="3">
            <div
              class="grid-content bg-purple"
              style="color: #08c7f1; font-size: 29px"
            >
              {{ attendanceTodayRate }}%
              <p>今日出勤率</p>
            </div>
          </el-col>
          <el-col :span="3">
            <div
              @click="peopleNumber(3)"
              class="grid-content bg-purple"
              style="color: #919125; font-size: 29px"
            >
              {{ onTheJobNumber }}
              <p>在岗(人)</p>
            </div>
          </el-col>
          <el-col :span="3">
            <div
              @click="peopleNumber(4)"
              class="grid-content bg-purple"
              style="color: #919125; font-size: 29px"
            >
              {{ registeredNumber }}
              <p>在册(人)</p>
            </div>
          </el-col>
          <el-col :span="3">
            <div
              class="grid-content bg-purple"
              style="color: #0bffb1; font-size: 29px"
            >
              {{ subpackageNumber }}
              <p>今日出勤分包数</p>
            </div>
          </el-col>
          <el-col :span="3">
            <div
              class="grid-content bg-purple"
              style="color: #0bffb1; font-size: 29px"
            >
              {{ teamNumber }}
              <p>今日出勤班组数</p>
            </div>
          </el-col>
          <el-col :span="3">
            <div
              class="grid-content bg-purple"
              style="color: #0bffb1; font-size: 29px"
            >
              {{ workTypeNumber }}
              <p>今日出勤工种数</p>
            </div>
          </el-col>
        </el-row>
      </div>
      <span class="cus-title" v-if="option.titleShow">
        <span>{{ option.title }}</span>
      </span>
    </div>
    <div class="piebody">
      <!-- 根据id绑定图形 -->
      <div class="jl-chart" :id="`chart${option.domId}`"></div>
    </div>
    <more-data
      :dialogFlag.sync="dialogFlag"
      :trendType="params.trendType"
      :projectId="params.projectId-0"
      :companyId="params.companyId"
      :trendTypeName="params.trendTypeName"
      :trendTimeSlot="params.trendTimeSlot"
    />
  </div>
</template>
<script>
import MoreData from './more'
import ECharts from "vue-echarts";
import { visUrl, getUrlParames } from "@/api/httpClient.js";
import { getjobtrends, getjobtrends1 } from "@/api/laborpage";
import axios from "axios";
export default {
  name: "jobtrends",
  components: {
    ECharts,
    MoreData
  },
  props: {
    option: Object,
    component: Object,
  },
  data() {
    return {
      dialogFlag: false,
      chartDom: Date.parse(new Date()),
      sceneNumber: null,
      attendanceTodayNumber: null,
      attendanceTodayRate: null,
      onTheJobNumber: null,
      registeredNumber: null,
      subpackageNumber: null,
      teamNumber: null,
      workTypeNumber: null,
      timeQuantum:[],
      constructionWorkerNumber:[],
      params:{
        projectId: null,
        companyId: null,
        trendType:null,
        trendTypeName:"",
        trendTimeSlot:"",
      },
      
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
    this.personnelList();
  },
  mounted() {
    this.personnelProfile();
    setInterval(() => {
        this.personnelList();
    }, 30000);
  },
  methods: {
    personnelProfile() {
      let url = `/prod-api/wisdomScreen/labour/wsLabour/personnelProfile`;
      axios
        .get(url, {
          params: this.params,
        })
        .then((res) => {
          console.log(res.data.code === 200);
          if (res.data.code === 200) {
            let row = res.data.data;
            this.sceneNumber = row.sceneNumber;
            this.attendanceTodayNumber = row.attendanceTodayNumber;
            this.attendanceTodayRate = row.attendanceTodayRate;
            this.onTheJobNumber = row.onTheJobNumber;
            this.registeredNumber = row.registeredNumber;
            this.subpackageNumber = row.subpackageNumber;
            this.teamNumber = row.teamNumber;
            this.workTypeNumber = row.workTypeNumber;
          }
        });
        this.personnelList();
    },
    personnelList() {
      
      let url = `/prod-api/wisdomScreen/labour/wsLabour/scenePersonnelChangeTrend`;
      axios
        .get(url, {
          params: this.params,
        })
        .then((res) => {
          if (res.data.code === 200) {
            let rows = res.data.rows;
            this.timeQuantum=[];
            this.constructionWorkerNumber=[];
            for (var i = 0; i < rows.length; i++) {
              this.timeQuantum.push(rows[i].timeQuantum);
              this.constructionWorkerNumber.push(rows[i].constructionWorkerNumber);
            }
            this.addPie(this.timeQuantum, this.constructionWorkerNumber);
          }
        });
    },
    //type为查询数据类型
    peopleNumber(type) {
      //点击出现弹框，先不管
      this.params.trendType = type;
      if(type == 1){
        this.params.trendTypeName = "现场人员信息";
      }else if(type == 2){
        this.params.trendTypeName = "今日出勤人员信息";
      }else if(type == 3){
        this.params.trendTypeName = "项目在岗人员信息";
      }else if(type == 4){
        this.params.trendTypeName = "项目在册人员信息";
      }
      this.dialogFlag = true;
    },
    addPie(timeQuantum, constructionWorkerNumber) {
      let pieOne = echarts.init(
        document.getElementById(`chart${this.option.domId}`)
      );
      var option = {
        title: {
          text: "今日作业人员趋势",
          textStyle: {
            fontSize: 14,
            fontWeight: "normal",
            color: "#fff",
          },
          left: "5%",
          top: "22%",
        },

        tooltip: {},
        grid: {
          top: "30%",
          left: "1%",
          right: "1%",
          bottom: "2%",
          containLabel: true,
        },
        legend: {
          itemGap: 50,
          data: ["人员出入总数"],
          textStyle: {
            color: "#f9f9f9",
            borderColor: "#fff",
          },
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: true,
            axisLine: {
              //坐标轴轴线相关设置。数学上的x轴
              show: true,
              lineStyle: {
                color: "#f9f9f9",
              },
            },
            axisLabel: {
              //坐标轴刻度标签的相关设置
              textStyle: {
                color: "#d1e6eb",
                margin: 15,
              },
            },
            axisTick: {
              show: false,
            },
            data: timeQuantum, //时间
          },
        ],
        yAxis: [
          {
            type: "value",
            min: 0,
            // max: 140,
            splitNumber: 7,
            splitLine: {
              show: true,
              lineStyle: {
                color: "#0a3256",
              },
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              margin: 20,
              textStyle: {
                color: "#d1e6eb",
              },
            },
            axisTick: {
              show: false,
            },
            
          },
        ],
        series: [
          {
            name: "实时人数",
            type: "line",
            smooth: true, //是否平滑曲线显示
            //symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
            showAllSymbol: true,
            symbol: "emptyCircle",
            symbolSize: 6,
            lineStyle: {
              normal: {
                color: "#28ffb3", // 线条颜色
              },
              borderColor: "#f0f",
            },
            label: {
              show: true,
              position: "top",
              textStyle: {
                color: "#fff",
              },
            },
            itemStyle: {
              normal: {
                color: "#28ffb3",
              },
            },
            tooltip: {
              // show: false,
            },
            areaStyle: {
              //区域填充样式
              normal: {
                //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(0,154,120,1)",
                    },
                    {
                      offset: 1,
                      color: "rgba(0,0,0, 0)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(53,142,215, 0.9)", //阴影颜色
                shadowBlur: 20, //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
              },
            },
            data: constructionWorkerNumber, //对应时间的对应数据
          },
        ],
      };
      pieOne.setOption(option);
      let chartDom = document.getElementsByTagName("avue-draggable");
      chartDom.onresize = function () {
        pieOne.resize();
      };
      //点击事件；5为查询数据类型
      pieOne.on("click",  (param) => {
        this.params.trendTypeName = "实时人员信息";
        this.params.trendTimeSlot = param.name.slice(0,3).concat("59");
        this.params.trendType = 5;
		    this.dialogFlag = true;
      });
    },
  },
};
</script>
<style >
.el-row {
  margin-top: 4%;
  padding-left: 20px;
  padding-right: 20px;
  z-index: 1;
}
.el-col {
  border-radius: 4px;
  font-size: 29px;
  z-index: 3;
}
.bg-purple-dark {
  background: #0f345e;
}
.bg-purple {
  background: #0f345e;
}
.bg-purple-light {
  background: #0f345e;
}
.grid-content {
  border-radius: 4px;
  min-height: 70px;
}
.row-bg {
  padding: 10px 0;
  background-color: #0f345e;
}
p {
  font-size: 16px;
}
#lwgl{
  margin-top: 48px;
}
</style>