<template>
  <div class="cus-body">
    <div class="cus-header">
      <div class="cus-title">
        <span>{{ option.title }}</span>
      </div>
    </div>
    <div class="cus-cont">
      <div class="chart-wrap">
        <e-charts
          @click="handlePieSelectChange"
          ref="chart"
          :options="chartOption"
          autoresize
        />
      </div>
    </div>
    <more-data
      :dialogFlag.sync="dialogFlag1"
      :bjtype="params.bjtype"
      :projectId="params.projectId-0"
      :companyId="params.companyId"
    />
  </div>
</template>
<script>
import MoreData from "./more";
import ECharts from "vue-echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/line";
import "echarts/lib/chart/pie";
// import 'echarts/lib/chart/map'
// import 'echarts/lib/chart/radar'
// import 'echarts/lib/chart/scatter'
// import 'echarts/lib/chart/effectScatter'
import "echarts/lib/component/tooltip";
// import 'echarts/lib/component/polar'
import "echarts/lib/component/geo";
import "echarts/lib/component/legend";
import "echarts/lib/component/title";
import "echarts/lib/component/visualMap";
import "echarts/lib/component/dataset";
import "echarts/lib/component/graphic";
import { visUrl, getUrlParames } from "@/common";
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
export default {
  name: "ElectAlarm",
  components: {
    ECharts,
    MoreData,
  },
  props: {
    option: Object,
    component: Object,
  },
  data() {
    return {
      otherAlarmNum: null,
      wdAlarmNum: null,
      pm10AlarmNum: null,
      dialogFlag1: false,
      params: {
        projectId: null,
        companyId: null,
      },
      chartOption: {
        color: ["#02FAFB", "#2B62F6", "#FA9F1A"],
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            type: "pie",
            roseType: "radius",
            radius: ["30%", "60%"],
            data: [
              {
                value: 220,
                name: "电箱温度报警(次)",
              },
              {
                value: 120,
                name: "PM10报警(次)",
              },
              {
                value: 189,
                name: "其他报警(次)",
              },
            ],
            label: {
              normal: {
                formatter: "{font|{b}}\n{hr|}\n{font|{d}% {c}次}",
                rich: {
                  font: {
                    fontSize: 12,
                    padding: [5, 0],
                    color: "#fff",
                  },
                  hr: {
                    height: 0,
                    borderWidth: 1,
                    width: "100%",
                    borderColor: "#fff",
                  },
                },
              },
            },
            labelLine: {
              lineStyle: {
                color: "#fff",
              },
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0,0,0,0.5)",
              },
            },
          },
        ],
      },
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
  },
  mounted() {
    this.alarmRecord();
  },
  methods: {
    handlePieSelectChange(e) {
      if (e.name == "电箱温度报警(次)") {
        this.params.bjtype = 1;
      } else if (e.name == "PM10报警(次)") {
        this.params.bjtype = 2;
      } else {
        this.params.bjtype = 3;
      }
      this.dialogFlag1 = true;
    },
    alarmRecord() {
      let url = `/prod-api/wisdomScreen/elecbox/wsElecbox/alarmRecord`;
      axios
        .get(url, {
          params: this.params,
        })
        .then((res) => {
          if (res.data.code === 200) {
            let row = res.data.data;
            this.chartOption.series[0].data[0].value = row.wdAlarmNum;
            this.chartOption.series[0].data[1].value = row.pm10AlarmNum;
            this.chartOption.series[0].data[2].value = row.otherAlarmNum;
          }
        });
    },
  },
  computed: {
    fontSize() {
      return (this.option.fontSize || 30) + "px";
    },
  },
};
</script>
<style lang="scss" scoped>
.cus-body {
  .chart-wrap {
    width: 100%;
    height: 100%;
    .echarts {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
