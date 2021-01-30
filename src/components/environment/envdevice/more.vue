<template>
  <el-dialog
    title="历史数据"
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
        设备编号
        <div class="status-box">
          <el-select size="small"
            v-model="queryParams.equipmentNo"
          >
            <el-option
              v-for="item in devList"
              :key="item.equipmentNo"
              :label="item.equipmentNo"
              :value="item.equipmentNo"
            >
            </el-option>
          </el-select>
        </div>
        <el-button
          type="primary"
          size="mini"
          @click="getList"
          style="margin-left: 20px"
          >查询</el-button
        >
        <el-button
          type="primary"
          size="mini"
          @click="listExport"
          style="margin-left: 20px"
          >导出</el-button
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
          label="时间"
          prop="recordTime"
          align="center"
        ></el-table-column>
        <el-table-column
          label="报警状态"
          prop="alarmStatusName"
          align="center"
        ></el-table-column>
        <el-table-column
          label="pm2.5(μg/m³)"
          prop="pm25"
          align="center"
        ></el-table-column>
        <el-table-column
          label="pm10(μg/m³)"
          prop="pm10"
          align="center"
        ></el-table-column>
        <el-table-column
          label="风速(m/s)"
          prop="windSpeed"
          align="center"
        ></el-table-column>
        <el-table-column
          label="风向"
          prop="windDirection"
          align="center"
        ></el-table-column>
        <el-table-column
          label="噪音(db)"
          prop="noise"
          align="center"
        ></el-table-column>
        <el-table-column
          label="温度(℃)"
          prop="temperature"
          align="center"
        ></el-table-column>
        <el-table-column
          label="湿度(%RH)"
          prop="humidity"
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
  name: "MoreData",
  props: {
    dialogFlag: {
      required: true,
      type: Boolean,
      default: false,
    },
    devList: {
      required: true,
      type: [Object, Array],
      default: () => {}
    },
    devSn: {
      type: String,
      default: ''
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
        equipmentNo: '',
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
  mounted() {
  },
  methods: {
    handleOpen() {
      this.queryParams.equipmentNo = this.devSn;
      axios.defaults.headers.common["Authorization"] = getUrlParames("token");
      this.getList()
    },
    listExport() {
      let url = `/prod-api/wisdomScreen/dust/wsDust/dustExport`;
      axios
        .get(url, {
          params: {...this.queryParams, startTime: this.date[0], endTime: this.date[1]},
        })
        .then((res) => {
          if (res.data.code === 200) {
            this.download(res.data.msg)
          }
        });
      },
    getList() {
      let url = `/prod-api/wisdomScreen/dust/wsDust/dustHistoricalData`;
      axios
        .get(url, {
          params: {...this.queryParams, startTime: this.date[0], endTime: this.date[1]},
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
    width: 800px;
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
      width: 370px;
      margin-right: 25px;
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
