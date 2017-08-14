<!----------------------------------
****--点播视频播放器(video)
****--@date     2017/8/7
****--@author   zyc<332533011@qq.com
----------------------------------->
<template>
  <div ref="videoWrapper">
  <video-player  class="vjs-custom-skin"
                 ref="videoPlayer"
                 :options="playerOptions"
                 :playsinline="true"
                 @play="onPlayerPlay($event)"
                 @pause="onPlayerPause($event)"
                 @ended="onPlayerEnded($event)"
                 @loadeddata="onPlayerLoadeddata($event)"
                 @waiting="onPlayerWaiting($event)"
                 @playing="onPlayerPlaying($event)"
                 @timeupdate="onPlayerTimeupdate($event)"
                 @canplay="onPlayerCanplay($event)"
                 @canplaythrough="onPlayerCanplaythrough($event)"
                 @ready="playerReadied"
                 @statechanged="playerStateChanged($event)">
  </video-player>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        // videojs options
        playerOptions: {
          muted: true,
          language: 'en',
          playbackRates: [0.7, 1.0, 1.5, 2.0],
          sources: [{
            type: "video/mp4",
            src: "http://mirror.aarnet.edu.au/pub/TED-talks/911Mothers_2010W-480p.mp4"
          }],
          //poster: "http://jackzhang1204.github.io/materials/poster.png",
          height:100,
        }
      }
    },
    mounted() {
      // console.log('this is current player instance object', this.player)
      setTimeout(() => {
        // console.log('dynamic change options', this.player)
        this.player.muted(false)
      }, 10);
      this.$nextTick(function(){
        let videoPlayer = this.$refs.videoWrapper;
        let parHt = videoPlayer.parentNode.offsetHeight;
        this.playerOptions.height = parHt;
      })
    },
    computed: {
      player() {
        return this.$refs.videoPlayer.player
      }
    },
    methods: {
      // listen event
      onPlayerPlay(player) {
        // console.log('player play!', player)
      },
      onPlayerPause(player) {
        // console.log('player pause!', player)
      },
      onPlayerEnded(player) {
        // console.log('player ended!', player)
      },
      onPlayerLoadeddata(player) {
        // console.log('player Loadeddata!', player)
      },
      onPlayerWaiting(player) {
        // console.log('player Waiting!', player)
      },
      onPlayerPlaying(player) {
        // console.log('player Playing!', player)
      },
      onPlayerTimeupdate(player) {
        // console.log('player Timeupdate!', player.currentTime())
      },
      onPlayerCanplay(player) {
        // console.log('player Canplay!', player)
      },
      onPlayerCanplaythrough(player) {
        // console.log('player Canplaythrough!', player)
      },
      // or listen state event
      playerStateChanged(playerCurrentState) {
        // console.log('player current update state', playerCurrentState)
      },
      // player is ready
      playerReadied(player) {
        // seek to 10s
        player.currentTime(10)
        // console.log('example 01: the player is readied', player)
      }
    }
  }
</script>
