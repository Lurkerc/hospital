<template>
  <!-- 评测与作业 - 查看试题 -->
  <div>
    <el-form v-if="getDta!=0" label-width="0">
      <div v-for="(item,index) in getDta" :key="index">
        <div class="eq-font">
          <el-row>
            <el-col :span="4">
              <span class="eq-index" >{{index+1}}.</span>
              <el-button type="info" size="mini">{{item.types | typeText }}</el-button>
              <span>(2分)</span>
            </el-col>

            <el-col :span="18" style="line-height: 40px">
              {{item.subject}}
            </el-col>
          </el-row>
          </br>

            <!--单选 或 判断-->
            <div v-if="item.types=='RADIO' || item.types=='JUDGMENT'">
              <el-form-item >
                <el-radio-group v-model="item.select">
                  <div v-for="(option,i) in item.optionsDtoList" style="height: 40px;line-height: 40px;">
                    <el-radio :label="option.options"> &nbsp;&nbsp;&nbsp;{{option.options}}. {{option.content}}</el-radio>
                  </div>
                </el-radio-group>
              </el-form-item>
            </div>
            <!--多选-->
            <div v-if="item.types=='CHECKBOX'">
              <el-form-item >
                <el-checkbox-group v-model="item.select">
                  <div v-for="(option,i) in item.optionsDtoList" style="height: 40px;line-height: 40px;">
                    <el-checkbox  :label="option.options"> &nbsp;&nbsp;&nbsp;{{option.options}}. {{option.content}}</el-checkbox>
                  </div>
                </el-checkbox-group>
              </el-form-item>
            </div>
            <!--问答-->
            <div v-if="item.types=='ANSWER'">
              <el-input type="textarea" v-model="item.select"></el-input>
            </div>

          <!--答案-->
            <div v-if="isNeedResult"style="margin: 20px 0; ">
              <el-row>
                <el-col :span="1">
                  {{item.options}}
                </el-col>
                <el-col :span="16">
                  答案解析: {{item.answerExplain}}
                </el-col>
              </el-row>
            </div>
          <div v-if="getDta.length != index+1" class="eq-dashed"></div>
          </br>
        </div>
      </div>
      <el-row>
        <el-col :span="10" :offset="10">
          <load-btn @listenSubEvent="listenSubEvent" :btnData="loadBtn"></load-btn>
        </el-col>
      </el-row>
    </el-form>
    <div  v-else style="font-size: 24px;text-align: center;line-height: 200px"> <strong>暂无试题</strong></div>
  </div>
</template>

<script>
  import api from './api'
  export default {
      props:['eqData'],
    data() {
      return {
        loadBtn:{title:'提交',callParEvent:'listenSubEvent'},
        //初始化加载页面信息
        listMessTitle:'',
        isNeedResult:false,
        data:{
        },
        getDta :[],
        score:'',
      //todo 提交分数（还未有接口）
        addMessTitle:{
          ajaxSuccess:'ajaxSuccess',
          ajaxParams:{
            url: '',
            method: '',
            jsonString:true,
          }
        },
      }
    },
    methods: {
      // 初始化
      init() {
          this.listMessTitle= {
          ajaxSuccess: 'updateListData',
            ajaxParams: {
            url: api.get.path,
              params: {
              courseId:this.$store.state.curriculum.look.course.id||'',
                planId:this.eqData.itemData.id||'' ,
                type:this.eqData.type,
             }
            }
          };
          this.ajax(this.listMessTitle);
      },

      //通过get请求列表数据并渲染表格数据
      updateListData(responseData) {
         let data = responseData.data;
         if(!data)return;
         this.getDta = this.conductData(data.questionsDtoList);
         this.tableData = [];
         this.score = data.score;
      },

      //处理数据
      conductData(dataList) {
          let tempArr = [];   //处理数据集合
          let tempObj = {
            radio:[],  //单选题数组
            checkbox:[],  //多选题数组
            judgment:[], //判断题数组
            answer:[],//问答题数组
          };
        dataList.forEach(function (item,index) {
          let types = item.types.toLowerCase();
          item.select = '';
          if(types =='checkbox'){
            item.select = [];
          }
          tempObj[types].push(item);
        });
        tempArr = tempArr.concat(tempObj.radio,tempObj.checkbox,tempObj.judgment,tempObj.answer);
          return tempArr ;
      },

      /*
       * 点击提交按钮 监听是否提交数据
       * @param isLoadingFun boolean  form表单验证是否通过
       * */
      listenSubEvent(isLoadingFun){
        let isSubmit = this.submitForm("formValidate");
        if(isSubmit){
          if(!isLoadingFun) isLoadingFun=function(){};
          isLoadingFun(true);
          this.addMessTitle.ajaxParams.data=this.disposeData(this.getFormData(this.getDta));
          this.ajax(this.addMessTitle,isLoadingFun);
        }
      },


      //处理要提交的数据
      disposeData(data){
          //todo 未完善
        let temArr = [];
        let score = 0;
        for (let i=0;i<data.length;i++){
            let item = data[i];

           let type = item.types;
            if(type=='RADIO' || type == 'JUDGMENT'){ //如果是判断题或者单选题
              if(item.select == item.options){  //答题正确

              }

            }else if(type=='CHECKBOX') {  //多选题
              let error = false;
              let selects = item.select;  //用户选择的
              let len = selects.length
              let options = item.options.split('|'); //答案
              if(options.length!=len){
                  continue;
              }
              for(let k=0;K<len;k++){
                let select = selects[k];
                if(!item.options.includes(select)){  //其中一项答案错误
                  error = true;
                }
              }

            }else {  //问答题
              for (let l=0;l<item.keyWords.length;l++){
                  let keyWord = keyWords[l];
                  if(item.select.includes(keyWord.tag)){  //如果里面有其中的一项，则本次正确
//                    keyWord.weight   //权重

                  }
              }
            }

        }

        return data;
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
       * 获取表单数据
       * @return string  格式:id=0&name=aa
       * */
      getFormData(data){
        let myData = this.$util._.defaultsDeep([],data);
        return myData;
      },

    },
    created() {
      this.init()
    }
  }

</script>

<style>
  .eq-index{
    margin-left:-5px ;
    font-size: 24px;
    padding: 0 20px 0 0;
  }
  .eq-font{
    font-size: 14px;
    padding:0 20px;
  }
  .eq-dashed{
    margin-top: 10px;
   border: 1px dashed #bbbbbb;
  }

</style>
