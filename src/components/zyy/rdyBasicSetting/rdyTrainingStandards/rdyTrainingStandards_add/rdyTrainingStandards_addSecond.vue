<!----------------------------------
****--@name     ${*}
****--@role     ${*}
****--@date     2017/7/24
****--@author   gx
----------------------------------->
<template>
    <div>
      <layout-tree style="height: 550px">
        <el-menu slot="left" style="height:inherit;" mode="vertical" default-active="0-1" class="el-menu-vertical-demo">
          <el-menu-item-group v-for="(item,i) in getRulesDepData" :key="i" :title="item[0]&&item[0].depPhase">
            <el-menu-item v-for="(groupItem,index) in item" :key="index" @click="groupItemClick(groupItem)"  :index="i+'-'+index">{{groupItem.cdepName}}</el-menu-item>
          </el-menu-item-group>
        </el-menu>

        <div slot="right"  style="height:inherit;">
          <el-form  :model="formValidate" ref="formValidate"  label-width="90px">
            <el-row>
              <el-col :span="23">
                <el-form-item label="培训目的:" prop="depsetPurpose">
                  <el-input v-model="formValidate.depsetPurpose" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <el-table
            align="center"
            :data="formValidate.depRequirements"
            tooltip-effect="dark"
            highlight-current-row
            style="width: 100%;height: 100%">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              align="center"
              label="序号"
              type="index"
              width="100">
            </el-table-column>
            <el-table-column
              align="center"
              prop="jdName"
              label="考核指标"
              show-overflow-tooltip
              width="200">
            </el-table-column>
            <el-table-column
              prop="rtName"
              label="分类"
              show-overflow-tooltip
              width="300">
            </el-table-column>
            <el-table-column
              prop="rtProclass"
              show-overflow-tooltip
              label="类型"
              align="center"
              width="200"
            >
            </el-table-column>
            <el-table-column
              prop="rtSchlength"
              label="3年要求"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="rtState"
              label="2年要求"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="rtState"
              label="1年要求"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="操作"
              width="160">
              <template scope="scope">
                <el-button size="small" @click="edit(scope.row)" icon="close">修改</el-button>
              </template>
            </el-table-column>

          </el-table>
        </div>
      </layout-tree>
    </div>
</template>
<script>
    /*当前组件必要引入*/
    import layoutTree from "../../../../common/layoutTree.vue";
    //引入--操作url的api
    import api from "../../api.js";
    //当前组件引入全局的util
    let Util = null;
    export default{
        props:['rtId'],
        data() {
            return {
              formValidate:{
                "depsetPurpose":"培训计划",
                "cdepId":1,
                "cdepName":"科室名称",
                "depRequirements":[
                  {
                    "deId":111,
                    "deName":"考核名称",
                    "deType":"分类",
                    "deDetype":"指标类型(病种、技能、教学活动等类型)",
                    "deLeveltype":"基本较高要求",
                    "deShowtype":"页面显示类型(表格文本)",
                    "deCountBasic":"三年要求数量",
                    "deCountBasicSecond":"两年要求数量",
                    "deCountBasicFirst":"一年要求数量"
                  }
                ]
              },
              getRulesDepData:[],
              //当前组件默认请求(list)数据时,ajax处理的 基础信息设置
              listMessTitle:{
                ajaxSuccess:'updateListData',
                ajaxParams:{
                  url:api.getRulesDep.path+this.rtId,
                  params:{}
                }
              },
              //当前组件默认请求(list)数据时,ajax处理的 基础信息设置
              getMessTitle:{
                ajaxSuccess:'getRulesDepSuccess',
                ajaxParams:{
                  url:api.getRulesDepRequirement.path+this.rtId,
                  params:{}
                }
              },
            }
        },
        methods: {
          //初始化请求列表数据
          init(){
            this.ajax(this.listMessTitle);
          },


          //查看细则下科室设置
          updateListData(res){
            let data = res.data;
            if(!data) return;
            let tempArr = [];
            for(let i in data){
              let index = i.split('_')[1]-1;
              tempArr[index] = [];
              for(let k=0 ;k<data[i].mustRotaryDep.length;k++){
                if(i==0&&k==0){
                  this.groupItemClick(data[i].mustRotaryDep[k])
                }
                tempArr[index].push(data[i].mustRotaryDep[k]);
              }
              for(let l=0 ;l<data[i].randomRotaryDep.length;l++){
                tempArr[index].push(data[i].randomRotaryDep[l]);
              }
            }
            this.getRulesDepData = tempArr;
          },

          getRulesDepSuccess(res){
              let data = res.data;
              if(!data) return;
          },



          groupItemClick(){


          },
        },
        created(){
            this.init();
        },
        mounted(){
        },
        components: {
          layoutTree
        }
    }
</script>
