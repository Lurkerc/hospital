<template>
  <div class="loginBox" v-loading.fullscreen.lock="isLogin">
    <div v-if="isLogin" style="text-align: center">数据加载中!</div>
    <div v-if="!isLogin">
      <h2>南京鼓楼教学管理系统</h2>
      <br />
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密 码" prop="password">
          <el-input type="password" v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<style>
  .loginBox {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 300px;
    height: 200px;
    margin: -200px 0 0 -250px;
  }

  .loginBox h2 {
    text-align: center;
  }

</style>
<script>
  let Util;
  export default {
    data() {
      return {
        isLogin: false,
        loginUrl: '',
        routerPath: {},
        ruleForm: {
          name: '',
          password: '',
        },
        rules: {
          name: [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }]
        },
        //获取菜单
        getMenusData: {
          ajaxSuccess: 'setMeusData',
          ajaxParams: {
            url: '/menu/query-tree-by-user',
            params: {}
          }
        },
      }
    },
    created() {
      Util = this.$util;
      let index = this.$store.getters.getIndexUrl;

      if (this.$cookie.get('Token') != null) {
        if (index != "") {
          this.$router.push(index);
        } else {
          this.isLogin = true;
          this.myPromise();
        }
      }
      /*if (this.$cookie.get('Token') != null) {
        this.isLogin = true;
        this.myPromise();
      }*/
    },
    methods: {
      setMeusData(responseData) {
        let data = responseData.data||[];
          if(data.length>0){
            data = data[0].children;
          }

        data.unshift({
          expand:true,
          icon:"",
          id:-100,
          leaf:true,
          modName:"work",
          name:"工作台",
          url:"",
          children:[{
            expand:true,
            icon:"",
            id:-101,
            leaf:true,
            modName:"workbench",
            name:"工作台",
            url:"",
            children:[{
              expand:true,
              icon:"",
              id:-102,
              leaf:true,
              modName:"work",
              name:"工作台",
              url:"",
            }]
          }]
        })

        //将设置完成的structureIndex赋值给 navs
        let index = "/manage",
          myData = data[0].children || [];
        for (var i = 0; i < myData.length;) {
          if (typeof myData[i].children != "undefined") {
            index += "/" + myData[i]["modName"];
            myData = myData[i].children;
          } else {
            index += "/" + myData[i]["modName"];
            break;
          }
        }

        this.setRouterPath(data, true);
        this.$store.commit('setIndexUrl', index);
        this.$store.commit('setRouterPath', this.routerPath);
        this.$router.push(index);
      },
      loginSuccess(responseData) {
        let token = responseData.data;
        this.$cookie.set('Token', token, 1);
        this.$store.commit("setToken", true);
        Util.setAjaxPostToken();

        setTimeout(() => {
          this.$store.commit("setUserInfo", this);
          // 系统常量
          this.$store.commit("setEnvPath", this);
        }, 100)

        setTimeout(() => {
          this.myPromise();
        }, 10)
      },
      myPromise() {
        let that = this;
        let myPromise = Util.queryData({
          url: '/menu/query-tree-by-user',
          method: 'get'
        })();
        myPromise.then(function (res) {
          let responseData = res.data;
          that.isLogin = false;
          if (Util._.isObject(responseData["status"]) && responseData["status"]["code"] == 0) {
            that.setMeusData(responseData);
          } else {
            that.errorMess('获取数据失败!');
          }

        }).catch(function (response) {
          if (response instanceof Error) {
            that.errorMess(response.message);
          } else {
            that.errorMess(response.status + "错误!");
          }
          that.isLogin = false;
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          let userName = Util._.trim(this.ruleForm.name);
          if (valid) {
            let options = {
              paramsData: 'listUrl',
              ajaxSuccess: 'loginSuccess',
              ajaxParams: {
                url: '/login',
                method: "post",
                data: {
                  username: userName,
                  password: this.ruleForm.password
                }
              }
            }
            this.ajax(options)
          } else {
            return false;
          }
        });
      },

      /**
       * 获取所有后台配置的路由地址
       * @param data
       * @param first
       * @param parItem
       */
      setRouterPath(data, first, parItem) {
        for (var i = 0, item; i < data.length; i++) {
          item = data[i];
          if (first) {
            item["path"] = "/manage";
            item["level"] = 1;
          } else {
            if (parItem["path"] == -1) {
              item["path"] = parItem["modName"] + "/" + item.modName;
            } else {
              item["path"] = parItem["path"] + "/" + item.modName;
            }
            item["level"] = parItem["level"] + 1;
          }
          this.routerPath[item["path"]] = item["path"]
          if (typeof item.children != "undefined" && item.children.length > 0) {
            this.setRouterPath(item.children, false, item);
          }
        }
      },
    }
  }

</script>
