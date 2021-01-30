<template>
  <div class="cus-body">
    <div class="cus-header">
      <span class="cus-title">
        <span>{{ option.title }}</span>
      </span>
    </div>
    <el-button
      type="primary"
      style="margin-left: 80%; margin-top: 2%"
      @click="openMore"
      >查看详情</el-button
    >
    <div style="display: flex" class="yang">
      <div>今日累计运行次数</div>
      <p>{{ cumulativeFunctionNum }}</p>
    </div>
    <div class="layout">
      <div class="row">
        <div class="item">
          <img src="../../../../public/img/bg/zaixian.png" />
         
          <div class="name">
             当前在线
            <p class="p1">{{ currentlyOnline }}</p>
          </div>
        </div>
        <div class="item">
           <img src="../../../../public/img/bg/shebei.png" />
          <div class="name">
             设备数量
            <p class="p1">{{ equipmentNumber }}</p>
          </div>
        </div>
      </div>
      <div class="row" style="margin-top: -22%">
        <div class="item">
          <img
            style="padding-left: 18%"
            src="../../../../public/img/bg/weizhang.png"
          />
          <div class="name">
            今日违章次数
            <p class="p2">{{ giveViolationNumber }}</p>
          </div>
        </div>
        <div class="item">
          <img
            style="padding-top: -10px"
            src="../../../../public/img/bg/lixian.png"
          />
          <div class="name">
            当前离线
            <p class="p2">{{ currentlyOffline }}</p>
          </div>
        </div>
      </div>
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
  name: "construction",
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
      params: {
        projectId: null,
        companyId: null,
        serialNumber: "",
      },
      cumulativeFunctionNum: null,
      equipmentNumber: null,
      currentlyOnline: null,
      giveViolationNumber: null,
      currentlyOffline: null,
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
    this.elevatorDTOWorkingConditions();
    this.serialNumberList();
  },
  methods: {
    openMore() {
      this.dialogFlag = true;
    },
    serialNumberList() {
      let url = `/prod-api/wisdomScreen/elevator/wsElevator/queryDeviceList`;
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
    elevatorDTOWorkingConditions() {
      let url = `/prod-api/wisdomScreen/elevator/wsElevator/elevatorDTOWorkingConditions`;
      axios
        .get(url, {
          params: this.params,
        })
        .then((res) => {
          let arrObj = [];
          if (res.data.code === 200) {
            let row = res.data.data;
            this.cumulativeFunctionNum = row.cumulativeFunctionNum;
            this.equipmentNumber = row.equipmentNumber;
            this.currentlyOnline = row.currentlyOnline;
            this.giveViolationNumber = row.giveViolationNumber;
            this.currentlyOffline = row.currentlyOffline;
          }
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.layout .row .item .name[data-v-7d718a24] {
  margin-left: 16px;
}
.yang {
  padding-left: 11%;
}
.yang div {
  font-size: 22px;
  font-weight: bold;
  color: #00a8ff;
  margin-right: 10px;
}
.yang p {
  color: #fff;
  font-weight: bold;
  font-size: 20px;
  text-align: center;
  line-height: 35px;
  width: 85px;
  height: 35px;
  border: 2px solid #03c3fd;
  border-radius: 5px;
  // box-shadow: 0px 10px 5px #03c3fd;
  box-shadow: 0 2px 16px #03c3fd, 0 0 1px #03c3fd, 0 0 1px #03c3fd;
}
.layout {
  margin-top: -8%;
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
        width: 33%;
      }
      .name {
        color: #fff;
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
.layout .row .item img[data-v-42b46f16] {
    width: 30%;
}
.layout .row .item .name[data-v-42b46f16] {
    margin-left: 16px;
}
</style>