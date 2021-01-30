<template>
  <div class="cus-body">
    <div class="cus-header">
      <span class="cus-title">
        <span>{{ option.title }}</span>
      </span>
    </div>

    <div class="layout">
      <el-row>
        <el-button
          type="primary"
          style="
            margin-left: 65%;
            margin-top: 21%;
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
          "
          :class="{bgc:index==1}"
          @click="timeConditionsType(1)"
          >近7日</el-button
        >
        <el-button
          type="primary"
          style="
            border-top-right-radius: 10px;
            border-bottom-right-radius: 10px;
          "
          :class="{bgc:index==2}"
          @click="timeConditionsType(2)"
          >近30日</el-button
        >
      </el-row>
      <div class="row">
        <div class="item">
          <img src="../../../../public/img/bg/2.png" />
        </div>
        <div class="item">
          <img src="../../../../public/img/bg/1.png" />
        </div>
        <div class="item">
          <img src="../../../../public/img/bg/3.png" />
        </div>
      </div>
    </div>
    <el-row style="margin-top: -3%;padding-left: 5px;">
      <el-col :span="8"
        ><div class="grid-content bg-purple" style="text-align: center">
          {{ arrObj[1] && arrObj[1].driverName }}
          <p>{{ arrObj[1] && arrObj[1].hoistingFrequency }}</p>
        </div></el-col
      >
      <el-col :span="8"
        ><div class="grid-content bg-purple" style="text-align: center">
          {{ arrObj[2] && arrObj[2].driverName }}
          <p>{{ arrObj[2] && arrObj[2].hoistingFrequency }}</p>
        </div></el-col
      >
      <el-col :span="8"
        ><div class="grid-content bg-purple" style="text-align: center">
          {{ arrObj[0] && arrObj[0].driverName }}
          <p>{{ arrObj[0] && arrObj[0].hoistingFrequency }}</p>
        </div></el-col
      >
    </el-row>
    <div class="piebody">
      <div class="jl-chart" :id="`chart${option.domId}`"></div>
    </div>
  </div>
</template>
<script>
import { visUrl, getUrlParames } from "@/api/httpClient.js";
import axios from "axios";
export default {
  name: "leaderboard",
  props: {
    option: Object,
    component: Object,
  },
  data() {
    return {
      params: {
        projectId: null,
        companyId: null,
        timeConditions: 1,
      },
      driverName: null,
      hoistingFrequency: null,
      chartDom: Date.parse(new Date()),
      arrObj: [],
      index:1,
    };
  },
  created() {
    if (this.option.domId === null) {
      this.option.domId = this.chartDom;
    }
    if (getUrlParames("userType") == 1) {
      //项目级
      this.params.projectId = getUrlParames("userId");
    } else {
      //企业级
      this.params.companyId = getUrlParames("userId");
    }
    axios.defaults.headers.common["Authorization"] = getUrlParames("token");
  },
  mounted() {
    this.hoistingRanking();
  },
  methods: {
    timeConditionsType(type) {
      this.index=type;
      this.params.timeConditions = type;
      //点击出现弹框，先不管
      this.hoistingRanking();
    },
    hoistingRanking() {
      //接口调用
      let url = `/prod-api/wisdomScreen/towerCrane/wsTowerCrane/hoistingRanking`;
      axios
        .get(url, {
          params: this.params,
        })
        .then((res) => {
          if (res.data.code === 200) {
            this.arrObj = [];
            let rows = res.data.rows;
           
            rows = rows.sort((a,b)=>{
              return a.hoistingFrequency - b.hoistingFrequency;
            })
           this.arrObj=rows;
          }
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.layout {
  margin-top: -14%;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .row {
    flex: 1;
    display: flex;
    .item {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      img {
        width: 65%;
      }
    }
  }
}
.el-button--primary {
  color: #a6a9b6;
}
.row {
  margin: 0px;
  padding: 0px;
}
.bg-purple {
  background: #d3dce600;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  font-size: 18px;
  padding-top: -40%;
  font-weight: 600;
  color: white;
}
.bgc {
  color: #fff;
  background-color: #1b90fe;
}
</style>