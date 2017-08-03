<!----------------------------------
****--@name     ${*}
****--@role     ${*}
****--@date     2017/8/3
****--@author   gx
----------------------------------->
<template>
    <div>
      <syllabusView :role="'LS'" ></syllabusView>
    </div>
</template>
<script>
    /*当前组件必要引入*/
    import syllabusView from '../syllabusView/syllabusView_list.vue'
    //当前组件引入全局的util
    let Util = null;
    export default{
        data() {
            return {}
        },
        methods: {
            //初始化请求列表数据
            init(){

            },

        },
        created(){
            this.init();
        },
        mounted(){
        },
        components: {syllabusView}
    }
</script>
