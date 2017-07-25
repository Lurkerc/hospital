<!----------------------------------
****--@name     第一步：设置轮转科室
****--@role     ${*}
****--@date     2017/7/24
****--@author   gx
----------------------------------->
<!---实习大纲管理-添加--->
<template>
  <div>
    <br />
    <div class="el-form">
      <el-row v-if="outlines.length>0" :gutter="10">
        <el-col :span="1">&nbsp;</el-col>
        <el-col :span="22">
          <div style="margin: 8px 0;" v-for="(groupItem,groupIndex) in outlines" :key="groupIndex" class="form-fieldset-wrapper">
            <div class="form-fieldset-del">
              <el-tooltip :content="'点击删除'+groupOtions[groupIndex]" placement="top" effect="light">
                <el-button style="float: right;" type="danger" size="mini" @click="delGroup(groupIndex)" icon="close"></el-button>
              </el-tooltip>
            </div>
            <fieldset style="min-height:90px;">
              <legend style="font-size:16px">&nbsp;&nbsp;{{groupOtions[groupIndex]}}&nbsp;&nbsp;</legend>
              <div class="cal-schoolTit">
                必须轮转科室 <el-button type="primary" size="mini" @click="openSetDepWin(groupIndex,'mustRotaryDep')" icon="plus"></el-button>
              </div>

              <el-table
                border
                align="center"
                :data="groupItem.mustRotaryDep"
                tooltip-effect="dark"
                style="width: 100%">
                </el-table-column>
                <el-table-column
                  prop="depName"
                  label="科室"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  label="培训周期"
                  align="center">
                  <template scope="scope">
                    <el-input  v-model="scope.row.ts" placeholder="请输入内容"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="teachNames"
                  label="操作"
                  align="center">
                  <template scope="scope">
                    <el-button type="danger" size="mini" @click="delGroupItem(groupIndex,scope.$index,'mustRotaryDep')">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>

              <br />
              <div class="cal-schoolTit">
                可选轮转科室 <el-button type="primary" size="mini" @click="openSetDepWin(groupIndex,'randomRotaryDep')" icon="plus"></el-button>
              </div>
              <br />
              <div style="overflow: auto;margin: 0 auto" class="el-table el-table--fit el-table--border el-table--enable-row-hover el-table--enable-row-transition">
                <table :width="'100%'">

                  <colgroup  v-for="(item,index) in noMustHeader">
                    <col :name="'el-table_1_column_'+index" :width="150">
                  </colgroup>
                  <thead >
                  <tr  >
                    <th class="cell" v-for="(item,index) in noMustHeader">
                      {{item.label}}
                    </th>
                  </tr>
                  </thead>
                </table>
                <div v-if="groupItem.randomRotaryDep.length>0" class="el-table__body-wrapper" style="max-height:400px;overflow-x: hidden;overflow-y: auto;">
                  <table   :width="'100%'">
                    <colgroup  v-for="(item,index) in noMustHeader">
                      <col name="'el-table_1_column_'+index" :width="150">
                    </colgroup>

                    <tbody  class="add-scope">
                    <tr v-for="(item,index) in groupItem.randomRotaryDep">
                      <td>
                        &nbsp;&nbsp;&nbsp;&nbsp;{{item.depName}}
                      </td>
                      <td v-show="index==0" :rowspan="groupItem.randomRotaryDep.length" align="center">
                        <el-input placeholder="请输入内容" v-model="item.ts" style="width: 50px"></el-input> 周
                      </td>
                      <td v-show="index==0" :rowspan="groupItem.randomRotaryDep.length" align="center">
                         <el-input placeholder="请输入内容" v-model="item.optionalNum" style="width: 50px"></el-input>
                      </td>
                      <td align="center">
                        <el-button type="danger" size="mini" @click="delGroupItem(groupIndex,index,'randomRotaryDep')">删除</el-button>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
                <div class="el-table__empty-block" v-else><span class="el-table__empty-text">暂无数据</span></div>
              </div>
            </fieldset>
          </div>
        </el-col>
        <el-col :span="1">&nbsp;</el-col>
      </el-row>
      <el-row :gutter="10" v-else>
        <el-col :span="1">&nbsp;</el-col>
        <el-col :span="22"><div class="cal-schoolTit" style="border: 1px solid #ececec;padding: 20px;"><span class="el-table__empty-text">还没有组,请添加组!</span></div></el-col>
        <el-col :span="1">&nbsp;</el-col>
      </el-row>
    </div>
    <br />
    <el-row :gutter="10">
      <el-col :span="1">&nbsp;</el-col>
      <el-col :span="22">
        <el-button type="primary" @click="addGroup">添加组</el-button>
      </el-col>
      <el-col :span="1">&nbsp;</el-col>
    </el-row>
    <br />
    <el-row>
      <el-col :span="8" class="textCenter">&nbsp;</el-col>
      <el-col :span="4" class="textCenter"><load-btn @listenSubEvent="listenSubEvent" :btnData="loadBtn"></load-btn></el-col>
      <el-col :span="4" class="textCenter"><el-button  @click="cancel">取消</el-button></el-col>
      <el-col :span="8" class="textCenter">&nbsp;</el-col>
    </el-row>
    <!--增加弹窗-->
    <Modal
      :mask-closable="false"
      v-model="setDepModal"
      height="200"
      title="对话框标题"
      class-name="vertical-center-modal"
      :width="700">
      <!--<div slot="header"> -->
      <!--</div>-->
      <modal-header slot="header" :content="addId"></modal-header>
      <add v-if="setDepModal"  @cancel="cancelSetDep" @filterAddDepData="filterAddDepData" :operaility-data="operailityData"></add>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>
<script>
  /*当前组件必要引入*/
  import add from "../rdyTrainingStandards_setDep.vue";
  //引入--操作url的api
  import api from "../../api.js";
  //当前组件引入全局的util
  let Util = null;
  export default{
    props:['rules'],
    data() {
      return {
        //保存按钮基本信息
        loadBtn:{title:'提交',callParEvent:'listenSubEvent'},

        /*--按钮button--*/
        addId:{
          id:'add',
          title:'添加'},
        operailityData:"",
        setDepModal:false,


        //必选科室
        tableData1:[],

        //自选科室
        noMustHeader:[{
          key :'parentTitle',
          label :'科室',
        },
          {
            key :'ts',
            label :'培训周期',
          },
          {
            key :'depRandomNum',
            label :'任选其几',
          },
          {
            key :'operateParent',
            label :'操作',
          },
        ],

        noMustBody:[],

        //form表单bind数据
        formValidate: {
          "schoolId":"",
          "schoolName":"",
          "specialty":"",
          "gradeNum":"",
          "outlines":[]
        },
        currGroupIndex:"",
        tabType:"",

        //组格式化组
        groupOtions:[
          "第一阶段","第二阶段","第三阶段","第四阶段","第五阶段","第六阶段","第七阶段","第八阶段","第九阶段","第十阶段","第十一阶段","第十二阶段","第十三阶段","第十四阶段","第十五阶段","第十六阶段","第十七阶段","第十八阶段","第十九阶段","第二十阶段"
        ],
        groupTemplate:{
          "greatName":"",
          "mustRotaryDep": [],
          "randomRotaryDep": [],
        },
        outlines: [],



        //保存大纲
        saveOutline:{
          type:'add',
          successTitle:'添加成功!',
          errorTitle:'添加失败!',
          ajaxSuccess:'ajaxSuccess',
          ajaxError:'ajaxError',
          ajaxParams:{
            jsonString:true,
          },
        },

      }
    },
    methods: {
      //初始化请求列表数据
      init(){
        Util = this.$util;
      },


      /**
       * 添加组列表---filter添加的数据
       */
      filterAddDepData(data){
        let template = this.randomTemplate();
        if(this.tabType=="mustRotaryDep"){
          template = this.mustTemplate();
        };
        let tempArr = [];
        for(var i=0,tempObj;i<data.length;i++){
          tempObj = this.getFormData(Object.assign(template,data[i]));
          tempObj["groupNo"] = this.currGroupIndex+1;
          tempObj["depIndex"] = (i+1);
          tempArr.push(tempObj);
        }

        let sltedGroupData = this.outlines[this.currGroupIndex][this.tabType];
        //console.log("isSltedGroup",sltedGroupData);
        let noMustTs = "";
        let optionalNum = "";

        if(sltedGroupData.length>0){
          if(this.tabType!="mustRotaryDep"){
            for(var k=0;k<sltedGroupData.length;k++){
              if(sltedGroupData[k]["ts"]!=""){
                noMustTs = sltedGroupData[k]["ts"];
              }
              if(sltedGroupData[k]["optionalNum"]!=""){
                optionalNum = sltedGroupData[k]["optionalNum"];
              }
            }
          }


          for(var i=0;i<tempArr.length;i++){
            for(var k=0;k<sltedGroupData.length;k++){
              if(tempArr[i]["depId"]==sltedGroupData[k]["depId"]){
                tempArr[i] = Object.assign(tempArr[i],sltedGroupData[k]);
              }
            }
          }
        }
        if(this.tabType!="mustRotaryDep"){
          tempArr[0]["ts"] = noMustTs;
          if(tempArr.length==1){
            optionalNum = 1;
          }
          tempArr[0]["optionalNum"] = optionalNum;
        }
        //console.log("tempArr",tempArr);
        this.outlines[this.currGroupIndex][this.tabType] = tempArr;
      },


      /**
       * 添加组列表---必选科室
       */
      mustTemplate(data){
        let template = {
          "greatName":"",   //组分类
          "groupNo":"",     //组索引
          "isMustRotaryDep":"Y",   //是否必选科室
          "depId":"",    //科室id
          "depName":"",  //科室名称
          "ts":"",       //周期数
          "remark":"",   //备注
          "depIndex":"",      //所在当前行索引
          "optionalNum":""    //自选规则是必选则为空
        }
        return template;
      },


      /**
       * 添加组列表---自选科室
       */
      randomTemplate(data){
        let template = {
          "greatName":"",   //组分类
          "groupNo":"",     //组索引
          "isMustRotaryDep":"N",   //是否必选科室
          "depId":"",    //科室id
          "depName":"",  //科室名称
          "ts":"",       //周期数
          "remark":"",   //备注
          "depIndex":"",      //所在当前行索引
          "optionalNum":""    //自选规则是必选则为空
        }
        return template;
      },


      /**
       * 打开设置科室弹窗
       * @param currGroupIndex {number}  当前组的索引
       * @param tabType {string}   哪一类表格数据  必填 mustRotaryDep   自选 randomRotaryDep
       */
      openSetDepWin(currGroupIndex,tabType){
        this.currGroupIndex = currGroupIndex;
        this.tabType = tabType;

        this.operailityData = this.outlines[currGroupIndex][tabType];

        this.openModel("setDep");
      },


      /**
       * 删除组
       * @param index {number}  组的索引
       */
      delGroup(index){
        this.outlines.splice(index,1);
      },


      /**
       * 添加组
       */
      addGroup(){
        if(this.groupOtions.length==this.outlines.length){
          this.showMess("最对可以添加二十个组!");
          return;
        }
        let addTemplate = this.getFormData(this.groupTemplate);
        this.outlines.push(addTemplate);
      },


      /**
       * 删除组下面单条数据
       * @param groupIndex {number}  当前组的索引
       * @param rowIndex {number}  组的索引
       * @param tabType {string}  哪一类表格数据  必填 mustRotaryDep   自选 randomRotaryDep
       */
      delGroupItem(groupIndex,rowIndex,tabType){
        this.outlines[groupIndex][tabType].splice(rowIndex,1);
      },


      /*
       * 点击提交按钮 监听是否提交数据
       * @param isLoadingFun boolean  form表单验证是否通过
       * */
      listenSubEvent(isLoadingFun){

        if(this.outlines.length==0){
          this.errorMess("请添加小组!");
          return;
        }

        let tempArr = [];
        for(var i=0,item;i<this.outlines.length;i++){
          item = this.outlines[i];
          for(var k=0;k<item["mustRotaryDep"].length;k++){
            item["mustRotaryDep"][k]["greatName"] = item["greatName"];
          }
          let ts= 0,optionalNum=0;
          for(var k=0;k<item["randomRotaryDep"].length;k++){
            if(k==0){
              ts = item["randomRotaryDep"][k]["ts"];
              optionalNum = item["randomRotaryDep"][k]["optionalNum"];
            }else{
              item["randomRotaryDep"][k]["ts"] = ts;
              item["randomRotaryDep"][k]["optionalNum"] = optionalNum;
            }
            item["randomRotaryDep"][k]["greatName"] = item["greatName"];
          }
          tempArr = tempArr.concat(item["mustRotaryDep"]);
          tempArr = tempArr.concat(item["randomRotaryDep"]);
        }
        this.formValidate.gradeNum = this.conductDate(this.formValidate.gradeNum,"yyyy");
        this.formValidate.outlines = tempArr;
        //this.formValidate.outlines  greatName  mustRotaryDep  randomRotaryDep
        let isSubmit = this.submitForm("formValidate");
        //isSubmit = true;
        if(isSubmit) {
          if (!isLoadingFun) isLoadingFun = function () {};
          isLoadingFun(true);
          this.saveOutline.ajaxParams.data = this.getFormData(this.formValidate);
          this.ajax(this.saveOutline, isLoadingFun);
        }
      },


      /*
       * 点击提交按钮 监听是否验证通过
       * @param formName string  form表单v-model数据对象名称
       * @return flag boolean   form表单验证是否通过
       * */
      submitForm(formName){
        let flag = true;
        for(let i =0;i< this.$refs.f.length; i++){
          this.$refs.f[i].validate((valid) => {
            if(!valid) {
              flag= false;
            }
          });
        }
        return flag;
      },


      /*
       * 当前组件发送事件给父组件
       * 发送关闭(cancel)模态事件给父组件,请求关闭当前模态窗
       * */
      cancel(){
        this.$emit('cancel','add');
      },


      /*
       * 打开指定的模态窗体
       * @param options string 当前指定的模态:"add"、"edit"
       * */
      openModel(options){
        this[options+'Modal'] = true;
      },


      /*
       * 打开指定的模态窗体
       * @param options string 当前指定的模态:"add"、"edit"
       * */
      cancelSetDep(options){
        this[options+'Modal'] = false;
      },


      /*
       * 获取表单数据
       * @return string  格式:id=0&name=aa
       * */
      getFormData(data){
        let myData = Util._.defaultsDeep({},data);
        return myData;
      },

    },
    created(){
      this.init();
    },
    mounted(){
    },
    components: {
      add
    }
  }
</script>


