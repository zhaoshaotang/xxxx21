<template>
  <div class="cus-body">
    <div class="cus-cont">
      <div class="table-wrap">
        <el-table
          ref="devTable"
          :data="tableData"
          :show-header="true"
          @row-click="selDevice"
          stripe
          :highlight-current-row="true"
          size="medium"
          height="100%"
          style="width: 100%"
        >
          <el-table-column label="检测点（设备编号）" prop="equipmentNo" align="center">
            <template slot-scope="scope">
              <el-row class="sn"><el-col :span="12" style="font-size: 15px;text-align:right;">{{ scope.row.monitoringPointName }} ：</el-col><el-col :span="12" style="font-size: 15px;text-align:left;">{{ scope.row.equipmentNo }}</el-col></el-row>
            </template>
          </el-table-column>
          <el-table-column label="在线状态" prop="onlineStatusName" align="center" width="120px;">
            <template slot-scope="scope">
              <span class="dev-off" v-if="scope.row.onlineStatusName === '离线'">● 离线</span>
              <span class="dev-on" v-else>● 在线</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="look-more">
        <span class="history-btn" @click="openMore">历史数据</span>
      </div>
    </div>
    <more-data
      :dialogFlag.sync="dialogFlag"
      :devList="tableData"
      :devSn="serialNumber"
    />
  </div>
</template>
<script>
import MoreData from './more'
import { visUrl, getUrlParames } from "@/common";
import { mapGetters, mapActions } from 'vuex'
import axios from "axios";
export default {
  name: "EnvDevice",
  components: {
    MoreData
  },
  props: {
    option: Object,
    component: Object,
  },
  data() {
    return {
      dialogFlag: false,
      tableData: [],
      params: {
        projectId: null,
        companyId: null,
      },
    };
  },
  created() {
    if(getUrlParames("userType") == 1){ //项目级
      this.params.projectId = getUrlParames("userId");
    }else{//企业级
      this.params.companyId = getUrlParames("userId");
    }
    axios.defaults.headers.common["Authorization"] = getUrlParames("token");
  },
  mounted() {
    this.washcarList();
  },
  methods: {
    ...mapActions('environment', ['setEnvSN']),
    openMore() {
      this.dialogFlag = true;
    },
    selDevice(row) {
      this.setEnvSN(row.equipmentNo)
    },
    washcarList() {
      let url = `/prod-api/wisdomScreen/dust/wsDust/dustEquipmentList`;
      axios
        .get(url, {
          params: this.params,
        })
        .then((res) => {
          if (res.data.code === 200) {
            this.tableData = res.data.rows
            if(res.data.rows.length > 0) {
              this.$refs.devTable.setCurrentRow(res.data.rows[0])
              this.setEnvSN(res.data.rows[0].equipmentNo)
            }
          }
        });
    },
  },
  computed: {
    ...mapGetters({
      serialNumber: 'envSN'
    }),
    fontSize() {
      return (this.option.fontSize || 30) + "px";
    },
  },
};
</script>
<style lang="scss" scoped>
.cus-body {
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
  .look-more {
    text-align: center;
    margin-top: 0;
    .history-btn {
      display: inline-block;
      width: 103px;
      height: 36px;
      background: #0e2e9d;
      border-radius: 18px;
      line-height: 36px;
      color: #ffffff;
      font-size: 14px;
      text-align: center;
      cursor: pointer;
    }
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
        &.current-row{
          background: rgba(47, 96, 255, 0.6)!important;
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
</style>
<style>
.el-table--medium td, .el-table--medium th {
    padding: 4px 0;
}
</style>

