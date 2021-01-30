<template>
  <div class="cus-body">
    <div class="cus-header">
      <span class="cus-title">
        <span>{{ option.title }}</span>
      </span>
    </div>
    <el-button
      type="primary"
      style="margin-left: 80%; margin-top: 3%; position: absolute; z-index: 99"
      @click="openMore"
      >查看详情</el-button
    >
    <div class="layout">
      <div class="row">
        <div class="item">
          <img src="../../../../public/img/bg/zaixian.png" />
          
          <div class="name">
            当前在线
            <p class="p1">{{ onLineNumber }}</p>
          </div>
        </div>
        <div class="item">
          <img src="../../../../public/img/bg/shebei.png" />
          <div class="name">
             设备数量  
            <p class="p1">{{ equipmentNumber }}</p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="item">
          <img
            style="padding-left: 18%"
            src="../../../../public/img/bg/weizhang.png"
          />
          <div class="name">
            今日违章次数
            <p class="p2">{{ violationNumber }}</p>
          </div>
        </div>
        <div class="item">
          <img src="../../../../public/img/bg/lixian.png" />
          <div class="name">
            当前离线
            <p class="p2">{{ offLineNumber }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="piebody">
      <div class="jl-chart" :id="`chart${option.domId}`"></div>
    </div>
    <more-data
      :dialogFlag.sync="dialogFlag"
      :devList="devList"
      :devSn="params.serialNumber"
    />
  </div>
</template>
<script>
import MoreData from "./more";
import { visUrl, getUrlParames } from "@/api/httpClient.js";
import axios from "axios";
export default {
  name: "happening",
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
      devList: [],
      equipmentNumber: null,
      onLineNumber: null,
      violationNumber: null,
      offLineNumber: null,
      params: {
        projectId: null,
        companyId: null,
        serialNumber: "",
      },
      chartDom: Date.parse(new Date()),
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
    this.towerCraneWorkingConditions();
    this.serialNumberList();
  },
  methods: {
    openMore() {
      this.dialogFlag = true;
    },
    serialNumberList() {
      let url = `/prod-api/wisdomScreen/towerCrane/wsTowerCrane/queryDeviceList`;
      axios
        .get(url, {
          params: this.params,
        })
        .then((res) => {
          if (res.data.code === 200) {
            let rows = res.data.rows;
            for (var i = 0; i < rows.length; i++) {
              this.devList.push({
                value: rows[i].equipmentNo,
              });
              this.params.serialNumber = rows[0].equipmentNo;
            }
          }
        });
    },
    towerCraneWorkingConditions() {
      let url = `/prod-api/wisdomScreen/towerCrane/wsTowerCrane/towerCraneWorkingConditions`;
      axios
        .get(url, {
          params: this.params,
        })
        .then((res) => {
          if (res.data.code === 200) {
            let row = res.data.data;
            this.equipmentNumber = row.equipmentNumber;
            this.onLineNumber = row.onLineNumber;
            this.violationNumber = row.violationNumber;
            this.offLineNumber = row.offLineNumber;
          }
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.layout {
  margin-top: 5%;
  width: 100%;
  height: 91%;
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
        width: 33%;
      }
      .name {
        color: #fff;
        margin-left: 16px;
        font-size: 17px;
        // padding-left: 7%;
      }
    }
    .p1 {
      color: #2fced6;
      font-size: 20px;
      font-weight: 800;
    }
    .p2 {
      color: #e35256;
      font-size: 20px;
      font-weight: 800;
    }
  }
}
</style>