<template>
  <div
    class="cus-body diaoji-page"
    style="margin: 0; padding: 27px; box-sizing: border-box"
  >
    <div class="cus-header">
      <el-select size="small" v-model="queryParams.equipmentNo">
        <el-option
          v-for="item in devList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :hookVideoId="item.hookVideoId"
          @click.native="onChangeStripe(item)"
        >
        </el-option>
      </el-select>
    </div>
    <div id="container">
      <div class="row">
        <div class="col towers" style="position: relative">
          <!-- <div style="background:#0080ff;width:50px;height:50px" :style="{position:'absolute',right: horizontalLine*1 + 20 +'px',top: '100px'}">
          </div> -->
          <div style="position: absolute; top: 13px; left: 43px; padding: 10px">
            <span
              >前臂长:<b>{{
                forearmLong == null ? "" : forearmLong + "米"
              }}</b></span
            ><span
              >塔臂高:<b>{{
                towerArmLong == null ? "" : towerArmLong + "米"
              }}</b></span
            ><span
              >后臂长:<b>{{
                posteriorArmLong == null ? "" : posteriorArmLong + "米"
              }}</b></span
            >
          </div>
          <div
            style="position: absolute; top: 72px; left: 336px; padding: 10px"
            class="stong"
          >
            <p class="bstong" style="margin-left: 16px">
              <b>荷载比</b><b style="margin-left: 16px">力矩比</b>
            </p>
            <p class="data" style="margin-left: 20px">
              <b>{{ loadRatio == null ? "" : loadRatio + "%" }}</b
              ><b style="margin-left: 13px">{{
                torqueRatio == null ? "" : torqueRatio + "%"
              }}</b>
            </p>
          </div>
          <div
            style="position: absolute; top: 228px; left: 21px; padding: 10px"
            class="stong"
          >
            <span
              >风速<b
                style="font-size: 15px; color: #f28114; margin-left: 5px"
                >{{ windSpeed == null ? "" : windSpeed + "m/s" }}</b
              ></span
            >
          </div>
          <div
            style="position: absolute; top: 305px; left: 16px; padding: 10px"
            class="stong"
          >
            <p class="bstong">
              <b>转角</b><b style="margin-left: 24px">倾角</b>
            </p>
            <p class="data">
              <b>{{ corner == null ? "" : corner + "°" }}</b
              ><b style="margin-left: 5px">{{
                angle == null ? "" : corner + "°"
              }}</b>
            </p>
          </div>
          <div
            class="crane-map"
            :style="{
              backgroundImage:
                'url(' +
                require('../../../assets/images/tower/tower-main.png') +
                ')',
            }"
          >
            <div
              class="crane-map-hook"
              :style="{ right: horizontalLine + 'px' }"
            >
              <div class="crane-map-hook__horizontal-line">
                <div
                  class="msg"
                  :style="
                    (horizontalLine >= 150
                      ? 'background-image:url(' +
                        bg5 +
                        ');background-size:100% 100%'
                      : 'background-image:url(' +
                        bg4 +
                        ');background-size:100% 100%') +
                    ';right:' +
                    (horizontalLine >= 150 ? '-172px' : '9px') +
                    ';top:' +
                    ((verticalLine + 12) / 2 + 'px')
                  "
                >
                  <div class="msg-li">
                    <div class="msg-tit">吊重</div>
                    <div class="msg-value" style="margin-top: 7px">
                      {{ liftingWeight == null ? "" : liftingWeight + "t" }}
                    </div>
                  </div>
                  <div class="msg-li">
                    <div class="msg-tit">幅度</div>
                    <div class="msg-value" style="margin-top: 7px">
                      {{ ranges == null ? "" : ranges + "m" }}
                    </div>
                  </div>
                  <div class="msg-li">
                    <div class="msg-tit">高度</div>
                    <div class="msg-value" style="margin-top: 7px">
                      {{ liftingheight == null ? "" : liftingheight + "m" }}
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="crane-map-hook__vertical-line"
                :style="{
                  height: verticalLine + 'px',
                }"
              ></div>
              <div class="crane-map-hook__snaps"></div>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="running-status">
            <div>
              <div class="running-status-cell running-status-left">
                <div class="running-status-cell-title">运行状态</div>
                <div class="running-status-cell-content">
                  <div class="running-status-text">
                    工作时长：{{ workingHours }}
                  </div>
                  <div class="running-status-text">
                    今日吊次：{{ todayHoistingTimes }}次
                  </div>
                  <div class="running-status-text">
                    今日吊重：{{ todayLiftingWeight }}T
                  </div>
                  <div class="running-status-text">
                    今日功效：{{ todayEffect }}T/min
                  </div>
                  <div class="running-status-text">
                    今日报警：{{ todayCallPolice }}次
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="running-status-cell">
                <div
                  class="running-status-cell-title running-status-driver-title"
                >
                  驾驶员信息
                </div>
                <div class="running-status-cell-content">
                  <div class="running-status-driver">
                    <div>
                      <div class="running-status-driver-left">
                        <img :src="photoAddress?photoAddress: require('./two.png')"  class="running-status-driver-logo" />
                      </div>
                    </div>
                    <div>
                      <div class="running-status-driver-text">
                        <p>认证时间：{{ identificationTime }}</p>
                        <p>身份证号：{{ idNumber }}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="running-status-driver">
                  <div>
                    <div class="running-status-driver-left">
                      <div>{{ driversName }}</div>
                    </div>
                  </div>
                  <div>
                    <div class="running-status-driver-text">
                      <el-button type="primary" size="mini">{{identificationTime?"已认证":"未认证"}}</el-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="running-status-chart">
              <div class="running-status-cell">
                <div
                  class="running-status-cell-title"
                  style="text-align: right"
                >
                  <el-button
                    type="primary"
                    size="mini"
                    class="btn-violation"
                    style="height: 26px; font-weight: bold"
                    @click="checkViolation"
                    >查看违章</el-button
                  >
                </div>
              </div>
              <ECharts
                v-if="pieOption1"
                ref="chart"
                class="chartson1"
                :options="pieOption1"
                autoresize
              />
            </div>
          </div>
          <div class="process">
            <div
              :id="playerConfig.id"
              :style="rootStyle"
              class="xg-player"
            ></div>
            <div style="width: 49%; height: 100%">
              <!-- 进度条 -->
              <el-row
                style="padding-right: 0px; height: 100%; padding-left: 0px"
              >
                <el-col
                  :span="12"
                  v-for="(item, index) in arr"
                  :key="index"
                  style="margin-bottom: 12px"
                >
                  <proess :item="item" v-if="item" :inder="index"></proess>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div style="text-align: left;color: #00DEFF;font-size: 16px;float: left;">设备状态分析</div>
          <div style="text-align: right;float: right;">
            <el-button
              :autofocus="true"
              style="border-radius: 15% 0 0 15%"
              checked
              @click="equipmentStatusAnalysis(20)"
              :class="{ bgc: index == 20 }"
              >近20次</el-button
            >
            <el-button
              
              :class="{ bgc: index == 50 }"
              @click="equipmentStatusAnalysis(50)"
              >近50次</el-button
            >
            <el-button
              style="border-radius: 0 15% 15% 0"
              :class="{ bgc: index == 200 }"
              @click="equipmentStatusAnalysis(200)"
              >近200次</el-button
            >
          </div>
          <ECharts
            style="wdith: 100%; height: 114%;overflow: hidden;"
            ref="chart"
            :options="zhuOption"
            autoresize
          />
        </div>
        <div class="col">
          <div style="text-align: left;color: #00DEFF;font-size: 16px;float: left;">工作循环次数</div>
          <div style="text-align: right;float: right;">
            <el-button
              :autofocus="true"
              style="border-radius: 15% 0 0 15%"
              checked
              @click="getHoistingCycle(1)"
              :class="{ bgc2: index2 == 1 }"
              >近7日</el-button
            >
            <el-button           
              @click="getHoistingCycle(2)"
              :class="{ bgc2: index2 == 2 }"
              >近15日</el-button
            >
            <el-button
              style="border-radius: 0 15% 15% 0"
              @click="getHoistingCycle(3)"
              :class="{ bgc2: index2 == 3 }"
              >近30日</el-button
            >
          </div>
          <ECharts style="overflow: hidden;" class="echarts" :options="towerOption" autoresize />
        </div>
      </div>
    </div>
    <more-data
      :dialogFlag.sync="dialogFlag"
      :equipmentNo="queryParams.equipmentNo"
      :equipmentNoName="queryParams.equipmentNoName"
    />
  </div>
</template>
<script>

import { visUrl, getUrlParames } from "@/api/httpClient.js";
import MoreData from "./more";
import "xgplayer";
import hlsjsPlayer from "xgplayer-hls.js";
import { mapGetters } from "vuex";
import axios from "axios";
import Option from "@/components/custeom/option.vue";
import cg from "@/assets/tower-main.png";
import bg3 from "@/assets/xia.png";
import bg4 from "@/assets/yan.png";
import bg5 from "@/assets/che.png";
import ECharts from "vue-echarts";
import proess from "@/components/towercrane/tower/process/index.vue";
export default {
  name: "tower",
  components: { ECharts, proess, MoreData },
  props: {
    option: Object,
    component: Object,
  },
  computed: {
    ...mapGetters({
      serialNumber: "washSN",
    }),
    fontSize() {
      return (this.option.fontSize || 30) + "px";
    },
  },
  data() {
    return {
      dialogFlag: false,
      safeNum: 0,// 安装吊装次数
      bg4: bg4,
      bg5: bg5,
      pieOption1:null,
      // 饼图安全吊装不合格
      safeHoistingNumber: "",
      unqualifiedNumber: "",
      loadRatio: "", //荷载比
      torqueRatio: "", //力矩比
      forearmLong: "", //前臂长
      towerArmLong: "", //塔臂高
      posteriorArmLong: "", //后臂长
      ranges: "", //幅度
      maxRange: "", //最大幅度
      minRange: "", //最小幅度
      corner: "", //转角
      maxCorner: "", //最大转角
      minCorner: "", //最小转角
      liftingheight: "", //吊高
      maxLiftingheight: "", //最大吊高
      minLiftingheight: "", //最小吊高
      windSpeed: "", //风速
      maxWindSpeed: "", //最大风速
      minWindSpeed: "", //最小风速
      liftingWeight: "", //吊重
      allowLiftingWeight: "", //当前允许吊重
      maxLiftingWeight: "", //最大吊重
      minLiftingWeight: "", //最小吊重
      angle: "", //倾角
      maxAngle: "", //最大倾角
      minAngle: "", //最小倾角
      heightState: null, //监控状态：高度(0正常 1预警 2报警)
      rangeState: null, //监控状态：幅度(0正常 1预警 2报警)
      rotationState: null, //监控状态：回转(0正常 1预警 2报警 )
      interferenceState: null, //监控状态：干涉(0正常  1预警  2报警)
      interferenceStateUpper: null, //干涉上
      interferenceStateLower: null, //干涉下
      interferenceStateFront: null, //干涉前
      interferenceStateAfter: null, //干涉后
      interferenceStateLeft: null, //干涉左
      interferenceStateRight: null, //干涉右
      antiCollisionState: null, //监控状态：防碰撞(0正常  1预警  2报警)
      antiCollisionStateUpper: null, //防碰撞上
      antiCollisionStateLower: null, //防碰撞下
      antiCollisionStateFront: null, //防碰撞前
      antiCollisionStateAfter: null, //防碰撞后
      antiCollisionStateLeft: null, //防碰撞左
      antiCollisionStateRight: null, //防碰撞右
      windSpeedState: null, //监控状态：风速(0正常 1预警 2报警)
      tiltState: null, //监控状态：倾斜(0正常 1预警 2报警)
      overweightState: null, //监控状态：超重(0正常  1预警  2报警)
      /**
       * 运行状态
       */
      workingHours: "",
      todayHoistingTimes: "",
      todayLiftingWeight: "",
      todayEffect: "",
      todayCallPolice: "",
      index2: 1,
      /**
       * 驾驶员信息
       */
      driversName: "",
      idNumber: "",
      identificationTime: "",
      photoAddress: "",

      devList: [],
      totallist:0,
      queryParams: {
        hookVideoId: null,
        equipmentNo: "",
        equipmentNoName: "",
        projectId: null,
        companyId: null,
        frequency: null,
        queryType: null,
      },
      arr: [],
      myfuDate: [],
      value: "",
      cg: cg,
      horizontalLine: 276, // 水平方向线条的距离右侧位移 maxLength:280
      horizontalLineMax: 256,
      // 水平像素范围除以最大前臂长为1m对应的实际像素
      /**
       * this.horizontalLine = 280/this.forearmLong
       */
      /**
       * (this.maxLiftingheight = row.maxLiftingheight); //最大吊高
              (this.minLiftingheight = row.minLiftingheight), //最小吊高
              (this.forearmLong = row.forearmLong), //前臂长
              // 实际的高度为 线索最大范围除以(最大吊高-最小)为一米实际对应多少像素，所以未280-32 - 线索最大范围除以(最大吊高-最小)
              this.verticalLine = 280 - 32 - ((280-32)/(this.maxLiftingheight - this.minLiftingheight) * this.minLiftingheight)
       */
      verticalLine: 240, // 垂直方向线条的高度 maxHeight:280
      verticalLineMax: 280,
      bg3: bg3,
      index: 20,
      // 第二个图
      zhuOption: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
            label: {
              show: true,
            },
          },
          formatter: function (params) {
            //自动提示工具
            var params0Value = params[0].value + "kg";
            var params1Value = params[1].value + "%";
            return (
              params[0].axisValue +
              "<br />" +
              params[0].marker +
              "吊装重量：" +
              params0Value +
              "<br />" +
              params[1].marker +
              "载重百分比：" +
              params1Value +
              "<br />"
            );
          },
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
              color: "#223867",
              width: 1,
            },
          },
          axisLabel: {
            textStyle: {
              fontFamily: "Microsoft YaHei",
              color: "#fff", //X轴文字颜色
              fontSize: 14,
            },
            lineHeight: 30,
          },
        },
        grid: {
          left: "5%",
          right: "5%",
          bottom: "34%",
          containLabel: true,
          height: "50%",
        },
        dataZoom: [
          {
            type: "inside",
            startValue:25,
            // start: 0, 
            // end: 20,
            // zoomOnMouseWheel: true,
          },
          {
            type: "slider",
            start: 60,
            realtime: true,
            fillerColor: "#1b90fe",
            showDetail: false,
            handleSize: "7%",
            textStyle: true,
            bottom: "25%",
            borderColor: "#1769c3",
            backgroundColor: "#1a4896",
          },
          {
            type: "inside",
            realtime: true,
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "（单位:kg）",
            nameTextStyle: {
              color: "#fff",
              fontSize: 14,
            },
            splitLine: {
              lineStyle: {
                width: 1,
                color: "#354c99",
              },
            },

            axisLabel: {
              textStyle: {
                color: "#fff",
                fontSize: 14,
              },
            },
          },
          {
            type: "value",
            nameTextStyle: {
              color: "#396A87",
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
              show: false,
              // formatter: "{value} %", //右侧Y轴文字显示
              textStyle: {
                color: "#396A87",
                fontSize: 14,
              },
            },
          },
        ],
        series: [
          {
            name: "吊装重量",
            type: "bar",
            barWidth: '40%',
            barGap: 15,
            stack:'堆叠',
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#00FFFF",
                  },
                  {
                    offset: 1,
                    color: "#0080FF",
                  },
                ]),
              },
            },
            data: [24, 45, 43, 35, 76, 154, 86, 42, 68, 97, 24, 34],
          },
          {
            name: "载重百分比",
            barWidth: '40%',
            barGap: 15,
            stack:'堆叠',
            type: "line",
            yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
            showAllSymbol: true, //显示所有图形。
            symbol: "circle", //标记的图形为实心圆
            symbolSize: 5, //标记的大小
            itemStyle: {
              //折线拐点标志的样式
              color: "#fff",
              borderColor: "#fff",
              width: 10,
              shadowColor: "#fff",
              shadowBlur: 5,
              normal: {
                    lineStyle: {
                      width:3,// 0.1的线条是非常细的了
                      color: "#ff0d00",
                    }
                }
            },
            lineStyle: {
              color: "#ff0d00",
              width: 5,
              shadowBlur: 2,
            },
            data: [4.2, 3.5, 2.9, 7.8, 2, 3, 4.2, 3.5, 2.9, 7.8, 2, 3],
          },
        ],
      },
      // 第3个图
      towerOption: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function (params) {
            
            //自动提示工具
            var params0Value = params[0].value + "次";
            var params1Value = params[1].value + "次";
            return (
              params[0].axisValue +
              "<br />" +
              params[0].marker +
              "工作次数：" +
              params0Value +
              "<br />" +
              params[1].marker +
              "违章次数：" +
              params1Value +
              "<br />"
            );
          },
        },
        legend: {
          selectedMode: false, //取消图例上的点击事件
          data: ["工作次数", "违章次数"],
          textStyle: {
            color: "#fff",
            fontSize: 14,
          },
        },
        grid: {
          left: "5px",
          right: "4%",
          bottom: "45px",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: [],
            axisLabel: {
              // 坐标轴刻度标签的相关设置
              show: true, //控制显隐
              textStyle: {
                color: "#fff", //x轴字体颜色
                fontSize: 12, 
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "（单位:次）",
            nameTextStyle: {
              color: "#fff",
              fontSize: 14,
            },
           minInterval:1,
          },
        ],
        dataZoom: [
          {
            type: "inside",
            startValue:20,
            // start: 0,
            // end: 20,
            // zoomOnMouseWheel: true,
          },
          {
            type: "slider",
            start: 50,
            realtime: true,
            fillerColor: "#1b90fe",
            showDetail: false,
            handleSize: "10%",
            textStyle: true,
            bottom: "5%",
            borderColor: "#1769c3",
            backgroundColor: "#1a4896",
          },
          {
            type: "inside",
            realtime: true,
          },
        ],
        series: [
          {
            name: "工作次数",
            type: "bar",
            stack: "饱和度",
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "#3A5DFF", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#00E3FF", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
            data: [],
          },
          {
            name: "违章次数",
            type: "bar",
            stack: "饱和度",
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "#F23939", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#E78151", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
            data: [],
          },
        ],
      },
      player: null,
      rootStyle: {
        width: "100%",
        height: "100%",
      },
      playerConfig: {
        id: "vs",
        url:
          "http://hls01open.ys7.com/openlive/cf388d27a62649b085b6d3ecdcb0cf9f.m3u8",
        autoplay: true,
        playsinline: true,
        fluid: false,
        loop: true,
      },
      timeOut: null,
    };
  },
  created() {
    if (getUrlParames("userType") == 1) {
      //项目级
      this.queryParams.projectId = getUrlParames("userId");
    } else {
      //企业级
      this.queryParams.companyId = getUrlParames("userId");
    }
    axios.defaults.headers.common["Authorization"] = getUrlParames("token");
    this.deviceInformation();
  },
  mounted() {
    this.queryDeviceList();
    this.deviceInformation(); 
    this.onAtuoMove();
     setInterval(() => {
                 this.deviceInformation(); 
              }, 30000);
  },
  beforeDestroy() {
    this.player &&
      typeof this.player.destroy === "function" &&
      this.player.destroy();
  },
  watch: {
    serialNumber: function () {
      this.washcarVideo();
    },
  },
  methods: {
    checkViolation() {
      this.dialogFlag = true;
    },
    onChangeStripe(item) {
      this.queryParams.hookVideoId = item.hookVideoId;
      this.queryParams.equipmentNoName = item.label + "违章详情";
      
      this.deviceInformation();
      this.hookVideoDetails();
      this.equipmentStatusAnalysis(50);
      this.getHoistingCycle(2);
      
    },
    queryDeviceList() {
      let url = `/prod-api/wisdomScreen/towerCrane/wsTowerCrane/queryDeviceList`;
      axios
        .get(url, {
          params: this.queryParams,
        })
        .then(async (res) => {
          if (res.data.code === 200) {
            let rows = res.data.rows;
            this.devList = rows.map((e) => {
              return {
                value: e.equipmentNo,
                label: e.towerCraneName,
                hookVideoId: e.hookVideoId,
              };
            });
            this.queryParams.equipmentNo = rows[0].equipmentNo;
            this.queryParams.hookVideoId = rows[0].hookVideoId;
            this.queryParams.equipmentNoName =
              rows[0].towerCraneName + "违章详情";
            this.hookVideoDetails();
            this.equipmentStatusAnalysis(50);
            await this.getHoistingCycle(2);
             this.deviceInformation(); 
           
          }
        });
    },
    deviceInformation() {
      let url = `/prod-api/wisdomScreen/towerCrane/wsTowerCrane/deviceInformation`;
      axios
        .get(url, {
          params: this.queryParams,
        })
        .then((res) => {
          if (res.data.code === 200) {
            let row = res.data.data;
            this.loadRatio = row.loadRatio; //荷载比
            this.torqueRatio = row.torqueRatio; //力矩比
            this.forearmLong = row.forearmLong; //前臂长计算的，，，实际总长度2222
            this.towerArmLong = row.towerArmLong; //塔臂高要用到的，，实际总长度111111
            this.posteriorArmLong = row.posteriorArmLong; //后臂长
            this.ranges = row.ranges; //幅度小车动的变量，，，当前工作长度2222
            this.maxRange = row.maxRange; //最大幅度
            this.minRange = row.minRange; //最小幅度
            this.corner = row.corner; //转角
            this.maxCorner = row.maxCorner; //最大转角
            this.minCorner = row.minCorner; //最小转角
            this.liftingheight = row.liftingheight; //钩子吊高，，当前工作长度11111111111
            this.maxLiftingheight = row.maxLiftingheight; //最大吊高
            this.minLiftingheight = row.minLiftingheight; //最小吊高
            this.onAtuoMove(
              row.forearmLong,
              row.ranges,
              row.towerArmLong,
              row.liftingheight
            );
            this.windSpeed = row.windSpeed; //风速
            this.maxWindSpeed = row.maxWindSpeed; //最大风速
            this.minWindSpeed = row.minWindSpeed; //最小风速
            this.liftingWeight = row.liftingWeight; //吊重
            this.allowLiftingWeight = row.allowLiftingWeight; //当前允许吊重
            this.maxLiftingWeight = row.maxLiftingWeight; //最大吊重
            this.minLiftingWeight = row.minLiftingWeight; //最小吊重
            this.angle = row.angle; //倾角
            this.maxAngle = row.maxAngle; //最大倾角
            this.minAngle = row.minAngle; //最小倾角
            this.heightState = row.heightState; //监控状态：高度 0正常 1预警 2报警)
            this.rangeState = row.rangeState; //监控状态：幅度 0正常 1预警 2报警)
            this.rotationState = row.rotationState; //监控状态：回转 0正常 1预警 2报警 )
            this.interferenceState = row.interferenceState; //监控状态：干涉 0正常  1预警  2报警)
            this.antiCollisionState = row.antiCollisionState; //监控状态：防碰撞 0正常  1预警  2报警)
            this.windSpeedState = row.windSpeedState; //监控状态：风速 0正常 1预警 2报警)
            this.tiltState = row.tiltState; //监控状态：倾斜 0正常 1预警 2报警)
            this.overweightState = row.overweightState; //监控状态：超重 0正常  1预警  2报警)当前载重
            this.workingHours = row.workingHours; //工作时长
            this.todayHoistingTimes = row.todayHoistingTimes; //今日吊次
            this.todayLiftingWeight = row.todayLiftingWeight; //今日吊重
            this.todayEffect = row.todayEffect; //今日功效
            this.todayCallPolice = row.todayCallPolice; //今日报警
            this.driversName = row.driversName; //姓名
            this.idNumber = row.idNumber; //身份证号
            this.identificationTime = row.identificationTime; //身份确认时间
            this.photoAddress = row.photoAddress; //照片地址
            this.safeHoistingNumber = row.safeHoisting; //安全吊装
            this.unqualifiedNumber = row.unqualified; //不合格
            var colorList = [
              new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                {
                  offset: 0,
                  color: "#ff4236",
                },
                {
                  offset: 1,
                  color: "#f6e3a1",
                },
              ]),
              new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                {
                  offset: 0,
                  color: "#348fe6",
                },
                {
                  offset: 1,
                  color: "#625bef",
                },
              ]),
            ];   
            this.$nextTick(()=>{
              this.pieOption1 = {
                title: {
                  text: "今日违\n章统计",
                  x: "center",
                  y: "center",
                  textStyle: {
                    fontSize: 12,
                    color: "#00DEFF",
                  },
                },
                series: [
                  {
                    type: "pie",
                    center: ["50%", "50%"],
                    radius: ["45%", "55%"],
                    hoverOffset: 15,
                    itemStyle: {
                      normal: {
                        color: function (params) {
                          return colorList[params.dataIndex];
                        },
                      },
                    },
                    label: {
                      position: "outside",
                      normal: {
                        formatter: "{b}\n{c}次",
                        color: "#ffffff",
                        fontSize: 11,
                      },
                    },
                    labelLine: {
                      normal: {
                        length: 6, //上下
                        length2: 0, //左右
                        lineStyle: {
                          width: 0,
                        },
                      },
                    },
                    data: [
                      {
                        name: "不合格",
                        value: row.unqualified,
                      },
                      {
                        name: "安全吊装",
                        value: `${this.safeNum}`,
                      },
                    ],
                  },
                ],
              };
              
            })
            var arr = [];
            arr[0] = {
              name: "高度(m)",
              value: row.liftingheight,
              type: row.maxLiftingheight ? 1 : 2, //1安照计算百分比填充  2 默认100% 填满
              width: (row.liftingheight / row.maxLiftingheight) * 100,
              min: row.minLiftingheight ? row.minLiftingheight : "",
              max: row.maxLiftingheight ? row.maxLiftingheight : "",
              color: row.maxLiftingheight
                ? ""
                : row.heightState == 0
                ? "col1"
                : row.heightState == 1
                ? "col0"
                : "col7",
            };
            arr[1] = {
              name: "幅度(m)",
              value: row.ranges,
              type: row.maxRange ? 1 : 2,
              width: (row.ranges / row.maxRange) * 100,
              min: row.minRange ? row.minRange : "",
              max: row.maxRange ? row.maxRange : "",
              color: row.maxRange
                ? ""
                : row.rangeState == 0
                ? "col1"
                : row.rangeState == 1
                ? "col0"
                : "col7",
            };
            arr[2] = {
              name: "回转(°)",
              value: row.corner,
              type: row.maxCorner ? 1 : 2,
              width: (row.corner / row.maxCorner) * 100,
              min: row.minCorner ? row.minCorner : "",
              max: row.maxCorner ? row.maxCorner : "",
              color: row.maxCorner
                ? ""
                : row.rotationState == 0
                ? "col1"
                : row.rotationState == 1
                ? "col0"
                : "col7",
            };
            arr[3] = {
              name: "当前载重(t)",
              value: row.liftingWeight,
              type: row.maxLiftingWeight ? 1 : 1,
              width: (row.liftingWeight / row.maxLiftingWeight) * 100,
              min: row.minLiftingWeight ? row.minLiftingWeight : "",
              max: row.maxLiftingWeight ? row.maxLiftingWeight : "",
              color: row.maxLiftingWeight
                ? ""
                : row.overweightState == 0
                ? "col1"
                : row.overweightState == 1
                ? "col0"
                : "col7",
            };
            arr[4] = {
              name: "当前允许载重(t)",
              value: row.allowLiftingWeight,
              type: row.maxLiftingWeight ? 1 : 1,
              width: (row.allowLiftingWeight / row.maxLiftingWeight) * 100,
              min: row.minLiftingWeight ? row.minLiftingWeight : "",
              max: row.maxLiftingWeight ? row.maxLiftingWeight : "",
              color: row.maxLiftingWeight
                ? ""
                : row.overweightState == 0
                ? "col1"
                : row.overweightState == 1
                ? "col0"
                : "col7",
            };
            arr[5] = {
              name: "风速(m/s)",
              value: row.windSpeed,
              type: row.maxWindSpeed ? 1 : 2,
              width: (row.windSpeed / row.maxWindSpeed) * 100,
              min: row.minWindSpeed ? row.minWindSpeed : "",
              max: row.maxWindSpeed ? row.maxWindSpeed : "",
              color: row.maxWindSpeed
                ? ""
                : row.windSpeedState == 0
                ? "col1"
                : row.windSpeedState == 1
                ? "col0"
                : "col7",
            };
            arr[6] = {
              name: "倾斜(°)",
              value: row.angle,
              type: row.maxAngle ? 1 : 2,
              width: (row.angle / row.maxAngle) * 100,
              min: row.minAngle ? row.minAngle : "",
              max: row.maxAngle ? row.maxAngle : "",
              color: row.maxAngle
                ? ""
                : row.tiltState == 0
                ? "col1"
                : row.tiltState == 1
                ? "col0"
                : "col7",
            };
            arr[7] = {
              name: "碰撞提醒",
              value: row.antiCollisionState,
              type: 2,
              width: 100,
              color:
                row.antiCollisionState == 0
                  ? "col1"
                  : row.antiCollisionState == 1
                  ? "col0"
                  : "col7",
            };
            this.arr = arr;
          }
        });
    },

    hookVideoDetails() {
      this.playerConfig.url='';
      let url = `/prod-api/wisdomScreen/towerCrane/wsTowerCrane/hookVideoDetails`;
      axios
        .get(url, {
          params: this.queryParams,
        })
        .then((res) => {
          if (res.data.code === 200) {
            let row = res.data.data;
            this.playerConfig.url = row ? row.hookVideoAddress : "";
          }
          this.$nextTick(()=>{
            this.initPlayer(this.playerConfig);
          })
        });
    },
    initPlayer(hookVideoAddress) {
      try {
        this.player &&
          typeof this.player.destroy === "function" &&
          this.player.destroy();
      } catch (e) {
       
      }
      if (hookVideoAddress && hookVideoAddress !== "") {
        this.player = new hlsjsPlayer(this.playerConfig);
        this.$emit("player", this.player);
      }
    },
    equipmentStatusAnalysis(type) {
      this.queryParams.frequency = type;
      this.index = type;
      let url = `/prod-api/wisdomScreen/towerCrane/wsTowerCrane/equipmentStatusAnalysis`;
      axios
        .get(url, {
          params: this.queryParams,
        })
        .then((res) => {
          if (res.data.code === 200) {
            const result = res.data.rows;
            this.zhuOption.xAxis.data = result.map((e) => e.analysisTime);
            this.zhuOption.series[0].data = result.map(
              (e) => e.analysisLiftingWeight || 0
            ); //吊装重量
            this.zhuOption.series[1].data = result.map(
              (e) => e.analysisLoadPercentage || 0
            ); //载重百分比
          }
        });
    },
    // 获取双 折线和柱状图
    getHoistingCycle(type) {
      this.queryParams.queryType = type;
      this.index2 = type;
      let url = `/prod-api/wisdomScreen/towerCrane/wsTowerCrane/hoistingCycle`;
      axios
        .get(url, {
          params: this.queryParams,
        })
        .then((res) => {
          if (res.data.code === 200) {
            const result = res.data.rows;
            const safety=result.map(
              (e) => e.hoistingCycleNum
            );
            const Illegal=result.map(
              (e) => e.regulationsNum || 0
            );
            this.totallist=safety-Illegal;
            this.towerOption.xAxis[0].data = result.map(
              (e) => e.hoistingCycleTime
            );
            this.towerOption.series[0].data = result.map(
              (e) => e.hoistingCycleNum || 0
            ); //工作次数
            this.towerOption.series[1].data = result.map(
              (e) => e.regulationsNum || 0
            ); //违章次数
            const data1 = this.towerOption.series[0].data
            const data2 = this.towerOption.series[1].data
            this.safeNum = data1[data1.length-1] - data2[data2.length-1]
          }
        });
    },
    /**
     * x，y为将要到达的坐标
     */
    onAtuoMove: function (xTotal, xWorkTotal, yTotal, yWorkTotal) {
      let _this = this;
    
      let x = 256 / xTotal; //0
      let y = 280 / yTotal;
      let xMax = xWorkTotal * x; // 指定位置 px
      let yMax = yWorkTotal * y; // 指定位置 px
      this.horizontalLine = 276 - xMax;
      setTimeout(() => {
        this.verticalLine = yMax >= 240 ? 240 : yMax;
      }, 800);
    },
  },
};
</script>
<style lang="scss" >
.diaoji-page {
  .cus-header .el-select .el-input__inner{
    text-align: center;
  }
  .crane-map {
    width: 505px;
    height: 490px;
    margin: 8px auto;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: relative;
  }

  .crane-map-hook {
    width: 49px;
    position: absolute;
    top: 166px;
    transition: right 1s linear;
  }

  .crane-map-hook > div {
    display: block;
    padding: 0;
    margin: auto;
  }

  .crane-map-hook__horizontal-line {
    width: 28px;
    height: 8px;
    background-image: url(../../../assets/images/tower/block.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: relative;

    .msg {
      position: absolute;
      width: 193px;
      height: 109px;
      padding-top: 50px;
      box-sizing: border-box;
      right: 9px;
      top: 9px;
      //transition:transform 0.6s;
      transition: all 1s linear;
      display: flex;
      justify-content: center;
      align-items: center;
      .msg-li {
        width: 33.33%;
        text-align: center;
        color: #fff;
        font-size: 15px;
        line-height: 19px;
        .msg-value {
          color: #f28114;
        }
      }
    }
  }

  .crane-map-hook__vertical-line {
    width: 13px;
    height: 320px;
    position: relative;
    background: url(../../../assets/images/tower/xian.png) no-repeat;
    background-size: 100% 100%;
    transition: height 1s linear;
    display: block;
  }

  .crane-map-hook__snaps {
    width: 49px;
    height: 29px;
    background-image: url(../../../assets/images/tower/gou.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position-x: 1px;
    margin-top: -4px !important;
  }

  .btn-item {
    text-align: center;
  }
  .xg-player {
    width: 52% !important;
    height: 100% !important;
    background: #000000;
  }
  #container {
    overflow: hidden;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    .towers {
      // width: 500px;
      // margin-top: 30px;
      position: relative;
      span {
        color: #fff;
        font-size: 16px;
        margin-right: 15px;
        b {
          margin-left: 5px;
          font-size: 18px;
          color: #00deff;
        }
      }
    }
    .stong .data {
      font-size: 15px;
      color: #f28114;
      margin-top: 7px;
    }
    .bstong {
      margin-top: 4px;
      font-size: 15px;
      color: #ffffff;
    }
    .condition .logo {
      text-align: center;
      margin-left: 20px;
      .tx_y {
        text-align: center;
        font-size: 14px;
      }
    }
    .condition p {
      line-height: 40px;
      font-size: 13px;
      color: #ffffff;
    }
    > .row {
      display: flex;
      &:first-child {
        flex: 1.6;
        overflow: hidden;

        > .col {
          display: flex;
          overflow: hidden;
          &:first-child {
            flex: 2;
            overflow: hidden;
          }
          &:last-child {
            flex: 3;
            overflow: hidden;

            display: flex;
            flex-direction: column;
            .row {
              display: flex;
              overflow: hidden;
              &:first-child {
                flex: 2;
                overflow: hidden;
              }
              &:last-child {
                flex: 2;
                display: flex;
                .col {
                  &:first-child {
                    flex: 2;
                  }
                  &:last-child {
                    flex: 2;
                  }
                }
              }
            }
          }
        }
      }
      &:last-child {
        flex: 1;

        overflow: hidden;
        .col {
          flex: 1;
          overflow: hidden;
          &:first-child {
            overflow: hidden;
          }
          &:last-child {
            overflow: hidden;
          }
        }
      }
    }
    .butons {
      width: 70%;
      height: 30px;
      background: #2b9ff0;
      text-align: center;
      line-height: 30px;
      margin-top: 10px;
      border-radius: 5px;
    }
    .shadowpictrue {
      padding-top: 20px;
    }
    .chartson3 {
      position: relative;
      height: 200px;
      width: 240px;
      .btn2 {
        position: absolute;
        top: 12px;
        right: 24px;
        z-index: 9999;
      }
    }
    .btn2 {
      position: absolute;
      top: 12px;
      right: 24px;
      z-index: 9999;
    }
  }

  .cus-header {
    position: absolute;
    right: 602px;
    top: -1px;
    .select-rem {
      width: 146px;
      height: 46px;
      font-size: 20px;
      background: #127ce6;
      color: #fff;
      border-radius: 15px;
      padding: 10px;
      option {
        font-size: 20px;
      }
    }
  }
  .running-status {
    display: flex;
    color: #ffffff;
    height: 158px;
    background-image: url(https://alipic.lanhuapp.com/ps689c50f2a86d4524-e4a8-4d41-9512-3465ac5865b2);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: bottom;
    width: 866px;
  }

  .running-status > div {
    flex: 1;
    position: relative;
  }

  .running-status > div:nth-child(1) {
    flex: 0;
  }

  .running-status > div::after {
    position: absolute;
    right: 0;
    top: 0;
    content: " ";
    height: 147px;
    width: 5px;
    background-image: url(https://alipic.lanhuapp.com/pscd5947ca03a74e91-c3b8-45c5-9ee9-6eb14b93c7bb);
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  .running-status > div:last-child::after {
    background: none;
  }

  .running-status-cell {
    padding: 0px 26px 0px 26px;
  }

  .running-status-left {
    width: 140px;
  }

  .running-status-cell-title {
    font-size: 16px;
    font-weight: bold;
    color: #00deff;
    padding: 0px 0px 10px 0px;
    position: relative;
  }

  .running-status-text {
    font-size: 13px;
    font-weight: bold;
    padding-bottom: 6px;
  }

  .running-status-driver {
    display: flex;
    align-items: center;
  }

  .running-status-driver > div:nth-child(1) {
    flex: 0;
  }

  .running-status-driver-left {
    width: 90px;
    text-align: center;
    font-size: 14px;
    font-weight: bold;
  }

  .running-status-driver-logo {
    width: 78px;
    height: 78px;
    border-radius: 100%;
    margin: auto;
    display: inline-block;
  }

  .running-status-driver-text {
    font-size: 14px;
    font-weight: bold;
    color: #ffffff;
    padding-left: 17px;
  }

  .running-status-driver-text > p {
    margin: 0;
    padding: 0 0 6px 0px;
    font-size: 14px;
  }

  .running-status-driver-title {
    padding-left: 107px;
  }

  .running-status-chart {
    flex: 0 !important;
  }

  .running-status-chart > div {
    width: 216px;
  }

  .btn-violation {
    height: 26px;
    font-weight: bold;
    font-size: 12px;
    height: 11px;
    background-color: #0e2e9d;
    border: #0e2e9d;
    position: absolute;
    top: 1px;
    right: 27px;
    z-index: 77777;
  }
  .chartson1 {
    width: 100%;
    height: 100%;
  }
  .process {
    display: flex;
    width: 819px;
    height: 252px;
    margin-top: 30px;
  }
  .bgc {
    color: #fff;
    background-color: #1b90fe;
  }
  .bgc2 {
    color: #fff;
    background-color: #1b90fe;
  }
  .col1 {
    background: linear-gradient(-90deg, #3a5dff, #2fced6);
  }
  .echarts {
    width: 100%;
    height: 91%;
  }
  .cus-header[data-v-1de91826] {
    position: absolute;
    right: 595px;
    top: -14px;
  }
  .cus-header {
    position: absolute;
    left: 20px;
    width: 130px;
    height: 63px;
    z-index: 99;
    line-height: 20px;
    background: url("~@/assets/seldev_bg.png") no-repeat center;
    background-size: contain;
    /deep/.el-select {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .el-input__inner {
        font-size: 16px;
        height: 40px;
        line-height: 40px;
        color: #ffffff !important;
        background: none !important;
        border: none !important;
      }
    }
  }
  .cus-header[data-v-4a123f2f] .el-select {
    width: 97%;
    height: 52%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .bstong {
    margin-top: 5px;
  }
}
</style>
<style>
.diaoji-page #container > .row:last-child .col:last-child {
    margin-left: 28px;
}
</style>
