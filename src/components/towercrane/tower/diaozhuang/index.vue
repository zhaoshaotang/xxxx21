<template>
  <div class="piebody" style="height: 100%; width: 100%">
    <div class="jl-chart" :id="`chart${option.domId}`"></div>
  </div>
</template>
<script>
export default {
  name: "diaozhuang",
  data() {
    return {
      option: { title: "1111", domId: "001" },
    };
  },
  created() {},
  mounted() {
    let that = this;
    setTimeout(function () {
      that.addPie();
    }, 500);
  },
  methods: {
    addPie() {
      let pieOne = echarts.init(
        document.getElementById(`chart${this.option.domId}`)
      );
      var option = {
        backgroundColor: "#031A32",
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
            label: {
              show: true,
            },
          },
        },
        grid: {
          left: "4%",
          top: "18%",
          right: "5%",
          bottom: "22%",
        },
        legend: {
          data: ["吊装重量", "载重百分比"],
          top: "4%",
          textStyle: {
            color: "#fff",
            fontSize: 14,
          },
        },
        xAxis: {
          data: [
            "会议室1",
            "会议室2",
            "会议室3",
            "会议室4",
            "会议室5",
            "会议室6",
            "会议室7",
            "会议室8",
            "会议室9",
            "会议室10",
            "会议室11",
            "会议室12",
          ],
          axisLine: {
            show: true, //隐藏X轴轴线
            lineStyle: {
              color: "#3d5269",
              width: 1,
            },
          },
          axisTick: {
            show: true, //隐藏X轴刻度
            alignWithLabel: true,
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#fff", //X轴文字颜色
              fontSize: 14,
            },
          },
        },
        yAxis: [
          {
            type: "value",
            name: "单位：kg",
            nameTextStyle: {
              color: "#fff",
              fontSize: 14,
            },
            splitLine: {
              show: true,
              lineStyle: {
                width: 1,
                color: "#3d5269",
              },
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#fff",
                fontSize: 14,
              },
            },
          },
          {
            type: "value",
            name: "单位：%",
            nameTextStyle: {
              color: "#fff",
              fontSize: 14,
            },
            position: "right",
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#396A87",
                width: 2,
              },
            },
            axisLabel: {
              show: true,
              formatter: "{value} ", //右侧Y轴文字显示
              textStyle: {
                color: "#fff",
                fontSize: 14,
              },
            },
          },
        ],
        series: [
          {
            name: "吊装重量",
            type: "bar",
            barWidth: 18,
            itemStyle: {
              normal: {
                color: "#00ca95",
              },
            },
            data: [24, 45, 43, 35, 76, 154, 86, 42, 68, 97, 24, 34],
          },

          {
            name: "载重百分比",
            type: "line",
            yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
            showAllSymbol: true, //显示所有图形。
            symbol: "circle", //标记的图形为实心圆
            symbolSize: 10, //标记的大小
            itemStyle: {
              //折线拐点标志的样式
              color: "#be00ca",
              borderColor: "#fff",
              width: 5,
              shadowColor: "#be00ca",
              shadowBlur: 5,
            },
            lineStyle: {
              color: "#be00ca",
              width: 3,
              shadowColor: "rgba(0, 0, 0, 0.3)", //设置折线阴影
              shadowBlur: 10,
              shadowOffsetY: 10,
            },
            data: [4.2, 3.5, 2.9, 7.8, 2, 3, 4.2, 3.5, 2.9, 7.8, 2, 3],
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0.6,
                      color: "#be00ca",
                    },
                    {
                      offset: 1,
                      color: "rgba(255, 255, 255, 0.1)",
                    },
                  ],
                  false
                ),
              },
            },
          },
        ],
      };
      pieOne.setOption(option);
    },
  },
};
</script>