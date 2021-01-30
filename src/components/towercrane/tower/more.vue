<template>
  <el-dialog
    :title="equipmentNoName"
    :visible.sync="flag"
    width="70%"
    @open="handleOpen"
    append-to-body
    :close-on-click-modal="false"
  >
    <div class="more-wrap">
      <div class="search-box">
        日期
        <div class="date-pick-box">
          <el-date-picker
            size="small"
            :clearable="false"
            :editable="false"
            v-model="date"
            :picker-options="pickerOptions"
            type="datetimerange"
            value-format="yyyy-MM-dd"
            range-separator="-"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          >
          </el-date-picker>
        </div>
        <el-button
          type="primary"
          size="mini"
          @click="getList"
          style="margin-left: 20px"
          >查询</el-button
        >
      </div>
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
          label="违章类型"
          prop="violationStatusName"
          align="center"
        ></el-table-column>
        <el-table-column
          label="起吊时间"
          prop="liftingTime"
          align="center"
        ></el-table-column>
        <el-table-column
          label="起吊点高度(米)"
          prop="liftingPointHeight"
          align="center"
        ></el-table-column>
        <el-table-column
          label="起吊点幅度(米)"
          prop="liftingPointRange"
          align="center"
        ></el-table-column>
        <el-table-column
          label="起吊点回转(°)"
          prop="liftingPointRotation"
          align="center"
        ></el-table-column>
        <el-table-column
          label="卸吊时间"
          prop="unloadingTime"
          align="center"
        ></el-table-column>
        <el-table-column
          label="卸吊点高度(米)"
          prop="unloadingPointHeight"
          align="center"
        ></el-table-column>
        <el-table-column
          label="卸吊点幅度(米)"
          prop="unloadingPointRange"
          align="center"
        ></el-table-column>
        <el-table-column
          label="卸吊点回转(°)"
          prop="unloadingPointRotation"
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
    equipmentNo: {
      type: String,
      default: "",
    },
    equipmentNoName: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      date: [
        this.dayjs().format("YYYY-MM-DD"),
        this.dayjs().format("YYYY-MM-DD"),
      ],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      queryParams: {
        equipmentNo: "",
        startTime: null,
        endTime: null,
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
      this.queryParams.equipmentNo = this.equipmentNo;
      axios.defaults.headers.common["Authorization"] = getUrlParames("token");
      this.getList();
    },
    getList() {
      let url = `/prod-api/wisdomScreen/towerCrane/wsTowerCrane/violationDetails`;
      axios
        .get(url, {
          params: {
            ...this.queryParams,
            startTime: this.date[0],
            endTime: this.date[1],
          },
        })
        .then((res) => {
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
