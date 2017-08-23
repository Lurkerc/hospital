<template>
  <div>
      <fieldset class="layui-elem-field">
        <legend>未评对象</legend>
        <el-row>
          <el-col :span="24">
          <div style="width: 120px;margin: 10px 15px;display: inline-block" :key="index" v-for="(item,index) in data.haveScoreList">
           <div @click="add(item)" >
             <img style="width: 120px;height: 120px;" :src="item.headPhoto" src="../../../../assets/ambuf/images/physician.png" alt="">
           </div>
            <p style="text-align: center">{{item.userName }}</p>
          </div>
          </el-col>
        </el-row>
      </fieldset>
    </br>
      <fieldset class="layui-elem-field">
        <legend>已评对象</legend>
        <el-row>
          <el-col :span="24">

            <div style="width: 120px;margin: 10px 15px;display: inline-block" :key="index" v-for="(item,index) in data.noScoreList">
             <div  @click="add(item)" style="width: 120px;height: 120px;background: #000">
               <img style="width: 120px;height: 120px;" :src="item.headPhoto | isDefImg"   alt="">
             </div>
              <p style="text-align: center">{{item.userName }}</p>
            </div>
          </el-col>
        </el-row>

      </fieldset>
    <!--选择人员-->
    <!--新建教学活动-->
    <Modal
      width="1000"
      v-model="addModal"
      title="新建教学活动"
      class-name="vertical-center-modal"
      >
      <modal-header slot="header" :content="addId"></modal-header>
      <add v-if="addModal"  @cancel="cancel" :url="url" @add="subCallback" :activityId="operailityData.id" :operailityData="operailityAdd"></add>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>
<script>
  import add from './myEvaluation_add.vue'
  export default{
    //props接收父组件传递过来的数据
    props: ['operailityData','url'],

    data(){
        return{
          //获取的数据
          "data":{
            haveScoreList:[],
            noScoreList:[],
          },

          addId:{id:'add',title:'添加'},
          operailityAdd:'',
          //当前组件默认请求(list)数据时,ajax处理的 基础信息设置
          listMessTitle: {
            ajaxSuccess: 'oneDataSuccess',
            ajaxParams: {
              url: this.url.queryByUser+'/'+this.operailityData.id,
              params: {},
            }
          },
        }
      },
    mounted(){
      //暂时没有初始化,预留初始化入口
      this.init();
    },
    methods:{
      /*
       * 组件初始化入口
       * */
      init(){
        this.ajax(this.listMessTitle)
        //todo 初始化模拟成功获取数据
        this.oneDataSuccess({data:{"haveScoreList":[
          {
            "id":4,
            "userId":10121,
            "userName":"d",
            "headPhoto":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1496925185808&di=c9178707ae1da3c10e32d2e0ec1a8f19&imgtype=0&src=http%3A%2F%2Ff.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fc9fcc3cec3fdfc03dfdfafcad23f8794a4c22618.jpg",
            "timFrame":false
          },
          {
            "id":5,
            "userId":10121,
            "userName":"d",
            "headPhoto":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1496925185808&di=c9178707ae1da3c10e32d2e0ec1a8f19&imgtype=0&src=http%3A%2F%2Ff.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fc9fcc3cec3fdfc03dfdfafcad23f8794a4c22618.jpg",
            "timFrame":false
          }
        ],
          "noScoreList":[
            {
              "id":1,
              "userId":-99999,
              "userName":"系统管理员",
              "headPhoto":"",
              "timFrame":false
            },
            {
              "id":2,
              "userId":10000,
              "userName":"小张一号",
              "headPhoto":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1496925185808&di=c9178707ae1da3c10e32d2e0ec1a8f19&imgtype=0&src=http%3A%2F%2Ff.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fc9fcc3cec3fdfc03dfdfafcad23f8794a4c22618.jpg",
              "timFrame":false
            },
            {
              "id":3,
              "userId":10120,
              "userName":"s",
              "headPhoto":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1496925185808&di=c9178707ae1da3c10e32d2e0ec1a8f19&imgtype=0&src=http%3A%2F%2Ff.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fc9fcc3cec3fdfc03dfdfafcad23f8794a4c22618.jpg",
              "timFrame":false
            },

          ]}

        })
      },


      /*
       * 默认组件第一次请求数据
       * @param res JSON  数据请求成功后返回的数据
       * 注:当前为添加页面暂时未用到,属于预留
       * */
      oneDataSuccess(responseData){
        let data = responseData.data;
        if(!data)return;
        this.data = data;
      },
      add(data){
        this.operailityAdd = data;
        this.addModal = true;
      },
      /*
       * 监听子组件通讯的方法
       * 作用:根据不同的参数关闭对应的模态
       * @param targer string example:"add"、"edit"
       * */
      cancel(targer){
        this[targer+'Modal'] = false;
      },

      /*
       * 监听子组件通讯的方法
       * 作用:ajax请求成功回调,该监听方法在libs/util 中的混合模式下定义回调
       * @param targer string example:"add"、"edit"
       * @param targer string 提示返回的ajax回调返回的信息改信息在对应的子组件中定义
       * 例如:errorTitle、errorTitle
       *addMessTitle:{
       *    type:'add',
       *    successTitle:'添加成功!',
       *    errorTitle:'添加失败!',
       *    ajaxSuccess:'ajaxSuccess',
       *    ajaxError:'ajaxError',
       *    ajaxParams:{
       *      url:'/role/add',
       *      method:'post'
       *    }
       *    }
       * @param udata boolean 默认false  是否不需要刷新当前表格数据
       * */
      subCallback(target,title,updata){
        this.cancel(target);
        if(title){
          this.successMess(title);
        }
        if(!updata){
          this.init();
        }
      },
    },
    components:{
      add
    }
  }
</script>
