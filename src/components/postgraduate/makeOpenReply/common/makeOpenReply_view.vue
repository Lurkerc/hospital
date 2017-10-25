<template>

  <div>
    <el-form :model="operailityData" ref="formValidate"   label-width="90px" >
        <base-view :operailityData="operailityData">
          <slot></slot>
        </base-view>
      <el-row  class="table-back-one-d">
          <el-col :span="8" >
            <el-form-item label="审核状态:">
              {{operailityData.status | typeText}}
            </el-form-item>
          </el-col>
        </el-row>
      <el-row  class="table-back-one-d" v-if="operailityData.status=='TG'">
          <el-col :span="8" >
            <el-form-item label="答辩状态:">
              {{operailityData.resultStatus | dsresultRecord}}
            </el-form-item>
          </el-col>
        </el-row>
      <br/>

     <el-steps v-if="auditStep>-1" :space="200" :active="active" style="margin-left: 80px">
        <el-step  > <span slot="title" style="cursor: pointer" @click="changeActive(0)">导师审核</span><span slot="icon" style="cursor: pointer"  @click="changeActive(0)" >1</span></el-step>
        <el-step title="进行中"><span slot="title" style="cursor: pointer" @click="changeActive(1)">教研室审核</span><span slot="icon" style="cursor: pointer"  @click="changeActive(1)" >2</span></el-step>
        <el-step title="步骤 3"><span slot="title" style="cursor: pointer" @click="changeActive(2)">教育处审核</span><span style="cursor: pointer" slot="icon"  @click="changeActive(2)" >3</span></el-step>
      </el-steps>
      <div  v-if="auditStep!=-1" style="height: 100px">
        <!--&lt;!&ndash;导师审核&ndash;&gt;-->
        <div v-if="active==0">
          <el-row v-if="auditStep>0">
            <el-col :span="8" :offset="2">
              <el-form-item label="审核人:">
                {{operailityData.auditName}}
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="2">
              <el-form-item label="审核时间:">
                {{operailityData.auditTime }}
              </el-form-item>
            </el-col>
            <el-col :span="20" :offset="2">
              <el-form-item label="审核意见:">
                <el-input v-model="operailityData.auditOpinion"  type="textarea" autosize readonly resize="none"></el-input>
              </el-form-item>
            </el-col>
          </el-row >
          <el-row v-if="auditStep==0">
            <el-col :span="24"  style="font-size:18px; text-align: center;line-height: 100px;">
              <strong>导师审核中</strong>
            </el-col>
          </el-row >
        </div>
        <!--&lt;!&ndash;教研室审核&ndash;&gt;-->
        <div  v-if="active==1">
          <el-row v-if="auditStep>2">
            <el-col :span="8" :offset="2">
              <el-form-item label="审核人:" >
                {{operailityData.jysAuditName}}
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="2">
              <el-form-item label="审核时间:" >
                {{operailityData.jysAuditTime }}
              </el-form-item>
            </el-col>
            <el-col :span="20" :offset="2">
              <el-form-item label="审核意见:" >
                <el-input v-model="operailityData.jysAuditOpinion"  type="textarea" autosize readonly resize="none"></el-input>
              </el-form-item>
            </el-col>
          </el-row >
          <el-row v-if="auditStep==2">
            <el-col  :span="24"  style="font-size:18px; text-align: center;line-height: 100px;">
              <strong>教研室审核中</strong>
            </el-col>
          </el-row >
        </div>
        <!--&lt;!&ndash;教育处审核&ndash;&gt;-->
        <div  v-if="active==2">
          <el-row v-if="auditStep>4">
            <el-col :span="8" :offset="2">
              <el-form-item label="审核人:" >
                {{operailityData.jycAuditName}}
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="2">
              <el-form-item label="审核时间:" >
                {{operailityData.jycAuditTime }}
              </el-form-item>
            </el-col>
            <el-col :span="20" :offset="2">
              <el-form-item label="审核意见:" >
                <el-input v-model="operailityData.jycAuditOpinion"  type="textarea" autosize readonly resize="none"></el-input>
              </el-form-item>
            </el-col>
          </el-row >
          <el-row v-if="auditStep==4">
            <el-col  :span="24"  style="font-size:18px; text-align: center;line-height: 100px;">
              <strong>教育处审核中</strong>
            </el-col>
          </el-row >
        </div>
      </div>


    </el-form>
  </div>
</template>
<script>
  //当前组件引入全局的util
  let Util=null;
  import baseView from './makeOpenReply_base-view.vue'
  export default {
    props:['operailityData','url','peport','auditStep'],
    data (){
      return{
        active:0,
        //保存按钮基本信息
        loadBtn:{title:'提交',callParEvent:'listenSubEvent'},
        //form表单bind数据
        formValidate:this.operailityData,
        userData:[],
        selectNoticeModal:false,
        selectNoticeId:{
          id:"selectNoticeId",
          title:"选择研究生",
          usersData:''
        },
        graduateName:[],
        //当前组件提交(add)数据时,ajax处理的 基础信息设置
        noticeId:'',
        //当前组件默认请求(list)数据时,ajax处理的 基础信息设置
        listMessTitle:{
          ajaxSuccess:'SuccessGetCurrData',
          ajaxParams:{
            //url:this.url.auditGet.path+this.operailityData.id,
          }
        }
      }
    },
    created(){
      //给当前组件注入全局util
      Util = this.$util;
    },
    mounted(){
      //初始化
//      this.init();
    },
    methods:{
      /*
       * 默认组件第一次请求数据
       * @param res JSON  数据请求成功后返回的数据
       * */
      SuccessGetCurrData(responseData){
        let data = responseData.data;
        this.noticeId = data.noticeId;
        data.noticeName = data.title;
        this.formValidate = data;
        this.initActive(data.status);
      },

      /*
       * 组件初始化入口
       * */
      init(){
        //默认请求加载数据
        this.ajax(this.listMessTitle);
      },




      changeActive(active){
        let auditStep = this.auditStep
        if(auditStep<2){
          return;
        }else if (auditStep<4 && active>1){
          return;
        }
        this.active = active;
      },


    },
    components:{
      baseView
    }


  }
</script>

