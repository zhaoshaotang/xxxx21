<template>
  <div class="cus-body effect-page">
    <div class="cus-header">
      <span class="cus-title">
        <span>{{ option.title }}</span>
      </span>
    </div>
    <div id="Effect">
      繁忙程度 &nbsp;&nbsp;:<span style="padding-left: 4%" :class="[a.color]">{{
        a.name
      }}</span>
      <div class="block">
        <!-- <el-date-picker
          v-model="value1"
          align="right"
          type="date"
          :clearable="false"
          @click="time(type)"

          :picker-options="pickerOptions"
        >
        </el-date-picker> -->
        <el-date-picker
          size="mini"
          :clearable="false"
          :editable="false"
          v-model="params.dateConditions"
          value-format="yyyy-MM-dd"
          type="date"
          @change="towerCraneEfficiency"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
      </div>
    </div>
    <div style="margin-top: -1%">
      <el-row :gutter="40">
        <el-col style="padding-left: 8%" :span="15">
          <ul>
            <li>工作塔吊台数</li>
            <li>平均吊次（每台）</li>
            <li>平均吊重（每台）</li>
            <li>平均有效工作时长（每台）</li>
            <li>平均时效（每台）</li>
          </ul>
        </el-col>
        <el-col :span="9">
          <ul>
            <li class="p1">
              {{ towerCraneNumber+"台" }}
            </li>
            <li class="p1">
              {{ averageHoisting+"次"}}
            </li>
            <li class="p1">
              {{ averageLiftingWeight +"t"}}
            </li>
            <li class="p1">
              {{ averageWorkingHours}}
            </li>
            <li class="p1">
              {{ averagePrescription +"t/min"}}
            </li>
          </ul>
        </el-col>
      </el-row>
    </div>
    <div class="piebody">
      <div class="jl-chart" :id="`chart${option.domId}`"></div>
    </div>
  </div>
</template>
<script>
import { visUrl, getUrlParames } from "@/api/httpClient.js";
import axios from "axios";
export default {
  name: "effect",
  props: {
    option: Object,
    component: Object,
  },
  data() {
    return {
      params: {
        projectId: null,
        companyId: null,
        dateConditions: "",
      },
      towerCraneNumber: null,
      averageHoisting: null,
      averageLiftingWeight: null,
      averageWorkingHours: null,
      averagePrescription: null,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      a: ["空闲", "正常", "忙碌"],
      chartDom: Date.parse(new Date()),
    };
  },
  created() {
    if (this.option.domId === null) {
      this.option.domId = this.chartDom;
    }
    // this.params.dateConditions=new Date();
    let num = this.averageHoisting;
    if (num >= 80) {
      this.a = {
        name: "忙碌",
        color: "color3",
      };
    } else if (num >= 60 && num < 80) {
      this.a = {
        name: "正常",
        color: "color2",
      };
    } else {
      this.a = {
        name: "空闲",
        color: "color1",
      };
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
    this.params.dateConditions = this.dayjs().format("YYYY-MM-DD");
    this.towerCraneEfficiency();
  },
  methods: {
    towerCraneEfficiency() {
      //接口调用
      let url = `/prod-api/wisdomScreen/towerCrane/wsTowerCrane/towerCraneEfficiency`;
      axios
        .get(url, {
          params: this.params,
        })
        .then((res) => {
          if (res.data.code === 200) {
            let row = res.data.data;
            this.towerCraneNumber = row.towerCraneNumber;
            this.averageHoisting = row.averageHoisting;
            this.averageLiftingWeight = row.averageLiftingWeight;
            this.averageWorkingHours = row.averageWorkingHours;
            this.averagePrescription = row.averagePrescription;
            if (parseInt(this.averageHoisting) >= 80) {
              this.a = {
                name: "忙碌",
                color: "color3",
              };
            } else if (
              parseInt(this.averageHoisting) >= 60 &&
              parseInt(this.averageHoisting) < 80
            ) {
              this.a = {
                name: "正常",
                color: "color2",
              };
            } else {
              this.a = {
                name: "空闲",
                color: "color1",
              };
            }
          }
        });
    },
  },
};
</script>
<style lang="less">
.effect-page {
  #Effect {
    margin-top: 6%;
    margin-left: 8%;
    font-size: 16px;
    color: #00deff;
  }
  .block {
    padding-left: 63%;
    margin-top: -7%;
  }
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 34%;
    background-color: #16326e;
    border: 1px solid #004de9;
    z-index: 333;
  }
  .el-input__inner {
    padding-left: 15%;
    background-color: #16326e !important;
    border: 1px solid #004de9 !important;
  }
  .el-input__prefix {
    left: -1px;
  }
  .el-checkbox__inner,
  input {
    color: #fff !important;
  }
  .dsp {
    padding-left: 2%;
    padding-top: 6%;
  }
  .color1 {
    color: #00deff;
  }
  .color2 {
    color: #00deff;
  }
  .color3 {
    color: red;
  }

  li {
    font-size: 14px;
    color: #fff;
    list-style: none;
    padding-top: 9%;
  }
  .p1 {
    padding-top: 16%;
  }
  .el-date-editor.el-input[data-v-03d9b8fa],
  .el-date-editor.el-input__inner[data-v-03d9b8fa] {
    margin-bottom: 12px;
    background-color: transparent !important;
    width: 36%;
    /* background-color: #16326e; */
    border: 1px solid #004de9;
    z-index: 333;
  }
  .date-pick-box {
    width: 124px;
    /deep/.el-date-editor {
      width: 100%;
      background: rgba(0, 77, 233, 0.2);
      border: 1px solid #004de9;
      .el-input__inner {
        background-color: transparent !important;
        color: #ffffff !important;
      }
      .el-range-separator {
        color: #ffffff;
      }
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
    background-color: transparent !important;
  }
}
</style>
<style>
.el-range-input {
  background-color: transparent !important;
  color: #ffffff !important;
}
.el-range-separator {
  color: #ffffff;
}
</style>