<template>
  <div class="cus-body">
    <div class="cus-header">
      <div class="cus-title">
        <span>{{ option.title }}</span>
      </div>
    </div>
    <div class="cus-cont">
      <div class="table-wrap">
        <el-table
          ref="devTable"
          :data="tableData"
          :show-header="false"
          @row-click="selDevice"
          stripe
          :highlight-current-row="true"
          size="medium"
          height="100%"
          style="width: 100%"
        >
          <el-table-column prop="serialNumber" align="center">
            <template slot-scope="scope">
              <span class="sn">设备编号：{{ scope.row.serialNumber }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="onlineStatus" align="center">
            <template slot-scope="scope">
              <span class="dev-off" v-if="scope.row.onlineStatus === 2">● 离线</span>
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
  name: "WashDevice",
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
    axios.defaults.headers.common["Authorization"] = 'getUrlParames("token")';
  },
  mounted() {
    this.washcarList();
  },
  methods: {
    ...mapActions('washCar', ['setWashSN']),
    openMore() {
      this.dialogFlag = true;
    },
    selDevice(row) {
      this.setWashSN(row.serialNumber)
    },
    washcarList() {
      let url = `/prod-api/wisdomScreen/carwash/wsCarwash/list`;
      axios
        .get(url, {
          params: this.params,
        })
        .then((res) => {
          if (res.data.code === 200) {
            this.tableData = res.data.data
            if(res.data.data.length > 0) {
              this.$refs.devTable.setCurrentRow(res.data.data[0])
              this.setWashSN(res.data.data[0].serialNumber)
            }
          }
        });
    },
  },
  computed: {
    ...mapGetters({
      serialNumber: 'washSN'
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
    margin: 44px auto 0;
    height: calc(100% - 110px);
  }
  .look-more {
    text-align: center;
    margin-top: 10px;
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
