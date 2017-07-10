<!----------------------------------
****--分组设置(groupSet_add)
****--@date     2017/7/3
****--@author   zyc<332533011@qq.com
----------------------------------->
<template>
  <div>
    <el-steps :space="200" :active="active" finish-status="success">
      <el-step title="第一步：选择学校"></el-step>
      <el-step title="第二步：选择专业"></el-step>
      <el-step title="第三步：添加分组"></el-step>
      <el-step title="第四步：设置顺序"></el-step>
      <el-step title="第五步：完成"></el-step>
    </el-steps>
    <!--- 第一步：选择学校 --->
    <div v-show="active==0" style="margin: 20px;">
      <el-row :gutter="10" v-if="schoolData.length>0">
        <el-col v-for="(item,index) in schoolData" :key="index" :span="6">
          <div class="cal-schools">
            <el-row>
              <el-col :span="20">
                <el-button :type="item.checked?'success':''" @click="handleCheckSchool(index,item)" style="width: 100%">{{item.name}}</el-button>
              </el-col>
              <el-col :span="4">
                <div v-show="item.checked" class="cal-check"><i class="el-icon-check"></i></div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
    <!--- 第二步：选择专业 --->
    <div v-if="active==1" style="margin: 20px;">
      <el-row>
        <el-col :span="5"><div class="cal-schoolTit" style="text-align: right;">专业：</div></el-col>
        <el-col :span="18">
          <dictionary-select @setSltOptionValue="setSpecialtyOptionValue" :selectOptions="specialtyOptions"></dictionary-select>
          <span v-if="sltedSpecialty==''" style="color: #FF0000">&nbsp;&nbsp;&nbsp;&nbsp;您还没有选择专业!</span>
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px;">
        <el-col :span="5"><div class="cal-schoolTit" style="text-align: right;">对应学校大纲：</div></el-col>
      <el-col :span="18">

        <el-select
          v-model="sltedDg"
          :filterable="true"
          placeholder="选择或输入匹配搜索">
          <el-option
            v-for="item in getDgBySpecialty"
            :key="item.outlineId"
            :label="item.dgName"
            :value="item.outlineId">
          </el-option>
        </el-select>
        <span v-if="getDgBySpecialty.length==0&&sltedSpecialty!=''" style="color: #FF0000">&nbsp;&nbsp;&nbsp;&nbsp;该专业下没有对应的大纲</span>
        <span v-if="getDgBySpecialty.length>0&&sltedDg==''" style="color: #FF0000">&nbsp;&nbsp;&nbsp;&nbsp;请选择对应专业的大纲!</span>
      </el-col>
      </el-row>
    </div>
    <!--- 第三步：添加分组 --->
    <div v-if="active==2" style="margin: 20px;">
      <el-checkbox v-model="jumpThirdStep">跳过顺序设置(勾选后跳过设置顺序步骤)</el-checkbox>
      <three-step :school-data="schoolData" @isHashGroup="threeStepIsHashGroup"></three-step>
    </div>
    <!--- 第四步：设置顺序 --->
    <div v-if="active==3" style="margin: 20px;">
      4
    </div>
    <!--- 第五步：完成 --->
    <div v-if="active==5" style="margin: 20px;text-align: center;">
      数据提交中……
    </div>
    <el-row :gutter="10">
      <el-col :span="24" style="text-align: center;">
        <el-button v-if="active>0&&active<4" style="margin-top: 12px;" @click="up">上一步</el-button>
        <el-button v-if="active<3" style="margin-top: 12px;" @click="next" :loading="isLoading">下一步</el-button>
        <el-button v-if="active>2" style="margin-top: 12px;" @click="success">完成</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  /*当前组件必要引入*/
  import threeStep from "./groupSet_addThree.vue";
  //引入当前组件字典api
  import api from "../api.js";
  //当前组件引入全局的util
  let Util = null;
  export default{
    data() {
      return {
        //当前步骤索引
        active: 0,

        //按钮loading效果
        isLoading:false,

        //第三步跳过顺序设置
        jumpThirdStep:false,

        //选择的学校
        schoolData:[],
        sltedSchool:[],

        //请求专业数据
        sltedSpecialty:"",
        specialtyOptions:{
          multiple:false,    //是否多选
          url: api.specialty.path,
          value:'',
        },

        //存储一、二步的数据
        schoolData:{
          "schoolId":1,
          "outlineId":11,
          "schoolName":"学校1",
        },

        //存储第三步是否设置小组
        isHashGroup:"",

        //当前步骤
        currStep:0,

        //请求学校数据
        getSchoolsTitle:{
          ajaxSuccess:'getSchoolsData',
          ajaxParams:{
            url: api.schools.path,
            params:{}
          }
        },

        //根据专业匹配大纲
        getDgBySpecialty:[],
        sltedDg:"",

        //学校专业对应大纲
        dgData:[],
        getDgBySchoolId:{
          ajaxSuccess:'getDgData',
          ajaxParams:{
            url: api.schoolGetDg.path,
            params:{}
          }
        },
      }
    },
    methods: {
      //初始化请求列表数据
      init(){
        Util = this.$util;
        this.ajax(this.getSchoolsTitle);
      },


      //获取学校list
      getSchoolsData(responseData){
        let data = responseData.data;

        for(var i=0,item;i<data.length;i++){
          item = data[i];
          item.checked = false;
        }
        this.schoolData=data;
        if(this.sltedSchool.length>0){
          this.schoolData[this.sltedSchool[0]].checked = true;
        }
      },


      //根据学校id获取专业对应大纲
      getDgData(responseData){
        let data = responseData.data;
        for(var i=0,item;i<data.length;i++){
          item = data[i];
          /*{
           "outlineId":1,
           "schoolName":"南京大学",
           "gradeNum":2017,
           "specialty":"专业"
           }*/
          this.dgData.push({
            outlineId:item["outlineId"],
            dgName:item["gradeNum"]+item["specialty"],
            specialty:item["specialty"],
          });
        }

      },


      /**
       * 选择学校
       * @param {number} idx 当前选择的学校的索引
       */
      handleCheckSchool(idx,item){
        if(this.sltedSchool.length>0){
          this.schoolData[this.sltedSchool[0]].checked = false;
          this.sltedSchool.splice(0,1);
        }
        item.checked = !item.checked;
        this.sltedSchool.push(idx);
        //清空已经设置的值
        this.clearAllVal();
      },


      /*
       * 设置专业
       * @param val string || number  选中毕业学校的id
       * */
      setSpecialtyOptionValue(val,id){
        //this.formValidate.schoolId = id;
        //this.formValidate.specialty = val;
        if(val!=""){
            this.sltedSpecialty = val;
            this.specialtyOptions.value = val;
            this.getDgBySpecialty=[];
            this.sltedDg = "";
            for(var i=0,item;i<this.dgData.length;i++){
              item = this.dgData[i];
              if(item["specialty"]==val){
                this.getDgBySpecialty.push(item);
              }
            }

        }
      },


      /**
       * 设置第三步小组是否被选的状态
       * @param flag  {boolean}  是否设置的有小组
       */
      threeStepIsHashGroup(flag){
          if(flag){
            this.isHashGroup = "hashGroup";
          }else{
            this.isHashGroup = "";
          }
      },


      //下一步
      next() {
        if(this.sltedSchool.length==0&&this.active==0){
            this.errorMess("请选择学校!");
            return;
        }
        if(this.sltedSpecialty==""&&this.active==1){
          this.errorMess("请选择专业!");
          return;
        }
        if(this.sltedDg==""&&this.active==1){
          this.errorMess("请选专业对应的大纲!");
          //return;
        }



        if(this.isHashGroup==""&&this.active==2){
          this.errorMess("请选添加小组!");
          return;
        }

        if(this.active==2){
          this.isLoading = true;
          this.saveThreeData();
          return;
        }
        if (this.active++ > 4) this.active = 0;

      },

      //清空所有设置的值
      clearAllVal(){
        this.sltedSpecialty = "";
        this.specialtyOptions.value = "";
        this.sltedDg="";
        this.getDgBySpecialty = [];
        this.dgData = [];
      },

      //上一步
      up() {
        if (this.active-- == 1) {
          this.active = 0;
          this.ajax(this.getSchoolsTitle);
        };
      },

      //完成
      success(){
        this.active = 5;
        setTimeout(()=>{
          this.$emit("cancel","add")
        },500)
      },

      //保存第三步的数据
      saveThreeData(){
        setTimeout(()=>{
          if(!this.jumpThirdStep){
            this.errorMess("保存成功!");
            this.isLoading = false;
            this.active++;
          }else{
            this.success();
          }
        },1000)

      },

    },
    created(){
      Util = this.$util;
      this.init();
    },
    mounted(){
    },
    components: {
      threeStep
    }
  }
</script>
