<template>
  <div class="cus-body">
    <div class="cus-header">
      <div class="cus-title">
        <span>{{ option.title }}</span>
      </div>
    </div>
    <div class="cus-cont">
      <div class="control-box">
        <div class="date-pick-box">
          <el-date-picker
                  size="mini"
                  :clearable="false"
                  :editable="false"
                  @change="dayRecord"
                  v-model="date"
                  :picker-options="pickerOptions"
                  type="daterange"
                  value-format="yyyy-MM-dd"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
          >
          </el-date-picker>
        </div>
      </div>
      <div class="chart-wrap">
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
    name: "EnvNoiseHistory",
    components: {
      ECharts,
    },
    props: {
      option: Object,
      component: Object,
    },
    data() {
      return {
        date: [this.dayjs().subtract(30, 'day').format('YYYY-MM-DD'), this.dayjs().format('YYYY-MM-DD'),],
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
        },
        devList: [],
        chartData: {
          "itemData": ["10/01", "10/02", "10/03", "10/04", "10/05", "10/06","10/07", ],
          "seriesData": [980, 302, 150, 57, 231, 300, 200]
        },
      };
    },
    created() {
      axios.defaults.headers.common["Authorization"] = getUrlParames("token");
    },
    mounted() {
      this.dayRecord();
    },
    methods: {
      dayRecord() {
        let url = `/prod-api/wisdomScreen/dust/wsDust/noiseTrend`;
        axios
          .get(url, {
            params: {
              equipmentNo: this.serialNumber,
              startTime: this.date[0],
              endTime: this.date[1]
            },
          })
          .then((res) => {
            if (res.data.code === 200) {
              let chartData = res.data.rows
              this.chartData = {
                itemData: chartData.map(e => e.recordTime),
                seriesData: chartData.map(e => e.noise)
              }
            }
          });
      },
    },
    computed: {
      ...mapGetters({
        serialNumber: 'envSN'
      }),
      chartOption() {
        let sourceBar =  this.chartData;
        let itemData = sourceBar.itemData;
        let seriesData = sourceBar.seriesData;
        let tooltip = sourceBar.tooltip
        let color = ['#00b9f6', '#38a97d', '#004eff', '#17c7e7', '#4e85ea', '#e49be9', '#078d9d', '#eca52a', '#ef9544', '#ea3b3b']
        let data = {};
        for (let k in itemData) {
          data[itemData[k]] = seriesData[k];
        }

        let xAxisData = [];
        let dataArr = [];
        for (let i in data) {
          xAxisData.push(i);
          dataArr.push(data[i]);
        }
        const option = {
          grid: {
            top: "15%",
            left: "10%",
            right: "2%",
            bottom: "25%",
            // containLabel: true
          },
          tooltip: {
            show: true,
          },
          dataZoom: [
            {
              type: "inside",
              startValue:15,
              // start: 0,
              // end: 40,
            },
            {
              type: "slider",
              start: 40,
              height: 15,
              borderColor: "transparent",
              fillerColor: "#1b90fe",
              handleSize: 0,
              backgroundColor: "#1A4994",
              showDetail: false,
              showDataShadow: false,
              bottom: 15,
            },
          ],
          xAxis: [{
            show: true,
            type: 'category',
            nameGap: 8,
            axisLabel: {
              color: "#fff",
            },
            axisLine: {
              show: true,
            },
            data: xAxisData
          }, {
            type: 'category',
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            splitArea: {
              show: false
            },
            splitLine: {
              show: false
            },
            data: xAxisData
          }, {
            type: 'category',
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            splitArea: {
              show: false
            },
            splitLine: {
              show: false
            },
            data: xAxisData
          }],
          yAxis: {
            type: 'value',
            name: '单位:(db)',
            nameTextStyle: {
              fontSize: 12,
              fontFamily: 'Microsoft YaHei',
              color: '#fff'
            },
            minInterval: 1,
            nameLocation: 'end',
            nameGap: 10,
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(255,255,255,0.1)",
              },
            },
            axisLabel: {
              show: true,
              fontSize: 12,
              fontFamily: 'Arial',
              color: "#fff"
            },
            axisLine: {
              show: false,
            }
          },
          series: [{
            type: 'bar',
            stack: 1,
            xAxisIndex: 0,
            barWidth: 5,
            barGap: 5,
            z: 2,
            data: function() {
              let itemArr = [];
              for (let i = 1; i < (dataArr.length + 1); i++) {
                let item = {
                  value: dataArr[i - 1],
                  itemStyle: {
                    normal: {
                      barBorderRadius: 50,
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: color[translateColor(i) * 2 - 2]
                      }, {
                        offset: 1,
                        color: color[translateColor(i) * 2 - 1]
                      }]),
                    }
                  }
                };
                itemArr.push(item);
              }
              return itemArr;
            }()
          },
            {
              type: 'scatter',
              stack: 1,
              symbolOffset: [0, 0], //相对于原本位置的偏移量
              label: {
                normal: {
                  show: false,
                }
              },
              xAxisIndex: 2,
              symbolSize: 10,
              z: 2,
              data: function() {
                let itemArr = [];
                for (let i = 1; i < (dataArr.length + 1); i++) {
                  let item = {
                    value: 0,
                    itemStyle: {
                      normal: {
                        borderColor: '#fff',
                        borderWidth: 2,
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                          offset: 0,
                          color: color[translateColor(i) * 2 - 2]
                        }, {
                          offset: 1,
                          color: color[translateColor(i) * 2 - 1]
                        }]),
                      }
                    }
                  };
                  itemArr.push(item);
                }
                return itemArr;
              }()
            },
            {
              type: 'bar',
              xAxisIndex: 1,
              barGap: '140%',
              data: dataArr,
              barWidth: 11,
              itemStyle: {
                normal: {
                  barBorderRadius: 50,
                  color: '#0e2147'
                }
              },
              z: 1
            },
            {
              type: 'bar',
              xAxisIndex: 2,
              barWidth: 15,
              barGap: 1,
              z: 0,
              data: function() {
                let itemArr = [];
                for (let i = 1; i < (dataArr.length + 1); i++) {
                  let item = {
                    value: dataArr[i - 1],
                    itemStyle: {
                      normal: {
                        barBorderRadius: 50,
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                          offset: 0,
                          color: color[translateColor(i) * 2 - 2]
                        }, {
                          offset: 1,
                          color: color[translateColor(i) * 2 - 1]
                        }]),
                      }
                    }
                  };
                  itemArr.push(item);
                }
                return itemArr;
              }()
            },
            {
              type: 'scatter',
              hoverAnimation: false,
              xAxisIndex: 2,
              symbolOffset: [0, 0], //相对于原本位置的偏移量
              symbolSize: 15,
              z: 2,
              data: function() {
                let itemArr = [];
                for (let i = 1; i < (dataArr.length + 1); i++) {
                  let item = {
                    value: 0,
                    itemStyle: {
                      normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                          offset: 0,
                          color: color[translateColor(i) * 2 - 2]
                        }, {
                          offset: 1,
                          color: color[translateColor(i) * 2 - 1]
                        }]),
                      }
                    }
                  };
                  itemArr.push(item);
                }
                return itemArr;
              }()
            }
          ]
        };

        function translateColor(index) {
          if (index > 5) {
            return translateColor(index - 5)
          }
          return index
        }

        return option
      },
      fontSize() {
        return (this.option.fontSize || 30) + "px";
      },
    },
    watch: {
      serialNumber: function () {
        this.dayRecord();
      }
    }
  };
</script>
<style lang="scss" scoped>
  .cus-body {
    padding: 15px;
    box-sizing: border-box;
    .control-box{
      position: absolute;
      right: 20px;
      top: 40px;
      z-index: 99;
      /*width: 100%;*/
      .day-type {
        display: inline-block;
        margin: 0 20px 0 10px;
        /deep/.el-radio-button__inner {
          background: none;
          border-color: #428be5;
          color: #eeeeee;
        }
        /deep/.el-radio-button__orig-radio:checked + .el-radio-button__inner {
          background-color: #409eff;
        }
      }
      .date-pick-box {
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
    .chart-wrap {
      width: 100%;
      height: 100%;
      position: relative;
      .echarts {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
