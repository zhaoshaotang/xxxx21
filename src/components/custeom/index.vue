<template>
  <div :style="{fontSize:fontSize,color:'#fff'}">
    <div :style="{fontSize:fontSize,color:'#fff'}">自定义组件</div>
    <div :style="{fontSize:fontSize,color:'#fff'}">我是参数:{{this.option.data}}</div>
  </div>
</template>
<script>
export default {
  name: 'custeom',
  props: {
    option: Object,
    component: Object
  },
  computed: {
    fontSize () {
      return (this.option.fontSize || 20) + 'px'
    }
  },
  mounted(){
    // console.log(this.main)
    // console.log(this.option)
    console.log(this.option)
  }
}
</script>