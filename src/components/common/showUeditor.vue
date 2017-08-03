<!----------------------------------
****--新建周历(showUeditor)
****--@date     2017/6/27
****--@author   zyc<332533011@qq.com
----------------------------------->
<template>
  <VueUEditor @ready="editorReady" :ueditorConfig="ueditorConfig" style="width: 800px"></VueUEditor>
</template>
<script>
  import VueUEditor from './UEditorFull.vue';
  export default {
    name: 'ueditor',
    props: {
      name: {    //编辑的name标示
        type: String,
        default: ''
      },
      ueditorVal: {  //  默认的值设置
        type: Object,
        default: ''
      },
      ueditorConfig: {  // UEditor 配置项
        type: Object,
        default: function () {
          return {};
        }
      }
    },
    data(){
      return{
        UEeditor:null,
      }
    },
    components: { VueUEditor },
    methods: {
      editorReady (editorInstance) {
        this.$emit("storeUE",this.name,editorInstance)
        editorInstance.setContent(this.ueditorVal[this.name]);
        editorInstance.addListener('contentChange', () => {
          //console.log('编辑器内容发生了变化：', editorInstance.getContent());
          this.$emit("getUeditorVal",this.name,editorInstance.getContent());
        });
      }
    }
  };
</script>
