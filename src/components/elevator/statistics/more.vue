<template>
  <el-dialog
    title="近7天报警信息"
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
            value-format="yyyy-MM-dd HH:mm:ss"
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
          label="设备编号"
          prop="serialNumber"
          align="center"
        ></el-table-column>
        <el-table-column
          label="系统状态"
          prop="giveViolationType"
          align="center"
        >
         <template scope="{row}">
                <span v-if="row.giveViolationType==0" style="color:green;">正常</span>
                <span v-if="row.giveViolationType==1" style="color:red;">
                {{(row.giveViolationTypeIdentity)==0? '身份认证-违章':''+(row.giveViolationTypeWeight)==2?'/违章状态-重量':''+ (row.giveViolationTypeTilt==2)?'/违章状态-倾斜':''}}
                </span>
          </template>
        </el-table-column>
        <!-- giveViolationTypeWeight ==> 重量
        giveViolationTypeIdentity ==> 身份
        giveViolationTypeTilt ==> 倾斜 -->
        <el-table-column
          label="开始时间"
          prop="startTime"
          align="center"
        ></el-table-column>
        <el-table-column
          label="结束时间"
          prop="endTime"
          align="center"
        ></el-table-column>
        <el-table-column
          label="驾驶员姓名"
          prop="driverName"
          align="center"
        ></el-table-column>
        <el-table-column
          label="本次载重(KG)"
          prop="thisLoad"
          align="center"
        ></el-table-column>
        <el-table-column
          label="载重百分比"
          prop="loadPercentage"
          align="center"
        ></el-table-column>
        <el-table-column
          label="起点高度(米)"
          prop="startingHeight"
          align="center"
        ></el-table-column>
        <el-table-column
          label="终点高度(米)"
          prop="terminalHeight"
          align="center"
        ></el-table-column>
        <el-table-column
          label="行程高度(米)"
          prop="strokeHeight"
          align="center"
        ></el-table-column>
        <el-table-column
          label="起升方向"
          prop="liftingDirection"
          align="center"
        ></el-table-column>
        <el-table-column
          label="平均速度(米/秒)"
          prop="averageVelocity"
          align="center"
        ></el-table-column>
        <el-table-column
          label="X向倾斜度"
          prop="inclinationX"
          align="center"
        ></el-table-column>
        <el-table-column
          label="Y向倾斜度"
          prop="inclinationY"
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
    projectId: {
      type: Number,
      default: "",
    },
    companyId: {
      type: Number,
      default: "",
    },
    alarmType: {
      type: String,
      default: "",
    },
    Day: {
      type: String | Number,
      default: "",
    },
  },
  watch: {
    Day: function () {
      if (this.Day == 1) {
        //7天
        this.date = [
          this.dayjs().subtract(7, "day").format("YYYY-MM-DD HH:mm:ss"),
          this.dayjs().format("YYYY-MM-DD HH:mm:ss"),
        ];
        this.getList();
      } else {
        //30天
        this.date = [
          this.dayjs().subtract(30, "day").format("YYYY-MM-DD HH:mm:ss"),
          this.dayjs().format("YYYY-MM-DD HH:mm:ss"),
        ];
        this.getList();
      }
    },
  },
  data() {
    return {
      date: [
        this.dayjs().subtract(7, "day").format("YYYY-MM-DD HH:mm:ss"),
        this.dayjs().format("YYYY-MM-DD HH:mm:ss"),
      ],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      queryParams: {
        alarmType: "",
        projectId: null,
        companyId: null,
        startDate: null,
        endDate: null,
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
      this.queryParams.alarmType = this.alarmType;
      this.queryParams.projectId = this.projectId;
      this.queryParams.companyId = this.companyId;
      axios.defaults.headers.common["Authorization"] = getUrlParames("token");
      this.getList();
    },
    getList() {
      let url = `/prod-api/wisdomScreen/elevator/wsElevator/elevatorAlarmList`;
      axios
        .get(url, {
          params: {
            ...this.queryParams,
            startDate: this.date[0],
            endDate: this.date[1],
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
