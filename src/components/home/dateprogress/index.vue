<template>
  <div class="cus-body">
    <div id="progress">
      <div class="block-name">工程进度</div>

      <div class="key-data">
        <span class="keydata keydata1">
          <span class="name">计划开工日期</span>
          <span class="data" style="font-size: 22px;color: #FFEA02;">{{ commencementDate }}</span>
        </span>
        <span class="keydata keydata2">
          <span class="name">计划竣工日期</span>
          <span class="data" style="font-size: 22px;color: #36E5FF;">{{ completedDate }}</span></span
        >
      </div>

      <div class="node-data">
        <span
          v-for="(item1, index) in scheduleList"
          :key="index"
          :class="'state' + item1.colouType"
        >
          <div class="node-block">
            <span></span>
          </div>

          <div class="node-point">
            <div class="point"></div>
            <div class="line" v-if="item1.state != 0"></div>
          </div>

          <div class="node-info">
            <div>{{ item1.scheduleType }}</div>
            <div>{{ item1.scheduleDate }}</div>
          </div>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import { visUrl, getUrlParames } from "@/api/httpClient.js";
import axios from "axios";
export default {
  name: "dateprogress",
  props: {
    option: Object,
    component: Object,
  },
  data() {
    return {
      commencementDate: null,
      completedDate: null,
      scheduleList: null,
      params: {
        projectId: null,
        companyId: null,
      },
    };
  },
  computed: {
    fontSize() {
      return (this.option.fontSize || 30) + "px";
    },
    chartData() {
      return this.option.data;
    },
  },
  mounted() {
    let that = this;
    setTimeout(function () {
      that.getChart();
      that.getCharts();
    }, 1000);
    if (getUrlParames("userType") == 1) {
      //项目级
      this.params.projectId = getUrlParames("userId");
    } else {
      //企业级
      this.params.companyId = getUrlParames("userId");
    }
    axios.defaults.headers.common["Authorization"] = getUrlParames("token");
  },
  methods: {
    getChart() {
      let url = `/prod-api/wisdomScreen/home/wsHome/startOrCompleteDate`;
      axios
        .get(url, {
          params: this.params,
        })
        .then((res) => {
          if (res.data.code === 200) {
            let row = res.data.data;
            this.commencementDate = row.commencementDate;
            this.completedDate = row.completedDate;
          }
        });
    },

    getCharts() {
      let url = `/prod-api/wisdomScreen/home/wsHome/milepost`;
      axios
        .get(url, {
          params: this.params,
        })
        .then((res) => {
          if (res.data.code === 200) {
            this.scheduleList = res.data.rows;
          }
        });
    },
  },
  watch: {},
};
</script>
<style lang="scss" scoped>
#progress {
  padding: 10px 20px;
  .block-name {
    text-align: left;
    font-weight: bold;
    font-size: 25px;
    font-style: italic;
    color: #36e5ff;
    padding: 0 0 20px 0;
  }
  .key-data {
    text-align: center;
    margin: 0 0 40px 0;
    .keydata {
      padding: 10px 20px;
      font-size: 18px;
      margin: 0 10px;
      background: url(../../../assets/project/progress-date-bg-l.png) no-repeat
          left top,
        url(../../../assets/project/progress-date-bg-r.png) no-repeat right
          bottom;
      color: #fff;
      .data {
        font-weight: bold;
        padding-left: 10px;
      }
    }
  }
  .node-data {
    .state2 {
      .node-block {
        transform: skew(15deg);
        span {
          background: #ffae5c;
        }
      }
      .node-point {
        .point {
          background: #ffae5c;
        }
        .line {
          background: #ffae5c;
        }
      }
      .node-info {
        color: #ffae5c;
      }
    }
    .state1 {
      .node-block {
        transform: skew(15deg);
        span {
          background: #36e5ff;
        }
      }
      .node-point {
        .point {
          background: #36e5ff;
        }
        .line {
          background: #36e5ff;
        }
      }
    }
    .state3 {
      .node-block {
        transform: skew(15deg);
        span {
          background: #17436d;
        }
      }
      .node-point {
        .point {
          background: #17436d;
        }
        .line {
          background: #17436d;
        }
      }
      .node-info {
      }
    }
  }
}
.node-data {
  display: flex;
  justify-content: space-between;
  width: 100%;
  text-align: center;
}
.node-data > span {
  display: flex;
  flex: 1;
  text-align: center;
  flex-direction: column;
}
.node-block {
  width: 100%;
  height: 30px;
}
.node-point {
  height: 20px;
  width: 100%;
  position: relative;
}
.node-point .line {
  height: 1px;
  width: 100%;
  position: absolute;
  top: 50%;
}
.state1 .node-point .line:before {
  background: #00dfff;
  box-shadow: 0px 0px 1px 1px #00dfff;
  opacity: 0.4;
}
.state2 .node-point .line:before {
  background: #ff8000;
}
.state3 .node-point .line:before {
  background: #00dfff;
  box-shadow: 0px 0px 1px 1px #00dfff;
  opacity: 0.2;
}
.node-point .line:before {
  position: absolute;
  height: 100%;
  width: 100%;
  content: "";
  z-index: 5;
  left: 0;
  animation: pointline 2s infinite;
  -moz-animation: pointline 2s infinite; /* Firefox */
  -webkit-animation: pointline 2s infinite; /* Safari and Chrome */
  -o-animation: pointline 2s infinite; /* Opera */
}

@keyframes pointline {
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
}
@-moz-keyframes pointline {
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
}
@-webkit-keyframes pointline {
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
}
@-o-keyframes pointline {
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
}

.state2 .node-point .point:before {
  position: absolute;
  height: 150%;
  width: 150%;
  content: "";
  background: #ff8000;
  z-index: 2;
  left: -25%;
  top: -25%;
  border-radius: 50%;
  box-shadow: 0 0 1px 2px #ff9223;
  animation: state0dic 1s infinite;
  -moz-animation: state0dic 1s infinite; /* Firefox */
  -webkit-animation: state0dic 1s infinite; /* Safari and Chrome */
  -o-animation: state0dic 1s infinite; /* Opera */
}
@keyframes state0dic {
  from {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 1;
  }
  to {
    width: 150%;
    height: 150%;
    top: -25%;
    left: -25%;
    opacity: 0.2;
  }
}
@-moz-keyframes state0dic {
  from {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 1;
  }
  to {
    width: 150%;
    height: 150%;
    top: -25%;
    left: -25%;
    opacity: 0.2;
  }
}
@-webkit-keyframes state0dic {
  from {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 1;
  }
  to {
    width: 150%;
    height: 150%;
    top: -25%;
    left: -25%;
    opacity: 0.2;
  }
}
@-o-keyframes state0dic {
  from {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 1;
  }
  to {
    width: 150%;
    height: 150%;
    top: -25%;
    left: -25%;
    opacity: 0.2;
  }
}

.node-point .point {
  height: 10px;
  width: 10px;
  border-radius: 50%;
  position: absolute;
  top: 5px;
  left: 50%;
  z-index: 9;
}
.state1 .node-point .line {
  left: 50%;
}
.state3 .node-point .line {
  right: 50%;
}
.node-block span {
  display: block;
  height: 100%;
  margin: 0 2%;
  border-radius: 5px;
}
.node-block {
  transform: skew(15deg);
}
.node-info {
  display: flex;
  flex-direction: column;
  text-align: center;
  flex: 1;
  font-size: 17px;
  color: #fff;
}
</style>