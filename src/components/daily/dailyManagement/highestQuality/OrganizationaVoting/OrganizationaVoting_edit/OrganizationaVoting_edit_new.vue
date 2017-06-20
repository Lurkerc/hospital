<!--组织投票-->
<!-- 新建-->

<template>

  <div>
    <el-form ref="formValidate"  class="demo-form-inline" label-width="90px">
      <el-row >
        <el-col :span="17" :offset="2">
          <el-form-item label="标题:" prop="name" class="feildFontweight">
            <el-input  v-model="formValidate.title" placeholder="请输入" ></el-input>
          </el-form-item  >
        </el-col >
      </el-row >

      <el-row >
        <el-col :span="17" :offset="2">
          <el-form-item label="时间:" class="feildFontweight" prop="desc">
            <el-date-picker
              v-model="formValidate.startDate"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions0"
              @change="handleStartTime"
            >
            </el-date-picker>
            到
            <el-date-picker
              v-model="formValidate.endDate"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions1"
              @change="handleEndTime">
            </el-date-picker>
          </el-form-item>
        </el-col >
      </el-row >

      <el-row >
        <el-col :span="20" :offset="2">
          <el-form-item label="投票人:" prop="voterScope" >

            <el-radio-group v-model="formValidate.voterScope">
              <el-radio label="GROUP">本班</el-radio>
              <div>
                <el-row>
                  <el-col :span="24">
                    <div class="grid-content-ptop">

                      <el-radio label="DEP" >科室</el-radio>
                      <keep-alive>
                        <el-select v-if="formValidate.voterScope == 'DEP'" filterable   v-model="formValidate.depId"  style="margin-left: 10px" filterable placeholder="请选择">
                          <select-option ></select-option>
                        </el-select>
                      </keep-alive>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-radio-group>
          </el-form-item>
        </el-col >
      </el-row >

      <el-row >
        <el-col :span="17" :offset="2">
          <el-form-item label="规则:" prop="voteRule" class="feildFontweight" >
            <el-input v-model="formValidate.voteRule"  type="textarea" :rows="5" placeholder="请输入" ></el-input>

          </el-form-item  >
        </el-col >
      </el-row >


      <el-row >
        <el-col :span="20" :offset="2">
          <el-form-item v-model="formValidate.title" label="被投对象:" prop="desc" >
            <p style="line-height: inherit"> <span v-for="(item,index) in recommendPerson" :key="index">  {{item.userName+'&nbsp; &nbsp;'}} </span>&nbsp;</p>
          </el-form-item>
        </el-col >
      </el-row >
    </el-form>
    <load-btn class="OrganizationaVoting"  @listenSubEvent="listenSubEvent" :btnData="loadBtn"></load-btn>
  </div>
</template>
<script>
  let Util=null;
  export default {
    props:['recommendPerson','selectProjectId','getData','voteId'],
    data (){
      return{
        dep:false,
        //保存按钮基本信息
        loadBtn:{title:'完成',callParEvent:'listenSubEvent'},
        countDate:0,
        //form表单bind数据
        formValidate:{
          appraisingId:this.selectProjectId, //评优项目id
          title:this.getData.title, //投票项目标题
          startDate:this.getData.startDate, //开始时间
          endDate:this.getData.endDate, //结束时间
          voterScope:this.getData.voterScope, //投票人范围
          depId:this.getData.depId, //科室id
          userIds:'', //被投票人id字符串
          grade:this.getData.grade, //年级
          voteGroup:this.getData.voteGroup, //班级
          voteRule:this.getData.voteRule //规则

        },

        columnModal:false,
        columnId:{title:'提交',callParEvent:'searchEvent'},
        //当前组件提交(add)数据时,ajax处理的 基础信息设置
        editMessTitle:{
          type:'edit',
          successTitle:'添加成功!',
          errorTitle:'添加失败!',
          ajaxSuccess:'ajaxSuccess',
          ajaxError:'ajaxError',
          ajaxParams:{
            url:'appraising/vote/project/modify/'+this.voteId,
            method:'put'
          }
        },
      }
    },
    created(){
      //给当前组件注入全局util
      Util = this.$util;
    },
    mounted(){
      //暂时没有初始化,预留初始化入口
      //this.init();
    },
    methods:{
      /*
       * 点击提交按钮 监听是否提交数据
       * @param isLoadingFun boolean  form表单验证是否通过
       * */
      listenSubEvent(isLoadingFun){
        let isSubmit = this.submitForm("formValidate");
        if(isSubmit){
          if(!isLoadingFun) isLoadingFun=function(){};
          isLoadingFun(true);
          this.editMessTitle.ajaxParams.data=  this.conductFormValidate(this.getFormData(this.formValidate));
          this.ajax(this.editMessTitle,isLoadingFun)
        }
      },


      //为提交处理数据
      conductFormValidate(data){
        data = this.formDate(data,['startDate','endDate'],this.yearMonthData);
        data.appraisingId = this.selectProjectId;
        data.userIds = this.conductUserIds(this.recommendPerson);
        data.grade = this.recommendPerson[0].grade;
        data.voteGroup = this.recommendPerson[0].voteGroup;
        return data;

      },

      conductUserIds(data){
        if(typeof data!='object' || typeof data.length =='undefined') return;
        let ids=[];
        for(let i=0;i<data.length;i++){
          data[i].userId && ids.push(data[i].userId)
        }
        return ids.join(',')
      },

      /*
       * 点击提交按钮 监听是否验证通过
       * @param formName string  form表单v-model数据对象名称
       * @return flag boolean   form表单验证是否通过
       * */
      submitForm(formName){
        let flag = false;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            flag= true;
          }
        });
        return flag;
      },
      /*
       * 默认组件第一次请求数据
       * @param res JSON  数据请求成功后返回的数据
       * 注:当前为添加页面暂时未用到,属于预留
       * */
      oneDataSuccess(res){

      },
      /*
       * 当前组件发送事件给父组件
       * 发送关闭(cancel)模态事件给父组件,请求关闭当前模态窗
       * */
      cancel(){
        this.$emit('cancel',this.addMessTitle.type);
      },
      /*
       * 获取表单数据
       * @return string  格式:id=0&name=aa
       * */
      getFormData(data){
        let myData = Util._.defaultsDeep({},data);
        return myData;
      },
      /*
       * 组件初始化入口
       * */
      init(){
        //this.ajax(this.listMessTitle)
      },

      columnCallback(){

      },
      subCancel(){
        this.columnModal=false;
      },


    },
  }
</script>
