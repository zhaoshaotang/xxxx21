<template>
  <div class="cus-body">
    <div class="cus-header">
      <span class="cus-title"
        ><span>{{ option.title }}</span></span
      >
    </div>
    <div class="piebody">
      <div class="aside aside1">
        <div class="block">
          <img :src="icon1" @click="centerDialogVisible(1)" />
          <h3 class="icontitle">隐患数</h3>
          <h2 class="num">{{ hazardNumber }}</h2>
        </div>
      </div>
      <div class="pie-three" :id="`pie-three${option.domId}`"></div>
      <div class="aside aside2">
        <div class="block">
          <img :src="icon2" @click="centerDialogVisible(2)" />
          <h3 class="icontitle">整改数</h3>
          <h2 class="num">{{ rectifyNumber }}</h2>
        </div>
      </div>
    </div>
    <more-data
      :dialogFlag.sync="dialogFlag"
      :rectifyType="queryParams.rectifyType"
      :projectId="queryParams.projectId-0"
      :companyId="queryParams.companyId"
    />
  </div>
</template>
<script>
import MoreData from "./more";
import { visUrl, getUrlParames } from "@/api/httpClient.js";
import axios from "axios";
import icon1 from "../../../assets/icon/icon-1.png";
import icon2 from "../../../assets/icon/icon-2.png";
export default {
  name: "indexpieangl",
  components: {
    MoreData,
  },
  props: {
    option: Object,
    component: Object,
  },
  data() {
    return {
      dialogFlag: false,
      icon1: icon1,
      icon2: icon2,
      chartDom: Date.parse(new Date()),
      hazardNumber: null,
      rectifyNumber: null,
      queryParams: {
        rectifyType: null,
        projectId: null,
        companyId: null,
      },
    };
  },
  created() {
    console.log(this.dataName3);
    if (this.option.domId === null) {
      this.option.domId = this.chartDom;
    }
  },
  computed: {
    fontSize() {
      return (this.option.fontSize || 30) + "px";
    },
    chartData() {
      return this.option.data;
    },
  },
  mounted() {
    let that = this;
    setTimeout(function () {
      that.getCharts();
    }, 1000);
    if (getUrlParames("userType") == 1) {
      //项目级
      this.queryParams.projectId = getUrlParames("userId");
    } else {
      //企业级
      this.queryParams.companyId = getUrlParames("userId");
    }
    axios.defaults.headers.common["Authorization"] = getUrlParames("token");
  },
  methods: {
    centerDialogVisible(type) {
      this.queryParams.rectifyType = type;
      this.dialogFlag = true;
    },
    getCharts() {
      let url = `/prod-api/wisdomScreen/home/wsHome/securityManagement`;
      axios
        .get(url, {
          params: this.queryParams,
        })
        .then((res) => {
          if (res.data.code === 200) {
            let row = res.data.data;
            this.hazardNumber = row.hazardNumber;
            this.rectifyNumber = row.rectifyNumber;
            this.addPie(row.rectificationRatio);
          }
        });
    },
    addPie(rectificationRatio) {
      let pieThree = echarts.init(
        document.getElementById(`pie-three${this.option.domId}`)
      );
      var rich = {
        white: {
          color: "#fff",
          align: "center",
          fontSize: 15,
          padding: [3, 0],
        },
      };
      let angle = 0; //角度，用来做简单的动画效果的
      let value = rectificationRatio;
      let option = {
        title: {
          text: "{a|" + value + "%}" + "\n" + "{b|" + "整改率" + "}",
          x: "center",
          y: "center",
          textStyle: {
            rich: {
              a: {
                fontSize: 25,
                color: "#29EEF3",
              },
              b: {
                fontSize: 20,
                color: "#fff",
              },
            },
          },
        },
        series: [
          {
            name: "ring5",
            type: "custom",
            coordinateSystem: "none",
            renderItem: function (params, api) {
              return {
                type: "arc",
                shape: {
                  cx: api.getWidth() / 2,
                  cy: api.getHeight() / 2,
                  r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.6,
                  startAngle: ((0 + angle) * Math.PI) / 180,
                  endAngle: ((90 + angle) * Math.PI) / 180,
                },
                style: {
                  stroke: "#0CD3DB",
                  fill: "transparent",
                  lineWidth: 1.5,
                },
                silent: true,
              };
            },
            data: [0],
          },
          {
            name: "ring5",
            type: "custom",
            coordinateSystem: "none",
            renderItem: function (params, api) {
              return {
                type: "arc",
                shape: {
                  cx: api.getWidth() / 2,
                  cy: api.getHeight() / 2,
                  r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.6,
                  startAngle: ((180 + angle) * Math.PI) / 180,
                  endAngle: ((270 + angle) * Math.PI) / 180,
                },
                style: {
                  stroke: "#0CD3DB",
                  fill: "transparent",
                  lineWidth: 1.5,
                },
                silent: true,
              };
            },
            data: [0],
          },
          {
            name: "ring5",
            type: "custom",
            coordinateSystem: "none",
            renderItem: function (params, api) {
              return {
                type: "arc",
                shape: {
                  cx: api.getWidth() / 2,
                  cy: api.getHeight() / 2,
                  r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65,
                  startAngle: ((270 + -angle) * Math.PI) / 180,
                  endAngle: ((40 + -angle) * Math.PI) / 180,
                },
                style: {
                  stroke: "#0CD3DB",
                  fill: "transparent",
                  lineWidth: 1.5,
                },
                silent: true,
              };
            },
            data: [0],
          },
          {
            name: "ring5",
            type: "custom",
            coordinateSystem: "none",
            renderItem: function (params, api) {
              return {
                type: "arc",
                shape: {
                  cx: api.getWidth() / 2,
                  cy: api.getHeight() / 2,
                  r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65,
                  startAngle: ((90 + -angle) * Math.PI) / 180,
                  endAngle: ((220 + -angle) * Math.PI) / 180,
                },
                style: {
                  stroke: "#0CD3DB",
                  fill: "transparent",
                  lineWidth: 1.5,
                },
                silent: true,
              };
            },
            data: [0],
          },
          {
            name: "ring5",
            type: "custom",
            coordinateSystem: "none",
            renderItem: function (params, api) {
              let x0 = api.getWidth() / 2;
              let y0 = api.getHeight() / 2;
              let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65;
              let point = getCirlPoint(x0, y0, r, 90 + -angle);
              return {
                type: "circle",
                shape: {
                  cx: point.x,
                  cy: point.y,
                  r: 4,
                },
                style: {
                  stroke: "#0CD3DB", //粉
                  fill: "#0CD3DB",
                },
                silent: true,
              };
            },
            data: [0],
          },
          {
            name: "ring5", //绿点
            type: "custom",
            coordinateSystem: "none",
            renderItem: function (params, api) {
              let x0 = api.getWidth() / 2;
              let y0 = api.getHeight() / 2;
              let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65;
              let point = getCirlPoint(x0, y0, r, 270 + -angle);
              return {
                type: "circle",
                shape: {
                  cx: point.x,
                  cy: point.y,
                  r: 4,
                },
                style: {
                  stroke: "#0CD3DB", //绿
                  fill: "#0CD3DB",
                },
                silent: true,
              };
            },
            data: [0],
          },
          {
            type: "pie",
            radius: ["58%", "45%"],
            silent: true,
            clockwise: true,
            startAngle: 90,
            z: 0,
            zlevel: 0,
            label: {
              normal: {
                position: "center",
              },
            },
            data: [
              {
                value: value,
                name: "",
                itemStyle: {
                  normal: {
                    color: {
                      // 完成的圆环的颜色
                      colorStops: [
                        {
                          offset: 0,
                          color: "#4FADFD", // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#28E8FA", // 100% 处的颜色
                        },
                      ],
                    },
                  },
                },
              },
              {
                value: 100 - value,
                name: "",
                label: {
                  normal: {
                    show: false,
                  },
                },
                itemStyle: {
                  normal: {
                    color: "#173164",
                  },
                },
              },
            ],
          },

          {
            type: "gauge",
            radius: "58%",
            center: ["50%", "50%"],
            startAngle: 0,
            endAngle: 359.9,
            splitNumber: 8,
            hoverAnimation: true,
            axisTick: {
              show: false,
            },
            splitLine: {
              length: 60,
              lineStyle: {
                width: 5,
                color: "#061740",
              },
            },
            axisLabel: {
              show: false,
            },
            pointer: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                opacity: 0,
              },
            },
            detail: {
              show: false,
            },
            data: [
              {
                value: 0,
                name: "",
              },
            ],
          },
        ],
      };

      //获取圆上面某点的坐标(x0,y0表示坐标，r半径，angle角度)
      function getCirlPoint(x0, y0, r, angle) {
        let x1 = x0 + r * Math.cos((angle * Math.PI) / 180);
        let y1 = y0 + r * Math.sin((angle * Math.PI) / 180);
        return {
          x: x1,
          y: y1,
        };
      }

      function draw() {
        angle = angle + 3;
        pieThree.setOption(option, true);
        //window.requestAnimationFrame(draw);
      }

      setInterval(function () {
        //用setInterval做动画感觉有问题
        draw();
      }, 100);

      pieThree.setOption(option);
    },
  },
  watch: {},
};
</script>
<style lang="scss" scoped>
.pie-three {
  width: 50%;
  height: 100%;
  position: absolute;
  left: 25%;
}
.aside {
  width: 25%;
  text-align: center;
  align-items: center;
  display: flex;
  position: absolute;
  height: 100%;
  top: 0;
}
.aside1 {
  left: 0;
}
.aside2 {
  right: 0;
}

img {
  margin: 10px auto 0;
}
.icontitle {
  color: #19ccff;
}
.num {
  color: #fff;
}
</style>