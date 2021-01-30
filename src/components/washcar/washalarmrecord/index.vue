<template>
  <div class="cus-body">
    <div class="cus-header">
      <div class="cus-title">
        <span>{{ option.title }}</span>
      </div>
    </div>
    <div class="cus-cont">
      <div class="wash-pic-list">
        <div class="wash-pic-item">
          <el-image :src="photoInfo.admissionPhotos" fit="cover" @click="previewPic(photoInfo.admissionPhotos)"></el-image>
          <p class="wash-pic-name">进场照片</p>
        </div>
        <div class="wash-pic-item">
          <el-image :src="photoInfo.exitPhoto" fit="cover"  @click="previewPic(photoInfo.exitPhoto)"></el-image>
          <p class="wash-pic-name">出场照片</p>
        </div>
        <div class="wash-pic-item">
          <el-image :src="photoInfo.platePic" fit="cover" @click="previewPic(photoInfo.platePic)"></el-image>
          <p class="wash-pic-name">车牌照片</p>
        </div>
      </div>
      <div class="table-wrap">
        <el-table
          :data="tableData"
          header-row-class-name="wash-table-head"
          stripe
          size="medium"
          height="100%"
          style="width: 100%"
        >
          <el-table-column
            label="日期"
            prop="date"
            align="center"
          ></el-table-column>
          <el-table-column
            label="时间"
            prop="time"
            align="center"
          ></el-table-column>
          <el-table-column label="状态" prop="result" align="center">
            <template slot-scope="scope">
              <span class="dev-off" v-if="scope.row.result === 1">已冲洗</span>
              <span class="dev-on" v-else>未冲洗</span>
            </template>
          </el-table-column>
          <el-table-column
            label="车牌号"
            prop="licensePlate"
            align="center"
          ></el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible" append-to-body>
        <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
import { visUrl, getUrlParames } from "@/common";
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  name: "WashAlarmRecord",
  props: {
    option: Object,
    component: Object,
  },
  data() {
    return {
      photoInfo: {
          admissionPhotos: '',
          exitPhoto: '',
          platePic: '',
      },
      dialogImageUrl: '',
      dialogVisible: false,
      tableData: [],
    };
  },
  created() {
    axios.defaults.headers.common["Authorization"] = getUrlParames("token");
  },
  mounted() {
     this.washcarAlarm();
  },
  methods: {
      washcarAlarm() {
      let url = `/prod-api/wisdomScreen/carwash/wsCarwash/alarm`;
      axios
        .get(url, {
          params: {serialNumber: this.serialNumber},
        })
        .then((res) => {
          if (res.data.code === 200) {
            this.tableData = res.data.data || []
            this.photoInfo = res.data.data[0] || {}
          }
        });
    },
    previewPic(url) {
        this.dialogImageUrl = url
        this.dialogVisible = true
    },
  },
  filters: {
      toArray: (val) => {
          return new Array(val)
        }
  },
  computed: {
    ...mapGetters({
      serialNumber: 'washSN'
    }),
    fontSize() {
      return (this.option.fontSize || 30) + "px";
    },
  },
  watch: {
    serialNumber: function () {
      this.washcarAlarm();
    }
  }
};
</script>
<style lang="scss" scoped>
.cus-body {
  .sn {
    color: #ffffff;
  }
  .dev-on {
    color: #b10d22
  }
  .dev-off {
    color: #b10d22;
  }
  .cus-cont {
    padding: 0 16px;
    box-sizing: border-box;
    .wash-pic-list {
      margin-top: 40px;
      display: flex;
      justify-content: space-between;
      .wash-pic-item {
        width: calc(33% - 5px);
        height: 150px;
        position: relative;
        .el-image {
          width: 100%;
          height: 100%;
        }
        .wash-pic-name {
          width: 100%;
          height: 40px;
          line-height: 40px;
          background: rgba(0, 0, 0, 0.5);
          color: #ffffff;
          text-align: center;
          position: absolute;
          bottom: 0;
        }
      }
    }
    .table-wrap {
      width: 100%;
      margin: 14px auto 0;
      height: calc(100% - 204px);
    }
  }
  /deep/.el-table--striped {
    .el-table__header-wrapper {
      border: 1px solid #009fd9;
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
        color: #ffffff;
      }
      tr {
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
.el-image__error, .el-image__inner, .el-image__placeholder {
    display: inline-block;
    height: 100%;
    width: 100%;
    text-align: center;
    line-height: 100px;
}
</style>
