<template>
  <div class="video-page">
    <el-container class="h-full">
      <el-aside
        v-show="asideShow"
        width="307px"
        style="
          padding: 28px 16px 0 18px;
          height: 882px;
          background: rgba(87, 91, 105, 0.08);
          border: 1px solid #216dfd;
          box-shadow: 0px 0px 60px 0px rgba(1, 9, 96, 0.5);
        "
      >
        <el-input
          v-model="permissionName"
          style="
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid #00a8ff;
            border-radius: 3px;
            margin-bottom: 8px;
          "
          placeholder="请输入区域名称"
        ></el-input>
        <!-- @open="handleOpen" @close="handleClose" -->
        <el-menu
          default-active="1-1"
          @select="menuSelect"
          active-text-color="#FFEA02"
          v-if="menuList && menuList.length > 0"
        >
          <template v-for="(item, index) in menuList1">
            <el-submenu v-if="item" :key="index" :index="`${index + 1}`">
              <template slot="title">
                <img class="camera-icon" :src="cameraIcon" alt="" srcset="" />
                <span>{{ item.partitionName || "未命名区域" }}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  v-for="(ele, inder) in item.wsVideoDTOList"
                  :key="inder"
                  :index="`${index + 1}-${inder + 1}`"
                  >{{ ele.monitoryPoint || "未命名区域" }}</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
          </template>
        </el-menu>
      </el-aside>
      <el-main>
        <el-container style="flex-wrap: wrap">
          <el-main>
            <div>
              <div style="display: flex; justify-content: space-between">
                <el-radio-group v-model="onLine" size="mini" @change="onLineTypeChange">
                  <el-radio-button
                    :label="true"
                    style="background-color: #1b90fe; color: #fff"
                  >直播</el-radio-button>
                  <el-radio-button
                    :label="false"
                    style="background-color: ; color: #transparent"
                  >回放</el-radio-button>
                </el-radio-group>
                <div style="display: flex; align-items: center">
                  <img
                    @click="changeNmu(1)"
                    style="
                      width: 16px;
                      height: 16px;
                      margin: 8px;
                      display: block;
                    "
                    :src="cameraSize == 1 ? icon11 : icon1"
                    alt=""
                    srcset=""
                  />
                  <img
                    @click="changeNmu(3)"
                    style="
                      width: 28px;
                      height: 18px;
                      margin: 8px;
                      display: block;
                    "
                    :src="cameraSize == 3 ? icon21 : icon2"
                    alt=""
                    srcset=""
                  />
                  <img
                    @click="changeNmu(4)"
                    style="
                      width: 27px;
                      height: 20px;
                      margin: 8px;
                      display: block;
                    "
                    :src="cameraSize == 4 ? icon31 : icon3"
                    alt=""
                    srcset=""
                  />
                </div>
              </div>
              <div class="flex" v-if="cameraSize == 1">
                <div class="viedo-main">
                  <!-- 这是直播 -->
                  <testVv
                    v-if="(preview && viedoParams)&&(onLineType == '直播')"
                    ref="monitorBox"
                    autoplay
                    controls
                    style="margin-top: 18px"
                    :url="viedoParams"
                  >
                  </testVv>
                  <!-- 这是回放 -->
                  <iframe
                    v-else
                    class="mainIframe"
                    style="height:90%"
                    :src="iframe.url"
                    frameborder="0"
                    allowfullscreen
                    scrolling="no"
                    ></iframe>
                </div>

                <div class="right-control">
                  <div
                    style="position: absolute; bottom: 95px"
                    v-if="onLineType == '直播'"
                  >
                    <div class="control-box" style="position: relative">
                      <img
                        style="width: 100%; height: 100%"
                        :src="cameraControlPng"
                        alt=""
                        srcset=""
                      />
                      <!-- <div style="position:absolute;left:8px;left:9px;"><img :src="topicon" style="width:64px;height:60px;"></div>
                       -->
                      <div
                        class="round-btn round-btn-1"
                        @click="doControl('0')"
                      ></div>
                      <div
                        class="round-btn round-btn-2"
                        @click="doControl('6')"
                      ></div>
                      <div
                        class="round-btn round-btn-3"
                        @click="doControl('3')"
                      ></div>
                      <div
                        class="round-btn round-btn-4"
                        @click="doControl('7')"
                      ></div>
                      <div
                        class="round-btn round-btn-5"
                        @click="doControl('1')"
                      ></div>
                      <div
                        class="round-btn round-btn-6"
                        @click="doControl('5')"
                      ></div>
                      <div
                        class="round-btn round-btn-7"
                        @click="doControl('2')"
                      ></div>
                      <div
                        class="round-btn round-btn-8"
                        @click="doControl('4')"
                      ></div>
                    </div>
                    <div class="btn-box">
                      <div class="control-btn" @click="doControl('8')">
                        缩小
                      </div>
                      <div class="control-btn" @click="doControl('9')">
                        放大
                      </div>
                      <div class="control-btn" @click="screenPic">抓拍</div>
                      <div class="control-btn" @click="playBack">回放</div>
                    </div>
                  </div>
                  <!-- 这是回放掉的接口 -->
                  <el-date-picker 
                    v-if="onLineType == '回放'"
                    v-model="value1"
                    size="mini"
                    value-format="yyyyMMddHHmmss"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    @change="getDate"
                  >
                    </el-date-picker>
                </div>
              </div>
              <div
                class="flex"
                style="flex-wrap: wrap; align-content: flex-start"
                v-else
              >
                <div
                  v-for="(i, index) in liveUrl_arr"
                  :key="i"
                  :class="{
                    'size-three': cameraSize == 3,
                    'size-four': cameraSize == 4,
                  }"
                  @click.prevent="seeThis(index)"
                >
                  <!-- <testVv
                    ref="monitorBox"
                    url="//sf1-hscdn-tos.pstatp.com/obj/media-fe/xgplayer_doc_video/hls/xgplayer-demo.m3u8"
                  > -->
                  <testVv ref="monitorBox" :url="i"></testVv>
                </div>
              </div>
            </div>
          </el-main>
          <el-footer
            v-if="cameraSize != 1"
            style="display: flex; flex-direction: row-reverse; width: 100%"
          >
            <el-pagination
              @current-change="handleCurrentChange"
              layout="prev, pager, next"
              :total="total"
            >
            </el-pagination>
          </el-footer>
        </el-container>
      </el-main>
    </el-container>
    <el-dialog title="回放" :visible.sync="showCalendar" append-to-body>
      <div class="mainIframe">
        <iframe
          class="mainIframe"
          v-bind:src="iframe.url"
          frameborder="0"
          allowfullscreen
          scrolling="no"
        ></iframe>
      </div>
      <div>
        选择时间：
        <el-date-picker
          v-model="value1"
          value-format="yyyyMMddHHmmss"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="getDate"
        >
        </el-date-picker>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import testVv from "@/components/towercrane/tower/cameraControl/CameraControl.vue";
import axios from "axios";
import { visUrl, getUrlParames } from "@/api/httpClient.js";
import { push } from "echarts/lib/component/dataZoom/history";
export default {
  name: "videodemo",
  components: {
    testVv,
  },
  props: {
    option: Object,
    component: Object,
  },
  data() {
    return {
      asideShow: true,
      cameraIcon: require("@/assets/images/tower/camera-icon.png"),
      permissionName: "",
      onLine: true,
      onLineType: '直播',
      cameraControlPng: require("@/assets/images/tower/camera-control.png"),
      topicon: require("@/assets/icon/xia.png"),
      icon1: require("@/assets/icon/one.png"),
      icon11: require("@/assets/icon/one1.png"),
      icon2: require("@/assets/icon/three.png"),
      icon21: require("@/assets/icon/three1.png"),
      icon3: require("@/assets/icon/four.png"),
      icon31: require("@/assets/icon/four1.png"),
      whatTime: new Date(),
      cameraSize: 1, // 默认只看一个 -- 根据这个数据判断是几，可以得到现在的展示形式是九宫格还是单独的
      viedioList: [], // 多列监控的时候需要进行获取请求，
      pageParams: {
        // 如果切换记得初始化数据
        direction: "", //操作命令：0-上，1-下，2-左，3-右，4-左上，5-左下，6-右上，7-右下，8-放大，9-缩小，10-近焦距，11-远焦距

        playMode: "hls",
        serialNumber: "",
        channelNumber: null,

        monitoryPoint: "", //监控点
        speed: 1,

        projectId: null,
        companyId: null,
        pageSize: 1, //默认三列的时候一页为九个
        pageNum: 1, //当前页
      },
      total: null, //总数据量，即视频总数
      menuList: [], // 菜单列表,
      menuList1: [],
      viedoParams: null, //当前视频资源的信息
      preview: false,
      //   分页大小
      //   弹框
      showCalendar: false,
      iframe: {
        url: "",
      },
      value1: [this.dayjs(new Date().getTime() - 1000 * 60 *60 *24).format('YYYYMMDD')+'000000',this.dayjs(new Date().getTime()).format('YYYYMMDD')+'000000'],
      liveUrl_arr: [],
      accessToken: "",
    };
  },
  computed: {},
  created() {
    if (getUrlParames("userType") == 1) {
      //项目级
      this.pageParams.projectId = getUrlParames("userId");
    } else {
      //企业级
      this.pageParams.companyId = getUrlParames("userId");
    }
    axios.defaults.headers.common["Authorization"] = getUrlParames("token");
    this.wsVideoZoneList();
    this.wsVideoPlay();
    this.wsVideoProjectPlay();
  },
  watch: {
    permissionName(val) {
      let returnMenuList = []; //结果数据
      this.menuList.forEach((item) => {
        let sonList = []; //子菜单数组数据：wsVideoDTOList
        if (item.wsVideoDTOList.length > 0) {
          //遍历子菜单数组
          item.wsVideoDTOList.forEach((ite) => {
            let sonMenuName = ite.monitoryPoint; //子菜单名称
            if (sonMenuName.indexOf(val) != -1) {
              sonList.push(ite);
            }
          });
        }
        if (sonList.length > 0) {
          //子菜单不为空
          item.wsVideoDTOList = sonList;
          returnMenuList.push(item);
        }
      });
      this.menuList1 = returnMenuList;
    },
  },
  methods: {
    // 切换直播与回放
    onLineTypeChange: async function(value){
     
      if (value) {
        return this.onLineType = '直播'
      }
      await this.getDate([this.dayjs(new Date().getTime() - 1000 * 60 *60 *24).format('YYYYMMDD')+'000000',this.dayjs(new Date().getTime()).format('YYYYMMDD')+'000000'])
      return this.onLineType = '回放'
    },
    //获取视频区域树结构
    wsVideoZoneList() {
      let url = `/prod-api/wisdomScreen/video/wsVideo/zone/list`;
      axios
        .get(url, {
          params: this.pageParams,
        })
        .then((res) => {
          if (res.data.code === 200) {
            // let rows = res.data.data;
            this.menuList = res.data.data;
            this.menuList1 = res.data.data;
            this.menuSelect("1", ["1", "1-1"]);
            //区域名称：partitionName
            //监控点：monitoryPoint
            //设备编号：serialNumber
            //通道编号：channelNumber
          }
        });
    },

    //点击树监控点直播   备注：默认树第一个直播
    wsVideoPlay() {
      let url = `/prod-api/wisdomScreen/video/wsVideo/select/play`;
      axios
        .get(url, {
          params: this.pageParams,
        })
        .then((res) => {
          if (res.data.code === 200) {
            this.viedoParams = res.data.msg;
            //直播地址：liveUrl
            this.preview = false;
            let _this = this;
            setTimeout(function () {
              _this.preview = true;
            }, 150);
          }
        });
    },

    //九宫格样式切换接口
    wsVideoProjectPlay(pageParams) {
      this.liveUrl_arr = [];
      let url = `/prod-api/wisdomScreen/video/wsVideo/project/play`;
      axios
        .get(url, {
          params: pageParams,
        })
        .then((res) => {
          if (res.data.code === 200) {
            this.total = res.data.total;
            if (res.data.rows.length != 0) {
              let rows = res.data.rows;
              rows.forEach((item) => {
                this.liveUrl_arr.push(item.liveUrl);
              });
            }
            //直播地址：liveUrl
          }
        });
    },

    //八卦图
    wsVideoStartPTZ() {
      let url = `/prod-api/wisdomScreen/video/wsVideo/start/PTZ`;
      axios
        .get(url, {
          params: this.pageParams,
        })
        .then((res) => {
          if (res.data.code === 200) {
            this.preview = false;
            this.viedoParams = res.data.msg;
            setTimeout(() => {
              this.preview = true;
            }, 500);
          } else if (res.data.code == 500) {
            this.$message({
              message: res.data.msg,
              type: "warning",
            });
          }
        });
    },
    // 摄像头的控制
    doControl(type) {
      this.pageParams.direction = type; //操作命令：0-上，1-下，2-左，3-右，4-左上，5-左下，6-右上，7-右下，8-放大，9-缩小，10-近焦距，11-远焦距
      this.wsVideoStartPTZ();
    },
    // 获取监控
    getCarmerList: function () {
      // 参数为pageParams，如有多的添加新的参数
    },
    // 点击菜单激活菜单
    menuSelect: function (index, path) {
      // 进行相关的回调
      
      let inder = index.indexOf("-");
      let indeb = path[0] * 1 - 1; // 第几个大菜单的索引
      let indec = index.substring(inder + 1) * 1 - 1; // 获取到当前在第几个大菜单下的第几个，索引应减去1  
      // console.log(this.menuList[indeb].wsVideoDTOList[indec].coverPicUrl); // 直播的视频封面
      //同理也可获取到改菜单对应的数据
      let data = this.menuList[indeb].wsVideoDTOList[indec]
      this.pageParams = Object.assign(this.pageParams, {
        partitionName: data.partitionName,
        monitoryPoint: data.monitoryPoint,
        serialNumber: data.serialNumber,
        channelNumber: data.channelNumber,
      });
      this.onLineType = '直播'
      this.onLine = true
      this.wsVideoPlay();
    },
    //   截屏操作
    screenPic: function () {
      this.$refs.monitorBox.onScreenShotBtnClick();
    },
    // 回放
    playBack: function () {
      this.showCalendar = !this.showCalendar;
    },
    // 时间掉萤石云接口
    async getDate(date) {
      let url = `/prod-api/wisdomScreen/video/wsVideo/backPlay`;
      await axios
        .get(url, {
          params: this.pageParams,
        })
        .then((res) => {
          if (res.data.code === 200) {
            let row = res.data.data;
            this.accessToken = row.accessToken
            if (date) {
              this.iframe.url = `https://open.ys7.com/ezopen/h5/iframe_se?url=ezopen://open.ys7.com/${this.pageParams.serialNumber}/${this.pageParams.channelNumber}.local.rec?begin=${date[0]}&end=${date[1]}&autoplay=1&audio=1&accessToken=${this.accessToken}`;
            }
          }
        })
    },
    // 切换视频数量
    changeNmu: function (num) {
      switch (num) {
        case 1:
          this.cameraSize = 1;
          this.asideShow = true;
          break;
        case 3:
          this.cameraSize = 3;
          this.pageParams = Object.assign(this.pageParams, {
            pageSize: 9, //默认三列的时候一页为九个
            pageNum: 1, //当前页
          });
          this.wsVideoProjectPlay(this.pageParams);
          this.asideShow = false;
          break;
        case 4:
          this.cameraSize = 4;
          this.pageParams = Object.assign(this.pageParams, {
            pageSize: 12, //默认三列的时候一页为九个
            pageNum: 1, //当前页
          });
          this.wsVideoProjectPlay(this.pageParams);
          this.asideShow = false;
          break;
      }
    },
    // 点击多个屏幕中一个
    seeThis: function (index) {
      // 获取该索引对应的监控信息，这里仅作模拟
      this.cameraSize = 1;
      this.viedoParams = this.liveUrl_arr[index];
      this.onLineType = "直播";
    },
    // 页码改变时候请求页码的新数据
    handleCurrentChange: function () {
      // this.getCarmerList();
      this.wsVideoProjectPlay(this.pageParams);
    },
  },
  mounted() {
    // 获取本业数据
  },
};
</script>
<style lang="less">
.video-page {
  position: relative;
  .display-absolute {
    position: absolute;
  }
  .h-full {
    width: 100%;
    height: 100%;
  }
  .camera-icon {
    width: 17px;
    height: 19px;
    margin-right: 8px;
  }
  .el-menu {
    background-color: transparent;
    color: #fff;
    border: none;
    .el-menu.el-menu--inline {
      background-color: transparent;
    }
    .el-submenu__title {
      color: #00a8ff;
    }
    .el-menu-item-group__title {
      display: none;
    }
    .el-menu-item {
      background: transparent;
      color: #fff;
    }
    .el-menu-item:hover {
      background-color: #00a8ff;
      opacity: 0.7;
      border-radius: 23px;
      color: #ffea02;
    }
    .el-submenu__title:focus,
    .el-submenu__title:hover {
      background-color: #00a8ff;
      opacity: 0.9;
      border-radius: 23px;
      color: #ffea02;
    }
    .el-menu-item.is-active {
      background-color: #00a8ff;
      opacity: 1;
      border-radius: 23px;
      color: #ffea02 !important;
    }
  }
  .el-radio-button__orig-radio:checked + .el-radio-button__inner {
    background-color: #1b90fe;
    color: #fff;
  }

  .flex {
    width: 100%;
    display: flex;
    height: 800px;
    .right-control {
      width: 198px;
      height: 100%;
      margin: 15px 2px 0 37px;
      position: relative;
      .el-picker-panel {
        background: transparent;
        color: #fff;
        border: none;
      }
      .el-picker-panel.el-date-picker.el-popper {
        background: transparent;
        color: #fff;
        border: none;
      }
      .el-picker-panel__icon-btn {
        color: #fff;
      }
      .el-popper[x-placement^="bottom"] .popper__arrow::after {
        top: 1px;
        margin-left: -6px;
        border-top-width: 0;
        border-bottom-color: rgb(11, 40, 102);
      }
      .control-box {
        width: 198px;
        height: 199px;
        cursor: pointer;
        margin-bottom: 19px;
      }
      .btn-box {
        display: flex;
        width: 198px;
        justify-content: space-around;
        flex-wrap: wrap;
        .control-btn {
          width: 85px;
          height: 33px;
          margin-bottom: 14px;
          background: rgba(1, 19, 68, 0.6);
          border: 1px solid #004de9;
          cursor: pointer;
          line-height: 33px;
          text-align: center;
          color: #33b5ff;
          font-size: 14px;
        }
        .control-btn:hover {
          background: rgba(1, 19, 68, 0.8);
        }
      }
    }
    .viedo-main {
      flex: 1;
      width: 400px;
      height: 100%;
    }
    .size-three {
      width: 580px;
      height: 300px;
      margin: 15px 16px 15px 0;
    }
    .size-four {
      width: 436px;
      height: 238px;
      margin: 0 10px 16px 0;
    }
  }
}
// 回放样式
.mainIframe {
  width: 100%;
  height: 500px;
  // height: 85%;
  margin-top:10px;
  margin-bottom: 20px;
  background: #000;
}
.round-btn {
  width: 33px;
  border-bottom: 56px solid transparent;
  border-right: 21px solid transparent;
  border-left: 21px solid transparent;
  position: absolute;
  cursor: pointer;
}
.round-btn:hover {
  filter: blur(2px);
}

.round-btn-1 {
  transform: rotate(180deg);
  left: 60px;
  top: 0px;
}

.round-btn-2 {
  transform: rotate(224deg);
  left: 111px;
  top: 21px;
}

.round-btn-3 {
  transform: rotate(270deg);
  left: 132px;
  top: 71px;
}

.round-btn-4 {
  transform: rotate(315deg);
  left: 110px;
  top: 121px;
}

.round-btn-5 {
  left: 60px;
  top: 141px;
}

.round-btn-6 {
  transform: rotate(405deg);
  left: 11px;
  top: 120px;
}

.round-btn-7 {
  transform: rotate(449deg);
  left: -8px;
  top: 70px;
}

.round-btn-8 {
  transform: rotate(495deg);
  left: 11px;
  top: 20px;
}
.el-date-editor--datetimerange.el-input, .el-date-editor--datetimerange.el-input__inner {   
    background: transparent;
    border: 1px solid #004DE9;
}
</style>
<style>
.el-date-editor--datetimerange.el-input, .el-date-editor--datetimerange.el-input__inner {
    width: 236px;
}
</style>