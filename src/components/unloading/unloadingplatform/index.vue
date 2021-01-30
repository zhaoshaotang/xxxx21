<template>
  <div class="cus-body">
    <div class="cus-header">
      <span class="cus-title">
        <span>{{ option.title }}</span>
      </span>
    </div>
    <div id="Effect">
      <div class="table-wrap">
        <el-table
          ref="devTable"
          :data="items"
          :show-header="true"
          @row-click="selDevice"
          stripe
          :highlight-current-row="true"
          size="medium"
          height="100%"
          style="width: 100%"
        >
          <el-table-column
            label="楼号（设备编号））"
            prop="name"
            align="center"
          >
            <template slot-scope="scope">
              <el-row class="sn"><el-col :span="8" style="font-size: 15px;text-align:right;">{{ scope.row.installationPosition }}：</el-col> <el-col :span="12" style="font-size: 15px;">{{ scope.row.name }}</el-col></el-row>
            </template>
          </el-table-column>
          <el-table-column label="工作状态" prop="value" align="center" width="120px;">
            <template slot-scope="scope">
              <el-row class="dev-off" v-if="scope.row.value === '离线'"
                >● 离线</el-row
              >
              <el-row class="dev-on" v-else>● 在线</el-row>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="position: absolute; left: 183px; bottom: 62px">
        <button
          type="button"
          style="
            width: 103px;
            height: 36px;
            background: #0e2e9d;
            border-radius: 18px;
            border: none;
            font-size: 14px;
            color: #ffffff;
          "
          @click="openMore"
        >
          历史数据
        </button>
      </div>
    </div>
    <div class="baojing">
      <img :src="weightAlarm == 0 ? require('./normal.png') : weightAlarm == 1 ? require('./baojing.png') : require('./Alarm.png')" alt="" />
      <p style="color: #fff">
        {{ weightAlarm | weightAlarmType }}
      </p>
    </div>
    <div style="position: relative">
      <div style="position: absolute; top: 122px; left: 550px">
        <p
          style="
            font-size: 22px;
            font-family: MicrosoftYaHei;
            font-weight: bold;
            color: #00deff;
            line-height: 38px;
          "
        >
          NO1载重
        </p>
        <p style="color: #fff; padding-left: 4px">
          {{ weight == null ? "" : weight + "KG" }}
        </p>
      </div>
      <img
        style="margin-left: 37%; margin-top: 7%"
        src="./zaizhong.png"
        alt=""
      />
    </div>
    <div>
      <div style="position: absolute; top: 274px; left: 550px; color: #fff">
        <p
          style="
            font-size: 22px;
            font-family: MicrosoftYaHei;
            font-weight: bold;
            color: #00deff;
            line-height: 38px;
          "
        >
          No1 电压
        </p>
        <p>{{ this.voltage }}V</p>
      </div>
      <img
        style="margin-left: 37%; margin-top: 42px"
        src="./zaizhong.png"
        alt=""
      />
    </div>
    <div class="sd">
      <img
        style="padding-left: 40%; padding-top: 4%"
        src="./picxieliao.png"
        alt=""
      />
    </div>
    <more-data
      :dialogFlag.sync="dialogFlag"
      :devList="items"
      :devSn="params.equipmentNo"
    />
  </div>
</template>
<script>
import MoreData from "./more";
import { visUrl, getUrlParames } from "@/api/httpClient.js";
import { mapGetters, mapActions } from "vuex";
import axios from "axios";

export default {
  name: "unloadingplatform",
  components: {
    MoreData,
  },
  filters: {
    weightAlarmType: function (value) {
      return value == 0
        ? "正常"
        : value == 1
        ? "预警"
        : value == 2
        ? "报警"
        : "未知";
    },
  },
  props: {
    option: Object,
    component: Object,
  },
  data() {
    return {
      dialogFlag: false,
      items: [],
      weight: "",
      weightAlarm: null,
      voltage: null,
      devList: [],
      params: {
        //载重、电压接口参数
        projectId: null,
        companyId: null,
        equipmentNo: null,
      },
      chartDom: Date.parse(new Date()),
      typeList: [{}],
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
    this.unloadingEquipmentList();
  },
  methods: {
    openMore() {
      this.dialogFlag = true;
    },
    ...mapActions("unloading", ["setUnloadSN"]),
    selDevice(row) {
      //点击楼号
      //更新载重、电压接口参数
      this.params.equipmentNo = row.name; //设备编号
      this.params.projectId = row.name; //projectId
      this.unloadingRealTimeData(); //重新渲染
      this.setUnloadSN(row.name);
    },
    unloadingEquipmentList() {
      let url = `/prod-api/wisdomScreen/unloading/wsUnloading/unloadingEquipmentList`;
      axios
        .get(url, {
          params: this.params,
        })
        .then((res) => {
          if (res.data.code === 200) {
            let rows = res.data.rows; //设备编号:serialNumber;设备状态:equipmentStatus.
            for (var i = 0; i < rows.length; i++) {
              this.items.push({
                installationPosition: rows[i].installationPosition,//楼号
                name: rows[i].equipmentNo,
                value: rows[i].equipmentStatus,
              });
            }
            this.$refs.devTable.setCurrentRow(this.items[0]);
            this.setUnloadSN(this.items[0].name);
            this.params.equipmentNo = this.items[0].name;
          }
        });
    },
    unloadingRealTimeData() {
      let url = `/prod-api/wisdomScreen/unloading/wsUnloading/unloadingRealTimeData`;
      axios
        .get(url, {
          params: this.params,
        })
        .then((res) => {
          if (res.data.code === 200) {
            let row = res.data.data;
            this.weight = row.weight;
            this.weightAlarm = row.weightAlarm; //警报状态 0正常1装载重量预警2装载重量报警'
            this.voltage = row.voltage;
          }
        });
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
  },
};
</script>
<style lang="scss" scoped>
#Effect {
  background-color: rgba(255, 255, 255, 0);
  margin-top: 2%;
  margin-left: 2%;
  font-size: 16px;
  color: #00deff;
  width: 33%;
  position: absolute;
  z-index: 99999999;
  height: 100%;
}
.cus-body {
  height: 530px;
  .sn {
    color: #ffffff;
  }
  .dev-on {
    color: #00deff;
  }
  .dev-off {
    color: #9d9d9d;
  }
  .table-wrap {
    width: calc(100% - 32px);
    margin: 24px auto 0;
    height: calc(100% - 70px);
  }
  /deep/.el-table--striped {
    .el-table__header-wrapper {
      border: 2px solid #009fd9;
      background: rgba(13, 32, 101, 0.6);
      box-sizing: border-box;
      tr th {
        > .cell {
          color: #00deff;
          font-weight: normal;
        }
      }
    }
    .el-table__body {
      tr,
      td {
        background: rgba(47, 96, 255, 0.18);
      }
      tr {
        &.current-row {
          background: rgba(47, 96, 255, 0.6) !important;
        }
        &.el-table__row--striped {
          td {
            background: transparent;
          }
        }
      }
    }
  }
  /deep/.table-tranparent.el-table tbody tr:hover {
    background-color: #ffffff !important;
  }
}
ul {
  font-size: 15px;
  li {
    text-align: center;
    font-size: 15px;
  }
}
.cla {
  color: #fff;
  height: 45px;
  line-height: 45px;
}
.cla1 {
  text-align: right;
  padding-right: 10%;
  z-index: 3;
  height: 35px;
  line-height: 35px;
}
.bl {
  overflow-x: hidden;
  height: 450px;
}
.bg-purple {
  background: #0f345e00;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  font-size: 18px;
  padding-top: -40%;
  font-weight: 600;
  /* color: white; */
}
.p1 {
  background-color: #0e1c52;
  border-left: 1px solid #009fd9;
  border-bottom: 1px solid #009fd9;
  border-top: 1px solid #009fd9;
  border: 1px solid #009fd9;
  border-right: 0;
  padding-left: 5%;
  display: block;
  width: 198px;
  height: 45px;
  line-height: 45px;
  text-align: center;
  font-size: 16px;
  font-weight: 400;
}
.p1 .cla:nth-child(2n),
.p2 .cla:nth-child(2n) {
  background: #0c2d7d;
  color: #fff;
  font-weight: 500;
  // opacity: 0.1;
}
.p2 {
  padding-right: 5%;
  background-color: #0e1c52;
  border: 1px solid #009fd9;
  border-left: 0;
  display: block;
  width: 198px;
  text-align: center;
  height: 45px;
  line-height: 45px;
  font-size: 16px;
  font-weight: 400;
}
.sd {
  position: absolute;
  width: 67%;
  height: 100%;
  padding-left: 33%;
  margin-top: -26%;
}
.cus-body {
  position: relative;
}
.baojing {
  position: absolute;
  margin-top: 9%;
  margin-left: 50%;
}
.avue-draggable__item {
  height: 100%;
}

.el-dialog,
.avue-group__item {
  background: #03205c !important;
}
.el-dialog__body {
  color: #fff;
}
.app-container {
  .btn {
    text-align: right;
    margin-left: 20px;
  }
}
.el-checkbox__inner,
input,
.el-slider__runway,
textarea,
.el-dialog input,
.el-switch__core,
.el-dialog .el-slider__runway,
.el-dialog textarea {
  background-color: #004de9 !important;
}
.el-table .success-row {
  background: #2f60ff;
}
</style>