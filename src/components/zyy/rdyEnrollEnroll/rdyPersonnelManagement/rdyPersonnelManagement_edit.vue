<!-- 住院医 - 报名招录 - 人员管理 - 修改 -->
<template>
  <div>
    <el-form ref="formValidate" :rules="rules" :model="formValidate" class="demo-form-inline" label-width="115px">
      <!--标题-->
      <el-row>
        <el-col :span="24" class="lose-margin2" style="text-align: center">
          <span class="table-headline ">基本情况</span>
        </el-col>
      </el-row>
      <!--内容-->
      <el-row>
        <el-col :span="24">
          <el-row :gutter="10">
            <el-col :span="19">
              <el-row :gutter="10" class="table-back-one">
                <el-col :span="8">
                  <el-form-item label="姓名：" prop="name">
                    <!--{{formValidate.name}}-->
                    <el-input v-model="formValidate.name" placeholder="请输入"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="性别：" prop="sex">
                    <el-select v-model="formValidate.sex" placeholder="请选择">
                      <!-- <el-option v-for="item in dictionary.gender" :key="item.id" :label="item.name" :value="item.id"> -->
                      <el-option v-for="(item,index) in sexOption" v-if="item.value" :key="index" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="民族：" prop="nation">
                    <el-select v-model="formValidate.nation" filterable placeholder="请选择">
                      <el-option v-for="item in dictionary.nation" :key="item.id" :label="item.name" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="10" class="table-back-two">
                <el-col :span="8">
                  <el-form-item label="出生年月：" prop="birth">
                    <el-date-picker v-model="formValidate.birth" type="month" placeholder="选择日期" style="width: 127px;" :editable="false">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="籍贯：" prop="origin">
                    <el-input v-model="formValidate.origin" placeholder="请输入"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="政治面貌：" prop="political">
                    <el-select v-model="formValidate.political" filterable placeholder="请选择">
                      <el-option v-for="item in dictionary.political" :key="item.id" :label="item.name" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="10" class="table-back-one">
                <el-col :span="8">
                  <el-form-item label="最高学历：" prop="highestEdu">
                    <el-input v-model="formValidate.highestEdu" placeholder="请输入"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="专业：" prop="specialty">
                    <el-input v-model="formValidate.specialty" placeholder="请输入"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="毕业学校：" prop="school">
                    <search-select v-if="isShowSlt" @setSltOptionValue="setSltOptionValue" :selectOptions="selectOptions"></search-select>
                    <!-- <el-select v-model="formValidate.school" placeholder="请选择">
                      <el-option v-for="item in schoolOptions" :label="item.name" :value="item.name" :key="item.id">
                      </el-option>
                    </el-select> -->
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="10" class="table-back-two">
                <el-col :span="8">
                  <el-form-item label="年级：" prop="grade">
                    <el-input v-model="formValidate.grade" placeholder="请输入"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="学制：" prop="length">
                    <el-input v-model="formValidate.length" placeholder="请输入"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="班级：" prop="classNum">
                    <el-input v-model="formValidate.classNum" placeholder="请输入"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>

            <el-col :span="5" class="table-back-header">
              <div style="text-align: center">
                <up-header @upladSuccess="setUploadHeaderSuccessUrl" :imgFile="imgSrc" :actionUrl="uploadHeaderUrl"></up-header>
              </div>
            </el-col>

          </el-row>


          <el-row :gutter="10" class="table-back-one">
            <el-col :span="12">
              <el-form-item label="参加工作时间：" prop="jobTime">
                <el-date-picker v-model="formValidate.jobTime" type="month" placeholder="选择日期" :editable="false">
                </el-date-picker>

              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="职务：" prop="duties">
                <el-input v-model="formValidate.duties" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="10" class="table-back-two">
            <el-col :span="12">
              <el-form-item label="是否职业医师：" prop="doctor">
                <el-radio-group v-model="formValidate.doctor">
                  <el-radio label="0">是</el-radio>
                  <el-radio label="1">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12" :pull="7">
              <el-form-item v-if="formValidate.doctor==0" label="医师资格级别：" prop="doctorLevel">
                <el-select v-model="formValidate.doctorLevel" placeholder="请选择">
                  <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="10" class="table-back-one">
            <el-col :span="12">
              <el-form-item label="身份证号码：" prop="idNumber">
                <el-input v-model="formValidate.idNumber" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="手机号码：" prop="mobile">
                <el-input v-model="formValidate.mobile" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="10" class="table-back-two">
            <el-col :span="12">
              <el-form-item label="紧急联系人：" prop="emgContact">
                <el-input v-model="formValidate.emgContact" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="紧急联系人电话：" prop="emgContactMobile" label-width="130px">
                <el-input v-model="formValidate.emgContactMobile" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="10" class="table-back-one">
            <el-col :span="12">
              <el-form-item label="现住地址：" prop="address">
                <el-input v-model="formValidate.address" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="邮编：" prop="postCode">
                <el-input v-model="formValidate.postCode" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="10" class="table-back-two-d">
            <el-col :span="12">
              <el-form-item label="QQ：" prop="qq">
                <el-input v-model="formValidate.qq" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="邮箱：" prop="email">
                <el-input v-model="formValidate.email" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10" class="table-back-two-d">
            <el-col :span="12">
              <el-form-item label="办公电话：" prop="telephone">
                <el-input v-model="formValidate.telephone" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" class="editForm">
              <el-form-item label="培训方向：" prop="rotaryProclass">
                <el-select v-model="formValidate.rotaryProclass" filterable placeholder="请选择" style="width: 353px;">
                  <el-option v-for="item in rotaryProclassOption" :key="item.code" :label="item.name" :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10" class="table-back-two-d">
            <el-col :span="12" class="editForm">
              <el-form-item label="培训年限：" prop="rotaryAdmrank">
                <el-select v-model="formValidate.rotaryAdmrank" filterable placeholder="请选择" style="width: 353px;">
                  <el-option v-for="item in 3" :key="item" :label="item" :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="参培年份：" prop="rotaryYear">
                <el-date-picker v-model="formValidate.rotaryYear" type="year" placeholder="选择年份" :editable="false" style="width: 353px;"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10" class="table-back-two-d">
            <el-col :span="12" class="editForm">
              <el-form-item label="人员属性：" prop="rotaryZyytype">
                <el-select v-model="formValidate.rotaryZyytype" filterable placeholder="请选择" style="width: 353px;">
                  <el-option v-for="item in rotaryZyytypeOption" :key="item.code" :label="item.name" :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>


        </el-col>
      </el-row>
    </el-form>
    <br />
    <el-row v-if="!fromWhere">
      <el-col :span="10" :offset="10">
        <load-btn @listenSubEvent="saveCurrData" :btnData="loadBtn"></load-btn>
        <el-button @click="cancel">取消</el-button>
      </el-col>
    </el-row>
    <el-row v-if="fromWhere=='archives'">
      <el-col :span="24" style="text-align: center;">
        <load-btn @listenSubEvent="saveCurrData" :btnData="{title:'保存',callParEvent:'listenSubEvent'}"></load-btn>
      </el-col>
    </el-row>
  </div>
</template>
<style>
  .headerUrl {
    width: 165px;
    height: 175px;
    line-height: 175px;
  }

</style>
<script>
  //上传头像组件引入
  import upHeader from '../../../common/uploadHeader';
  //前台业务字典组件引入
  import dictionary from '../../../../libs/dictionary.js';
  //来源单位、毕业学校公用组件
  import searchSelect from '../../../common/searchSelect';
  import sexOption from '../../../intern/recruitStudent/usersManagement/sexOption';
  import {
    rdyPersonnelManagement
  } from '../../rules'; // 验证规则
  let Util = null;
  export default {
    //props接收父组件传递过来的数据
    props: ['operailityData', 'fromWhere'],
    data() {
      return {
        rules: {},
        sexOption,
        //公用业务字典
        dictionary,
        //医师资格级别
        options: [{
          value: '0',
          label: '职业'
        }, {
          value: '1',
          label: '助理'
        }, {
          value: '2',
          label: '无'
        }],


        //毕业学校
        schoolOptions: [],
        selectOptions: {
          multiple: false, //是否多选
          url: "/schools/queryList"
        },
        isShowSlt: false,

        //保存按钮基本信息
        loadBtn: {
          title: '提交',
          callParEvent: 'listenSubEvent'
        },
        countDate: 0,
        //form表单bind数据
        formValidate: {
          deptId: '', //部门id
          name: '', //姓名
          sex: '', //性别
          nation: '', //民族
          birth: '', //出生日期
          origin: '', //籍贯
          political: '', //政治面貌
          highestEdu: '', //最高学历
          specialty: '', //专业
          school: '', //毕业学校
          jobTime: '', //参加工作时间，年月，例如：199011
          grade: '', //年级
          classNum: '', //班级
          length: '', //学制
          duties: '', //职务
          doctor: '', //是否职业医师:是、否
          doctorLevel: '', //医师资格级别(职业、助理、无)
          idNumber: '', //身份证号码
          mobile: '', //手机号
          emgContact: '', //紧急联系人
          emgContactMobile: '', //紧急联系人电话
          qq: '', //qq
          email: '', //邮箱
          telephone: '', //办公电话
          address: '', //现住地址
          postCode: '', //邮编 
          headPhoto: '', //头像地址
          headPhotoHttp: '', //头像全地址 
          rotaryProclass: '', // 培训方向
          rotaryYear: '', // 参培年份
          rotaryAdmrank: '', // 培训年限
          rotaryZyytype: '', // 人员属性
        },
        //上传头像
        uploadHeaderUrl: '/file/upload/static',
        //是否显示头像
        imgSrc: '',

        //当前组件提交(add)数据时,ajax处理的 基础信息设置
        editMessTitle: {
          type: 'edit',
          successTitle: '修改成功!',
          errorTitle: '修改失败!',
          ajaxSuccess: 'ajaxSuccess',
          ajaxError: 'ajaxError',
          ajaxParams: {
            url: '/user/saveZYY',
            method: 'post',
            data: {}
          }
        },
        //当前组件默认请求(list)数据时,ajax处理的 基础信息设置
        initMessTitle: {
          ajaxSuccess: 'SuccessGetCurrData',
          ajaxParams: {
            url: '/user/getZYY/' + this.operailityData.id
          }
        },
        // 培训方向选择项
        rotaryProclassOption: [],
        // 人员属性择选择项
        rotaryZyytypeOption: [],
      }
    },
    created() {
      //给当前组件注入全局util
      Util = this.$util;
      //初始化
      this.init();
    },
    mounted() {

    },
    methods: {
      /*
       * 组件初始化入口
       * */
      init() {
        this.rules = Util._.defaultsDeep({}, this.$store.state.rules.suers, rdyPersonnelManagement);
        //默认请求加载数据
        this.ajax(this.initMessTitle);
        this.getRotaryZyytype();
        this.getRotaryProclass();
        // this.getSchoolOptions();
      },


      /*
       * 点击提交按钮 监听是否提交数据
       * @param isLoadingFun boolean  form表单验证是否通过
       * */
      saveCurrData(isLoadingFun) {
        let isSubmit = this.submitForm("formValidate");
        if (isSubmit) {
          if (!isLoadingFun) isLoadingFun = function () {};
          isLoadingFun(true)
          this.editMessTitle.ajaxParams.data = this.getFormData(this.formValidate);
          let year = this.editMessTitle.ajaxParams.data.rotaryYear;
          this.editMessTitle.ajaxParams.data.rotaryYear = this.conductDate(year, 'yyyy')
          this.ajax(this.editMessTitle, isLoadingFun)
        }
      },


      /*
       * 点击提交按钮 监听是否验证通过
       * @param formName string  form表单v-model数据对象名称
       * @return flag boolean   form表单验证是否通过
       * */
      submitForm(formName) {
        let flag = false;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            flag = true;
          }
        });
        return flag;
      },


      /*
       * 默认组件第一次请求数据
       * @param res JSON  数据请求成功后返回的数据
       * */
      SuccessGetCurrData(responseData) {
        let data = responseData.data;
        this.formValidate = this.formDate(data, ['birth', 'jobTime'], this.yearMonth);
        let env = this.$store.getters.getEnvPath;
        if (data.headPhoto === null) {
          this.imgSrc = "";
        } else {
          this.imgSrc = env["http"] + data.headPhoto;
        }
        this.formValidate.school = data.school || '';
        this.selectOptions.value = this.formValidate.schoolId;
        this.isShowSlt = true;
      },


      /*
       * 当前组件发送事件给父组件
       * 发送关闭(cancel)模态事件给父组件,请求关闭当前模态窗
       * */
      cancel() {
        this.$emit('cancel', 'edit');
      },


      /*
       * 获取表单数据
       * @return string  格式:id=0&name=aa
       * */
      getFormData(data) {
        let myData = Util._.defaultsDeep({}, data);
        this.formDate(myData, ['jobTime', 'birth'], this.yearMonth);
        return myData;
      },


      /*
       * 设置是否显示上传头像loading
       *
       * @param resData  {}  上传成功后后台返回的数据 {"relativePathFile":"img/2017/04/28/20170428093435979.png","staticUrl":"http://ip:port/static/"}
       *
       * @param imgSrc  string  头像路径
       * */
      setUploadHeaderSuccessUrl(resData, imgSrc) {
        this.formValidate.headPhoto = resData["relativePathFile"];

        this.imgSrc = resData["staticUrl"] + this.formValidate.headPhoto;
      },


      /*
       * 设置毕业学校选中的值
       * @param val string || number  选中毕业学校的id
       * */
      setSltOptionValue(val, id) {
        console.log(val, id)
        this.formValidate.schoolId = id;
        this.formValidate.school = val;
      },
      // 获取培训方向选择项
      getRotaryProclass() {
        this.ajax({
          ajaxSuccess: res => this.rotaryProclassOption = res.data.child || [],
          ajaxError: () => {
            this.errorMess('获取培训方向失败，请重试！')
          },
          ajaxParams: {
            url: '/dictionary/getByCode/ROTARY_PROCLASS',
            method: 'get',
            data: {}
          }
        })
      },

      // 获取人员属性选择项
      getRotaryZyytype() {
        this.ajax({
          ajaxSuccess: res => this.rotaryZyytypeOption = res.data.child || [],
          ajaxError: () => {
            this.errorMess('获取人员属性失败，请重试！')
          },
          ajaxParams: {
            url: '/dictionary/getByCode/ROTARY_ZYY_TYPE',
            method: 'get',
            data: {}
          }
        })
      },
      // 获取学校选择项
      getSchoolOptions() {
        this.ajax({
          ajaxSuccess: res => this.schoolOptions = res.data || [],
          ajaxError: () => {
            this.errorMess('获取学校失败，请重试！')
          },
          ajaxParams: {
            url: '/schools/queryList',
            method: 'get',
            data: {}
          }
        })
      },


    },
    components: {
      upHeader,
      searchSelect
    }
  }

</script>
