<template>
  <div class="cus-body">
    <div class="cus-header">
      <div class="cus-title">
        <span>{{ option.title }}</span>
      </div>
    </div>
    <div class="cus-cont">
      <div class="video-wrap">
        <slot name="video-head"></slot>
        <div :id="playerConfig.id" :style="rootStyle" class="xg-player"></div>
      </div>
    </div>
  </div>
</template>
<script>
import "xgplayer";
import hlsjsPlayer from "xgplayer-hls.js";
import { mapGetters } from 'vuex';
import { visUrl, getUrlParames } from "@/common";
import axios from "axios";
export default {
  name: "WashVideo",
  components: {},
  props: {
    option: Object,
    component: Object,
  },
  data() {
    return {
      player: null,
      rootStyle: {
        width: "100%",
        height: "100%",
      },
      playMode: "hls",
      playerConfig: {
        id: "vs",
        url:
          "http://hls01open.ys7.com/openlive/cf388d27a62649b085b6d3ecdcb0cf9f.m3u8",
        autoplay: true,
        playsinline: true,
        fluid: false,
        loop: true,
      },
    };
  },
  created() {
    axios.defaults.headers.common["Authorization"] = getUrlParames("token");
  },
  mounted() {
     this.washcarVideo();
  },
  methods: {
      washcarVideo() {
      let url = `/prod-api/wisdomScreen/carwash/wsCarwash/video`;
      axios
        .get(url, {
          params: {serialNumber: this.serialNumber},
        })
        .then((res) => {
          if (res.data.code === 200) {
            let row = res.data.data;
            this.playerConfig.url = row.videoAddress
          }
           this.initPlayer(this.playerConfig);
        });
    },
    initPlayer(videoAddress) {
      try {
        this.player &&
          typeof this.player.destroy === "function" &&
          this.player.destroy();
      } catch (e) {
        console.log(e);
      }
      if (videoAddress && videoAddress !== "") {
        this.player = new hlsjsPlayer(this.playerConfig);
        this.$emit("player", this.player);
      }
    },
  },
  beforeUpdate() {
    // this.initPlayer();
  },
  beforeDestroy() {
    console.log("destroy");
    this.player &&
      typeof this.player.destroy === "function" &&
      this.player.destroy();
  },
  computed: {
    ...mapGetters({
      serialNumber: 'washSN'
    }),
    fontSize() {
      return (this.option.fontSize || 30) + "px";
    },
  },
  watch: {
    serialNumber: function () {
      this.washcarVideo();
    }
  }
};
</script>
<style lang="scss" scoped>
.cus-body {
  .video-wrap {
    width: 100%;
    height: 100%;
    padding: 40px 15px 30px;
    box-sizing: border-box;
    .xg-player {
      width: 100% !important;
      height: 100% !important;
      background: #000000;
    }
  }
}
</style>
