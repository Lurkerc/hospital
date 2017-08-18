<template>
  <!-- 评测与作业 - 查看试题 -->
  <div>
    <el-form   label-width="0">
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
                    <el-checkbox  :name="option.options"> &nbsp;&nbsp;&nbsp;{{option.options}}. {{option.content}}</el-checkbox>
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

          <div class="eq-dashed"></div>
          </br>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
  import api from './api'
  export default {
      props:['eqData'],
    data() {
      return {
        //初始化加载页面信息
        listMessTitle: {
          ajaxSuccess: 'updateListData',
          ajaxParams: {
            url: api.get.path,
            params: {
              courseId:'',
              planId:'' ,
              types:'',
            }
          }
        },
        isNeedResult:false,
        data:{
          "score":60,
          "questionsDtoList":[
            {
              "questionsId":100,
              "types":"RADIO",
              "subject":"单选题题干",
              "options":"A",
              "answerExplain":"答案解析",
              "optionsDtoList":[
                {
                  "options":"A",
                  "content":"选项的描述情况"
                },
                {
                  "options":"B",
                  "content":"选项的描述情况"
                },
                {
                  "options":"C",
                  "content":"选项的描述情况"
                }
              ],
              "keyWords":null
            },
            {
              "questionsId":100,
              "types":"CHECKBOX",
              "subject":"多选题题干",
              "options":"A|C",
              "answerExplain":"答案解析",
              "optionsDtoList":[
                {
                  "options":"A",
                  "content":"选项的描述情况"
                },
                {
                  "options":"B",
                  "content":"选项的描述情况"
                },
                {
                  "options":"C",
                  "content":"选项的描述情况"
                }
              ],
              "keyWords":null
            },
            {
              "questionsId":100,
              "types":"JUDGMENT",
              "subject":"判断题题干",
              "options":"A",
              "answerExplain":"答案解析",
              "optionsDtoList":[
                {
                  "options":"A",
                  "content":"正确"
                },
                {
                  "options":"B",
                  "content":"错误"
                }
              ],
              "keyWords":null
            },
            {
              "questionsId":100,
              "types":"ANSWER",
              "subject":"题干",
              "options":"A",
              "answerExplain":"答案解析",
              "optionsDtoList":null,
              "keyWords":[
                {
                  "tag":"解剖",
                  "weight":5
                },
                {
                  "tag":"手术刀",
                  "weight":3
                }
              ]
            }
          ]
        },
        getDta :[],
        score:'',

      }
    },
    methods: {
      // 初始化
      init() {
          console.log(this.eqData.itemData);
          this.ajax(this.listMessTitle);
          this.updateListData()
      },

      //通过get请求列表数据并渲染表格数据
      updateListData(responseData) {
//       let data = responseData.data;
         let data  =  {
          "score":60,
            "questionsDtoList":[
            {
              "questionsId":100,
              "types":"RADIO",
              "subject":"单选题题干",
              "options":"A",
              "answerExplain":"答案解析",
              "optionsDtoList":[
                {
                  "options":"A",
                  "content":"选项的描述情况"
                },
                {
                  "options":"B",
                  "content":"选项的描述情况"
                },
                {
                  "options":"C",
                  "content":"选项的描述情况"
                }
              ],
              "keyWords":null
            },
            {
              "questionsId":100,
              "types":"CHECKBOX",
              "subject":"多选题题干",
              "options":"A|C",
              "answerExplain":"答案解析",
              "optionsDtoList":[
                {
                  "options":"A",
                  "content":"选项的描述情况"
                },
                {
                  "options":"B",
                  "content":"选项的描述情况"
                },
                {
                  "options":"C",
                  "content":"选项的描述情况"
                }
              ],
              "keyWords":null
            },
            {
              "questionsId":100,
              "types":"JUDGMENT",
              "subject":"判断题题干",
              "options":"A",
              "answerExplain":"答案解析",
              "optionsDtoList":[
                {
                  "options":"A",
                  "content":"正确"
                },
                {
                  "options":"B",
                  "content":"错误"
                }
              ],
              "keyWords":null
            },
            {
              "questionsId":100,
              "types":"ANSWER",
              "subject":"题干",
              "options":"A",
              "answerExplain":"答案解析",
              "optionsDtoList":null,
              "keyWords":[
                {
                  "tag":"解剖",
                  "weight":5
                },
                {
                  "tag":"手术刀",
                  "weight":3
                }
              ]
            }
          ]
        };
         this.getDta = this.conductData(data.questionsDtoList);
         this.tableData = [];
        this.score = data.score;
      },

      //处理数据
      conductData(dataList){
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
          if(types=='checkbox'){
            item.select = [];
          }
          tempObj[types].push(item);
        });
        tempArr = tempArr.concat(tempObj.radio,tempObj.checkbox,tempObj.judgment,tempObj.answer);
          return tempArr ;
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
