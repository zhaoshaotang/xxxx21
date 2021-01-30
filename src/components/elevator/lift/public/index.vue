<template>
  <div style="margin-top:20px;">
    <div style="display: flex; padding-left: 4%" class="style_he">
      <!-- 如果是离线状态所有的均为灰色 -->
      <div><b></b>未监控/离线</div>
      <div><b :class="rows.cageMark==0||rows.cageMark==null?'cor0':''"></b>正常</div>
      <div><b class="cor1"></b>预警</div>
      <div><b class="cor2"></b>报警</div>
    </div>
    <div>
      <el-row v-if="arr&&arr.length>0">
        <el-col :span="6" v-for="(item, index) in arr" :key="index">
          <proess :item="item" :onOrOff="rows.onLine" v-if="item" :inder="index"></proess>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import proess from "@/components/elevator/lift/proess";
export default {
  name: 'proess-color',
  components:{proess},
  props:["rows"],
  data() {
    return {
      progress: 30,
      percent: 0,
      arr: [],
    };
  },
  watch:{
    "rows":function(){
        var arr = [];
        arr[0] = {
          name:'载重(t)',
          value:this.rows.weight,
          max:this.rows.maxWeight?this.rows.maxWeight:'',
          color:"col0"
        }
        arr[1] = {
          name:'载重比(%)',
          value:this.rows.loadRatio,
          max:100,
          color:"col1"
        }
        arr[2] = {
          name:'高度(m)',
          value:this.rows.height,
          max:this.rows.maxHeight?this.rows.maxWeight:'',
          color:"col2"
        }
        arr[3] = {
          name:'速度(m/s)',
          value:this.rows.speed,
          max:this.rows.maxSpeed?this.rows.maxWeight:'',
           color:"col3"
        }
        arr[4] = {
          name:'倾角(°)',
          value:this.rows.tilt,
          max:this.rows.tilt2?this.rows.maxWeight:'',
          color:"col4"
        }
        arr[5] = {
          name:'前门状态',
          value:this.rows.foreDoorStatus,
          max:100,
          color:"col5"
        }
        arr[6] = {
          name:'后门状态',
          value:this.rows.behindDoorStatus,
          max:100,
           color:"col6"
        }
        arr[7] = {
          name:'身份认证状态',
          value:this.rows.authen,
          max:100,
          color:"col7"
        }
        this.arr = arr;
        console.log(this.rows,"cageMark")
    }
  },
  mounted(){
    
  }
};
</script>
<style scoped>
.cus-body {
  padding: 0px 42px 0px 32px;
}
.progress_jlschart {
 
  height: 84px;
  background: rgba(26, 72, 150, 0.4);
  margin-left: 10px;
  margin-top: 20px;}
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
}
.style_he div b {
  margin-right: 16%;
}
.style_he div b{
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

</style>
<style>
.el-row{
    margin-top:0px;
}
</style>