<template>

  <div class="showWrapper">
    <el-form class="demo-form-inline">

      <el-row >
        <el-col :span="10" :offset="2">
          <el-form-item label="学期:" class="feildFontweight">

          </el-form-item>
        </el-col>
        </el-col >

        <el-col :span="10" >
          <el-form-item label="科室:" class="feildFontweight">
            {{showData.identify}}
          </el-form-item>
        </el-col >
      </el-row >

      <el-row >
        <el-col :span="10" :offset="2">
          <el-form-item label="姓名:" class="feildFontweight">

          </el-form-item>
        </el-col>
        </el-col >

        <el-col :span="10" >
          <el-form-item label="职称:" class="feildFontweight">
            {{showData.identify}}
          </el-form-item>
        </el-col >
      </el-row >

      <el-row >
        <el-col :span="10" :offset="2">
          <el-form-item label="课程类型:" class="feildFontweight">

          </el-form-item>
        </el-col>
        </el-col >

        <el-col :span="10" >
          <el-form-item label="总课时:" class="feildFontweight">
            {{showData.identify}}
          </el-form-item>
        </el-col >
      </el-row >

      <el-row >
        <el-col :span="10" :offset="2">
          <el-form-item label="评分:" class="feildFontweight">

          </el-form-item>
        </el-col>
        </el-col >

        <el-col :span="10" >
          <el-form-item label="评价结果:" class="feildFontweight">
            {{showData.identify}}
          </el-form-item>
        </el-col >
      </el-row >

      <el-row >
        <el-col :span="10" :offset="2">
          <el-form-item label="单次课时费:" class="feildFontweight">

          </el-form-item>
        </el-col>
        </el-col >

        <el-col :span="10" >
          <el-form-item label="应付:" class="feildFontweight">
            {{showData.identify}}
          </el-form-item>
        </el-col >
      </el-row >

      <el-row >
        <el-col :span="10" :offset="2">
          <el-form-item label="支付时间:" class="feildFontweight">

          </el-form-item>
        </el-col>
        </el-col >

        <el-col :span="10" >
          <el-form-item label="状态:" class="feildFontweight">
            {{showData.identify}}
          </el-form-item>
        </el-col >
      </el-row >

      <el-row >
        <el-col :span="20" :offset="2">


          <fieldset class="layui-elem-field">
            <legend>评分情况</legend>
            <el-row >
              <el-col :span="4" :offset="20">
                <el-button @click="classFee">课时费标准</el-button>
              </el-col>
            </el-row >
            <div class="layui-field-box">
              <!--表格数据-->
              <el-table
                align="center"
                :data="tableData1"
                tooltip-effect="dark"
                highlight-current-row
                style="width: 100%;height:100%"
              >
                <el-table-column
                  prop="name"
                  label="评价对象">
                </el-table-column>
                <el-table-column
                  prop="identify"
                  label="总分"
                >
                </el-table-column>
                <el-table-column
                  prop="remark"
                  label="人数"
                >
                </el-table-column>
                <el-table-column
                  prop="type"
                  label="权重">
                </el-table-column>
                <el-table-column
                  prop="type"
                  label="平均分">
                </el-table-column>
              </el-table>
            </div>

            <el-row >
              <el-col :span="4" :offset="1">
                <el-form-item label="评分:" class="feildFontweight">
                  {{showData.identify}}
                </el-form-item>
              </el-col>

              <el-col :span="4" >
                <el-form-item label="结果:" class="feildFontweight">
                </el-form-item>
              </el-col>
            </el-row >
          </fieldset>
        </el-col>
      </el-row >

      <el-row >
        <el-col :span="20" :offset="2">
          <fieldset class="layui-elem-field">
            <legend>评价学生情况</legend>
            <div class="layui-field-box">
              <!--表格数据-->
              <el-table
                align="center"
                :data="tableData1"
                tooltip-effect="dark"
                highlight-current-row
                style="width: 100%;height: 100%"
              >
                <el-table-column
                  prop="name"
                  label="时间">
                </el-table-column>
                <el-table-column
                  prop="identify"
                  label="起"
                >
                </el-table-column>
                <el-table-column
                  prop="remark"
                  label="至"
                >
                </el-table-column>
                <el-table-column
                  prop="type"
                  label="课时">
                </el-table-column>
                <el-table-column
                  prop="type"
                  label="班级">
                </el-table-column>
                <el-table-column
                  prop="type"
                  label="组">
                </el-table-column>
                <el-table-column
                  prop="type"
                  label="地点">
                </el-table-column>
                <el-table-column
                  prop="type"
                  label="授课教师">
                </el-table-column>
              </el-table>
            </div>
          </fieldset>

        </el-col>
      </el-row >

    </el-form>

    <div>
      <!--课时费标准弹窗-->
      <Modal
        close-on-click-modal="false"
        width="1000"
        v-model="classFeeModal"
        title="导出"
        class-name="vertical-center-modal">
        <modal-header slot="header" :content="classFeeId"></modal-header>
        <classFee v-if="classFeeModal"  :operaility-data="operailityData"></classFee>
        <div slot="footer"></div>
      </Modal>
    </div>
  </div>
</template>
<script>
  import classFee from './classManagement_view_classFee.vue';
  //当前组件引入全局的util
  let Util=null;
  export default {
    //props接收父组件传递过来的数据
    props: ['operailityData'],
    data (){
      return{
        classFeeId:{id:'classFeeId',title:'课时费标准'},
        classFeeModal:false,
        tableData1:[{"id":1}],
        //当前组件默认请求(list)数据时,ajax处理的 基础信息设置
        showData:{},

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
       * 默认组件第一次请求数据
       * @param res JSON  数据请求成功后返回的数据
       * */
      SuccessGetCurrData(responseData){
        let type = [];
        let data = responseData.data;
        this.showData = data;
      },
      /*
       * 当前组件发送事件给父组件
       * 发送关闭(cancel)模态事件给父组件,请求关闭当前模态窗
       * */
      cancel(){
        this.$emit('cancel','show');
      },
      /*
       * 组件初始化入口
       * */
      init(){
        //默认请求加载数据
        this.ajax(this.listMessTitle);
      },


      //课时费标准点击
      classFee(){
          this.classFeeModal = true;
      },
    },
    components:{
      classFee
    }
  }
</script>
<style>
  .showWrapper{
    height: 100%;
    padding: 20px;
    border: 1px solid #eee;
  }
  .feildFontweight{
    font-weight: bold;
  }
</style>
