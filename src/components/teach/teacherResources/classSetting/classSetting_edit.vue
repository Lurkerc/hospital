<template>

  <div class="showWrapper">
    <el-form class="demo-form-inline  archivesEdit lose-margin2">

      <el-row >
        <el-col :span="24" >

          <!--表格数据-->
          <el-table
            border
            align="center"
            :data="tableData"
            height="400"
            tooltip-effect="dark"
            highlight-current-row
            style="width: 100%;height: 100%">
            <el-table-column
              prop="name"
              label="职称"
              width="170"
              align="center"
            >
              <template scope="scope">
                <el-form-item>
                  <el-select  placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column
              prop="identify"
              width="170"
              label="课程类型"
              align="center">
              <template scope="scope">
                <el-form-item>
                  <el-select  placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column
              prop="remark"
              align="center"
              label="优">
              <el-table-column
                prop="type"
                width="120"
                label="评分"
                align="center">
                <template scope="scope">
                  <el-input class="input-x"></el-input> -
                  <el-input class="input-x"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="type"
                width="120"
                label="课时费"
                align="center">
                <template scope="scope">
                  <el-input class="input-x"></el-input> -
                  <el-input class="input-x"></el-input>
                </template>
              </el-table-column>
            </el-table-column>

            <el-table-column
              prop="remark"
              label="良"
              align="center">
              <el-table-column
                prop="type"
                width="120"
                label="评分"
                align="center">
                <template scope="scope">
                  <el-input class="input-x"></el-input> -
                  <el-input class="input-x"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="type"
                width="120"
                label="课时费"
                align="center">
                <template scope="scope">
                  <el-input class="input-x"></el-input> -
                  <el-input class="input-x"></el-input>
                </template>
              </el-table-column>
            </el-table-column>

            <el-table-column
              prop="remark"
              label="中"
              align="center">
              <el-table-column
                prop="type"
                width="120"
                label="评分"
                align="center">
                <template scope="scope">
                  <el-input class="input-x"></el-input> -
                  <el-input class="input-x"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="type"
                width="120"
                label="课时费"
                align="center">
                <template scope="scope">
                  <el-input class="input-x"></el-input> -
                  <el-input class="input-x"></el-input>
                </template>
              </el-table-column>
            </el-table-column>

            <el-table-column
              prop="remark"
              label="差"
              align="center">
              <el-table-column
                prop="type"
                width="120"
                label="评分"
                align="center">
                <template scope="scope">
                  <el-input class="input-x"></el-input> -
                  <el-input class="input-x"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="type"
                width="120"
                label="课时费"
                align="center">
                <template scope="scope">
                  <el-input class="input-x"></el-input> -
                  <el-input class="input-x"></el-input>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column
              prop="identify"
              width="90"
              label="操作"
              align="center">
              <template scope="scope">
                <el-button type="danger" size="small" @click="removeRow(scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row >

    </el-form>
    <el-button type="primary" icon="plus" @click="addRow"></el-button>
    <el-row >
      <el-col :span="24" style="text-align: center">
          <load-btn @listenSubEvent="listenSubEvent" :btnData="loadBtn"></load-btn>
          <el-button  @click="cancel">取消</el-button>
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
        //保存按钮基本信息
        loadBtn:{title:'提交',callParEvent:'listenSubEvent'},
        countDate:0,

        tableData:[{'id':1}],
        //当前组件提交(edit)数据时,ajax处理的 基础信息设置
        editMessTitle:{
          type:'edit',
          successTitle:'修改成功',
          errorTitle:'修改失败',
          ajaxSuccess:'ajaxSuccess',
          ajaxParams:{
            url:'/role/modify/'+this.operailityData.id,
            method:'put',
          }
        },
        //当前组件默认请求(list)数据时,ajax处理的 基础信息设置
        listMessTitle:{
          paramsData:'listUrl',
          ajaxSuccess:'SuccessGetCurrData',
          ajaxParams:{
            url:'/role/get/'+this.operailityData.id,
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
          this.editMessTitle.ajaxParams.data = this.getFormData(this.formValidate);
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
        let type = [];
        let data = responseData.data;
        type.push(data.type+"");
        this.formValidate = data;
        this.formValidate.type = type;
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
        myData.type = data.type.join(",");
        return myData;
      },
      /*
       * 组件初始化入口
       * */
      init(){
        //默认请求加载数据
        this.ajax(this.listMessTitle);
      },



      //table删除操作
      removeRow(index){
        if( this.tableData.length==1)return;
        this.tableData.splice(index,1)
      },

      addRow(){
          this.tableData.push({l:1})
      },
    }
  }
</script>
