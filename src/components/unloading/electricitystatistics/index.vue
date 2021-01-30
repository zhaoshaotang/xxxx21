<template>
  <div class="cus-body">
    <div class="cus-header">
      <span class="cus-title">
        <span>{{ option.title }}</span>
      </span>
    </div>

    <div class="piebody">
      <p class="ds">电量百分比</p>
      <div class="jl-chart" :id="`chart${option.domId}`"></div>
    </div>
  </div>
</template>
<script>
import { visUrl, getUrlParames } from "@/api/httpClient.js";
import axios from 'axios';
import { mapGetters, mapActions } from "vuex";
export default {
  name: "electricitystatistics",
  props: {
    option: Object,
    component: Object,
  },
  data() {
    return {
      electricityPercentage: null,
      chartDom: Date.parse(new Date()),
    };
  },
  created() {
    if (this.option.domId === null) {
      this.option.domId = this.chartDom;
    }
    axios.defaults.headers.common["Authorization"] = getUrlParames("token");
    //在这里获取数据
  },
  mounted() {
    this.electricityQuery();
  },
   computed: {
    ...mapGetters({
      serialNumber: "unloadSN",
    }),
  },
  watch: {
    serialNumber: function () {
      this.electricityQuery();
    },
  },
  methods: {
    electricityQuery() {
      let url = `/prod-api/wisdomScreen/unloading/wsUnloading/unloadingRealTimeData`;
      axios
        .get(url, {
          params: {
            equipmentNo: this.serialNumber,
          },
        })
        .then((res) => {
          if (res.data.code === 200) {
             let row = res.data.data;
             this.addPie(row.electricityPercentage);
          }
        });
    },
    addPie(electricityPercentage) {
      let pieOne = echarts.init(
        document.getElementById(`chart${this.option.domId}`)
      );
      const handred = 100;
      let point = electricityPercentage;

      var option = {
        title: {
          text: point + "%",

          x: "center",
          y: "center",
          textStyle: {
            fontWeight: "normal",
            color: "#29EEF3",
            fontSize: "30",
          },
        },
        tooltip: {
          formatter: function (params) {
            return params.name + "：" + params.percent + " %";
          },
        },
        // legend: {
        //     show: true,
        //     itemGap: 12,
        //     data: ['占比', '剩余']
        // },

        series: [
          {
            name: "circle",
            type: "pie",
            clockWise: true,
            radius: ["50%", "66%"],
            itemStyle: {
              normal: {
                label: {
                  show: false,
                },
                labelLine: {
                  show: false,
                },
              },
            },
            hoverAnimation: false,
            data: [
              {
                value: point,
                name: "已用电量",
                itemStyle: {
                  normal: {
                    color: {
                      // 颜色渐变
                      colorStops: [
                        {
                          offset: 0,
                          color: "#36ccf5", // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#10e69c", // 100% 处的颜色1
                        },
                      ],
                    },
                    label: {
                      show: false,
                    },
                    labelLine: {
                      show: false,
                    },
                  },
                },
              },
              {
                name: "剩余电量",
                value: handred - point,
                itemStyle: {
                  normal: {
                    color: "#053b6d",
                  },
                },
                
              },
            ],
          },
        ],
      };
      pieOne.setOption(option);
      let chartDom = document.getElementsByTagName("avue-draggable");
      console.log(chartDom);
      chartDom.onresize = function () {
        pieOne.resize();
      };
    },
  },
};
</script>
<style scoped>
.ds {
  position: absolute;
  font-size: 18px;
  color: #fff;
  margin-top: 32%;
  padding-left: 40%;
}
</style>