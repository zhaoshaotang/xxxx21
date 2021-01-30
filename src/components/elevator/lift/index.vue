<template>
  <div class="cus-body">
    <div class="cus-header">
      <el-select
        v-model="value"
        placeholder="请选择"   
        @change="change"
      >
        <el-option
          v-for="(item, index) in snData"
          :key="index"
          :label="item.managerName"
          :value="item.managerId"
        ></el-option>
      </el-select>
    </div>
    <!-- 单龙 -->
    <div v-if="this.rows.length == 1">
      <div
        class="Subcontract"
        :style="{
          backgroundImage: 'url(' + bg3 + ')',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
        }"
      >
        <div class="subLeft" style="position: relative">
          <div style="position: absolute; left: 692px; top: 20px">
            <img src="../../../../public/img/bg/fengexian.png" />
          </div>
          <div class="boxing">
            <div class="box-left">
              <img :src="rowsCageMark1.drive&&rowsCageMark1.drive.personnelPortrait?rowsCageMark1.drive.personnelPortrait:require('./lift.png')"/>
              <p class="Subcontract_name">
                {{ rowsCageMark1.drive?rowsCageMark1.drive.driversName:'无' }}
              </p>
            </div>
            <div class="datalist">
              <p class="datalist_left">驾驶员信息(左)</p>
              <p class="datalist_left_1" style="white-space: nowrap">
                认证时间： {{ rowsCageMark1.drive?rowsCageMark1.drive.certificationTime:'无' }}
              </p>
              <p class="datalist_left_2">
                身份证号：{{ rowsCageMark1.drive?rowsCageMark1.drive.iDNumber:'未知' }}
              </p>
              <el-button type="primary" class="lift_color" v-if="rowsCageMark1.drive!=null">已认证</el-button>
              <el-button type="primary" class="lift_color" v-else>未认证</el-button>
            </div>
          </div>
        </div>
        <div class="canva1 subright">
          <el-button type="primary" class="btn2" @click="checkViolation(1)"
            >查看违章</el-button
          >
          <div id="pie1" class="chart1"></div>
        </div>
      </div>
      <publics :rows="rowsCageMark1.progress" />
      <div style="margin-top: 126px; position: relative">
        <div class="echarts-body">
          <el-row style="margin-left: 26%; margin-top: -4%">
            <el-button
              :autofocus="true"
              @click="numTab(btnIndex, 20, 'num')"
              :style="
                'border-radius: 15% 0 0 15%;' +
                (num == 20 || num == 1
                  ? 'background:#409EFF;color:#fff;'
                  : 'background:none')
              "
              >近{{ btnIndex == 1 ? "20次" : "7日" }}</el-button
            >
            <el-button
              :style="
                num == 50 || num == 2
                  ? 'background:#409EFF;color:#fff;'
                  : 'background:none'
              "
              @click="numTab(btnIndex, 50, 'num')"
              checked
              >近{{ btnIndex == 1 ? "50次" : "15日" }}</el-button
            >
            <el-button
              :style="
                'border-radius:  0 15% 15% 0;' +
                (num == 200 || num == 3
                  ? 'background:#409EFF;color:#fff;'
                  : 'background:none')
              "
              @click="numTab(btnIndex, 200, 'num')"
              >近{{ btnIndex == 1 ? "200次" : "30日" }}</el-button
            >
          </el-row>
        </div>
        <div class="ys">
          <div
            class="xul"
            :style="
              'background:url(' +
              (btnIndex == 1 ? bg1 : bg) +
              ');background-size:100% 100%'
            "
          >
            <div
              :class="btnIndex == 1 ? 'xli xactive' : 'xli'"
              @click="showTab(1, 'chartdemo1')"
            >
              设备状态分析
            </div>
            <div
              :class="btnIndex == 2 ? 'xli xactive' : 'xli'"
              @click="showTab(2, 'chartdemo1')"
            >
              工作循环次数
            </div>
          </div>
        </div>
        <!-- 按钮切换俩图 -->
        <div id="chartdemo1" class="chartdemo"></div>
      </div>
    </div>
    <div v-if="this.rows.length == 2" style="position: relative">
      <div style="position: absolute; top: 29px; right: 670px">
        <img src="../../../../public/img/bg/hx.png" />
      </div>
      <div class="box">
        <div
          class="left"
          :style="{
            backgroundImage: 'url(' + bg3 + ')',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% 100%',
          }"
        >
          <div class="user">
            <div class="logo">
              <div style="margin-left: 44px; margin-bottom: 15px">
                <img :src="rowsCageMark2.drive&&rowsCageMark2.drive.personnelPortrait?rowsCageMark2.drive.personnelPortrait:require('./lift.png')"/>
              </div>
              <p class="tx_y">
                {{
                  rowsCageMark2.drive
                    ? rowsCageMark2.drive.driversName
                    : "无"
                }}
              </p>
            </div>
            <div class="myp">
              <p style="font-size: 16px; color: #00deff">驾驶证信息（左）</p>
              <p style="white-space: nowrap">
                认证时间：{{
                  rowsCageMark1.drive?rowsCageMark1.drive.certificationTime: '无'
                }}
              </p>
              <p>
                身份证号：{{
                  rowsCageMark2.drive
                    ? rowsCageMark2.drive.iDNumber
                    : "未知"
                }}
              </p>
              <p class="butons" v-if="rowsCageMark1.drive!=null">已认证</p>
              <p class="butons" v-else>未认证</p>
            </div>
          </div>
          <div class="canva1">
            <el-button type="primary" class="btn2" @click="checkViolation(2)"
              >查看违章</el-button
            >
            <div id="chart1" class="chart1"></div>
          </div>
        </div>
        <div
          class="right"
          :style="{
            backgroundImage: 'url(' + bg3 + ')',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% 100%',
          }"
        >
          <div class="user">
            <div class="logo">
              <div style="margin-left: 44px; margin-bottom: 15px">
                <img :src="rowsCageMark3.drive&&rowsCageMark3.drive.personnelPortrait?rowsCageMark3.drive.personnelPortrait:require('./lift.png')"/> 
              </div>
              <p class="tx_y">{{ rowsCageMark3.drive?rowsCageMark3.drive.driversName:'无' }}</p>
            </div>
            <div class="myp">
              <p style="font-size: 16px; color: #00deff">驾驶证信息（右）</p>
              <p style="white-space: nowrap">
                认证时间：{{ rowsCageMark3.drive?rowsCageMark3.drive.certificationTime: '无' }}
              </p>
              <p>
                身份证号：{{
                  rowsCageMark3.drive?rowsCageMark3.drive.iDNumber :"未知"
                }}
              </p>
              <p class="butons" v-if="rowsCageMark3.drive!=null">已认证</p>
              <p class="butons" v-else>未认证</p>
            </div>
          </div>
          <div class="canva1">
            <el-button type="primary" class="btn2" @click="checkViolation(3)"
              >查看违章</el-button
            >
            <div id="chart2" class="chart1"></div>
          </div>
        </div>
      </div>
      <div style="display: flex">
        <div style="width: 50%; height: 50%">
          <publics :rows="rowsCageMark2.progress" />
          <div style="margin-top: 126px; position: relative">
            <div class="echarts-body">
              <el-row style="margin-left: 26%; margin-top: -4%">
                <el-button
                  :autofocus="true"
                  @click="numTab(btnIndex1, 20, 'num1')"
                  :style="
                    'border-radius:  15% 0 0 15%;' +
                    (num1 == 20 || num1 == 1
                      ? 'background:#409EFF;color:#fff;'
                      : 'background:none')
                  "
                  checked
                  >近{{ btnIndex1 == 3 ? "20次" : "7日" }}</el-button
                >
                <el-button
                  :style="
                    num1 == 50 || num1 == 2
                      ? 'background:#409EFF;color:#fff;'
                      : 'background:none'
                  "
                  @click="numTab(btnIndex1, 50, 'num1')"
                  >近{{ btnIndex1 == 3 ? "50次" : "15日" }}</el-button
                >
                <el-button
                  @click="numTab(btnIndex1, 200, 'num1')"
                  :style="
                    'border-radius:  0 15% 15% 0;' +
                    (num1 == 200 || num1 == 3
                      ? 'background:#409EFF;color:#fff;'
                      : 'background:none')
                  "
                  >近{{ btnIndex1 == 3 ? "200次" : "30日" }}</el-button
                >
              </el-row>
            </div>
            <div class="ys ys1">
              <div
                class="xul"
                :style="
                  'background:url(' +
                  (btnIndex1 == 3 ? bg1 : bg) +
                  ');background-size:100% 100%'
                "
              >
                <div
                  :class="btnIndex1 == 3 ? 'xli xactive' : 'xli'"
                  @click="showTab(3, 'chartdemo2')"
                >
                  设备状态分析
                </div>
                <div
                  :class="btnIndex1 == 4 ? 'xli xactive' : 'xli'"
                  @click="showTab(4, 'chartdemo2')"
                >
                  工作循环次数
                </div>
              </div>
            </div>
            <!-- 按钮切换俩图 -->
            <div id="chartdemo2" class="chartdemo"></div>
          </div>
        </div>
        <div style="width: 50%; height: 50%">
          <publics :rows="rowsCageMark3.progress" />
          <div
            style="margin-top: 126px; padding-left: 10px; position: relative"
          >
            <div class="echarts-body">
              <el-row style="margin-left: 26%; margin-top: -4%">
                <el-button
                  :autofocus="true"
                  :style="
                    'border-radius: 15% 0 0 15%;' +
                    (num2 == 20 || num2 == 1
                      ? 'background:#409EFF;color:#fff;'
                      : 'background:none')
                  "
                  checked
                  @click="numTab(btnIndex2, 20, 'num2')"
                  >近{{ btnIndex2 == 5 ? "20次" : "7日" }}</el-button
                >
                <el-button
                  :style="
                    num2 == 50 || num2 == 2
                      ? 'background:#409EFF;color:#fff;'
                      : 'background:none'
                  "
                  @click="numTab(btnIndex2, 50, 'num2')"
                  >近{{ btnIndex2 == 5 ? "50次" : "15日" }}</el-button
                >
                <el-button
                  @click="numTab(btnIndex2, 200, 'num2')"
                  :style="
                    'border-radius: 0 15% 15% 0;' +
                    (num2 == 200 || num2 == 3
                      ? 'background:#409EFF;color:#fff;'
                      : 'background:none')
                  "
                  >近{{ btnIndex2 == 5 ? "200次" : "30日" }}</el-button
                >
              </el-row>
            </div>
            <div class="ys ys1">
              <div
                class="xul"
                :style="
                  'background:url(' +
                  (btnIndex2 == 5 ? bg1 : bg) +
                  ');background-size:100% 100%'
                "
              >
                <div
                  :class="btnIndex2 == 5 ? 'xli xactive' : 'xli'"
                  @click="showTab(5, 'chartdemo3')"
                >
                  设备状态分析
                </div>
                <div
                  :class="btnIndex2 == 6 ? 'xli xactive' : 'xli'"
                  @click="showTab(6, 'chartdemo3')"
                >
                  工作循环次数
                </div>
              </div>
            </div>
            <!-- 按钮切换俩图 -->
            <div id="chartdemo3" class="chartdemo"></div>
          </div>
        </div>
      </div>
    </div>
    <more-data
      :dialogFlag.sync="dialogFlag"
      :singleEquipmentNo="queryParams.singleEquipmentNo"
      :leftEquipmentNo="queryParams.leftEquipmentNo"
      :rightEquipmentNo="queryParams.rightEquipmentNo"
      :equipmentNoType="queryParams.equipmentNoType"
    />
  </div>
</template>
<script>
import MoreData from "./more";
import Publics from "@/components/elevator/lift/public/index.vue";
import { visUrl, getUrlParames } from "@/api/httpClient.js";
import $http from "@/api/wisdomScreen.js";
import axios from "axios";
import { mapActions } from "vuex";
import bg from "@/assets/tab1.png";
import bg1 from "@/assets/tab2.png";
import bg3 from "@/assets/xia.png";
export default {
  components: {
    Publics,
    MoreData,
  },
  name: "lift",
  props: {
    option: Object,
    component: Object,
  },
  data() {
    return {
      dialogFlag: false,
      queryParams: {
        singleEquipmentNo: "",
        leftEquipmentNo: "",
        rightEquipmentNo: "",
        equipmentNoType: null,
        projectId: "",
        companyId: "",
      },
      rows: {},
      rowsCageMark1: {
        drive: {}, //司机信息
        stat: {}, //今日违章统计
        progress: {}, //进度条数据
      }, //单笼数据
      rowsCageMark2: {
        drive: {}, //司机信息
        stat: {}, //今日违章统计
        progress: {}, //进度条数据
      }, //左龙数据
      rowsCageMark3: {
        drive: {}, //司机信息
        stat: {}, //今日违章统计
        progress: {}, //进度条数据
      }, //右龙数据
      singleDriverName: "",
      singleTime: "",
      singleIDNumber: "",
      singlePersonnelPortrait: "",
      leftPersonnelPortrait: "",
      rightDriverName: "",
      rightTime: "",
      rightIDNumber: "",
      rightPersonnelPortrait: "",
      snData: [],
      value: "",
      chartdemo1: "",
      chartdemo2: "",
      chartdemo3: "",
      btnIndex: 1,
      btnIndex1: 3,
      btnIndex2: 5,
      num: 20,
      num1: 20,
      num2: 7,
      new_goods_show: true,
      often_route_show: false,
      safeHoistingNumber: "",
      driversName: "",
      bg: bg1,
      bg1: bg,
      bg3: bg3,
      chartDom: Date.parse(new Date()),
      chartNum: {
        1: 20,
        2: 20,
        3: 20,
        4: 20,
        5: 20,
        6: 20,
      },
    };
  },
  destroyed() {
    if (this.chartdemo1) {
      this.chartdemo1.dispose();
    }
    if (this.chartdemo2) {
      this.chartdemo2.dispose();
    }
    if (this.chartdemo3) {
      this.chartdemo3.dispose();
    }
  },
  created() {
     if (getUrlParames("userType") == 1) {
      //项目级
      this.queryParams.projectId = getUrlParames("userId")-0;
    } else {
      //企业级
      this.queryParams.companyId = getUrlParames("userId");
    }
    axios.defaults.headers.common["Authorization"] = getUrlParames("token");
  },
  mounted() {
    this.queryDeviceDropDownBox();
    
     setInterval(() => {
      this.change(); 
     }, 30000);
  },
  methods: {
    checkViolation(type) {
      this.queryParams.equipmentNoType = type;
      this.dialogFlag = true;
    },
    queryDeviceDropDownBox() {
      $http.queryDeviceDropDownBox(this.queryParams.projectId,this.queryParams.companyId).then((res) => {
        this.snData = res.data.rows;
        this.value = this.snData[0].managerId;
        this.change();
      });
    },
    showNewGoodsTab() {
      this.often_route_show = false;
      this.new_goods_show = true;
      this.$nextTick(() => {});
    },
    numTab(type, num, file) {
      var id = "";
      if (type === 1 || type === 2) {
        id = "chartdemo1";
      } else if (type === 3 || type === 4) {
        id = "chartdemo2";
      } else {
        id = "chartdemo3";
      }
      if (num == 20) {
        this[file] = type % 2 == 0 ? 1 : num;
        this.chartNum[type] = type % 2 == 0 ? 1 : num;
      } else if (num == 50) {
        this[file] = type % 2 == 0 ? 2 : num;
        this.chartNum[type] = type % 2 == 0 ? 2 : num;
      } else if (num == 200) {
        this[file] = type % 2 == 0 ? 3 : num;
        this.chartNum[type] = type % 2 == 0 ? 3 : num;
      } 
      if (type == 1) {
        this.ys1 = false;
        // 设备分析
        $http
          .equipmentStatusAnalysis(
            this.rows[0].equipmentNo,
            this.chartNum[type]
          )
          .then((res) => {
            var option = {
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
                  var dotHtml = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#0080FF"></span>'        
                  return (
                    params[0].axisValue +
                    "<br />" +
                    dotHtml +
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
                top: "8%",
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
                bottom: "8%",
                containLabel: true,
                height: "50%",
              },
              dataZoom: [
                {
                  start: 10,
                  type: "inside",
                  end: 40,
                  zoomOnMouseWheel: true,
                },
                {
                  type: "slider",
                  realtime: true,
                  fillerColor: "#1b90fe",
                  handleSize: "10%",
                  textStyle: true,
                  bottom: "2%",
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
                  },
                  lineStyle: {
                    color: "#ff0d00",
                    width: 5,
                    shadowBlur: 2,
                  },
                  data: [4.2, 3.5, 2.9, 7.8, 2, 3, 4.2, 3.5, 2.9, 7.8, 2, 3],
                },
              ],
            };
            let result = res.data.rows;
            option.xAxis.data = result.map((e) => e.analysisTime);
            option.series[0].data = result.map((e) => e.analysisLiftingWeight);
            option.series[1].data = result.map((e) => e.analysisLoadPercentage);
            this.addzhu(id, option); // 明细图
          });
      } else if (type == 2) {
        this.ys1 = true;
        // 工作循环次数
        $http
          .hoistingCycle(this.rows[0].equipmentNo, this.chartNum[type])
          .then((res) => {
            var option = {
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
                  var dotHtml3 = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#0080FF"></span>'
                  var dotHtml4 = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#F23939"></span>'
                  return (
                    params[0].axisValue +
                    "<br />" +
                    dotHtml3 +
                    "工作次数：" +
                    params0Value +
                    "<br />" +
                    dotHtml4 +
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
                bottom: "40px",
                containLabel: true,
              },
              xAxis: [
                {
                  type: "category",
                  data: [
                    "周一",
                    "周二",
                    "周三",
                    "周四",
                    "周五",
                    "周六",
                    "周日",
                    "周一",
                    "周二",
                    "周三",
                    "周四",
                    "周五",
                    "周六",
                    "周日",
                  ],
                  axisLabel: {
                    // 坐标轴刻度标签的相关设置
                    show: true, //控制显隐
                    textStyle: {
                      color: "#fff", //x轴字体颜色
                      fontSize: 12, //
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
                  axisLabel: {
                    formatter: "{value}",
                    textStyle: {
                      color: "#fff",
                    },
                  },
                },
              ],         
               dataZoom: [
                {
                  start: 10,
                  type: "inside",
                  end: 40,
                  zoomOnMouseWheel: true,
                },
                {
                  type: "slider",
                  realtime: true,
                  fillerColor: "#1b90fe",
                  handleSize: "10%",
                  textStyle: true,
                  bottom: "2%",
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

                  data: [
                    10,
                    13,
                    11,
                    13,
                    30,
                    23,
                    21,
                    12,
                    13,
                    10,
                    13,
                    20,
                    20,
                    10,
                  ],
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
                  data: [
                    20,
                    18,
                    19,
                    23,
                    29,
                    33,
                    31,
                    22,
                    12,
                    11,
                    24,
                    20,
                    33,
                    31,
                  ],
                },
              ],
            };
            let result = res.data.rows;
            option.xAxis[0].data = result.map((e) => e.hoistingCycleTime);
            option.series[0].data = result.map((e) => e.hoistingCycleNum);
            option.series[1].data = result.map((e) => e.regulationsNum);
            this.addzhu(id, option); // 明细图
          });
      } else if (type == 3) {
        this.ys1 = false;
        // 设备分析
        $http
          .equipmentStatusAnalysis(
            this.rows[0].equipmentNo,
            this.chartNum[type]
          )
          .then((res) => {
            var option = {
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
                  var dotHtml = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#0080FF"></span>'        
                  return (
                    params[0].axisValue +
                    "<br />" +
                    dotHtml +
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
                top: "8%",
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
                bottom: "8%",
                containLabel: true,
                height: "50%",
              },
              dataZoom: [
                {
                  start: 10,
                  type: "inside",
                  end: 40,
                  zoomOnMouseWheel: true,
                },
                {
                  type: "slider",
                  realtime: true,
                  fillerColor: "#1b90fe",
                  handleSize: "10%",
                  textStyle: true,
                  bottom: "2%",
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
            };
            let result = res.data.rows;
            option.xAxis.data = result.map((e) => e.analysisTime);
            option.series[0].data = result.map((e) => e.analysisLiftingWeight);
            option.series[1].data = result.map((e) => e.analysisLoadPercentage);
            this.addzhu(id, option); // 明细图
          });
      } else if (type == 4) {
        this.ys1 = true;
        // 工作循环次数
        $http
          .hoistingCycle(this.rows[0].equipmentNo, this.chartNum[type])
          .then((res) => {
            var option = {
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
                  var dotHtml3 = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#0080FF"></span>'
                  var dotHtml4 = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#F23939"></span>'
                 
                  // if(params[2].value<=0){params0Value = params[2].value}
                  return (
                    params[0].axisValue +
                    "<br />" +
                    dotHtml3 +
                    "工作次数：" +
                    params0Value +
                    "<br />" +
                    dotHtml4 +
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
                bottom: "40px",
                containLabel: true,
              },
              xAxis: [
                {
                  type: "category",
                  data: [
                    "周一",
                    "周二",
                    "周三",
                    "周四",
                    "周五",
                    "周六",
                    "周日",
                    "周一",
                    "周二",
                    "周三",
                    "周四",
                    "周五",
                    "周六",
                    "周日",
                  ],
                  axisLabel: {
                    // 坐标轴刻度标签的相关设置
                    show: true, //控制显隐
                    textStyle: {
                      color: "#fff", //x轴字体颜色
                      fontSize: 12, //
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
                  axisLabel: {
                    formatter: "{value}",
                    textStyle: {
                      color: "#fff",
                    },
                  },
                },
              ],
              
               dataZoom: [
                {
                  start: 10,
                  type: "inside",
                  end: 40,
                  zoomOnMouseWheel: true,
                },
                {
                  type: "slider",
                  realtime: true,
                  fillerColor: "#1b90fe",
                  handleSize: "10%",
                  textStyle: true,
                  bottom: "2%",
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

                  data: [
                    10,
                    13,
                    11,
                    13,
                    30,
                    23,
                    21,
                    12,
                    13,
                    10,
                    13,
                    20,
                    20,
                    10,
                  ],
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
                  data: [
                    20,
                    18,
                    19,
                    23,
                    29,
                    33,
                    31,
                    22,
                    12,
                    11,
                    24,
                    20,
                    33,
                    31,
                  ],
                },
              ],
            };
            let result = res.data.rows;
            option.xAxis[0].data = result.map((e) => e.hoistingCycleTime);
            option.series[0].data = result.map((e) => e.hoistingCycleNum);
            option.series[1].data = result.map((e) => e.regulationsNum);
            this.addzhu(id, option); // 明细图
          });
      } else if (type == 5) {
        this.ys1 = true;
        // 设备分析
        $http
          .equipmentStatusAnalysis(
            this.rows[1].equipmentNo,
            this.chartNum[type]
          )
          .then((res) => {
            var option = {
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
                  var dotHtml = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#0080FF"></span>'        
                  return (
                    params[0].axisValue +
                    "<br />" +
                    dotHtml +
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
                top: "8%",
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
                bottom: "8%",
                containLabel: true,
                height: "50%",
              },
              dataZoom: [
                {
                  start: 10,
                  type: "inside",
                  end: 40,
                  zoomOnMouseWheel: true,
                },
                {
                  type: "slider",
                  realtime: true,
                  fillerColor: "#1b90fe",
                  showDetail: false,
                  handleSize: "10%",
                  textStyle: true,
                  bottom: "2%",
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
            };
            let result = res.data.rows;
            option.xAxis.data = result.map((e) => e.analysisTime);
            option.series[0].data = result.map((e) => e.analysisLiftingWeight);
            option.series[1].data = result.map((e) => e.analysisLoadPercentage);
            this.addzhu(id, option); // 明细图
          });
      } else if (type == 6) {
        this.ys1 = false;
        // 工作循环次数
        $http
          .hoistingCycle(this.rows[1].equipmentNo, this.chartNum[type])
          .then((res) => {
            var option = {
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
                  var dotHtml3 = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#0080FF"></span>'
                  var dotHtml4 = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#F23939"></span>'
                  return (
                    params[0].axisValue +
                    "<br />" +
                    dotHtml3 +
                    "工作次数：" +
                    params0Value +
                    "<br />" +
                    dotHtml4 +
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
                bottom: "40px",
                containLabel: true,
              },
              xAxis: [
                {
                  type: "category",
                  data: [
                    "周一",
                    "周二",
                    "周三",
                    "周四",
                    "周五",
                    "周六",
                    "周日",
                    "周一",
                    "周二",
                    "周三",
                    "周四",
                    "周五",
                    "周六",
                    "周日",
                  ],
                  axisLabel: {
                    // 坐标轴刻度标签的相关设置
                    show: true, //控制显隐
                    textStyle: {
                      color: "#fff", //x轴字体颜色
                      fontSize: 12, //
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
                  axisLabel: {
                    formatter: "{value}",
                    textStyle: {
                      color: "#fff",
                    },
                  },
                },
              ],
             
               dataZoom: [
                {
                  start: 10,
                  type: "inside",
                  end: 40,
                  zoomOnMouseWheel: true,
                },
                {
                  type: "slider",
                  realtime: true,
                  fillerColor: "#1b90fe",
                  handleSize: "10%",
                  textStyle: true,
                  bottom: "2%",
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

                  data: [
                    10,
                    13,
                    11,
                    13,
                    30,
                    23,
                    21,
                    12,
                    13,
                    10,
                    13,
                    20,
                    20,
                    10,
                  ],
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
                  data: [
                    20,
                    18,
                    19,
                    23,
                    29,
                    33,
                    31,
                    22,
                    12,
                    11,
                    24,
                    20,
                    33,
                    31,
                  ],
                },
              ],
            };
            let result = res.data.rows;
            option.xAxis[0].data = result.map((e) => e.hoistingCycleTime);
            option.series[0].data = result.map((e) => e.hoistingCycleNum);
            option.series[1].data = result.map((e) => e.regulationsNum);
            this.addzhu(id, option); // 明细图
          });
      }
    },

    showTab(type) {
      if (type == 1 || type == 2) {
        this.btnIndex = type;
        this.numTab(type, 50, "num");
      } else if (type == 3 || type == 4) {
        this.btnIndex1 = type;
        this.numTab(type, 50, "num1");
      } else {
        this.btnIndex2 = type;
        this.numTab(type, 50, "num2");
      }
    },

    pietia(id, safeHoistingNumber, unqualifiedNumber) {
      let pieOne = echarts.init(document.getElementById(id));
      let option = {
        title: {
          text: "今日违章\n统计",
          x: "120",
          y: "110",
          textStyle: {
            color: "#00DEFF",
            fontSize: 10,
            fontWeight: "normal",
            top: "30px",
          },
          subtextStyle: {
            color: "rgba(255,255,255,.45)",
            fontSize: 14,
            fontWeight: "normal",
          },
        },
        grid: {
          left: "0",
          top: "30%",
          right: "20%",
          bottom: "1%",
          containLabel: true,
        },
        legend: {
          x: "center",
          y: "bottom",
          data: ["rose3", "rose5", "rose6", "rose7", "rose8"],
        },
        calculable: true,
        series: [
          {
            name: "面积模式",
            type: "pie",
            radius: [30, 40],
            center: ["60%", "60%"],
            data: [
              {
                value: unqualifiedNumber,
                name: "吴际帅\n牛亚莉",
                itemStyle: {
                  color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: "#ff4236",
                    },
                    {
                      offset: 1,
                      color: "#f6e3a1",
                    },
                  ]),
                },
                label: {
                  color: "#fff",
                  fontSize: 15,
                  formatter: "安全吊\n装{a|" + safeHoistingNumber + "}次",
                  padding: [0, -25],
                  rich: {
                    a: {
                      color: "#fff",
                      fontSize: 10,
                    },
                  },
                },
                labelLine: {
                  show: false,
                },
              },
              {
                value: safeHoistingNumber,
                name: "rose2",
                itemStyle: {
                  color: "transparent",
                },
              },
            ],
          },
          {
            name: "面积模式",
            type: "pie",
            radius: [30, 40],
            center: ["60%", "60%"],
            data: [
              {
                value: unqualifiedNumber, //
                name: "吴际帅\n牛亚莉",
                itemStyle: {
                  color: "transparent",
                },
              },
              {
                value: safeHoistingNumber,
                name: "rose2",
                itemStyle: {
                  color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: "#348fe6",
                    },
                    {
                      offset: 1,
                      color: "#625bef",
                    },
                  ]),
                },
                label: {
                  color: "#fff",
                  fontSize: 15,
                  formatter: "不合\n格{a|" + unqualifiedNumber + "}次",
                  padding: [0, -25],
                  rich: {
                    a: {
                      color: "#fff",
                      fontSize: 10,
                    },
                  },
                },
                labelLine: {
                  show: false,
                },
              },
            ],
          },
        ],
      };
      pieOne.setOption(option);
    },
    addzhu(id, option) {
      if (document.getElementById(id)) {
        if (this[id]) {
          this[id].dispose();
        }
        this[id] = echarts.init(document.getElementById(id));
        this[id].setOption(option, true);
        window.onresize = this[id].resize;
      }
    },
    init(file, id, params) {
      $http
        .driverInformation(params.equipmentNo) //司机信息
        .then((res) => {
          if (res.data.code === 200) {
            this.$set(this[file], "drive", res.data.data);
          }
        });
      $http
        .todayViolationsStatistics(params.equipmentNo) //今日违章统计
        .then((res) => {
          if (res.data.code === 200) {
            this[file].stat = res.data.data;
            if (res.data.data) {
              this.pietia(
                id,
                res.data.data.safeHoistingNumber,
                res.data.data.unqualifiedNumber
              );
            } else {
              this.pietia(id, 0, 0);
            }
          }
        });

      $http
        .realTimeInformation(params.equipmentNo) //升降机实时信息进度条
        .then((res) => {
          if (res.data.code === 200) {
            this[file].progress = res.data.data;
          }
        });
    },
    change() {
      $http.queryElevatorEquipment(this.value).then((res) => {
        if (res.data.code === 200) {
          let row = res.data.rows;
          if (row.length == 1) {
            //单笼
            this.rows = row;
            if (this.rows[0]) {
              this.queryParams.singleEquipmentNo = this.rows[0].equipmentNo;
              this.init("rowsCageMark1", "pie1", this.rows[0]);
              setTimeout(() => {
                this.showTab(this.btnIndex, "chartdemo1"); // 明细图
              }, 500);
            }
          } else if (row.length == 2) {
            let index = row.findIndex((ele) => {
              return ele.cageMark == 1;
            });
            if (index !== 0) {
              [row[0], row[1]] = [row[1], row[0]];
            }
            this.rows = row;
            if (this.rows[0]) {
              //左龙
              this.queryParams.leftEquipmentNo = this.rows[0].equipmentNo;
              setTimeout(() => {
                this.showTab(this.btnIndex1, "chartdemo2"); // 明细图
              }, 500);

              this.init("rowsCageMark2", "chart1", this.rows[0]);
            }
            if (this.rows[1]) {
              this.queryParams.rightEquipmentNo = this.rows[1].equipmentNo;
              setTimeout(() => {
                this.showTab(this.btnIndex2, "chartdemo3"); // 明细图
              }, 500);
              //右龙
              this.init("rowsCageMark3", "chart2", this.rows[1]);
            }
          }
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
// .cus-body {
//   padding: 0px 42px 0px 32px;
// }
.canva1 {
  position: relative;
  height: 200px;
  width: 240px;
  .btn2 {
    position: absolute;
    top: 12px;
    right: 24px;
    z-index: 9999;
  }
  #chart1 {
    canvas {
      left: -15px;
      top: 7px;
    }
  }
  #chart2 {
    canvas {
      left: -15px;
      top: 7px;
    }
  }
  .chart1 {
    width: 240px;
    height: 100%;
    right: 56px;
  }
}
.ys {
  position: absolute;
  top: -32px;
  left: 38%;
}
.xul {
  width: 492px;
  height: 46px;
  line-height: 46px;
  text-align: center;
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  overflow: hidden;
  .xli {
    width: 50%;
    height: 100%;
    float: left;
  }
  .xactive {
    font-weight: 400;
  }
}
.style_he div:not(:first-child) {
  margin-left: 7%;
}
.el-select {
  width: 116.7px;
  height: 125px;
}
.style_he div {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #ffffff;
  white-space: nowrap;
  b {
    margin-right: 16%;
  }
}
.style_he div b {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: #bcbcbc;
}
.style_he b.cor0 {
  background: #0098ff;
}
.style_he b.cor1 {
  background: #d4ab1b;
}
.style_he b.cor2 {
  background: #fd1a59;
}

.jl-chart {
  height: 250px;
}
#chartzhu {
  height: 250px;
}
.chartdemo {
  height: 289px;
}
#chartdemo1 {
  width: 100%;
  height: 300px;
}
.echarts-body {
  text-align: right;
  margin-right: 12px;
}
.Subcontract {
  padding: 0;
  background: linear-gradient(#0e3073, #051551, #173e83);
  overflow: hidden;
  height: 200px;
  .subLeft {
    display: flex;
    width: 50%;
    float: left;
    align-content: center;
    flex-direction: column;
    justify-content: center;
    .boxing {
      overflow: hidden;
      .box-left {
        float: left;
        margin-right: 20px;
        height: 200px;
        width: 125px;
        display: block;
        position: relative;
        img {
          position: absolute;
          left: 50%;
          top: 50%;
          margin-left: -40px;
          margin-top: -40px;
          width: 80px;
          height: 80px;
        }
      }
    }
  }
  .subright {
    width: 50%;
    float: left;
  }
  .pie {
    display: inline-block;
    width: 52%;
    height: 100%;
    margin-top: 38px;
  }
  .datalist_event {
    margin-left: 10px;
    text-align: right;
    position: relative;
    .btn {
      position: absolute;
      right: 10px;
      top: -10px;
    }
  }
  .datalist {
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 200px;

    .lift_color {
      background-color: rgb(43, 159, 240);
      color: rgb(255, 255, 255);
      border-radius: 5px;
    }
  }
  .datalist_left_1,
  .datalist_left_2 {
    font-size: 14px;
    color: #ffffff;
  }
  .datalist p {
    line-height: 31px;
    white-space: nowrap;
  }
  .datalist_left {
    font-size: 16px;
    color: #00deff;
  }
  .Subcontract_name {
    font-size: 14px;
    color: #ffffff;
    text-align: center;
  }
}
.progress_jlschart {
  height: 89px;
  background: rgba(26, 72, 150, 0.4);
  margin-left: 10px;
  margin-top: 20px;
  .progress_center {
    display: flex;
    flex: 1;
    justify-content: space-between;
    font-size: 12.1px;
    color: #ffffff;
    padding: 10px;
  }
  .progressContainer {
    position: relative;
    overflow: hidden;
    height: 7px !important;
    width: 96%;
    border-radius: 10px;
    background-color: #374789;
    margin-left: 2%;
    .progress {
      position: absolute;
      height: 100%;
      background: #0f0;
      text-align: center;

      line-height: 30px;
      transform: all 1s;
      top: 0px;
      left: 0px;
      .progressfics {
        color: #fff;
        font-weight: 100;
        font-size: 12px;
        position: absolute;
        left: 40%;
      }
    }
  }
}
.ys1 {
  display: flex;
  position: absolute;
  top: -61px;
  left: 16%;
}
.selectFrom {
  color: #fff;
  border: 1px solid #176168 !important;
  // background: #176168 !important;
  .el-select-dropdown__list {
    text-align: right;
    background: #176168 !important;
  }
  .el-select-dropdown__item {
    color: #fff;
    background: #176168 !important;
  }
  .el-select-dropdown__item.hover,
  .el-select-dropdown__item:hover {
    background: #1b7f5d !important;
  }
}

// 抄的部分样式
.recommendPage .swiper-container {
  position: relative;
  width: 100%;
  height: 200px;
  background: pink;
}

.recommendPage .swiper-container .swiper-slide {
  width: 100%;
  line-height: 200px;
  background: yellowgreen;
  color: #000;
  font-size: 16px;
  text-align: center;
}

.box {
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.box .left {
  margin-right: 38px;
}
.box .right {
  margin-left: 10px;
}
.box .left,
.box .right {
  display: flex;
  justify-content: space-between;
  width: 50%;
  height: 200px;
}

.user,
.canva {
  width: 50%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #fff;
  margin-right: 20px;
  position: relative;
}

.logo,
.myp {
  width: 50%;
  p {
    margin-top: 9px;
  }
}

.tx {
  width: 50%;
  height: 120px;
  background: #ccc;
  border-radius: 50%;
  margin: 0 auto;
}
.tx_y {
  text-align: center;
}
.myp {
  text-align: left;
  color: #fff;
}

.butons {
  display: block;
  width: 70%;
  height: 40px;
  line-height: 38px;
  background: #2b9ff0;
  text-align: center;
  margin-top: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.chart1 {
  top: 0;
  right: 65px;
  width: 240px;
  height: 170px;
  position: absolute;
}
.btn2 {
  position: absolute;
  right: -298px;
  top: -76px;
}

.cus-header {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 20px;
  width: 148px;
  height: 48px;
  z-index: 99;
  line-height: 20px;
  background: url("~@/assets/seldev_bg.png") no-repeat center;
  background-size: contain;
  /deep/.el-select {
    width: 100%;
    height: 100%;
    .el-input__inner {
      font-size: 20px;
      height: 40px;
      line-height: 40px;
      color: #ffffff !important;
      background: none !important;
      border: none !important;
    }
  }
}
.cus-header[data-v-4a123f2f] .el-select {
  width: 93%;
  height: 52%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
