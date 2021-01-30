<template>
  <div class="cus-body">
    <div class="cus-header">
      <div class="cus-title">
        <span>{{ option.title }}</span>
      </div>
    </div>
    <div class="cus-cont">
      <div class="chart-wrap" style="position:relative;">
        <div style="color:#ffff;text-align:right;position:absolute;top:25px;left:300px;">汇总:{{totallist}}KWh</div>
        <e-charts ref="chart" :options="chartOption" autoresize />
      </div>
    </div>
  </div>
</template>
<script>
import ECharts from "vue-echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/line";
import "echarts/lib/chart/pie";
import "echarts/lib/component/tooltip";
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
  name: "ElectArea",
  components: {
    ECharts,
  },
  props: {
    option: Object,
    component: Object,
  },
  data() {
    return {
      activePowers: [],
      partitionNames: [],
      totallist:0,
      params: {
        projectId: null,
        companyId: null,
      },
      chartOption: {
        tooltip: {},
        grid:{
          left: "15%",
        },
        xAxis: {
          type: "category",
          data: [],
          axisLine: {
            lineStyle: {
              color: "#657CA8",
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: "#eeeeee",
            rotate: 45,
          },
        },
        yAxis: {
          type: "value",
          name: "电量(KWh)",
           nameTextStyle: {
              color: "#fff",
              fontSize: 14,
            },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(255,255,255,0.1)",
            },
          },
          axisLabel: {
            color: "#eee",
          },
        },
        series: [
          {
            type: "bar",
            barWidth: 40,
            data: [],
            itemStyle: {
              normal: {
                color: function (params) {
                  var colorList = [
                    ["#00F6FF", "#005DEC00"],
                    ["#FF3A2F", "#F0859900"],
                    ["#FAF71A", "#BDEC0000"],
                  ];
                  var index = params.dataIndex;
                  if (params.dataIndex >= colorList.length) {
                    index = params.dataIndex - colorList.length;
                  }
                  return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: colorList[index][0] },
                    { offset: 0.5, color: colorList[index][0] },
                    { offset: 1, color: colorList[index][1] },
                  ]);
                },
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
    this.statisticsByArea();
  },
  methods: {
    statisticsByArea() {
      let url = `/prod-api/wisdomScreen/elecbox/wsElecbox/statisticsByArea`;
      axios
        .get(url, {
          params: this.params,
        })
        .then((res) => {
          if (res.data.code === 200) {
            let rows = res.data.data;
            for (var i = 0; i < rows.length; i++) {
              this.activePowers.push(rows[i].activePower);
              this.partitionNames.push(rows[i].partitionName);
            }
            this.chartOption.xAxis.data = this.partitionNames;
            this.chartOption.series[0].data = this.activePowers;
            this.totallist=eval(this.activePowers.join("+"))
           

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
