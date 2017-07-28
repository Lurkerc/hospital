<!----------------------------------
****--添加----对应标准科室的院内科室(addSetDep)
****--@date     2017/7/26
****--@author   zyc<332533011@qq.com
----------------------------------->
<template>
<div>
  <div class="cal-schoolTit">骨科：4月</div>
  <div class="cal-schoolTit">是否连续轮转：
    <el-radio-group v-model="formValidate.depIsCou">
      <el-radio :label="1">是</el-radio>
      <el-radio :label="0">否</el-radio>
    </el-radio-group>
  </div>
  <br />
  <el-table
    border
    align="center"
    :height="dynamicHt"
    :context="self"
    :data="tableData1"
    tooltip-effect="dark"
    style="width: 100%">
    <el-table-column
      prop="hospitalDepName"
      label="科室名称"
      show-overflow-tooltip>
      <template scope="scope">
        <div v-if="scope.$index==0">
          <el-radio-group v-model="formValidate.deType">
            <el-row>
              <el-col :span="24">
                <div class="cal-schoolTit"><el-radio :label="1">任选其</el-radio><el-input :disabled="formValidate.deType==0" style="width: 60px;" v-model="formValidate.depRandomNum" placeholder="请输入内容"></el-input>(<em style="color: #FF0000">该数量指：在所有的院内科室中系统随机抽选几个</em>) </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div class="cal-schoolTit"><el-radio :label="0">必选科室</el-radio></div>
              </el-col>
            </el-row>
          </el-radio-group>
        </div>
        <div v-else>
          <el-checkbox @change="removeDepIdx(scope.$index,scope.row)" v-model="scope.row.checked">{{scope.row.hospitalDepName}}--{{scope.row.hospitalDepId}}</el-checkbox>
        </div>
      </template>
    </el-table-column>
    <el-table-column
      prop="chTs"
      width="120"
      label="3年时间">
      <template scope="scope">
        <div v-if="scope.$index==0">
          <el-input style="width: 60px;" :disabled="formValidate.deType==0" v-model="formValidate.chTs" placeholder="请输入内容"></el-input>
        </div>
        <div v-else>
          <el-input style="width: 60px;" :disabled="formValidate.deType==1" v-model="scope.row.chTs" placeholder="请输入内容"></el-input>
        </div>
      </template>
    </el-table-column>
    <el-table-column
      prop="ch2Ts"
      width="120"
      label="2年时间">
      <template scope="scope">
        <div v-if="scope.$index==0">
          <el-input style="width: 60px;" :disabled="formValidate.deType==0" v-model="formValidate.ch2Ts" placeholder="请输入内容"></el-input>
        </div>
        <div v-else>
          <el-input style="width: 60px;" :disabled="formValidate.deType==1" v-model="scope.row.ch2Ts" placeholder="请输入内容"></el-input>
        </div>
      </template>
    </el-table-column>
    <el-table-column
      prop="ch1Ts"
      width="120"
      label="1年时间">
      <template scope="scope">
        <div v-if="scope.$index==0">
          <el-input style="width: 60px;" :disabled="formValidate.deType==0" v-model="formValidate.ch1Ts" placeholder="请输入内容"></el-input>
        </div>
        <div v-else>
          <el-input style="width: 60px;" :disabled="formValidate.deType==1" v-model="scope.row.ch1Ts" placeholder="请输入内容"></el-input>
        </div>
      </template>
    </el-table-column>
  </el-table>
  <br />
  <div style="text-align: center">
    <el-button type="primary">确定</el-button>   <el-button @click="removeDep()" type="primary">移除</el-button>
  </div>
  <div class="cal-schoolTit">待选科室:</div>
  <div class="sltDepWrapper">
      <ul class="sltDepUl">
        <div v-for="(item,index) in depTreeData" :key="item.id" class="sltDepBox">
          <li class="sltDep"><el-checkbox @change="handleCheck(item)" :disabled="item.checked" v-model="item.checked">{{item.name}}--{{item.id}}</el-checkbox></li>
          <li class="sltSubDep" v-if="typeof item.children!='undefined'" v-for="(subItem,subIndex) in item.children"><el-checkbox @change="handleCheck(subItem)" :disabled="subItem.checked" v-model="subItem.checked">{{subItem.name}}--{{subItem.id}}</el-checkbox></li>
        </div>
      </ul>
  </div>
</div>
</template>
<script>
/*当前组件必要引入*/

//当前组件引入全局的util
let Util = null;
export default{
    data() {
      return {
        //form表单bind数据
        formValidate: {
          "hgId":"",
          "rtId":"",
          "rdId":"",
          "hgGroup":"",
          "deType":1,
          "depRandomNum":1,
          "depIsCou":1,
          "chTs":"",
          "ch2Ts":"",
          "ch1Ts":"",
          "hospitalDeps":[
            {
              "chId":"",
              "rtId":"细则ID",
              "cdepId":"标准科室ID",
              "cdepName":"标准科室Name",
              "hospitalDepId":1,
              "hospitalDepName":"院内科室名称",
              "chTs":"3年轮转周期",
              "ch2Ts":"2年轮转周期",
              "ch1Ts":"1年轮转周期",
              "rdId":"标准科室周期ID"
            }
          ]
        },

        depTreeData:[],

        //要删除科室
        delDep:{},

        //是否连续轮转
        radio2: 3,

        //是否任选其一
        isRandom:1,

        dynamicHt: 300,
        self: this,
        tableData1: [{}],
        loading:false,
        listTotal:0,
        listMessTitle:{
          ajaxSuccess:'updateListData',
          ajaxParams:{
            url:'/dictionary/list',
            params:{
              name:'',code:''
            }
          }
        },
      }
    },
    methods: {
      //初始化请求列表数据
      init(){
        //this.initFormateData();
        this.initFormateDepTree();
      },

      //格式化列表server传输过来的数据
      initFormateData(data){
        data = {
          "rtId":"细则ID",
          "cdepId":"标准科室ID",
          "cdepName":"标准科室Name",
          "hgId":"组主键ID",
          "hgGroup":"组号",
          "deType":1,
          "depRandomNum":"任选其几",
          "hospitalDeps":[
            {
              "hospitalDepId":1,
              "hospitalDepName":"院内科室名称",
              "chTs":4,
              "ch2Ts":4,
              "ch1Ts":2
            }
          ]
        }
        if(data["deType"]==1){
          this.formValidate["chTs"] = data["hospitalDeps"][0]["chTs"];
          this.formValidate["ch2Ts"] = data["hospitalDeps"][0]["ch2Ts"];
          this.formValidate["ch1Ts"] = data["hospitalDeps"][0]["ch1Ts"];
        }else{
          this.formValidate["chTs"] = 1;
          this.formValidate["ch2Ts"] = 1;
          this.formValidate["ch1Ts"] = 1;
        }
        this.tableData1=[];
        this.tableData1 = data["hospitalDeps"];
        this.tableData1.unshift({});
      },

      //格式化科室目录树
      initFormateDepTree(data){
          data = [
            {
              "expand":true,
              "name":"内科",
              "id":1,
              "leaf":false,
              "children":[
                {
                  "expand":true,
                  "name":"内科A1",
                  "id":3,
                  "leaf":true
                },
                {
                  "expand":true,
                  "name":"内科A2",
                  "id":4,
                  "leaf":true
                }
              ]
            },
            {
              "expand":true,
              "name":"外科",
              "id":2,
              "leaf":true
            }
          ]
        this.setChecked(data);

        this.depTreeData = data;
      },


      setChecked(data){
        for (var i = 0; i < data.length; i++) {
          data[i]["checked"] = false;
          if (typeof data[i].children != "undefined" && data[i].children.length > 0) {
            this.setChecked(data[i].children);
          }
        }
      },

      canelChecked(data,idArr,flag){
        if(idArr.length==0) return;
        for (var i = 0; i < data.length; i++) {
          let idx = idArr.indexOf(data[i]["id"]);
          if(idx>-1){
            idArr.splice(idx,1);
            data[i]["checked"] = flag;
          }
          if (typeof data[i].children != "undefined" && data[i].children.length > 0) {
            this.canelChecked(data[i].children,idArr,flag);
          }
        }
      },


      /**
       * 动态添加科室
       * @param id {Number}  科室id
       * @param name {string}  科室名称
       * */
      addDep(id,name){
        let template={
          "hospitalDepId":id,
          "hospitalDepName":name,
          "checked":false,
          "chTs":1,
          "ch2Ts":1,
          "ch1Ts":1
        }
        this.tableData1.push(template);
      },


      /**
       * 勾选科室后
       * @param item {Object}  科室数据
       * */
      handleCheck(item){
        if(item.checked){
          this.addDep(item.id,item.name);
        }
      },


      //存储要删除科室所在行的索引
      removeDepIdx(idx,item){
        if(item.checked){
          this.delDep[idx] = {idx:idx,id:item.hospitalDepId};
        }else{
          delete this.delDep[idx];
        }
      },


      removeDep(){
        let tempArr = [],idsArr=[];
        Util._.forEach(this.delDep,function (v,k) {
          tempArr.push(v["idx"]);
          idsArr.push(v["id"]);
        });
        tempArr.sort(function(a,b){return a-b});

        for (var i=tempArr.length-1;i>=0;i--){
          this.tableData1.splice(tempArr[i],1);
        }
        this.canelChecked(this.depTreeData,idsArr,false);
        this.delDep = {};
      }

    },
    created(){
        Util = this.$util;
        this.init();
    },
    mounted(){
    },
    components: {}
}
</script>
