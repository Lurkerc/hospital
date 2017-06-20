<template>
  <div id="nosocomial" ref="nosocomial" class="modal ">
      <el-form ref="data"  class="demo-form-inline" label-width="100px">
        <fieldset class="layui-elem-field">
          <legend>基本情况</legend>
          <div class="layui-field-box">
            <el-row class="table-back-one">
              <el-col :span="7" :offset="1" >
                <el-form-item label="姓名:" prop="name" class="feildFontweight">
                  {{data.name}}
                </el-form-item  >
              </el-col>
              <el-col :span="7" >
                <el-form-item label="性别:" prop="name" class="feildFontweight">
                  {{data.sex}}
                </el-form-item  >
              </el-col>
              <el-col :span="7" >
                <el-form-item label="出生年月:" prop="name" class="feildFontweight">
                  {{data.birth}}
                </el-form-item  >
              </el-col>
            </el-row>

            <el-row class="table-back-two">
              <el-col :span="7" :offset="1">
                <el-form-item label="政治面貌:" prop="name" class="feildFontweight">
                  {{data.political}}
                </el-form-item  >
              </el-col>
              <el-col :span="7" >
                <el-form-item label="民族:" prop="name" class="feildFontweight">
                  {{data.nation}}
                </el-form-item  >
              </el-col>
              <el-col :span="7" >
                <el-form-item label="年级:" prop="name" class="feildFontweight">
                  {{data.grade}}
                </el-form-item  >
              </el-col>
            </el-row>

            <el-row class="table-back-one">
              <el-col :span="7" :offset="1">
                <el-form-item label="专业:" prop="name" class="feildFontweight">
                  {{data.specialty}}
                </el-form-item  >
              </el-col>
              <el-col :span="7" >
                <el-form-item label="学制:" prop="name" class="feildFontweight">
                  {{data.length}}
                </el-form-item  >
              </el-col>
              <el-col :span="7" >
                <el-form-item label="联系电话:" prop="name" class="feildFontweight">
                  {{data.mobile }}
                </el-form-item  >
              </el-col>
            </el-row>

            <el-row class="table-back-two-d">
              <el-col :span="21" :offset="1">
                <el-form-item label="身份证号:" prop="name" class="feildFontweight">
                  {{data.idNumber }}
                </el-form-item  >
              </el-col>
            </el-row>
          </div>
        </fieldset>

        <fieldset class="layui-elem-field">
          <legend>家庭经济情况</legend>
          <div class="layui-field-box">
            <el-row class="table-back-one">
              <el-col :span="7" :offset="1">
                <el-form-item label="家庭月总收入:" prop="name" class="feildFontweight">
                  {{data.grossIncome}}
                </el-form-item  >
              </el-col>
              <el-col :span="7" >
                <el-form-item label="人均月收入:" prop="name" class="feildFontweight">
                  {{data.averageIncome}}
                </el-form-item  >
              </el-col>
              <el-col :span="7" >
                <el-form-item label="收入来源:" prop="name" class="feildFontweight">
                  {{data.sourceIncome}}
                </el-form-item  >
              </el-col>
            </el-row>

            <el-row class="table-back-two">
              <el-col :span="11" :offset="1">
                <el-form-item label="家庭户口:" prop="name" class="feildFontweight">
                  {{data.registerType}}
                </el-form-item  >
              </el-col>
              <el-col :span="10" >
                <el-form-item label="家庭总人数:" prop="name" class="feildFontweight">
                  {{data.peopleNum}}
                </el-form-item  >
              </el-col>
            </el-row>

            <el-row class="table-back-one-d">
              <el-col :span="11" :offset="1">
                <el-form-item label="家庭住址:" prop="name" class="feildFontweight">
                  {{data.address}}
                </el-form-item  >
              </el-col>

              <el-col :span="10" >
                <el-form-item label="邮政编码:" prop="name" class="feildFontweight">
                  {{data.postCode}}
                </el-form-item  >
              </el-col>
            </el-row>
          </div>
        </fieldset>

        <fieldset class="layui-elem-field">
          <legend>学习等情况</legend>
          <div class="layui-field-box">
            <el-row class="table-back-one">
              <el-col :span="11" :offset="1">
                <el-form-item label="成绩排名:" prop="name" class="feildFontweight">
                  {{data.scoreRank}}
                </el-form-item  >
              </el-col>
              <el-col :span="10" >
                <el-form-item label="实行综合考评排名:" prop="name" class="feildFontweight">
                  {{data.isComprehensive}}
                </el-form-item  >
              </el-col>

            </el-row>

            <el-row class="table-back-two-d">
              <el-col :span="11" :offset="1">
                必修课 <span class="underline">{{data.courseNum}}</span>  门，其中几个以上 <span class="underline">{{data.passNum}}</span> 门
              </el-col>
              <el-col :span="10" >
                如是，排名<span class="underline">{{'2/25'}}</span> （名次/总人数）
              </el-col>
            </el-row>

          </div>
        </fieldset>

        <fieldset class="layui-elem-field">
          <legend>获奖情况</legend>
          <el-row>
            <el-col :span="21" :offset="1">


              <div class="layui-field-box">
                <div
                  id="nosocomialTable"
                  ref="nosocomialTable"
                >
                  <el-table
                    align="center"
                    :height="200"
                    :data="data.awardList"
                    tooltip-effect="dark"
                    style="width: 100%"
                  >

                    <el-table-column
                      prop="winTime"
                      label="日期"
                      align="center"
                      show-overflow-tooltip
                      width="200"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="awardNames"
                      label="奖项名称  "
                      show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                      prop="awardUnit"
                      label="颁奖单位"
                      width="200"
                      show-overflow-tooltip>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </el-col>
          </el-row>
        </fieldset>

        <fieldset class="layui-elem-field">
          <legend>申请理由</legend>
          <div class="layui-field-box">
            <el-row>
              <el-col :span="21" :offset="1">
                <el-form-item  prop="name" class="feildFontweight" label-width="0px">
                  <el-input type="textarea" v-model="data.reason" :rows="8" readonly resize="none"></el-input>
                </el-form-item  >
              </el-col>

            </el-row>
          </div>
        </fieldset>

        <el-row>
          <el-col :span="21" :offset="1">
            <el-form-item label="审核结果:"  prop="name" class="feildFontweight">
              <el-radio-group v-model="formValidate.status">
                <el-radio label="WSB">未上报</el-radio>
                <el-radio label="DSH">待审核</el-radio>
                <el-radio label="BTG">不通过</el-radio>
                <el-radio label="TG">通过</el-radio>
              </el-radio-group>
            </el-form-item  >
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="21" :offset="1">
            <el-form-item label="发放金额:" prop="name" class="feildFontweight">
              <el-input type="number" min="0" v-model.number="formValidate.bonusAmount"></el-input>
            </el-form-item >
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="21" :offset="1">
            <el-form-item label="审批意见:" prop="name" class="feildFontweight">
              <el-input type="textarea" v-model="formValidate.opinion" :rows="8" resize="none"></el-input>
            </el-form-item  >
          </el-col>

        </el-row>
      </el-form>
    <el-row>
      <el-col :span="10" :offset="2">
        <div style="margin-left: 100px">
          <load-btn @listenSubEvent="listenSubEvent" :btnData="loadBtn"></load-btn>
          <el-button  @click="cancel">取消</el-button>
        </div>
      </el-col>
    </el-row >
  </div>
</template>
<script>
  //当前组件引入全局的util
  let Util=null;
  export default {
    //props接收父组件传递过来的数据
    props: ['operailityData'],
    data (){
      return{
        options: [{
          value: '选项1',
          label: '所有人'
        }, {
          value: '选项2',
          label: '本科教育'
        }, {
          value: '选项3',
          label: '实习生'
        }, {
          value: '选项4',
          label: '研究生'
        }, {
          value: '选项5',
          label: '住院医师'
        }, {
          value: '选项5',
          label: '进修生'
        }],
        //保存按钮基本信息
        loadBtn:{title:'提交',callParEvent:'listenSubEvent'},
        //form表单bind数据
        formValidate:{
          status:'',     //状态
          opinion:'',     //审批意见
          bonusAmount:''     //获奖金额

        },
        //获取的数据
        data:{
          "id":"",       //奖学金申请id
          "userId":"",         //申请人id
          "name":"",        //申请人姓名
          "sex":"",              //性别
          "nation":"",        //民族
          "birth":"",     //出生年月日
          "political":'',       //政治面貌
          "specialty":"",       //专业
          "length":"",             //学制
          "mobile":"",     //联系电话
          "idNumber":"", //身份证号
          "grade":"",               //年级
          registerType:'',      //家庭户口类型
          peopleNum:'',              //家庭人口
          grossIncome:'',          //家庭月总收入
          averageIncome:'',        //人均月收入
          sourceIncome:'',       //收入来源
          address:'',       //家庭住址
          postCode:'',      //邮政编码
          scoreRank:'',           //成绩排名
          "isComprehensive":"",      //是否有综合排名
          comprehensiveRank:'',      //综合排名
          courseNum:'',      //必修课数量
          passNum:'',      //是否实行综合排名
          reason:'',      //申请理由
          "bonusAmount":"",
          "status":"",
          "opinion":"",
          "awardList":[
            {
              "id":"",
              "bursaryId":"",
              "winTime":"",
              "awardSituation":"",
              "awardUnit":""
            }
          ]
        },
        tableData:[],
        //当前组件提交(edit)数据时,ajax处理的 基础信息设置
        auditMessTitle:{
          type:'audit',
          successTitle:'修改成功',
          errorTitle:'修改失败',
          ajaxSuccess:'ajaxSuccess',
          ajaxParams:{
            url:'bursary/modifyStatus/approval/'+this.operailityData.id,
            method:'put',
          }
        },
        //当前组件默认请求(list)数据时,ajax处理的 基础信息设置
        listMessTitle:{
          paramsData:'listUrl',
          ajaxSuccess:'SuccessGetCurrData',
          ajaxParams:{
            url:'bursary/get/'+this.operailityData.id,
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
      this.init();
    },
    methods:{
      /*
       * 点击提交按钮 监听是否提交数据
       * @param isLoadingFun boolean  form表单验证是否通过
       * */
      listenSubEvent(isLoadingFun){
        let isSubmit = this.submitForm("data");
        if(isSubmit) {
          if (!isLoadingFun) isLoadingFun = function () {
          };
          isLoadingFun(true)
          this.auditMessTitle.ajaxParams.data = this.getFormData(this.formValidate);
          this.ajax(this.auditMessTitle, isLoadingFun)
        }
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
       * */
      SuccessGetCurrData(responseData){
        this.formValidate = this.getFormValidate(this.formValidate,responseData.data);
        this.data = responseData.data
      },
      /*
       * 当前组件发送事件给父组件
       * 发送关闭(cancel)模态事件给父组件,请求关闭当前模态窗
       * */
      cancel(){
        this.$emit('cancel','audit');
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
        //默认请求加载数据
        this.ajax(this.listMessTitle);
      },



      //从获取的Res中挑选出需要的名值对
      getFormValidate(data,res){
        let length = arguments.length;
        var arr = Array.prototype.slice.call(arguments,2);

        if(length<2) return data
        var obj={}
        this.$util._.forEach(data,function (val,key) {
          obj[key] = res[key]||'';
        })

        if(length>=3)obj = this.getFormValidate.apply(this,[].concat(obj,arr));
        return obj

      }
    }
  }
</script>
