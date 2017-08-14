<!----------------------------------
****--直播视频播放器(video)
****--@date     2017/8/7
****--@author   zyc<332533011@qq.com
----------------------------------->
<template>
  <video-player class="vjs-custom-skin"
                :options="playerOptions"
                @ready="playerReadied">
  </video-player>
</template>

<script>
  // hls plugin
  require('videojs-contrib-hls/dist/videojs-contrib-hls')
  export default {
    data() {
      return {
        playerOptions: {
          // videojs and plugin options
          sources: [{
            withCredentials: false,
            type: "application/x-mpegURL",
            src: "/hls/888.m3u8",
          }],
          height:500,
          controlBar: {
            timeDivider: false,
            durationDisplay: false
          },
          flash: { hls: { withCredentials: false }},
          html5: { hls: { withCredentials: false }},
          poster: "/static/images/author-5.jpg"
        }
      }
    },
    methods: {
      playerReadied(player) {
        var hls = player.tech({ IWillNotUseThisInPlugins: true }).hls
        player.tech_.hls.xhr.beforeRequest = function(options) {
          // console.log(options)
          return options
        }
      }
    }
  }
</script>
