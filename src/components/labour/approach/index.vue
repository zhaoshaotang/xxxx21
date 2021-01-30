<template>
  <div class="cus-body">
    <div class="cus-header">
      <span class="cus-title">
        <span>{{ option.title }}</span>
      </span>
      <div class="admin">
        <el-row class="adm rowup"  v-for="(item, index) in items" :key="index">
          <el-col :span="4" style="margin-left: 2%" >
            <div v-if="index === 0" class="bg-purple">头像</div>
            <ul>
              <li>
                <div class="middle1">
                  <img :src="item.headPortrait" width="44px" height="44px" />
                </div>
              </li>
            </ul>
          </el-col>
          <el-col :span="4">
            <div v-if="index === 0" class="bg-purple">姓名</div>
            <ul>
              <li>
                <div class="sds">{{ item.personnelName }}</div>
              </li>
            </ul>
          </el-col>
          <el-col :span="4">
            <div v-if="index === 0" class="bg-purple">方向</div>
            <ul>
              <li>
                <div class="sds">{{ item.personnelDirection }}</div>
              </li>
            </ul>
          </el-col>
          <el-col :span="4">
            <div v-if="index === 0" class="bg-purple">时间</div>
            <ul>
              <li>
                <div class="sds">{{ item.personnelTime }}</div>
              </li>
            </ul>
          </el-col>
          <el-col :span="7">
            <div v-if="index === 0" class="bg-purple">班组</div>
            <ul>
              <li>
                <div class="sds">{{ item.personnelTeam }}</div>
              </li>
            </ul>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="piebody">
      <div class="jl-chart" :id="`chart${option.domId}`"></div>
    </div>
  </div>
</template>
<script>
import { visUrl, getUrlParames } from "@/api/httpClient.js";
import { getLists } from "@/api/laborpage";
import axios from "axios";
export default {
  name: "approach",
  props: {
    option: Object,
    component: Object,
  },
  data() {
    return {
      items: null,
      params: {
        projectId: null,
        companyId: null,
      },
      chartDom: Date.parse(new Date()),
    };
  },
  created() {
    if(getUrlParames("userType") == 1){ //项目级
      this.params.projectId = getUrlParames("userId");
    }else{//企业级
      this.params.companyId = getUrlParames("userId");
    }
    axios.defaults.headers.common["Authorization"] = getUrlParames("token");
    //在这里获取数据
    // setInterval(function () {
    // }, 1000);
  },
  mounted() {
    this.personnelEntranceAndExit();

    setInterval(() => {
      this.personnelEntranceAndExit();
    }, 60000);
  },
  methods: {
    personnelEntranceAndExit() {
      let url = `/prod-api/wisdomScreen/labour/wsLabour/personnelEntranceAndExit`;
      axios
        .get(url, {
          params: this.params,
        })
        .then((res) => {
          if (res.data.code === 200) {
            let rows = res.data.rows;
            let resdata = [];
            for (var i = 0; i < rows.length; i++) {
              resdata.push(rows[i]);
            }
            this.items = resdata;
          }
        });
    },
  },
};
</script>
<style lang="scss" scoped>
@-webkit-keyframes rowup {
            0% {
                -webkit-transform: translate3d(0, 0, 0);
                transform: translate3d(0, 0, 0);
            }
            100% {
                -webkit-transform: translate3d(0, -4007px, 0);
                transform: translate3d(0, -4007px, 0);
            }
        }
        @keyframes rowup {
            0% {
                -webkit-transform: translate3d(0, 0, 0);
                transform: translate3d(0, 0, 0);
            }
            100% {
                -webkit-transform: translate3d(0, -4007px, 0);
                transform: translate3d(0, -4007px, 0);
            }
        }
.rowup{
  animation: 60s rowup linear infinite normal;
  position: relative;

}
.admin {
  overflow-y: auto;
  height: 230px;
}
div::-webkit-scrollbar {
  background-color: #194894;
  position: absolute;
  padding-left: 3%;
}
div::-webkit-scrollbar-thumb {
  background-color: #1b90fe;
}
.adm {
  width: 90%;
  /* height: 250px; */
  overflow-x: hidden;
  line-height: 30px;
}

.el-row {
  margin-top: 2%;
  margin-left: 5%;
}
.bg-purple {
  background: #dedede00;
}
.el-col {
  color: #01d1f3;
  font-size: 15px;
}
li {
  list-style-type: none;
  text-align:center
}
ul {
  margin-top: 1%;
  margin-left: -2%;
}
.sds {
  padding-top: 15px;
}
</style>