<template>
  <div class="top-nav">
    <el-menu
      class="nav"
      mode="horizontal"
      background-color="#212528"
      text-color="#fff"
      active-text-color="#409EFF"
      @mousedown="contain.handleMouseDown"
    >
      <el-submenu
        :index="index + ''"
        v-for="(item, index) in baseList"
        :key="index"
      >
        <template slot="title">
          <el-tooltip effect="dark" :content="item.label" placement="top">
            <i :class="'nav__icon iconfont ' + item.icon"></i>
          </el-tooltip>
        </template>
        <div style="width: 390px;">
          <el-menu-item
            v-for="(citem, cindex) in item.children"
            @click="handleAdd(citem.option, true)"
            :key="cindex"
            class="menu-inline"
            :index="`${index}-${cindex}`"
          >
            <div class="usehove">
              <img :src="citem.option.icon" class="inside-img" />
              <div class="bottom-text">{{ citem.label }}</div>
            </div>
          </el-menu-item>
        </div>
      </el-submenu>
      <el-menu-item index="6" @click="handleReset" v-show="!contain.menuFlag">
        <el-tooltip effect="dark" content="还原" placement="top">
          <i class="nav__icon iconfont icon-reset"></i>
        </el-tooltip>
      </el-menu-item>
      <el-menu-item index="7" @click="handleView" v-show="contain.menuFlag">
        <el-tooltip effect="dark" content="预览" placement="top">
          <i class="nav__icon iconfont icon-view"></i>
        </el-tooltip>
      </el-menu-item>
      <el-menu-item index="8" @click="handleBuild">
        <el-tooltip effect="dark" content="保存" placement="top">
          <i class="nav__icon iconfont icon-build"></i>
        </el-tooltip>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import axios from "axios";
import { uuid } from "@/utils/utils";
import baseList from "@/option/base";
import { updateComponent } from "@/api/visual";

import {  getUrlParames } from "@/api/httpClient.js";
import { visUrl } from "@/config";
export default {
  inject: ["contain"],
  data() {
    return {
      baseList: baseList,
    };
  },
  mounted() {
    console.log(this.contain)
    axios.defaults.headers.common["Authorization"] = getUrlParames("token");
    console.log(getUrlParames("token"));
  },
  methods: {
    vaildData(id) {
      const list = [];
      for (var i = 0; i < 20; i++) {
        list.push(i + "");
      }
      return list.includes(id);
    },
    handleView() {
      this.contain.menuFlag = false;
      this.contain.handleInitActive();
      this.contain.setScale(document.body.clientWidth);
    },
    handleReset() {
      this.contain.menuFlag = true;
      this.contain.setScale(this.contain.contentWidth);
    },
    handleBuild() {
      console.log("1")
      console.log(this.contain)
      this.contain.handleInitActive();
      const loading = this.$loading({
        lock: true,
        text: "正在保存配置，请稍后",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      console.log("2")
      this.$nextTick(() => {
        console.log(document.getElementById("content"))
        html2canvas(document.getElementById("content"), {
          onrendered: (canvas) => {
            console.log("4")
            function dataURLtoFile(dataurl, filename) {
              var arr = dataurl.split(","),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]),
                n = bstr.length,
                u8arr = new Uint8Array(n);
              while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
              }
              return new File([u8arr], filename, { type: mime });
            }

            var file = dataURLtoFile(
              canvas.toDataURL("image/jpeg", 0.1),
              new Date().getTime() + ".jpg"
            );
            var formdata = new FormData();
            formdata.append("file", file);
            console.log("5")
            axios
              .post(visUrl + "/panel/visual/put-file", formdata, {
                //this.url +
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
              .then((res) => {
                const data = res.data.data;
                const url = data.link;
                console.log(data)
                console.log(url)

                console.log(this.contain)
                console.log(url)
                console.log(this.contain.obj.config.id)
                console.log(this.contain.visual.id)
                console.log(JSON.stringify(this.contain.config))
                console.log(JSON.stringify(this.contain.nav))

                const formdata = {
                  visual: {
                    id: this.contain.visual.id,
                    backgroundUrl: url,
                  },
                  config: {
                    id: this.contain.obj.config.id,
                    visualId: this.contain.visual.id,
                    detail: JSON.stringify(this.contain.config),
                    component: JSON.stringify(this.contain.nav),
                  },
                };
                console.log(formdata)

                axios
                  .post(visUrl + "/panel/visual/updateDto", formdata, {
                    //this.url +
                    // headers: {
                    //   "Content-Type": "multipart/form-data"
                    // }
                  })
                  .then((res) => {});

                //    return updateComponent(formdata)
              })
              .then(() => {
                loading.close();
                this.$confirm("大屏配置保存成功!", "提示", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "warning",
                })
                  .then(() => {
                    let routeUrl = this.$router.resolve({
                      path: "/view/" + this.contain.id,
                    });
                    // window.open(routeUrl.href, "_blank");
                  })
                  .catch(() => {});
              })
              .catch(() => {
                this.$message.error("模版例子不能修改");
                loading.close();
              });
          },
        });
      });
    },
    handleAdd(option, first = false) {
      console.log(option);
      let obj = this.deepClone(option);
      obj.left = 0;
      obj.top = 0;
      obj.index = uuid();
      if (first) {
        this.contain.nav.unshift(obj);
      } else {
        this.contain.nav.push(obj);
      }
    },
  },
};
</script>

<style lang='scss'>
.top-nav {
  .nav {
    border-bottom: 0 !important;
    height: 45px;
    line-height: 45px;
    overflow: hidden;
  }
  .nav__icon {
    margin-right: 5px;
  }
  .nav .el-submenu .el-submenu__title,
  .nav .el-menu-item {
    height: 45px;
    line-height: 45px;
    font-size: 12px;
  }

  .el-menu-item {
    height: 100px !important;
  }
}
.el-menu--horizontal {
  .menu-inline {
    text-align: center;
    display: inline-block !important;
  }
  .bottom-text {
    color: #b1b1b1;
  }
  .inside-img {
    width: 110px;
    height: 70px;
    border: 2px solid transparent;
    box-sizing: border-box;
  }
  .inside-img:hover {
    border-color: #006eff;
  }
  .usehove:hover {
    .bottom-text {
      color: #fff;
    }
  }
}
</style>
