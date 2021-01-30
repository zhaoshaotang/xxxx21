<template>
  <div>
    <ul :style="{color: color}">
      <li
        :style="`background-image:url(${backgroundImage});background-position: top left;background-repeat: no-repeat;background-size: 100% 100%;float:left;listStyle:none`"
        v-for="(item, index) in option.data"
        :key="index"
        @click="goPage(item.id)"
      >
        <a
          :style="{
            fontSize: fontSize,
            color: color,
            paddingLeft: paddingLR,
            paddingRight: paddingLR,
            paddingTop: paddingTB,
            paddingBottom: paddingTB,
            display: 'block',
          }"
          :href="item.url"
          target="_self"
        >
          {{ item.name }}
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
import { visUrl, getUrlParames } from "@/api/httpClient.js"
export default {
  name: "test",
  props: {
    option: Object,
    component: Object,
  },
  computed: {
    //字号设置
    fontSize() {
      return (this.option.fontSize || 20) + 'px'
    },
    //颜色设置
    color() {
      return this.option.color;
    },
    //list左右内边距设置
    paddingLR() {
      return this.option.paddinglr + "px";
    },
    //list上下内边距设置
    paddingTB() {
      return this.option.paddingtb + "px";
    },
    //list背景图设置
    backgroundImage() {
      return this.option.backgroundImage;
    }
  },
  mounted(){
    console.log(this.backgroundImage)

    
  },
  methods:{
    goPage(id){
      console.log(`${visUrl}/build/${id}?id=${id}&token=${getUrlParames("token")}`)
      window.location.href = `${visUrl}/build/${id}?id=${id}&token=${getUrlParames("token")}`
    }
  }
};
</script>