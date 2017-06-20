<template>
  <div>
    <div class="remove">确定要删除吗？</div>

    <el-row >
      <el-col :span="10" :offset="14">
        <load-btn @handleRemove="handleRemove" :btnData="loadBtn"></load-btn>
        <el-button class="but-col"  @click="cancel('remove')" type="danger">取消</el-button>
      </el-col>
      </el-col >
    </el-row >
  </div>
</template>

<script>
  let Util;
  export default {
    props: ['operailityData','deleteUrl'],
    data (){
      return{
        //保存数据
        addUrl:'/role/add',
        loadBtn:{title:'确定',callParEvent:'handleRemove'},
        countDate:0,
        formValidate: {
          name:'',
          identify:null,
          remark:'',
          type:[]
        }
      }
    },
    created(){
      Util = this.$util;
    },
    methods:{
      cancel(){
        this.$emit('cancel','remove');
      },
      handleRemove(isLoadingFun){
        let that = this;
        let myUrl = [];
        isLoadingFun(true);

        for(var i=0;i<this.operailityData.length;i++){
          myUrl.push(this.operailityData[i].id);
        }
        myUrl = this.deleteUrl+"/"+myUrl.join(",");

        //处理服务数据
        let myPromise = Util.queryData({
          url:myUrl,
          method:'delete'
        })();
        myPromise.then(function (res) {
          let responseData = res.data;
          if(_.isObject(responseData["status"])&&responseData["status"]["code"]==0){
            that.$emit('remove','remove','删除成功');
          }else {
            that.errorMess('删除失败');
            isLoadingFun(false);
          }
        }).catch(function(response){
          if (response instanceof Error) {
            // 意外发生在设置要求引发一个错误
            that.errorMess(response.message);
            isLoadingFun(false);
          } else {
            that.errorMess(response.status+"错误!");
            isLoadingFun(false);
          }
        })
      },
    }

  }
</script>
