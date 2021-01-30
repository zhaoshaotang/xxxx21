<template>
  <el-dialog
    title="安全管理隐患数据"
    :visible.sync="flag"
    width="70%"
    @open="handleOpen"
    append-to-body
    :close-on-click-modal="false"
  >
    <div class="more-wrap">
      <el-table
        ref="devTable"
        :data="tableData"
        :show-header="true"
        stripe
        :highlight-current-row="true"
        size="medium"
        height="600px"
        style="width: 100%"
      >
        <el-table-column label="序号" align="center">
          <template slot-scope="scope">
            <span class="index_bg">{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          prop="hazardStatusName"
          align="center"
        ></el-table-column>
        <el-table-column
          label="隐患等级"
          prop="hazardLevelName"
          align="center"
        ></el-table-column>
        <el-table-column
          label="作业类型"
          prop="operationName"
          align="center"
        ></el-table-column>
        <el-table-column
          label="检查部位"
          prop="hazardCheckPosition"
          align="center"
        ></el-table-column>
        <el-table-column
          label="隐患描述"
          prop="hazardDescribeRectify"
          align="center"
        ></el-table-column>
        <el-table-column
          label="要求"
          prop="hazardRequire"
          align="center"
        ></el-table-column>
        <el-table-column
          label="整改期限"
          prop="repairLimitTime"
          align="center"
        ></el-table-column>
        <el-table-column
          label="检查人"
          prop="hazardCheckPositionName"
          align="center"
        ></el-table-column>
        <el-table-column
          label="整改人"
          prop="hazardRepairPersonName"
          align="center"
        ></el-table-column>
      </el-table>
      <div class="page-wrap">
        <el-pagination
          background
          layout="prev, pager, next"
          :current-page.sync="queryParams.pageNum"
          @current-change="getList"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { visUrl, getUrlParames } from "@/common";
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
export default {
  name: "ModeData",
  props: {
    dialogFlag: {
      required: true,
      type: Boolean,
      default: false,
    },
    rectifyType: {
      type: Number,
      default: null,
    },
    projectId: {
      type: Number,
      default: null,
    },
    companyId: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      queryParams: {
        rectifyType: null,
        projectId: null,
        companyId: null,
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      tableData: [],
    };
  },
  created() {
    axios.defaults.headers.common["Authorization"] = getUrlParames("token");
  },
  mounted() {},
  methods: {
    handleOpen() {
      this.queryParams.rectifyType = this.rectifyType;
      this.queryParams.projectId = this.projectId;
      this.queryParams.companyId = this.companyId;
      this.getList();
    },
    getList() {
      let url = `/prod-api/wisdomScreen/home/wsHome/securityManagementList`;
      axios
        .get(url, {
          params: {
            ...this.queryParams,
          },
        })
        .then((res) => {
          this.tableData = [];
          if (res.data.code === 200) {
            const result = res.data.rows;
            this.tableData = result;
            this.total = res.data.total;
          }
        });
    },
  },
  computed: {
    flag: {
      get() {
        return this.dialogFlag;
      },
      set(val) {
        this.$emit("update:dialogFlag", val);
      },
    },
  },
};
</script>

<style scoped lang="scss">
/deep/.el-dialog {
  background: #03205c;
  .el-dialog__body {
    padding: 20px;
    box-sizing: border-box;
  }
}
.more-wrap {
  .search-box {
    color: #ffffff;
    width: 700px;
    position: absolute;
    right: 60px;
    top: 25px;
    z-index: 99;
    text-align: right;
    /*width: 100%;*/
    .status-box {
      display: inline-block;
      width: 120px;
      /deep/.el-select {
        width: 100%;
        height: 100%;
        .el-input__inner {
          /*height: 40px;*/
          /*line-height: 40px;*/
          color: #ffffff !important;
          background: rgba(0, 77, 233, 0.2) !important;
          border: 1px solid #004de9 !important;
        }
      }
    }
    .date-pick-box {
      display: inline-block;
      width: 220px;
      /deep/.el-date-editor {
        width: 100%;
        background: rgba(0, 77, 233, 0.2);
        border: 1px solid #004de9;
        .el-range-input {
          background-color: transparent !important;
          color: #ffffff !important;
        }
        .el-range-separator {
          color: #ffffff;
        }
      }
    }
  }
  .index_bg {
    display: block;
    width: 49px;
    height: 34px;
    background: url("~@/assets/index_bg.png") no-repeat center;
    background-size: contain;
    text-align: center;
    line-height: 34px;
    margin: 0 auto;
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
        padding: 5px 0;
        color: #ffffff;
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
  .page-wrap {
    padding: 20px 0 20px;
    text-align: right;
  }
}
</style>
