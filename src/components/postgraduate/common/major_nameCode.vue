<!----------------------------------
****--@name     ${*}
****--@role     ${*}
****--@date     2017/9/12
****--@author   gx
----------------------------------->
<template>
  <div>
    <el-option
      v-for="item in optionData"
      :key="item.id"
      :label="item.code=='全部'?'全部':`${item.name}(${item.code})`"
      :value="item.name+'-'+item.code">
    </el-option>
  </div>
</template>
<script>
  let Util=null;
  export default {

    props:['type','url',"selectOptions",'unAll',"setSltOptionValue",'currSelectOne','id','isCode','userType','userId','name','role','selectDefault'],
    data() {
      return {
        optionData: [],
        //当前组件默认请求(list)数据时,ajax处理的 基础信息设置
        listMessTitle:{
          ajaxSuccess:'updateListData',
          ajaxParams:{
            url:'major/getAffairType',  //向后台请求数据的地址
            params:{},
          }
        }
      }
    },
    created(){
      Util = this.$util;
      this.init();
    },
    methods:{


      //初始化组件信息
      init(){

        this.ajax(this.listMessTitle);
      },


      //通过get请求列表数据
      updateListData(responseData){
        let data = responseData.data;
        if(this.selectDefault){
          this.$emit('majorDefault',data[0])
        }

        this.optionData = data;
      },





    }
  }
</script>
