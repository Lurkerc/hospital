<template>
  <div id="app">
    <Loading v-if="isLoading"></Loading>
    <router-view></router-view>
  </div>
</template>

<script>
import Loading from "./components/common/Loading.vue";
import {mapState} from "vuex";
export default {
  name: 'app',
  created(){
    if(this.$cookie.get('Token')!=null){
      let userInfo = this.$store.getters.getUserInfo;
      this.$store.commit("setUserInfo",this);
    }
  },
  computed:{
    ...mapState([
      'isLoading'
    ])
  },
  components:{
    Loading
  }
}
</script>
