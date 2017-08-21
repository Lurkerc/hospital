<template>

  <div>
    <el-form ref="formValidate"  class="demo-form-inline" label-width="90px">
      <el-row >
        <el-col :span="17" :offset="2">
          <el-form-item label="标题:" prop="name" class="feildFontweight">
            <el-input v-model="formValidate.title"  placeholder="请输入" ></el-input>
          </el-form-item>
        </el-col >
      </el-row >

      <el-row >
        <el-col :span="8" :offset="2">
          <el-form-item label="发布人:" class="feildFontweight">
            <el-input  v-model="formValidate.publisher"  placeholder="请输入"></el-input>
          </el-form-item>
        </el-col >

        <el-col :span="8" :offset="1">
          <el-form-item label="是否需要回执:" label-width="110px" class="feildFontweight">
            <el-radio-group  v-model="formValidate.isReceipt"  >
              <el-radio  :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col >
      </el-row >

      <el-row >
        <el-col :span="17" :offset="2">
          <el-form-item label="浏览权限:" class="feildFontweight">
            <el-select  v-model="formValidate.roleId"  placeholder="请选择">
              <select-option :type="'role'">
              </select-option>
            </el-select>
          </el-form-item>
        </el-col >
      </el-row >

      <el-row v-if="show">
        <el-col :span="17" :offset="2">
          <el-row class="lose-margin2">
            <el-col :span="20" :offset="2">
              <viewUEditor style="width:700px;" :name="'ud1'" @storeUE="storeUE" @getUeditorVal="getUeditorVal" :ueditor-val="ueditorVal" :ueditor-config="ueditorConfig"></viewUEditor>
            </el-col>
          </el-row >
        </el-col >
      </el-row >
      <el-row >
        <el-col :span="17" :offset="2">
          <el-form-item type="附件" label="置顶顺序:" class="feildFontweight">
            <upload-file :uploadFiles="formValidate.fileList" @setUploadFiles="setFiles"></upload-file>
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
  import viewUEditor from '../../../common/showUeditor.vue';
  export default {
    //props接收父组件传递过来的数据
    props: ['operailityData','url'],
    data (){
      return{

        "data":
          {
            "id":"1",
            "title":"标题",
            "publisher":"教育处",
            "isReceipt":"1",
            "publishDate":"2016-01-02",
            "publishStatus":"PUBLISH"
          }
        ,
        //保存按钮基本信息
        loadBtn:{title:'提交',callParEvent:'listenSubEvent'},
        countDate:0,
        //form表单bind数据
        formValidate: {
          title:'',     //标题
          publisher:'',     //发布人
          isReceipt:'',     //是否需要回执
          roleId:'',     //浏览人角色Id
          content:'',
          fileIds:'',
          fileList:[],
        },

        show:false,
        UE:{},
        ueditorVal:{
          ud1:"",
        },  //
        ueditorConfig:{
          //详细配置参考UEditor 官网api
          initialFrameHeight:220,  //初始化编辑器高度,默认320
        },

        //当前组件提交(edit)数据时,ajax处理的 基础信息设置
        editMessTitle:{
            type:'edit',
            successTitle:'修改成功',
            errorTitle:'修改失败',
            ajaxSuccess:'ajaxSuccess',
            ajaxParams:{
              url:this.url.noticeModify+this.operailityData.id,
              method:'put',
            }
        },
        //当前组件默认请求(list)数据时,ajax处理的 基础信息设置
        listMessTitle:{
          ajaxSuccess:'SuccessGetCurrData',
          ajaxParams:{
            url:this.url.noticeGet+this.operailityData.id,
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
          isLoadingFun(true);
          this.editMessTitle.ajaxParams.data = this.getFormData(this.formValidate);
          this.editMessTitle.ajaxParams.data .isReceipt =this.editMessTitle.ajaxParams.data .isReceipt+'';
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

          this.data = responseData.data;
          this.show = true;
          this.ueditorVal.ud1=responseData.data.content;
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


      //附件
      setFiles(ids){
        this.formValidate.fileIds = ids;
      },

      /**
       *
       * 存储编辑器的UE.editor对象
       * @param name {string}  编辑器的name
       *
       * @param editor {}      编辑器的对象
       *
       */
      storeUE(name,editor){
        this.UE[name] = editor;
        this.setMyVal('ud1',this.formValidate.content)
      },

      setMyVal(name,v){
        this.UE[name].setContent(v);
      },
      /**
       *
       * 存储编辑器的value值
       * @param name {string}  编辑器的name
       *
       * @param val  {string}  编辑器的内容
       *
       */
      getUeditorVal(name,val){
        this.ueditorVal[name] = val;
      },


    },
    components:{
      viewUEditor
    }
  }
</script>
