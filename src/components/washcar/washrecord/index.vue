<template>
  <div class="cus-body">
    <div class="cus-header">
      <div class="cus-title">
        <span>{{ option.title }}</span>
      </div>
    </div>
    <div class="cus-cont">
      <div class="chart-wrap" style="position:relative;">
        <div style="position:absolute;bottom:45px;left:47%;color:#fff;">
          <span>{{cleaning}}</span>
          <span style="margin-left:130px;">{{vehicle}}</span>
        </div>
        <ECharts
          @click="handlePieSelectChange1"
          ref="chart"
          :options="chartOption"
          autoresize
        />
      </div>
    </div>
    <more-data :dialogFlag.sync="dialogFlag1" :serialNumber="params.serialNumber" :result="params.result" />
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
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  name: "WashRecord",
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
      params: {},
      dialogFlag1: false,
      cleaning:0,
      vehicle:0,
      chartOption: {
        legend: {
          width: "70%",
          left: "center",
          textStyle: {
            color: "#fff",
            fontSize: 14,
          },
          icon: "circle",
          right: "0",
          bottom: "20",
          padding: [30, 60],
          itemGap: 40,
          data: ["已清洗车辆", "未清洗车辆"],
          
        },
        tooltip: {
          show: true,
        },
        graphic: [
          {
            // 环形图中间添加文字
            type: "text", // 通过不同top值可以设置上下显示
            left: "center",
            top: "35%",
            style: {
              text: "81.3%",
              textAlign: "center",
              fill: "#34E4FE",
              width: 30,
              height: 30,
              fontSize: 30,
              fontFamily: "Microsoft YaHei",
            },
          },
          {
            type: "text",
            left: "center",
            top: "50%",
            style: {
              text: "已清洗车辆",
              textAlign: "center",
              fill: "#ffffff",
              width: 30,
              height: 30,
              fontSize: 20,
              fontFamily: "MicrosoftYaHei-Bold",
            },
          },
        ],
        series: [
          {
            type: "pie",
            label: {
              show: false,
            },
            startAngle: 90, // 设置起始角度
            avoidLabelOverlap: false, // 避免标注重叠
            hoverAnimation: false, // 移入放大
            center: ["50%", "45%"], // 饼图的圆心坐标
            radius: ["50%", "60%"],
            color: ["#EFEFEF00", "#34E4FE"],
            data: [
              { value: 30, name: "未清洗" },
              { value: 214, name: "已清洗车辆" },
            ],
          },
          {
            type: "pie",
            label: {
              show: false,
            },
            startAngle: 90, // 设置起始角度
            avoidLabelOverlap: false, // 避免标注重叠
            hoverAnimation: false, // 移入放大
            center: ["50%", "45%"], // 饼图的圆心坐标
            radius: ["40%", "50%"],
            color: ["#FDAD5C", "#EFEFEF00"],
            data: [
              { value: 30, name: "未清洗车辆" },
              { value: 214, name: "已清洗" },
            ],
          },
        ],
      },
    };
  },
  created() {
    axios.defaults.headers.common["Authorization"] = getUrlParames("token");
  },
  mounted() {
    this.washcarRecord();
  },
  methods: {
    handlePieSelectChange1(e) {
      if(e.name == "未清洗车辆"){
        this.params.result = 2;
        this.params.serialNumber = this.serialNumber;
      }else{
        this.params.result = 1;
        this.params.serialNumber = this.serialNumber;
      }
      this.dialogFlag1 = true;
    },
    washcarRecord() {
      let url = `/prod-api/wisdomScreen/carwash/wsCarwash/record`;
      axios
        .get(url, {
          params: { serialNumber: this.serialNumber },
        })
        .then((res) => {
          if (res.data.code === 200) {
            let row = res.data.data;
            if (!row) {
              row = {
                endWashNum: 0,
                unWashNum: 0,
              };
              this.chartOption.graphic[0].style.text = `0%`;
            } else {
              this.chartOption.graphic[0].style.text = `${
                ((row.endWashNum * 100) /
                (row.unWashNum + row.endWashNum)).toFixed(2)
              }%`;
            }
            this.chartOption.series[0].data[0].value = row.unWashNum;
            this.chartOption.series[0].data[1].value = row.endWashNum;
            this.chartOption.series[1].data[0].value = row.unWashNum;
            this.chartOption.series[1].data[1].value = row.endWashNum;
            this.cleaning=row.endWashNum;
            this.vehicle=row.unWashNum;
          }
        });
    },
  },
  computed: {
    ...mapGetters({
      serialNumber: "washSN",
    }),
    fontSize() {
      return (this.option.fontSize || 30) + "px";
    },
  },
  watch: {
    serialNumber: function () {
      this.washcarRecord();
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
