<template>
  <div class="cus-body">
    <div class="cus-header">
      <span class="cus-title">
        <span>{{ option.title }}</span>
      </span>
    </div>
    <div class="carousel" @mouseenter="enter" @mouseleave="leave">
      <transition-group
        tag="ul"
        name="image"
        enter-active-class="animated lightSpeedIn"
        leave-active-class="animated lightSpeedOut"
      >
        <li v-for="(image, index) in img" :key="index" v-show="index === mark" style="width:490px !important;height:222px !important;">
          <a href="javascript:;">
            <img :src="image.image" />
          </a>
        </li>
      </transition-group>
      <div class="bullet">
        <span
          v-for="(item, index) in img.length"
          :class="{ active: index === mark }"
          @click="change(index)"
          :key="index"
        ></span>
      </div>
      <div class="switch">
        <span class="prev" @click="prev">&lt;</span>
        <span class="next" @click="next">&gt;</span>
      </div>
    </div>

    <div class="piebody">
      <div class="jl-chart" :id="`chart${option.domId}`"></div>
    </div>
  </div>
</template>
<script>
import apple from '../../../../src/assets/a2.png'
import shell from '../../../../src/assets/a3.png'
import banner from '../../../../src/assets/a4.png'
export default {
  name: "indexminppt",
  props: {
    option: Object,
    component: Object,
  },
  data() {
    return {
      mark: 0,
      img: [
        { image: apple },
        { image: shell },
        { image: banner},
      ],
      time: null,
    };
  },
  created() {
    this.play();
  },
  mounted() {
    
  },
  methods: {
    change(i) {
      this.mark = i;
    },
    prev() {
      this.mark--;
      if (this.mark === -1) {
        this.mark = 3;
        return;
      }
    },
    next() {
      this.mark++;
      if (this.mark === 4) {
        this.mark = 0;
        return;
      }
    },
    autoPlay() {
      this.mark++;
      if (this.mark === 4) {
        this.mark = 0;
        return;
      }
    },
    play() {
      this.time = setInterval(this.autoPlay, 3000);
    },
    enter() {
      console.log("enter");
      clearInterval(this.time);
    },
    leave() {
      console.log("leave");
      this.play();
    },
  },
};
</script>
<style lang="scss" scoped>
li {
  list-style: none;
}
.carousel {
  width: 489px;
  height: 240px;
  overflow: hidden;
  position: relative;
}
.carousel ul {
  width: 100%;
  height: 100%;
}
.carousel ul li {
  position: absolute;
}
// .carousel ul li a img {
//   width: 500px;
//   height: 300px;
// }
.bullet {
  position: absolute;
  font-size: 0;
  bottom: 20px;
  left: 50%;
  margin-left: -42px;
}
.bullet span {
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: #ffffff;
  margin-left: 15px;
  border-radius: 10px;
}
.bullet span:first-child {
  margin-left: 0;
}
.switch span {
  position: absolute;
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.1);
  font-size: 20px;
  color: #ffffff;
  top: 50%;
  margin-top: -25px;
  cursor: pointer;
  font-family: "宋体";
}
.switch span:hover {
  background-color: rgba(0, 0, 0, 0.5);
}
.prev {
  left: 0;
}
.next {
  right: 0;
}
.active {
  background-color: red !important;
}
/*.image-enter-active{
            transform:translateX(0);
            transition:all 1s ease;
        }
        .image-leave-active{
            transform:translateX(-100%);
            transition:all 1s ease
        }
        .image-enter{
            transform:translateX(100%);
        }
        .image-leave{
            transform:translateX(0);
        }*/
.carousel{
  margin:10px auto;
}
</style>
