<template>

  <div class="showWrapper leaveManagement-show">

      <el-row class="lose-margin2" >
        <el-col :span="11" :offset="10">
         评优自荐
        </el-col >
      </el-row >
      <el-row   class="lose-margin2">
        <el-col :span="20" :offset="2">
          首先，感谢领导给我这次评选优秀员工的机会，也感谢您能在百忙中看我这份自荐书。自三月份进公司至今，我并没有为公司做出了不起的贡献，也没有取得特别值得炫耀的成绩，我只是尽量做好属于自己岗位上的工作，尽自己最大的努力尽力尽快地完成每一次任务，以严谨的工作态度来对待每一件事。
          　　总结自己的经验，从经验中学习，向他人学习，尽量将自己的工作争取一次比一次做的更好，尽可能的提高工作效率，与同事相处和睦。虽然如此，但我的付出得到了公司的认可，我深感无比荣幸，我想公司这次评优活动，也再次向每位员工传达说明了只要有付出，只要做好了属于你的那份工作，就会有回报的务实文化和平凡道理。
          　　在工作中让我学习到了专业知识。除此之外很重要的就是让我知道了如何安排时间及沟通的能力。沟通创造价值，所以沟通也是很重要的，少点摩擦，多点宽容，这样同事、部门之间的工作才能协调配合的更好。每天工作结束后我都会在便条纸上写下第二天待完成的工作，这样做的好处：第二天工作的时候就不会遗漏需要处理的事情，而且每做完一件事在做上记号，这样也利于我们工作总结。在工作当中我们一定要要全心投入工作中去，以健康快乐的心态来工作，有效率的工作，为自己所做的每一件事负责。
          　　同样，公司给我们每一员工展现自我的平台，每一个人都有自己的价值观，我能干什么，我会干什么，我干的怎么样。我们都应该拥有勇于挑战自我，创新自我的人生价值观。只要你是千里马有一天会遇到伯乐的。更重要的一点是我们要与团队共成长，成功20%是靠自己，80%是靠别人。没有完美的个人，只有完美的团队，团队的辉煌依靠我们的努力。我们的成功离不开团队的力量。无论是之前还是以后未来我将会更加努力、更加勤奋的工作、更高的目标、更高的起点要求自己。
          　　最后，在今后工作中，我会更加努力的工作，得到各同事领导的支持和肯定。在此很感谢我部门的经理在工作中给了我诸多的指导与帮助， 还有我的员工同事们，感谢他们在工作中给我的鼓励和协作，假如没有你们就没有我今天的成长。
          　　</br>
        自荐人：张三日期：2015-1-11
        </el-col >
      </el-row >
    <el-form ref="formValidate"  class="demo-form-inline" label-width="90px">
      <el-row >
        <el-col :span="8" :offset="2">
          <el-form-item label="相关资料:" prop="name" class="feildFontweight">
          <p> <a href="">上传附件</a></p>
          </el-form-item >
        </el-col >
      </el-row >
    </el-form>
  </div>
</template>
<script>
  //当前组件引入全局的util
  let Util=null;
  export default {
    //props接收父组件传递过来的数据
    props: ['operailityData'],
    options:[{
      value: '选项1',
      label: '黄金糕'
    }, {
      value: '选项2',
      label: '双皮奶'
    }, {
      value: '选项3',
      label: '蚵仔煎'
    }, {
      value: '选项4',
      label: '龙须面'
    }, {
      value: '选项5',
      label: '北京烤鸭'
    }],
    data (){
      return{
        //当前组件默认请求(list)数据时,ajax处理的 基础信息设置
        showData:{},
        listMessTitle:{
          paramsData:'listUrl',
          ajaxSuccess:'SuccessGetCurrData',
          ajaxParams:{
            url:'/role/get/1',
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
//        let type = [];
//        let data = responseData.data;
//        this.showData = data;
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
