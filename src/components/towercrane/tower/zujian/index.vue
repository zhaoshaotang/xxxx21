<template>
  <div class="piebody">
    <div class="jl-chart" :id="`chart${option.domId}`"></div>
  </div>
</template>
<script>
export default {
  name: "zujian",
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
      var xData = [
        "09/10",
        "09/11",
        "09/12",
        "09/13",
        "09/14",
        "09/15",
        "09/10",
        "09/11",
        "09/12",
        "09/13",
        "09/14",
        "09/15",
        "09/10",
        "09/11",
        "09/12",
        "09/13",
        "09/14",
        "09/15",
        "09/10",
        "09/11",
        "09/12",
        "09/13",
        "09/14",
        "09/15",
        "09/10",
        "09/11",
        "09/12",
        "09/13",
        "09/14",
        "09/15",
      ];
      var option = {
        title: {
          text: "工作循环次数",
          x: "left",
          textStyle: { color: "#00deff", fontSize: "20", fontWeight: "bold" },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
            textStyle: {
              color: "#fff",
            },
          },
        },
        grid: {
           width:"694px",
            height:"358px",
         bottom:90,
          textStyle: {
            color: "#fff",
          },
        },
        legend: {
          x: "45%",
          top: "8%",
          textStyle: {
            color: "#90979c",
          },
          data: ["工作次数", "违章次数"],
        },

        calculable: true,
        xAxis: [
          {
            type: "category",
            axisLine: {
              lineStyle: {
                color: "#90979c",
              },
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitArea: {
              show: false,
            },
            axisLabel: {
              interval: 0,
            },
            data: xData,
          },
        ],
        yAxis: [
          {
            name: "（单位:次）",
            axisLine: {
              show: false,
              lineStyle: {
                color: "#fff",
              },
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              interval: 0,
            },
          },
          {
            // type: "value",
            name: "单位：次",
            nameTextStyle: {
              color: "#fff",
              fontSize: 14,
            },
            position: "right",
            axisLine: {
              show: false,
              lineStyle: {
                color: "#fff",
                // width: 2,
              },
            },
            axisLabel: {
              interval: 0,
            },
          },
        ],
        dataZoom: [
          {
            fillerColor: "#1b90fe",

            show: true,
            height: 30,
            xAxisIndex: [0],
            bottom: 30,
            start: 5,
            end: 12,
            // handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
            // handleSize: '110%',
            handleStyle: {
              color: "#1a4895",
              backgroundColor: "#1b90fe",
            },
            textStyle: false,
            borderColor: "#1b90fe",
            backgroundColor: "#1a4895",
          },
          {
            type: "inside",
            show: true,
            height: 15,
            start: 1,
            end: 35,
          },
        ],
        series: [
          {
            name: "工作次数",
            type: "bar",
            stack: "总量",
            barMaxWidth: 35,
            barGap: "10%",
            itemStyle: {
              normal: {
                color: "#00b9ff",
                label: {
                  //   show: true,
                  textStyle: {
                    color: "#fff",
                  },
                  position: "inside",
                  formatter: function (p) {
                    return p.value > 0 ? p.value : "";
                  },
                },
              },
            },
            data: [
              709,
              1917,
              2455,
              2610,
              1719,
              1433,
              1544,
              3285,
              5208,
              3372,
              2484,
              4078,
              709,
              1917,
              2455,
              2610,
              1719,
              1433,
              1544,
              3285,
              5208,
              3372,
              2484,
            ],
          },

          {
            name: "违章次数",
            type: "bar",
            stack: "总量",
            itemStyle: {
              normal: {
                color: "#e87b50",
                barBorderRadius: 0,
                label: {
                  //   show: true,
                  position: "inside",
                  formatter: function (p) {
                    return p.value > 0 ? p.value : "";
                  },
                },
              },
            },
            data: [
              327,
              1776,
              507,
              1200,
              800,
              482,
              204,
              1390,
              1001,
              951,
              381,
              220,
              709,
              1917,
              2455,
              2610,
              1719,
              1433,
              1544,
              3285,
              5208,
              3372,
              2484,
            ],
          },
        ],
      };
      pieOne.setOption(option);
    },
  },
};
</script>