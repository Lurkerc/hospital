<template>

  <div>
    <el-form ref="formValidate"  class="demo-form-inline" label-width="90px">
      <el-row >
        <el-col :span="17" :offset="2">
          <el-form-item label="标题:" prop="name" class="feildFontweight">
            <el-input v-model="formValidate.title" placeholder="请输入" ></el-input>
          </el-form-item  >
        </el-col >
      </el-row >
      <el-row >
        <el-col :span="7" :offset="2">
          <el-form-item label="对象:" class="feildFontweight">
            <el-select  v-model="formValidate.roleId" placeholder="请选择">
              <el-option
                v-for="item in options"
                :label="item.label"
                :key="item"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col >

        <el-col :span="10" >
          <el-form-item label="评分表:" label-width="110px" class="feildFontweight">
            <el-select v-model="formValidate.scoreTableId" placeholder="请选择">
              <el-option
                v-for="item in options"
                :label="item.label"
                :key="item"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-button>预览</el-button>
          </el-form-item>
        </el-col >
      </el-row >

      <el-row >
        <el-col :span="17" :offset="2">
          <el-form-item label="自荐时间:" class="feildFontweight">
            <el-date-picker
              v-model="formValidate.startDate"
              type="date"
              :editable="false"
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
              :editable="false"
              placeholder="选择日期"
              :picker-options="pickerOptions1"
              @change="handleEndTime">
            </el-date-picker>
          </el-form-item>
        </el-col >
      </el-row >

      <el-row >
        <el-col :span="17" :offset="2">
          <el-form-item label="说明" prop="desc">
            <el-input type="textarea"   v-model="formValidate.explains" :rows="5" resize="none"></el-input>
          </el-form-item>
        </el-col >
      </el-row >

      <el-row >
        <el-col :span="17" :offset="2">
          <el-form-item type="附件" label="相关证明材料:" class="feildFontweight">
            <upload-file  :uploadFiles="fileList"  @setUploadFiles="setUploadFiles">   </upload-file>
          </el-form-item>
        </el-col >
      </el-row >

    </el-form>
    <el-row >
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
          value: 1,
          label: '所有人'
        }, {
          value: 2,
          label: '本科教育'
        }, {
          value: 3,
          label: '实习生'
        }, {
          value: 4,
          label: '研究生'
        }, {
          value: 5,
          label: '住院医师'
        }, {
          value: 6,
          label: '进修生'
        }],
        //保存按钮基本信息
        loadBtn:{title:'提交',callParEvent:'listenSubEvent'},
        countDate:0,
        //form表单bind数据
        "fileList":[
          {
            "fileId":"1",
            "fileName":"文件名称",
            "fileType":"txt"
          }
        ],
        //form表单bind数据
        formValidate: {
          "title":"xxx奖",                 //标题
          "roleId":"2",                     //角色id
          "scoreTableId":"评分表Id",       //评分表Id
          "startDate":"2016-02-02",       //自荐开始时间
          "endDate":"2016-02-07",           //自荐结束时间
          "explains":"xxx奖",                //说明
//          fileIds:"",                       //附件id字符串
        },
        //当前组件提交(edit)数据时,ajax处理的 基础信息设置
        editMessTitle:{
            type:'edit',
            successTitle:'修改成功',
            errorTitle:'修改失败',
            ajaxSuccess:'ajaxSuccess',
            ajaxParams:{
              url:'appraising/project/modify/'+this.operailityData.id,
              method:'put',
            }
        },
        //当前组件默认请求(list)数据时,ajax处理的 基础信息设置
        listMessTitle:{
          paramsData:'listUrl',
          ajaxSuccess:'SuccessGetCurrData',
          ajaxParams:{
            url:'appraising/project/get/'+this.operailityData.id,
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
        let isSubmit = this.submitForm("formValidate");
        if(isSubmit) {
          if (!isLoadingFun) isLoadingFun = function () {
          };
          isLoadingFun(true)
          this.editMessTitle.ajaxParams.data =this.formDate(this.getFormData(this.formValidate),['startDate','endDate'],this.yearMonthData);;
          this.ajax(this.editMessTitle, isLoadingFun)
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
          this.fileList = responseData.data.fileList;
          this.formValidate = this.getFormValidate(this.formValidate,responseData.data);
      },
      /*
       * 当前组件发送事件给父组件
       * 发送关闭(cancel)模态事件给父组件,请求关闭当前模态窗
       * */
      cancel(){
        this.$emit('cancel','edit');
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

      },




      setUploadFiles(ids){
          this.formValidate.fileIds = ids;
      },

    }
  }
</script>

