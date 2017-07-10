<template>
    <div class="topbar-wrap topbar-clearfix">
                <div class="topbar-yylogo topbar-left">
                    <div class="topbar-yylogo-imgBox">
                        <a href="#"><!--<img src="../../assets/ambuf/images/logo/portalLogo.png" width="95%" />--></a>
                    </div>
                </div>
                <div class="topbar-workbench topbar-left">
                    <router-link to="/manage">工作台</router-link>
                </div>
                <div class="topbar-global-nav topbar-left">
                    <a href="javascript:void(0)">功能大全</a>
                </div>
                <div class="topbar-info topbar-right topbar-clearfix">
                    <div class="topbar-mobile-edition topbar-left">
                        <a href="#"><span class="icon-phone"></span>手机版</a>
                    </div>
                    <div class="topbar-user topbar-left" :class="{'topbar-user-showLogout':expendLogin}">
                        <a href="#/" class="topbar-remind">
                            <span class="topbar-remind-text">通知</span>
                            <span class="topbar-remind-num icon-remind-dbsy">2</span>
                        </a>
                        <ul class="topbar-remind-list">
                            <li><a href="#">您是否需要自己做一款后台、会员中心等等的</a></li>
                            <li><a href="#">您是否需要自己做一款后台、会员中心等等的</a></li>
                            <li><a href="#">您是否需要自己做一款后台、会员中心等等的</a></li>
                            <li><a href="#">您是否需要自己做一款后台、会员中心等等的</a></li>
                            <li><a href="#">您是否需要自己做一款后台、会员中心等等的</a></li>
                            <li class="topbar-remind-more"><a href="#">查看全部</a></li>
                        </ul>
                        <a href="#/" ref="showLoginMessId" class="topbar-user-box">
                            <span class="topbar-user-name" v-if="typeof userInfo.name!='undefined'">{{userInfo.name}}({{userInfo.roleList[0].name}})</span>
                            <span class="topbar-user-arrow icon-arrow-down2"></span>
                            <span class="topbar-user-logout">
									<span class="topbar-user-logout-text" @click="loginOut">退出</span>
								</span>
                        </a>
                    </div>
                  <!-- <div class="topbar-zyysLogo topbar-left">
                       <a href="#"><img src="../../assets/ambuf/images/logo/small-zyysLogo.png" /></a>
                    </div>-->
                </div>
            </div>
</template>
<script>
  let Util=null;
  export default{
      data(){
          return{
              expendLogin:false,
              showLogin:false,
      }
      },
    created(){
      Util = this.$util;
    },
    methods:{
      showLoginMess(){
          this.expendLogin = !this.expendLogin;
          this.$emit("setZindex",this.expendLogin);
      },
      loginOut(){
        //退出登陆
        Util.loginOut(this);
      }
    },
    computed:{
      userInfo(){
        return this.$store.getters.getUserInfo||{};
      }
    },
    mounted(){
      let that = this;
      this.$nextTick(() => {
        Util.events.addHandler(this.$refs.showLoginMessId, "click", function (e) {
          e.stopPropagation();
          that.showLoginMess();
        });
        Util.events.addHandler(document, "click", function () {
          that.expendLogin = false;
          that.$emit("setZindex", false);
        });
      })
    }
  }
</script>
