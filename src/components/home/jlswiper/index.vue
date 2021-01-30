<template>
<div class="cus-body" @mouseover="mouseover" @mouseleave="mouseleave" >
	<div class="cus-header" v-if="option.mainPpt !== false"><span class="cus-title"><span>{{option.title}}</span></span></div>
	<div class="jlswiper" :style="`height:${pptHeight}%;width:${pptWidth}%;margin-top:${marginTop}px;margin-bottom:${(100-pptHeight)/2}%;margin-left:${(100-pptWidth)/2}%;margin-right:${(100-pptWidth)/2}%`">
		
	  <div :class="`curent ${!option.imageBtn ? 'imgbtn' : ''}`" >
		<div :class="option.dynLine != false ? 'img':''" class="pptimg">
			<div v-if="!fileType" :style="`background:url(${curent.value}) no-repeat center center / ${bgImg}; height:100%; width:100%`" class="pptimg">
				<div v-if="option.dynLine" class="img2" ></div>
			</div>
			<video v-if="fileType" :src="`${curent.value}`" controls="controls" id="video"></video>
		</div>
		
		<div :class="`jlswiper-title ${!option.imageBtn ? 'imgbtn' : ''}`">
			<div>{{curent.title}}</div>
		</div>
	  </div>
	  
      <ul :class="`swiper-list ${!option.imageBtn ? 'imgbtn' : ''}`" >
        <div>
          <template v-for="(item,index) in option.data">
            <li v-if="option.imageBtn" @click="show(item,index)" :key="index"  :class="index==onCur ? 'active' :''" style="position: relative;">
              <div v-if="!fileType" :style="`background:url(${item.value}) no-repeat center center / 100% 100%; height:100%; width:100%`"></div>
            </li>

            <div v-else @click="show(item,index)" :key="index" :class="index==onCur ? 'active' :''">
              <span></span>
            </div>
          </template>
        </div>
      </ul>
	</div>
</div>
</template>
<script>
export default {
  name: "jlswiper",
  props: {
    option: Object,
    component: Object,
  },
  data() {
    return {
      chartDom: Date.parse(new Date()),
      curent:null,
      bgImg:null,
      onCur:0,
      t:0,
	  k:0,
	  fileType:false,
	  timer:null,
	  timer2:null,
	  timeLen:3000
    }
  },
  computed: {
    fontSize() {
      return (this.option.fontSize || 30) + "px";
    },
    chartData() {
      return this.option.data;
    },
	mainPpt(){
	  return this.option.mainPpt || 0
	},
	pptHeight(){
	  return this.option.height || 100
	},
	pptWidth(){
	  return this.option.width || 100
	},
	marginTop(){
	  return this.option.margintop || 0
	}
  },
  created(){
    this.curent = this.option.data[0]
    this.show(this.curent,0)
    this.setImgBg(this.curent.value)
  },
  mounted() {
    this.show(this.curent,0)
	this.mouseleave()
  },
  methods: {
	mouseover(){
		clearInterval(this.timer)
	},
	mouseleave(){
		clearInterval(this.timer)
		this.timer = setInterval(() => {
		this.autoPlay()
	  }, this.timeLen)
	},
	// timeFun(){
	// 	this.timer2 = setInterval(() => {
	// 	this.selectDate()
	//   }, this.timeLen)
	// },
    show(info,index) {
      this.onCur = index
      this.curent = info
      this.setImgBg(this.curent.value)
    },
    autoPlay(){
      this.t++
      if(this.t <= this.option.data.length){
		let vedio = this.option.data[this.t-1].value
		let fileName = vedio.substring(vedio.lastIndexOf(".")+1)
		if(fileName === 'mp4'){
			this.fileType = true
		}else{
			this.fileType = false
		}
        this.onCur = this.t-1
        this.show(this.option.data[this.t-1],this.t-1)
      }else{
        this.t=0
      }
    },
    getImageInfo(url, callback) {
		let img = new Image();
		img.src = url;
		if (img.complete) {
			callback(img.width, img.height);
		} else {
			img.onload = function () {
				callback(img.width, img.height);
			}
		}
    },
    setImgBg(img){
      let _this=this
      this.getImageInfo(img, function (width, height) {
        if(width / height > 1.4){
          _this.bgImg = "auto 100%"
        }else if(height / width > 1.4){
          _this.bgImg = "100% auto"
        }else{
          _this.bgImg = "auto"
        }
      })
    },
  },
  watch: {},
};
</script>
<style lang="scss" scoped>
#video,
.pptimg{ height:100%; width: 100%; position: absolute;left: 0; top:0; z-index: 9;}
.jlswiper {
    position: absolute;
    top: 0;
    width: 99.9%;
    height: 99.9%;
	z-index: 19;
}
.curent {
    position: absolute;
    width: 100%;
    height: 77%;
}
.swiper-list {
    width: 100%;
    height: 20%;
    display: flex;
    position: absolute;
    bottom: 0;
    li{
    display: flex;
    margin: 0 5px;
    flex: 1;
    height: 100%;
    }
    > div{
      flex: 1;
      display: flex;
    }
}
.swiper-list li:first-child {
    margin-left: 0;
}
.swiper-list li:last-child {
    margin-right: 0;
}
.jlswiper-title {
    position: absolute;
    bottom: 0;
    width: 100%;
    color: #fff;
    padding: 1.5% 0;
    background: rgba(64, 158, 255, 0.3);
    text-indent: 2rem;
    text-shadow: 1px 1px 1px #003863;
}
.active div {
    box-shadow: 0px 0px 10px 5px #409eff inset;
    border: 1px solid #1387ff;
}
.curent.imgbtn{ 
  height: 100%;
}
.jlswiper-title.imgbtn {
    top: 0;
    bottom: unset;
}
.swiper-list.imgbtn{
  display: flex;
  align-items: center;
  > div {
    flex: unset;
    margin: 5px auto;
    height: 20%;
    position: relative;
    text-align: center;
    > div {
      background: #06fffb;
      margin: 10px;
      height: 10px;
      width: 10px;
      border-radius: 50%;
    }
    > div.active {
      background: #ffdd00;
      margin: 10px;
      height: 10px;
      width: 10px;
      border-radius: 50%;
    }
  }
}
.img {
    position: relative;
}

.img:before {
    position: absolute;
    content: '';
    background: #00f4ff;
    width: 0%;
    height: 2px;
    bottom: 0;
    left:0;
    z-index: 99;
    animation:imgbefore 3s infinite;
    -moz-animation:imgbefore 3s infinite; /* Firefox */
    -webkit-animation:imgbefore 3s infinite; /* Safari and Chrome */
    -o-animation:imgbefore 3s infinite; /* Opera */
}
@keyframes imgbefore{0% {width:0%;opacity:1; left:50%;}100% {width:100%; opacity: 0; left:0;}}
@-moz-keyframes imgbefore{0% {width:0%;opacity:1; left:50%;}100% {width:100%; opacity: 0; left:0;}}
@-webkit-keyframes imgbefore{0% {width:0%;opacity:1; left:50%;}100% {width:100%; opacity: 0; left:0;}}
@-o-keyframes imgbefore{0% {width:0%;opacity:1; left:50%;}100% {width:100%; opacity: 0; left:0;}}

.img:after {
    position: absolute;
    content: '';
    width: 0%;
    height: 2px;
    top:0;
    z-index: 99;
    right: 0;
    background: #00f4ff;
    animation:imgafter 3s infinite;
    -moz-animation:imgafter 3s infinite; /* Firefox */
    -webkit-animation:imgafter 3s infinite; /* Safari and Chrome */
    -o-animation:imgafter 3s infinite; /* Opera */
}
@keyframes imgafter{0% {width:0%;opacity:1; left:50%;}100% {width:100%; opacity: 0; left:0;}}
@-moz-keyframes imgafter{0% {width:0%;opacity:1; left:50%;}100% {width:100%; opacity: 0; left:0;}}
@-webkit-keyframes imgafter{0% {width:0%;opacity:1; left:50%;}100% {width:100%; opacity: 0; left:0;}}
@-o-keyframes imgafter{0% {width:0%;opacity:1; left:50%;}100% {width:100%; opacity: 0; left:0;}}

.img2 {
    position: absolute;
    height: 100%;
    width: 100%;
}
.img2:before {
    position: absolute;
    content: '';
    background: #00f4ff;
    width: 2px;
    height:100% ;
    right: 0;
    z-index: 99;
    bottom:0;
    animation:img2top 3s infinite;
    -moz-animation:img2top 3s infinite; /* Firefox */
    -webkit-animation:img2top 3s infinite; /* Safari and Chrome */
    -o-animation:img2top 3s infinite; /* Opera */
}
@keyframes img2top{0% {height:0%;opacity:1; top:50%;}100% {height:100%; opacity: 0; top:0;}}
@-moz-keyframes img2top{0% {height:0%;opacity:1; top:50%;}100% {height:100%; opacity: 0; top:0;}}
@-webkit-keyframes img2top{0% {height:0%;opacity:1; top:50%;}100% {height:100%; opacity: 0; top:0;}}
@-o-keyframes img2top{0% {height:0%;opacity:1; top:50%;}100% {height:100%; opacity: 0; top:0;}}

.img2:after {
    position: absolute;
    content: '';
    left:0;
    top:0;
    width: 2px;
    z-index: 99;
    height:100% ;
    background: #00f4ff;
    animation:img2bottom 3s infinite;
    -moz-animation:img2bottom 3s infinite; /* Firefox */
    -webkit-animation:img2bottom 3s infinite; /* Safari and Chrome */
    -o-animation:img2bottom 3s infinite; /* Opera */
}
@keyframes img2bottom{0% {height:0%;opacity:1; top:50%;}100% {height:100%; opacity: 0; top:0;}}
@-moz-keyframes img2bottom{0% {height:0%;opacity:1; top:50%;}100% {height:100%; opacity: 0; top:0;}}
@-webkit-keyframes img2bottom{0% {height:0%;opacity:1; top:50%;}100% {height:100%; opacity: 0; top:0;}}
@-o-keyframes img2bottom{0% {height:0%;opacity:1; top:50%;}100% {height:100%; opacity: 0; top:0;}}
</style>