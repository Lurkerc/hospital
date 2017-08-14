<!----------------------------------
****--@name     ${*}
****--@role     ${*}
****--@date     2017/8/9
****--@author   gx
----------------------------------->
<template>
    <div>
      <div style="float: right;">
        <el-button @click="next" type="primary">下一步</el-button>
      </div>
      <div style="font-size:18px; ">
        选择标准课程
      </div>
      <el-row>
        <el-col :span="22" :offset="1">
          <fieldset style="margin: 0 auto;" class="layui-elem-field">
            <legend>爱好</legend>
            <div class="layui-field-box" >
              <div @click="coursesClick" class="select-courses select-courses2" >
                <h3 style="text-align: center;height: 35px">
                  <i class="el-icon-check"  style="float:right;color: rgb(19, 206, 102);font-size: 20px;margin: 10px 0 0 ; "></i>
                  <div style="width: 200px; line-height: 35px;display: inline-block;" class="overflow-txt1">课程名称</div>
                </h3>
                <img src="" alt="" style="width: 240px;height: 136px;">
                <div style="padding: 5px 10px;font-size: 16px;">
                  <el-tooltip content="Top center" placement="top">
                  <div class="overflow-txt1" style="text-align: center">Top center</div>
                  </el-tooltip>
                </div>
              </div>
            </div>
          </fieldset>
        </el-col>
      </el-row>

      <Modal
        close-on-click-modal="false"
        width="500"
        v-model="addModal"
        title="对话框标题"
        class-name="vertical-center-modal">
        <modal-header slot="header" :content="addId"></modal-header>
          <div>
            <div class="remove">是否确定不选择已有标准课程资源,创建新的授课？</div>
            <el-row >
              <el-col :span="10" :offset="14">
                <el-button class="but-col"  @click="success" type="primary">确定</el-button>
                <el-button class="but-col"  @click="addModal=false" type="danger">取消</el-button>
              </el-col>
              </el-col >
            </el-row >
          </div>
        <div slot="footer"></div>
      </Modal>

    </div>
</template>
<script>
    /*当前组件必要引入*/

    //当前组件引入全局的util
    let Util = null;
    export default{
        data() {
            return {
              loadBtn:{title:'保存',callParEvent:'listenSubEvent'},
              addModal:false,
              addId:{id:'addId',title:'提示'},
              operailityData:{
                  id:''
              },
            }
        },
        methods: {
          //初始化请求列表数据
          init(){

          },
          coursesClick(){


          },



          //确定
          success(){
            this.$emit('selectCourser');

          },

          next(){
            if(this.operailityData.id){
              this.$emit('selectCourser',this.operailityData.id);

            }else {
                this.addModal = true;
            }

          },

        },
        created(){
            this.init();
        },
        mounted(){
        },
        components: {}
    }
</script>
