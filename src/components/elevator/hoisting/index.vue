<template>
  <div class="cus-body">
    <div class="cus-header">
      <span class="cus-title">
        <span>{{ option.title }}</span>
      </span>
      <div>
         <el-row>
        <el-button
          @click="conditionDaysType(1)"
          :class="{ bgc: index == 1 }"
          style="
            margin-left: 65%;
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
          "
          >近7日</el-button
        >
        <el-button
          @click="conditionDaysType(2)"
          :class="{ bgc: index == 2 }"
          style="
            border-top-right-radius: 10px;
            border-bottom-right-radius: 10px;
          "
          >近30日</el-button
        >
      </el-row>
      </div>
    </div>

    <div class="layout">
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
      <el-row style="margin-top:10px;padding-left: 3px;padding-right: 8px;">
      <el-col :span="8" 
        ><div class="grid-content bg-purple" style="text-align: center">
           {{ arrObj[2] && arrObj[2].driver }}
          <p>{{ arrObj[2] && arrObj[2].functionNum }}</p>
        </div></el-col
        >
      <el-col :span="8"
        ><div class="grid-content bg-purple" style="text-align: center">
          {{ arrObj[1] && arrObj[1].driver }}
          <p>{{ arrObj[1] && arrObj[1].functionNum }}</p>
        </div></el-col>
      <el-col :span="8"
        ><div class="grid-content bg-purple" style="text-align: center">
           {{ arrObj[0] && arrObj[0].driver }}
          <p>{{ arrObj[0] && arrObj[0].functionNum }}</p>
        </div></el-col>
    </el-row>
    </div> 
  </div>
</template>
<script>
import { visUrl, getUrlParames } from "@/api/httpClient.js";
import axios from "axios";
export default {
  name: "hoisting",
  props: {
    option: Object,
    component: Object,
  },
  data() {
    return {
      index:1,
      params: {
        projectId: null,
        companyId: null,
        conditionDays: 1,
      },
      driver: null,
      functionNum: null,
      chartDom: Date.parse(new Date()),
      arrObj:[],
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
    this.sportsRankings();
  },
  methods: {
    conditionDaysType(type) {
      this.params.conditionDays = type;
      this.index=type;
     
      this.sportsRankings();
    },
    sportsRankings() {
      let url = `/prod-api/wisdomScreen/elevator/wsElevator/sportsRankings`;
      axios
        .get(url, {
          params: this.params,
        })
        .then((res) => {
          if (res.data.code === 200) {
            this.arrObj = [];
            let rows = res.data.rows;
            console.log(rows,'zzzzzzzzzc')
            let numOne = {}
            let numTwo = {}
            let numThree = {}
            let min = rows[0].functionNum
            let max = rows[0].functionNum
          rows.map(item=>{
            if(item.functionNum<=min){
              min = item.functionNum
              numThree = item
            }else{
              max = item.functionNum
              numOne = item
            }
          })
          numTwo = rows.find(item=>item.functionNum!==numOne.functionNum && item.functionNum!==numThree.functionNum)
           this.arrObj=[numOne,numTwo,numThree]
           console.log(this.arrObj,'xxxxx')
          }
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.layout {
 padding-top: 54px;
  width: 100%;
 
  display: flex;
  flex-direction: column;
  .row {
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
// .layout .row .item img[data-v-15e3f183] {
//     width: 84px;
//     height: 101px;
// }

</style>