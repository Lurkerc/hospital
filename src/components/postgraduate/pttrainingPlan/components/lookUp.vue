<!----------------------------------
****--@name     ${*}
****--@role     ${*}
****--@date     2017/9/6
****--@author   gx
----------------------------------->
<template>
    <div>
      <show :operailityData="formValidate"></show>
    </div>
</template>
<script>
    /*当前组件必要引入*/
    import api from '../api'
    import show from './makeOpenReply_view.vue'
    //当前组件引入全局的util
    let Util = null;
    export default {
        props: ['operailityData'],
        data() {
            return {
              formValidate: {
                "pyobject":"",
                "length":"",
                "mode":"",
                "target":"",
                "requires":"",
                "yqobjective":"",
                "yqrequire":"",
                "yqassessment":"",
                "yqpractice":"",
                "yqpresentation":"",
                "yqactivity":"",
                "paperDefence":"",
                "paperReport":"",
                "paperTopic":"",
                "dissertation":"",
                "degreeAwarding":"",
                "whereabouts":"",
                "bookList":[],
                "curriculumList":[],
                //前端保存的课程设置与考核要求 :
                curriculumLists:[[], [],[],[]],
                "directionList":[]
              },

            }
        },
        methods: {
            //初始化请求列表数据
            init() {
              this.ajax({
                ajaxParams: {
                  url: api.getPlan.path + this.operailityData.id,
                  method: api.getPlan.method,
                },
                ajaxSuccess: res => {
                  let data = res.data;

                  //课程要求
                  if(!data.directionList || data.directionList==0){
                    data.directionList = [{name:''}]
                  }
                  //公共基础课A类
                  let A =  [{"type":"A", "name":"", "teacher":"", "credit":"", "hour":"",}];
                  //专业基础课B类
                  let B =  [{"type":"B", "name":"", "teacher":"", "credit":"", "hour":"",}];
                  //专业实践课C类
                  let C =  [{"type":"C", "name":"", "teacher":"", "credit":"", "hour":"",}];
                  //公共选修课程D类(8个专业方向)
                  let D =  [{"type":"D", "name":"", "teacher":"", "credit":"", "hour":"",}];
                  if(!data.curriculumList || data.curriculumList==0){
                    data.curriculumList = [];
                    data.curriculumLists=[A,B,C,D];
                  }else {
                    let obj = {
                      A:[],
                      B:[],
                      C:[],
                      D:[],
                    }
                    for(let i=0;i<data.curriculumList.length;i++){
                      let item = data.curriculumList[i];
                      obj[item.type].push(item)

                    }
                    if(obj.A!=0){
                      A = obj.A;
                    }
                    if(obj.B!=0){
                      B = obj.B;
                    }
                    if(obj.C!=0){
                      C = obj.C;
                    }
                    if(obj.D!=0){
                      D = obj.D;
                    }
                    data.curriculumLists=[A,B,C,D];
                  }

                  //书籍

                  if(data.bookList==0||!data.bookList){
                    data.bookList=[{
                      "name":"",
                      "author":""
                    }]
                  }
                    this.formValidate = data
                }
              })
//              console.log(this.formValidate)
            },


        },
        created() {
          this.init();
        },
        mounted () {

        },
        components: {
          show
        }

    }
</script>
