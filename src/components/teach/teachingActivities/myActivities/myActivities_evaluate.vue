<!--档案审核-->
<template>
  <div id="content" ref="content" class="modal">


    评价
  </div>
</template>
<script>
  //当前组件引入全局的util
  let Util=null;
  export default{
    data() {
      return {
        //查询表单
        listUrl:'/role/list?name=&identify=&type=',
        deleteUrl:'/role/remove',
        formValidate: {
          name: '',
          sex: '',
          phone: ''
        },

        operailityData:'',
        multipleSelection: [],
        dynamicHt: 100,
        self: this,
        tableData1: [],
        loading:false,
        listTotal:0,
        //当前组件默认请求(list)数据时,ajax处理的 基础信息设置
        listMessTitle:{
          paramsData:'listUrl',
          ajaxSuccess:'updateListData',
          ajaxParams:{
            url:'/role/list?name=&identify=&type=',
          }
        },
        /*--按钮button--*/
        viewId:{id:'view',title:'查看'},
        auditId:{id:'audit',title:'审核'},
      }
    },
    methods: {
      //初始化请求列表数据
      init(){
        Util = this.$util;
        //ajax请求参数设置
        this.myPages =  Util.pageInitPrams;

        this.queryQptions = {
          //url:this.listUrl,
          params:{curPage: 1,pageSize: Util.pageInitPrams.pageSize}
        }

        //this.setTableData();
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

      //通过get请求列表数据
      updateListData(responseData){
        let len = responseData.data.length;
        this.tableData1=[{}]
        /*let data = responseData.data.splice(0,150);
        let that = this;
        that.tableData1=[];
        data = that.addIndex(data);
        for(var i=0,n=0;i<data.length;i+=100,n++){
          setTimeout(()=>{
            that.tableData1= that.tableData1.concat(data.splice(0,100));
          },n*10)
        }*/
        this.listTotal = 1;
      },
      setTableData(){
        this.tableData1=[{}]
        this.listMessTitle.ajaxParams = Object.assign(this.listMessTitle.ajaxParams,this.queryQptions);
        this.ajax(this.listMessTitle);
      },
      /*
       * 列表查询方法
       * @param string 查询from的id
       * */
      handleSubmit(name){
        let formData = Util._.defaultsDeep({},this.formValidate);
      },
      /*--点击--审核--按钮--*/
      audit(index){
        this.operailityData = this.tableData1[index-1];
        this.openModel("audit");
      },
      /*
       * 点击--查看--按钮
       * @param index string|number  当前行索引
       * */
      show(index,type){
        this.operailityData = Util._.defaultsDeep({},this.tableData1[0]);
        if(typeof type!="undefined"){
          this.operailityData["type"] = type;
        }
        this.openModel("show");
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
    },
    created(){
      this.init();
    },
    mounted(){
    },
    components:{
      //当前组件引入的子组件
    }
  }
</script>
