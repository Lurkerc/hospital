<!--奖惩记录-->
<template>
  <div id="content" ref="content" @click="selectHide" class="modal">
    <el-form ref="formValidate" :inline="true"  class="form-inline lose-margin" label-width="90px" >
      <el-row >
        <el-col :span="5">
          <el-form-item label="科室" prop="depId" >
            <el-select filterable  v-model="formValidate.depId" placeholder="请选择">
              <select-option ></select-option>
            </el-select>
          </el-form-item>
        </el-col>
        </el-col >

        <el-col :span="5">
          <el-form-item label="考勤时间" prop="month">
            <el-date-picker
              :clearable="false"
              v-model="formValidate.month"
              type="month"
              :editable="false"
              placeholder="选择月">
            </el-date-picker>
          </el-form-item>
        </el-col >

        <el-col :span="4">
          <el-button type="primary"  @click="searchEvent">&nbsp; 搜索 &nbsp;</el-button>
        </el-col >
      </el-row >
    </el-form>
    <!--<div class="add-remove">-->
    <!--<el-button  class="but-col" @click="add" type="primary">添加</el-button>-->
    <!--<el-button class="but-col" @click="remove" type="danger">删除</el-button>-->

    <!--</div>-->
    <div
      id="myTable"
      ref="myTable"
    >
      <el-table
        align="center"
        :height="dynamicHt"
        :context="self"
        :data="data"
        border
        v-if="isShow"
        highlight-current-row
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          label="序号"
          prop="index"
          fixed
          width="75">
          <template scope="scope">
            <span>{{scope.row.index}}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="userName"
          label="姓名"
          fixed
          width="120">
        </el-table-column>
        <el-table-column
          prop="depName"
          label="上半月"
          show-overflow-tooltip>
          <el-table-column
            label="1————————15"
            show-overflow-tooltip>
            <el-table-column
              label="1"
              width="60"
              show-overflow-tooltip>
              <template  scope="scope">
                {{commutator(scope.row.clockList && scope.row.clockList[0] && scope.row.clockList[0].type)}}
              </template>
            </el-table-column>

            <el-table-column
              label="2"
              width="60"
              show-overflow-tooltip>
              <template scope="scope">
                {{commutator(scope.row.clockList && scope.row.clockList[1] && scope.row.clockList[1].type)}}
              </template>
            </el-table-column>

            <el-table-column
              label="3"
              width="60"
              show-overflow-tooltip>
              <template scope="scope">
                {{commutator(scope.row.clockList && scope.row.clockList[2] && scope.row.clockList[2].type)}}
              </template>
            </el-table-column>

            <el-table-column
              label="4"
              width="60"
              show-overflow-tooltip>
              <template scope="scope">
                {{commutator(scope.row.clockList && scope.row.clockList[3] && scope.row.clockList[3].type)}}
              </template>
            </el-table-column>

            <el-table-column
              label="5"
              width="60"
              show-overflow-tooltip>
              <template scope="scope">
                {{commutator(scope.row.clockList && scope.row.clockList[4] && scope.row.clockList[4].type)}}
              </template>
            </el-table-column>

            <el-table-column
              label="6"
              width="60"
              show-overflow-tooltip>
              <template scope="scope">
                {{commutator(scope.row.clockList && scope.row.clockList[5] && scope.row.clockList[5].type)}}
              </template>
            </el-table-column>

            <el-table-column
              label="7"
              width="60"
              show-overflow-tooltip>
              <template scope="scope">
                {{commutator(scope.row.clockList && scope.row.clockList[6] && scope.row.clockList[6].type)}}
              </template>
            </el-table-column>

            <el-table-column
              label="8"
              width="60"
              show-overflow-tooltip>
              <template scope="scope">
                {{commutator(scope.row.clockList && scope.row.clockList[7] && scope.row.clockList[7].type)}}
              </template>
            </el-table-column>

            <el-table-column
              label="9"
              width="60"
              show-overflow-tooltip>
              <template scope="scope">
                {{commutator(scope.row.clockList && scope.row.clockList[8] && scope.row.clockList[8].type)}}
              </template>
            </el-table-column>

            <el-table-column
              label="10"
              width="60"
              show-overflow-tooltip>
              <template scope="scope">
                {{commutator(scope.row.clockList && scope.row.clockList[9] && scope.row.clockList[9].type)}}
              </template>
            </el-table-column>

            <el-table-column
              label="11"
              width="60"
              show-overflow-tooltip>
              <template scope="scope">
                {{commutator(scope.row.clockList && scope.row.clockList[10] && scope.row.clockList[10].type)}}
              </template>
            </el-table-column>

            <el-table-column
              label="12"
              width="60"
              show-overflow-tooltip>
              <template scope="scope">
                {{commutator(scope.row.clockList && scope.row.clockList[11] && scope.row.clockList[11].type)}}
              </template>
            </el-table-column>

            <el-table-column
              label="13"
              width="60"
              show-overflow-tooltip>
              <template scope="scope">
                {{commutator(scope.row.clockList && scope.row.clockList[12] && scope.row.clockList[12].type)}}
              </template>
            </el-table-column>

            <el-table-column
              label="14"
              width="60"
              show-overflow-tooltip>
              <template scope="scope">
                {{commutator(scope.row.clockList && scope.row.clockList[13] && scope.row.clockList[13].type)}}
              </template>
            </el-table-column>

            <el-table-column
              label="15"
              width="60"
              show-overflow-tooltip>
              <template scope="scope">
                {{commutator(scope.row.clockList && scope.row.clockList[14] && scope.row.clockList[14].type)}}
              </template>
            </el-table-column>

          </el-table-column>
        </el-table-column>
        <el-table-column
          prop="depName"
          label="下半月"
          show-overflow-tooltip>
          <el-table-column
            prop="leaveType"
            label="16————————31"
            show-overflow-tooltip>

            <el-table-column
              label="16"
              width="60"
              show-overflow-tooltip>
              <template scope="scope">
                {{commutator(scope.row.clockList && scope.row.clockList[15] && scope.row.clockList[15].type)}}
              </template>
            </el-table-column>


            <el-table-column
              label="17"
              width="60"
              show-overflow-tooltip>
              <template scope="scope">
                {{commutator(scope.row.clockList && scope.row.clockList[16] && scope.row.clockList[16].type)}}
              </template>
            </el-table-column>


            <el-table-column
              label="18"
              width="60"
              show-overflow-tooltip>
              <template scope="scope">
                {{commutator(scope.row.clockList && scope.row.clockList[17] && scope.row.clockList[17].type)}}
              </template>
            </el-table-column>


            <el-table-column
              label="19"
              width="60"
              show-overflow-tooltip>
              <template scope="scope">
                {{commutator(scope.row.clockList && scope.row.clockList[18] && scope.row.clockList[18].type)}}
              </template>
            </el-table-column>


            <el-table-column
              label="20"
              width="60"
              show-overflow-tooltip>
              <template scope="scope">
                {{commutator(scope.row.clockList && scope.row.clockList[19] && scope.row.clockList[19].type)}}
              </template>
            </el-table-column>


            <el-table-column
              label="21"
              width="60"
              show-overflow-tooltip>
              <template scope="scope">
                {{commutator(scope.row.clockList && scope.row.clockList[20] && scope.row.clockList[20].type)}}
              </template>
            </el-table-column>


            <el-table-column
              label="22"
              width="60"
              show-overflow-tooltip>
              <template scope="scope">
                {{commutator(scope.row.clockList && scope.row.clockList[21] && scope.row.clockList[21].type)}}
              </template>
            </el-table-column>


            <el-table-column
              label="23"
              width="60"
              show-overflow-tooltip>
              <template scope="scope">
                {{commutator(scope.row.clockList && scope.row.clockList[22] && scope.row.clockList[22].type)}}
              </template>
            </el-table-column>


            <el-table-column
              label="24"
              width="60"
              show-overflow-tooltip>
              <template scope="scope">
                {{commutator(scope.row.clockList && scope.row.clockList[23] && scope.row.clockList[23].type)}}
              </template>
            </el-table-column>


            <el-table-column
              label="25"
              width="60"
              show-overflow-tooltip>
              <template scope="scope">
                {{commutator(scope.row.clockList && scope.row.clockList[24] && scope.row.clockList[24].type)}}
              </template>
            </el-table-column>


            <el-table-column
              label="26"
              width="60"
              show-overflow-tooltip>
              <template scope="scope">
                {{commutator(scope.row.clockList && scope.row.clockList[25] && scope.row.clockList[25].type)}}
              </template>
            </el-table-column>


            <el-table-column
              label="27"
              width="60"
              show-overflow-tooltip>
              <template scope="scope">
                {{commutator(scope.row.clockList && scope.row.clockList[26] && scope.row.clockList[26].type)}}
              </template>
            </el-table-column>


            <el-table-column
              label="28"
              width="60"
              v-if="headerLength>=28"
              show-overflow-tooltip>
              <template scope="scope">
                {{commutator(scope.row.clockList && scope.row.clockList[27] && scope.row.clockList[27].type)}}
              </template>
            </el-table-column>


            <el-table-column
              label="29"
              width="60"
              v-if="headerLength>=29"
              show-overflow-tooltip>
              <template scope="scope">
                {{commutator(scope.row.clockList && scope.row.clockList[28] && scope.row.clockList[28].type)}}
              </template>
            </el-table-column>


            <el-table-column
              label="30"
              width="60"
              v-if="headerLength>=30"
              show-overflow-tooltip>
              <template scope="scope">
                {{commutator(scope.row.clockList && scope.row.clockList[29] && scope.row.clockList[29].type)}}
              </template>
            </el-table-column>


            <el-table-column
              label="31"
              width="60"
              v-if="headerLength>=31"
              show-overflow-tooltip>
              <template scope="scope">
                {{commutator(scope.row.clockList && scope.row.clockList[30] && scope.row.clockList[30].type)}}
              </template>
            </el-table-column>
          </el-table-column>
        </el-table-column>
        <!-- <el-table-column
           prop="workAttendance"
           label="实际出勤"
           width="75"
           show-overflow-tooltip>
         </el-table-column>
         <el-table-column
           prop="compassionateLeave"
           label="事假"
           width="75"
           show-overflow-tooltip>
         </el-table-column>
         <el-table-column
           prop="sickLeave"
           label="病假"
           width="75"
           show-overflow-tooltip>
         </el-table-column>
         <el-table-column
           prop="marriageLeave"
           label="婚假"
           width="75"
           show-overflow-tooltip>
         </el-table-column>
         <el-table-column
           prop="otherLeave"
           label="其他假"
           width="75"
           show-overflow-tooltip>
         </el-table-column>
         <el-table-column
           prop="absenteeism"
           label="旷工"
           width="75"
           show-overflow-tooltip>
         </el-table-column>
         <el-table-column
           prop="notes"
           label="备注"
           width="150"
           show-overflow-tooltip>
         </el-table-column>-->
      </el-table>


      <div class="daily el-select-dropdown " :style="{top:row.top,left:row.left}" v-show="row.isSelect" style="position:fixed; top: 603px; left: 706px; transform-origin: center top 0px; z-index: 2019;" x-placement="bottom-start">
        <div class="el-scrollbar">
          <div class="el-select-dropdown__wrap el-scrollbar__wrap" style="margin-bottom: -17px; margin-right: -12px;">
            <ul class="el-scrollbar__view el-select-dropdown__list"   >
              <li class="el-select-dropdown__item" @click="valuationCell('CQ')">
                <span>出勤|</span>
              </li>
              <li class="el-select-dropdown__item" @click="valuationCell('SJ')">
                <span>事假+</span>
              </li>
              <li class="el-select-dropdown__item" @click="valuationCell('BJ')">
                <span>病假++</span>
              </li>
              <li class="el-select-dropdown__item" @click="valuationCell('CJ')">
                <span>产假#</span>
              </li>
              <li class="el-select-dropdown__item" @click="valuationCell('TQJ')">
                <span>探亲假△</span>
              </li>
              <li class="el-select-dropdown__item" @click="valuationCell('SANGJ')">
                <span>丧假☓</span>
              </li>
              <li class="el-select-dropdown__item" @click="valuationCell('HJ')">
                <span>婚假✔</span>
              </li>
              <li class="el-select-dropdown__item" @click="valuationCell('KG')">
                <span>旷工◯</span>
              </li>
              <li class="el-select-dropdown__item" @click="valuationCell('')">
                <span>    </span>
              </li>
            </ul>
          </div>
          <div class="el-scrollbar__bar is-horizontal">
            <div class="el-scrollbar__thumb" style="transform: translateX(0%);"></div>
          </div>
          <div class="el-scrollbar__bar is-vertical">
            <div class="el-scrollbar__thumb" style="transform: translateY(0%);"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
<script >


  let Util=null;

  export default{
    data() {
      return {
        isShow:true,
        data:[
        ],
        formValidate: {
          depId:'',  //科室id
          month:'',  //考勤时间
        },
        options: [{
          value: '',
          label: '全部'
        }, {
          value: 'wsb',
          label: '未上报'
        }, {
          value: 'dsh',
          label: '待审核'
        }, {
          value: '3',
          label: '通过'
        }, {
          value: '4',
          label: '不通过'
        }],
        multipleSelection: [],
        operailityData:'',
        dynamicHt: 100,
        self: this,
        loading: false,
        tableData1: [],
        reportedModal:false,
        addId: {id: 'addId', title: '新建'},
        editId: {id: 'editId', title: '修改'},
        removeId: {id: 'removeId', title: '删除'},
        viewId: {id: 'viewId', title: '删除'},
        auditId: {id: 'auditId', title: '审核'},
        reportedId: {id: 'reportedId', title: '上报'},


        //当前点击行数据
        row:{
          key:'',
          row:'',
          top:1000,
          left:-1000,
          isSelect:false,
        },
        headerLength:31,
        oldDate:'',
      }

    },

    methods: {


      //初始化请求列表数据
      init(){
        Util = this.$util;
        //ajax请求参数设置
        //初始化月份
        let date = new Date();
        date = this.yearMonth(+this.yearMonth(date));
        this.formValidate.month = date;
        this.oldDate = date;
        //获取当月有多少天,data是
        let newDate = date.split('-');
        let ts = new Date(newDate[0],newDate[1],0);//天数
        this.headerLength = ts;
        this.setTableData();
      },
      //设置表格及分页的位置
      setTableDynHeight(){
        let content = this.$refs.content;
        let parHt = content.parentNode.offsetHeight;
        let myTable = this.$refs.myTable;
        let paginationHt = 12;
        this.dynamicHt = parHt - myTable.offsetTop - paginationHt;
      },
      /*
       * checkbox 选择后触发事件
       * @param val Array 存在所有的选择每一个行数据
       */
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      /*
       * 列表数据只能选择一个
       * @param isOnly true  是否只选择一个
       */
      isSelected(isOnly){
        let len = this.multipleSelection.length;
        let flag = true;
        if(len==0){
          this.showMess("请选择数据!");
          flag = false;
        }
        if(len>1 && isOnly){
          this.showMess("只能修改一条数据!")
          flag = false;
        }
        return flag;
      },


      //当前组件默认请求(list)数据时,ajax处理的 基础信息设置
      setTableData(row,key,val){
        let that = this;
        that.ajaxCreateLoading(true);
        //处理服务数据
        let params = this.formDate(this.getFormData(this.formValidate),['month'],this.yearMonth);
        let myPromise = Util.queryData({
          url:'attendance/mylist',
          method:'get',
          params:params
        })();
        let arr = [{clockList:[]}];
        myPromise.then(function (res) {
          that.ajaxCreateLoading(false);
          let responseData = res.data;
          if(Util._.isObject(responseData["status"])&&responseData["status"]["code"]==0){
            if(responseData.data==0){
              that.data = responseData.data ||[];
              that.errorMess('数据为空');
              return;
            }
            if(!responseData.data) responseData.data=[]
            let date = that.yearMonth(+that.yearMonth(that.formValidate.month));
            //获取当月有多少天,判断是否需要跟新头部，更新则隐藏头部
            let newDate = date.split('-');
            let ts = new Date(newDate[0],newDate[1],0);//天数
            if(ts!=that.headerLength){
              that.isShow = false;
              that.headerLength = ts;
            }
            that.data = responseData.data;
            that.isShow = true;
          }else {
            if(row){
              row['clockList'][key].type = val;
              that.errorMess('操作失败');
            }
            that.errorMess('获取数据失败');

          }
        }).catch(function(response){
          if (response instanceof Error) {
            that.ajaxCreateLoading(false);
            // 意外发生在设置要求引发一个错误
            that.errorMess(response.message);
          } else {
            that.ajaxCreateLoading(false);
            that.errorMess(response.status+"错误!");
          }
        })
      },


      //当前组件添加时调用
      addCell(row,key,val){
        if(!row){
          that.errorMess('操作错误');
        }
        let that = this;
        that.ajaxCreateLoading(true);
        //处理服务数据
        let  date = key+1>9?key:'0'+(key+1);
        let month = this.yearMonth(this.formValidate.month)+'';
        let clockDate = month.split('');
        clockDate.splice(4,0,"-");
        clockDate.push('-');
        clockDate.push(date);
        clockDate = clockDate.join('');
        let myPromise = Util.queryData({
          url:'attendance/clock/add',
          method:'post',
          data:{
            userId:row.userId,   //学员Id
            depId:row.depId,   //科室Id
            type:row['clockList'][key].type,   //签到类型
            clockDate:clockDate,   //yyyy-MM-dd
            month: month ,//yyyymm
            userType:this.formValidate.userType,
          }
        })();
        myPromise.then(function (res) {
          that.ajaxCreateLoading(false);
          let responseData = res.data;
          if(Util._.isObject(responseData["status"])&&responseData["status"]["code"]==0){
            that.setTableData(row,key,val)
          }else {
            if(row){
              row['clockList'][key].type = val;
              that.errorMess('操作失败');
            }
            that.errorMess('获取数据失败');

          }
        }).catch(function(response){
          row['clockList'][key].type = val;
          if (response instanceof Error) {
            that.ajaxCreateLoading(false);
            // 意外发生在设置要求引发一个错误
            that.errorMess(response.message);
          } else {
            that.ajaxCreateLoading(false);
            that.errorMess(response.status+"错误!");
          }
        })
      },


      //当前组件修改时调用
      editCell(row,key,val){
        if(!row){
          that.errorMess('操作错误');
        }
        let that = this;
        let dateData = row['clockList'][key];
        //处理服务数据
        let  date = key+1>9?key:'0'+(key+1);
        //拼clockDate 为yyyy-MM-dd
        let clockDate = (row.month+'').split('');
        clockDate.splice(4,0,"-");
        clockDate.push('-');
        clockDate.push(date);
        clockDate = clockDate.join('')

        let myPromise = Util.queryData({
          url:'attendance/clock/modify/'+dateData.id,
          method:'put',
          data:{
            idL:dateData.id,
            userId:row.userId,   //学员Id
            depId:row.depId,   //科室Id
            type:dateData.type,   //签到类型
            clockDate:clockDate,   //yyyy-MM-dd
            month:row.month,   //yyyymm
            userType:this.formValidate.userType,
          }
        })();
        that.ajaxCreateLoading(true);
        myPromise.then(function (res) {
          let responseData = res.data;
          that.ajaxCreateLoading(false);
          if(Util._.isObject(responseData["status"])&&responseData["status"]["code"]==0){
            //修改成功目前未刷新列表， 保留
            //that.setTableData(row,key,val)
          }else {
            if(row){
              dateData.type = val;
              that.errorMess('操作失败');
            }
            that.errorMess('获取数据失败');

          }
        }).catch(function(response){
          if (response instanceof Error) {
            // 意外发生在设置要求引发一个错误
            that.errorMess(response.message);
            that.ajaxCreateLoading(false);
          } else {
            that.errorMess(response.status+"错误!");
            that.ajaxCreateLoading(false);
          }
        })
      },

      //搜索监听回调
      searchEvent(isLoading){
        //        isLoading(true);
        let isSubmit = this.handleSubmit('formValidate');
        if(isSubmit){
          this.setTableData()
        }
      },


      /*
       * 列表查询方法
       * @param string 查询from的id
       * */
      handleSubmit(name){
        let flag =false
        this.$refs[name].validate((valid) => {
          if (valid) {
            flag =true;
          } else {
            this.$Message.error('表单验证失败!');
          }
        })
        return flag;
      },

      /*
       * 监听子组件通讯的方法
       * 作用:根据不同的参数关闭对应的模态
       * @param targer string example:"add"、"edit"
       * */
      cancel(targer){
        this[targer+'Modal'] = false;
      },
      /*
       * 监听子组件通讯的方法
       * 作用:ajax请求成功回调,该监听方法在libs/util 中的混合模式下定义回调
       * @param targer string example:"add"、"edit"
       * @param targer string 提示返回的ajax回调返回的信息改信息在对应的子组件中定义
       * 例如:errorTitle、errorTitle
       *addMessTitle:{
       *    type:'add',
       *    successTitle:'添加成功!',
       *    errorTitle:'添加失败!',
       *    ajaxSuccess:'ajaxSuccess',
       *    ajaxError:'ajaxError',
       *    ajaxParams:{
       *      url:'/role/add',
       *      method:'post'
       *    }
       *    }
       * @param udata boolean 默认false  是否不需要刷新当前表格数据
       * */
      subCallback(target,title,updata){
        this.cancel(target);
        if(title){
          this.successMess(title);
        }
        if(!updata){
          this.setTableData();
        }
      },
      /*
       * 打开指定的模态窗体
       * @param options string 当前指定的模态:"add"、"edit"
       * */
      openModel(options){
        this[options+'Modal'] = true;

      },


      /*
       * 获取表单数据
       * @return string  格式:id=0&name=aa
       * */
      getFormData(data){
        let myData = Util._.defaultsDeep({},data);
        return myData;
      },

      //请假管理操作


      //转化，使cq转换成‘|’
      commutator(type){

        switch(type){
          case 'CQ':type = '|';
            break;
          case 'SJ':type = '+';
            break;
          case 'BJ':type = '++';
            break;
          case 'CJ':type = '#';
            break;
          case 'TQJ':type = '△';
            break;
          case 'SANGJ':type = '☓';
            break;
          case 'HJ':type = '✔';
            break;
          case 'KG':type = '◯';
            break;
          default: type = '';
        }
        return type;
      },

      /*
       * cq转换成
       *
       * */
      converter(type){
        switch(type){
          case 'CQ':type = 'workAttendance';
            break;
          case 'SJ':type = 'compassionateLeave';
            break;
          case 'BJ':type = 'sickLeave';
            break;
          case 'CJ':type = 'maternityLeave';
            break;
          case 'TQJ':type = 'familyLeave';
            break;
          case 'SANGJ':type = 'funeralLeave';
            break;
          case 'HJ':type = 'marriageLeave';
            break;
          case 'KG':type = 'absenteeism';
            break;
          default : type = '';
        }
        return type;
      },


      /*
       * 单元格点击事件
       * @params   row   obj   当前点击行数据
       * @params   column   obj   列数据
       * @params   cell   obj   当前单元格dom对象
       *
       * */
      cell(row, column, cell, event){
        if(column.level!=3) return;  //不是1-31天的返回
        this.row.key = column.label-1;
        this.row.row = row;
        if(event.pageY>this.dynamicHt/2+120){
          this.row.top = event.pageY-276+'px';
        }else{
          this.row.top = event.pageY+14+'px';
        }
        this.row.left = event.pageX-30+'px';
        this.row.isSelect = true;
        event.stopPropagation();
        return false;
      },


//      点击非单元格是列表隐藏
      selectHide(){
        this.row.isSelect = false;
      },


      /*
       * 为单元格赋值，并隐藏
       *
       * */
      valuationCell(value){
        let oldval = '';
        let old = '';
        let next= '';
        let row = this.row.row;
        let key = this.row.key;

        if(typeof key == 'number'){
          oldval = row['clockList'][key].type;
          if(row['clockList'][key].type ==value) return;
          old = this.converter(row['clockList'][key].type) ;
          row[old]--;
          next = this.converter(value);
          row[next]++;

          row['clockList'][key].type = value;
        } else {
          return;

        }
        if(!row['clockList'][key].id){
          this.addCell(row,key,oldval);
        }else{
          this.editCell(row,key,oldval);
        }
        this.row.isSelect = false;
      },




      /*
       * 对表单数据的时间进行转换
       * @parans date   string|obj  操作的方法
       * @return 199-02-12格式的时间
       * */
      yearMonthData(date) {
        if(typeof date!='object' )return date;
        let datetime= new Date(date);
        let year = datetime.getFullYear();
        let month = datetime.getMonth()+1;
        let D = date.getDate() + ' ';
        if(month<10){
          month = "0" + month;
        }
        return year+'-'+month+'-'+D;
      },


    },
    created(){
      this.init();
    },
    mounted(){
      //页面dom稳定后调用
      this.$nextTick(function () {
        //初始表格高度及分页位置
        this.setTableDynHeight();
        //为窗体绑定改变大小事件
        let Event = Util.events;
        Event.addHandler(window, "resize", this.setTableDynHeight);
      })
    },
  }
</script>
<style>
  .daily .el-select-dropdown__item:hover{
    background-color: #e4e8f1;

  }





</style>
