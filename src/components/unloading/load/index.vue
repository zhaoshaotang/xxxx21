<template>
  <div class="cus-body">
    <div class="cus-header">
      <span class="cus-title">
        <span>{{ option.title }}</span>
      </span>
      <el-row style="margin-top: 10%">
        <el-col :span="12"
          ><div class="grid-content bg-purple">
            <img src="./zaizhong.png">
            <p class="p">{{ weight }}</p>
            <p>当前载重</p>
          </div></el-col
        >
        <el-col :span="12"
          ><img src="./zuida.png"><div class="grid-content bg-purple">
            <p class="p">{{ maxWeight }}</p>
            <p>最大允许载重</p>
          </div></el-col
        >
      </el-row>
    </div>
    <div class="piebody">
      <div class="jl-chart" :id="`chart${option.domId}`"></div>
    </div>
  </div>
</template>
<script>
import { visUrl, getUrlParames } from "@/api/httpClient.js";
import { mapGetters, mapActions } from "vuex";
import axios from 'axios'
import img from '../../../option/components/img.vue';
export default {
  components: { img },
  name: "load",
  props: {
    option: Object,
    component: Object,
  },
  data() {
    return {
      // params:{
      //   equipmentNo:1908120494,
      // },
      weight: null,
      maxWeight: null,
      chartDom: Date.parse(new Date()),
    };
  },
  created() {
     axios.defaults.headers.common["Authorization"] = getUrlParames("token");
  },
    mounted() {
      this.weightQuery();
    },
  computed: {
    ...mapGetters({
      serialNumber: "unloadSN",
    }),
  },
  watch: {
    serialNumber: function () {
      this.weightQuery();
    },
  },
  methods: {
    weightQuery() {
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
             this.weight = row.weight
             this.maxWeight = row.maxWeight
          }
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.p {
  color: #00edfe;
  // padding-top:8%
  font-size: 23px;
}
.bg-purple {
  background: #0f345e00;
}
p {
  height: 40px;
  font-size: 16px;

  font-family: Microsoft YaHei;
}
</style>