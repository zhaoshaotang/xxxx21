<!-- 自定义配置 -->
<template>
  <div>
    <el-collapse accordion>
      <!-- 设置菜单 -->
      <el-collapse-item title="设置菜单">
        <el-form-item label="菜单列表">
          <el-button size="mini" type="primary" @click="showDialog"
            >新建</el-button
          >
        </el-form-item>
        <el-form-item>
          <li v-for="(item, index) in menuList" :key="index" class="menu-item">
            <avue-input v-model="item.name" readonly></avue-input>
            <div class="setBar">
              <div style="width: 33%">
                <el-button
                  ><button
                    type="button"
                    @click="editMenu(item)"
                    class="del-btn"
                  >
                    <i class="el-icon-edit"></i></button
                ></el-button>
              </div>
              <div style="width: 33%">
                <el-button
                  ><button
                    type="button"
                    @click="delMenu(item.id)"
                    class="del-btn"
                  >
                    <i class="el-icon-delete"></i></button
                ></el-button>
              </div>
              <div style="width: 33%">
                <el-button v-if="index != 0"
                  ><button type="button" @click="upMenu(index)" class="del-btn">
                    <i class="el-icon-caret-top"></i></button
                ></el-button>
              </div>
              <div style="width: 33%">
                <el-button v-if="index + 1 != menuList.length"
                  ><button
                    type="button"
                    @click="downMenu(index)"
                    class="del-btn"
                  >
                    <i class="el-icon-caret-bottom"></i></button
                ></el-button>
              </div>
            </div>
          </li>
        </el-form-item>
      </el-collapse-item>

      <!-- 日期设置 -->
      <el-collapse-item title="日期设置">
        <el-form-item label="显示日期">
          <avue-switch v-model="time.dd"></avue-switch>
        </el-form-item>

        <el-form-item label="显示时">
          <avue-switch v-model="time.hh"></avue-switch>
        </el-form-item>

        <el-form-item label="显示分">
          <avue-switch v-model="time.mm"></avue-switch>
        </el-form-item>

        <el-form-item label="显示秒">
          <avue-switch v-model="time.ss"></avue-switch>
        </el-form-item>
      </el-collapse-item>
    </el-collapse>
    <Dialog
      :visible.sync="code.box"
      :type="code.type"
      :menuName="menuName"
      :editState="editState"
      @call-back="callback"
    ></Dialog>
  </div>
</template>

<script>
import { hadeConfig } from "@/option/config";
import { getUrlParames } from "@/api/httpClient.js";
import { getMenuPost, saveVisual, removeVisual } from "@/api/visual";
import Dialog from "./dialog";
import axios from "axios";
export default {
  data() {
    return {
      hadeConfig: hadeConfig,
      menuName: {
        id: "data升降机监测",
        visualId: "data升降机监测",
        name: "data升降机监测",
        isFirst: 2,
        detail: null,
        component: "component",
        isDeleted: 0,
        createTime: "data升降机监测",
        updateTime: "data升降机监测",
        sort: "sort",
      },
      code: {
        box: false,
        type: "",
        obj: "",
      },
      editState: null,
    };
  },
  components: {
    Dialog,
  },
  computed: {
    menuList() {
      return this.hadeConfig.menuItem || null;
    },
    time() {
      return this.hadeConfig.timeSet || null;
    },
  },
  mounted() {
    console.log(getUrlParames("token"));
    axios.defaults.headers.common["Authorization"] = getUrlParames("token");
    // this.getMenu()
  },
  methods: {
    getMenuAxios() {
      let url = `/prod-api/panel/visual/getConfigList`;
      axios.post(url, { visualId: 14 }).then((res) => {
        if (res.data.code === 200) {
          this.hadeConfig.menuItem = this.handleTree(
            res.data.data.reverse(),
            "id"
          );
        }
      });
    },
    //新增&修改
    updateMenu(data) {
      saveVisual(data)
        .then((res) => {
          console.log(res.data.code);
          if (res.data.code === 200) {
            this.getMenuAxios();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //删除菜单
    delMenu(id) {
      this.$confirm("此操作将删除当前大屏, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          removeVisual(id).then((res) => {
            this.getMenu();
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //编辑菜单
    editMenu(item) {
      this.menuName = item;
      this.editState = "edit";
      this.code.box = true;
    },
    //位置上移
    upMenu(i) {
      console.log(i);
      if (i != 0) {
        this.menuList[i] = this.menuList.splice(i - 1, 1, this.menuList[i])[0];
      }
    },
    //位置下移
    downMenu(i) {
      if (i < this.menuList.length) {
        this.menuList[i] = this.menuList.splice(i + 1, 1, this.menuList[i])[0];
      }
    },
    //弹窗
    showDialog() {
      this.menuName = {};
      this.editState = "add";
      this.code.box = true;
    },
    //新建&修改-子组件传父组件-回调
    callback(data) {
      console.log(data);
      this.updateMenu(data);
    },
    handleTree(data, id, parentId, children, rootId) {
      id = id || "id";
      parentId = parentId || "parentId";
      children = children || "children";
      rootId = rootId || 0;
      //对源数据深度克隆
      const cloneData = JSON.parse(JSON.stringify(data));
      //循环所有项
      const treeData = cloneData.filter((father) => {
        let branchArr = cloneData.filter((child) => {
          //返回每一项的子级数组
          return father[id] === child[parentId];
        });
        branchArr.length > 0 ? (father.children = branchArr) : "";
        //返回第一层
        return father[parentId] === rootId;
      });
      return treeData != "" ? treeData : data;
    },
  },
};
</script>

<style lang="scss" scoped>
li {
  list-style: none;
}
.menu-list li .el-input--mini:nth-child(2) {
  width: 60%;
}
.menu-list .el-input--mini {
  font-size: 12px;
  width: 35%;
}
.del-btn {
  width: 5%;
  display: block;
  border: 0;
  background: transparent;
  height: 100%;
  color: #ccc;
  cursor: pointer;
}
.del-btn:hover {
  color: brown;
}
.el-input--suffix .el-input__inner {
  padding-left: 5px;
  padding-right: 10px;
}
.el-input__icon {
  width: 10px;
}
.menu-title span {
  display: inline-block;
}
#menu-set .el-button--default,
#menu-set .el-dialog .el-button--default {
  background-color: transparent;
  color: #859094;
  border-color: #859094;
  padding: 0;
  border: 0;
}
#menu-set .el-button:focus,
#menu-set .el-button:hover {
  color: transparent;
  border-color: transparent;
  background-color: transparent;
}
#menu-set > * {
  margin-left: 10px !important;
  padding-right: 10px !important;
}
.menu-item {
  display: flex;
  margin-left: -50px;
}
.setBar {
  width: 50%;
  display: flex;
  div {
    text-align: center;
    button {
      margin: 0;
      padding: 0;
      border: 0;
      background: transparent;
    }
  }
}
</style>