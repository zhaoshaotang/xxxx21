<template>
  <div>
      <div class="video-box" ref="videoBox"></div>
  </div>
</template>

<script>
import 'xgplayer'
import hlsjsPlayer from 'xgplayer-hls.js';
// 导入西瓜视频内置的截图插件
export default {
    props: {
        url: { // 播放源
            type: String,
            // required: true
        },
        loop: { // 是否循环播放，默认true
            type: Boolean,
            default: true
        },
        autoplay: { // 自动播放默认 true
            type: Boolean,
            default: true
        },
        screenShot: { // 是否可截屏，默认可以
            type: Boolean,
            default: true,
        },
        controls: { // 默认无控制条 
            type: Boolean,
            default: false
        }
    },
    data(){
        return{
            Player: null, // 将要初始化的组件
        }
    },
    computed:{
    },
    mounted() {
      this.$nextTick(() => {
        this.initPlayer() // dom元素出现后立即执行初始化直播插件容器
      })
    },
    computed:{
    },
    methods:{
        // 初始化播放器
        initPlayer() {
            if(this.url){
                this.Player =  new hlsjsPlayer({
                    el: this.$refs.videoBox, // 初始化的dom元素
                    url: this.url,
                    fluid: true,
                    autoplay: this.autoplay, // 自动播放
                    //useHls: true
                    errorTips: `请<span>刷新</span>试试`,
                    controls: this.controls,
                    screenShot: this.screenShot,
                    loop: this.loop,
                    ignores: ['screenShot'], // 控制条无截图按钮
                })
            }
            
        },
        // 播放器的暂停
        pause: function(){ // 使用用调用 this.$refs[{refname}].pause()
            this.player.pause()
        },
        // 播放器的刷新播放
        reload: function(){
            this.player.reload()
        },
        // 全屏播放
        fullScreen: function(){
            this.player.getFullscreen(player.root)
        },
        // 退出全屏
        exitFullScreen: function(){
            this.player.exitFullscreen(player.root)
        },
        // 保存截屏
        saveScreenShot: function (data, filename) {
                let saveLink = document.createElement('a')
                saveLink.href = data
                saveLink.download = filename
                let event = document.createEvent('MouseEvents')
                event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
                saveLink.dispatchEvent(event)
        }, 
        // 截屏事件
        onScreenShotBtnClick: function (save = true) {
            let _this = this
            let root = this.Player.root
            // console.log(this.Player.config)
            let screenShotOptions = this.Player.config.screenShot
            if (!screenShotOptions) {
                return
            }
            let encoderOptions = 0.92
            if(screenShotOptions.quality || screenShotOptions.quality === 0) {
                encoderOptions = screenShotOptions.quality
            }
            let type = screenShotOptions.type === undefined ? 'image/png' : screenShotOptions.type
            let format = screenShotOptions.format === undefined ? '.png' : screenShotOptions.format

            let canvas = document.createElement('canvas')
            let canvasCtx = canvas.getContext('2d')
            let img = new Image()
            canvas.width = this.Player.config.width || 600
            canvas.height = this.Player.config.height || 337.5
            canvas.width = this.Player.video.videoWidth || 600
            canvas.height = this.Player.video.videoHeight || 337.5
            img.onload = (function () {
                canvasCtx.drawImage(_this.Player.video, 0, 0, canvas.width, canvas.height)
                img.setAttribute('crossOrigin', 'anonymous')
                img.src = canvas.toDataURL(type, encoderOptions).replace(type, 'image/octet-stream')
                let screenShotImg = img.src.replace(/^data:image\/[^;]+/, 'data:application/octet-stream') // 视频截图资源，如有上传请自定义上传规则
                _this.Player.emit('screenShot', screenShotImg)
                save && _this.saveScreenShot(screenShotImg, '截图' + format)
            })()
        }
    },
    beforeDestroy(){ // 销毁组件时销毁播放器
        // this.player.destroy();
    }
}
</script>

<style>
.video-box{
    width: 100%;
    height: 100%;
}
</style>