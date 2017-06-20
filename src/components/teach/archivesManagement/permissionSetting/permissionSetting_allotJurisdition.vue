<!--分配选择-->
<template>
  <div>
    <Tabs :animated="false">
      <Tab-pane label="请勾选需要保密的项">
        <Menu :theme="theme1" active-name="0" @on-select="setTabContent">
          <Menu-item name="0">
            基本情况
          </Menu-item>
          <Menu-item name="1">
            学历信息
          </Menu-item>
          <Menu-item name="2">
            工作经历
          </Menu-item>
          <Menu-item name="3">
            专业技术职称晋升情况
          </Menu-item>
          <Menu-item name="4">
            资格证书获取情况
          </Menu-item>
          <Menu-item name="5">
            教学经历
          </Menu-item>
          <Menu-item name="6">
            学习培训情况
          </Menu-item>
          <Menu-item name="7">
            培训考试、考核情况
          </Menu-item>
          <Menu-item name="8">
            获奖情况
          </Menu-item>
          <Menu-item name="9">
            科研信息
          </Menu-item>
          <Menu-item name="10">
            证件复印件
          </Menu-item>
        </Menu>
      </Tab-pane>
    </Tabs>

    <div class="ivu-tabs-bar"></div>
    <div style="text-align: center">
      <load-btn @listenSubEvent="listenSubEvent" :btnData="loadBtn"></load-btn>
      <el-button  @click="cancel">取消</el-button>
    </div>
    <div style="position: absolute;left: 275px;right: 8px;top: 120px;bottom: 100px;overflow: auto">
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">{{checkMainTitle}}</el-checkbox>
        <div style="margin: 15px 0;"></div>
      <el-checkbox-group v-model="checkedOptions" @change="handleCheckedGroupChange">
        <el-checkbox :key="index" v-for="(subItem,index) in currentOptions" :label="subItem" @change="handleCheckedChange">{{currentOptionsText[index]}}</el-checkbox>
      </el-checkbox-group>
    </div>
  </div>
</template>
<script>
  //当前组件引入全局的util
  let Util=null;
  export default {
    data () {
      return {
        theme1: 'light',
        //保存按钮基本信息
        loadBtn:{title:'提交',callParEvent:'listenSubEvent'},
        currentCheckIdx:0,
        checkMainTitle:'基本情况',
        checkedOptions:[],
        currentOptions:[],
        currentOptionsText:[],
        allCheckedVal:{},
        options:[
          {title:"基本情况",name:"jbqk",value:0,isCheck:false,
            children:[
              {title:"测试1",name:"a",value:1,isCheck:false},
              {title:"测试2",name:"b",value:2,isCheck:false}
            ]
          },
          {title:"学历信息",name:"xlxx",value:3,isCheck:false,
            children:[
              {title:"测试3",name:"c",value:4,isCheck:false},
              {title:"测试4",name:"d",value:5,isCheck:false}
            ]
          }
        ],
        isIndeterminate: false,
        checkAll: false,
        //form表单bind数据
        formValidate: {},
        //当前组件提交(add)数据时,ajax处理的 基础信息设置
        allotJurisditionMessTitle:{
          type:'allotJurisdition',
          successTitle:'添加成功!',
          errorTitle:'添加失败!',
          ajaxSuccess:'ajaxSuccess',
          ajaxError:'ajaxError',
          ajaxParams:{
            url:'/role/add',
            method:'post'
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
      this.init();
    },
    methods:{
      /*
      * 点击左侧选项卡调用
      * @param n number  当前选项卡索引
      * */
      setTabContent(n){
        this.currentCheckIdx = n;
        this.checkMainTitle=this.options[n].title;
        let myOptions=this.options[n].children;
        this.checkedOptions = [];
        this.currentOptions = [];
        this.currentOptionsText = [];


        this.isIndeterminate = false;  //true 全选框为- 外观, false为"对勾"外观
        this.checkAll = false;  //是否勾中全选

        for(let i=0,item;i<myOptions.length;i++){
          item = myOptions[i];
          if(item.isCheck){
            this.checkedOptions.push(item.value);
          }
          this.currentOptions.push(item.value);
          this.currentOptionsText.push(item.title);
        }
        let checkedLen = this.checkedOptions.length;
        let optionsLen = this.currentOptions.length;

        if(checkedLen == optionsLen ){
          this.checkAll = true;
        }
        if(checkedLen>0&&checkedLen<optionsLen){
          this.isIndeterminate = true;
        }

      },
      //点击全选单选框
      handleCheckAllChange(event) {
        let isCheckAll = event.target.checked;
        //全选框是否勾中
        this.checkedOptions = isCheckAll ? this.currentOptions : [];
        //设置全选框
        this.isIndeterminate = false;
        this.setSourceData(isCheckAll);

      },
      //点击单选框时判断是否需要选中全选框
      handleCheckedGroupChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.currentOptions.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.currentOptions.length;
      },
      handleCheckedChange(event){
        let isChecked = event.target.checked;
        let val = event.target.value;
        this.setOneCheckStatus(val,isChecked);
      },
      //设置源数据
      setSourceData(flag){
        let myOptions = this.options[this.currentCheckIdx].children;
        for(var i=0;i<myOptions.length;i++){
          this.setOneCheckStatus(i,flag,myOptions);
        }
      },
      setOneCheckStatus(n,flag,myOptions){
        let name = "";
        let val = "";
        if(typeof myOptions == "undefined"){
          let myOptions = this.options[this.currentCheckIdx].children;
          Util._.filter(myOptions, function(o) {
              if(o["value"]==n){
                o["isCheck"] = flag;
                name = o["name"];
                val = o["value"];
              }
          });
        }else{
          myOptions[n]["isCheck"] = flag;
          name = myOptions[n]["name"];
          val = myOptions[n]["value"];
        }
        if(flag){
          this.allCheckedVal[name] = val;
        }else{
          delete(this.allCheckedVal[name]);
        }
      },
      /*
       * 点击提交按钮 监听是否提交数据
       * @param isLoadingFun boolean  form表单验证是否通过
       * */
      listenSubEvent(isLoadingFun){
        if(!isLoadingFun) isLoadingFun=function(){};
        isLoadingFun(true);
        this.allotJurisditionMessTitle.ajaxParams.data=this.getFormData(this.formValidate);
        this.ajax(this.allotJurisditionMessTitle,isLoadingFun);
      },
      /*
       * 点击提交按钮 监听是否验证通过
       * @param formName string  form表单v-model数据对象名称
       * @return flag boolean   form表单验证是否通过
       * */
      submitForm(formName){

      },
      /*
       * 当前组件发送事件给父组件
       * 发送关闭(cancel)模态事件给父组件,请求关闭当前模态窗
       * */
      cancel(){
        this.$emit('cancel',this.allotJurisditionMessTitle.type);
      },
      /*
       * 获取表单数据
       * @return string  格式:id=0&name=aa
       * */
      getFormData(data){
        let myData = Util._.defaultsDeep({},data);
        myData.type = data.type.join(",");
        return myData;
      },

      /*
       * 组件初始化入口
       * */
      init(){
        //this.ajax(this.listMessTitle)
        this.setTabContent(0);
      },
    }
  }
</script>
