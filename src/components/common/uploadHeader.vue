<template>
  <el-upload
    v-loading="loading"
    class="avatar-uploader"
    :action="action"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
    :on-change="changeHeader"
    :on-progress="uploadProgress"
    :on-error="uploadError">
    <img v-if="imageUrl" :src="imageUrl" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 165px;
    height: 175px;
    line-height: 175px;
    text-align: center;
  }
  .avatar {
    width: 165px;
    height: 175px;
    display: block;
  }
</style>

<script>
  import config from '../../config/config.js';
  export default {
    props:["actionUrl","imgFile"],
    data() {
      return {
        imageUrl: '',
        action:"/file/upload",
        loading:false
      };
    },
    created(){
        if(typeof this.actionUrl!="undefined"){
          this.action = this.actionUrl;
        }
        this.action = config.ajaxUrl+this.action;
      if(typeof this.imgFile!="undefined"){
        this.imageUrl = this.imgFile;
      }
    },
    methods: {
      init(){

      },

      /*
       * 上传成功后处理
       * */
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.setUploadHeaderLoading(false);
        this.$emit("upladSuccess",res.data,this.imageUrl);
      },


      /*
       * 上传前校验
       * */
      beforeAvatarUpload(file) {
        const isJPG = (file.type === 'image/jpeg') || (file.type === 'image/jpg') || (file.type === 'image/png') || (file.type === 'image/gif');
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$Notice.warning({
            title: '只能上传图片',
            desc: '格式为: JPG、png、gif 格式!'
          });
        }
        if (!isLt2M) {
          this.$Notice.warning({
            title: '超出文件大小限制',
            desc: '上传头像图片 ' + file.name + ' 太大，不能超过 2MB!'
          });
        }
        return isJPG && isLt2M;
      },


      /*
       * 上传过程中
       * */
      uploadProgress(event, file, fileList){
        this.setUploadHeaderLoading(true);
      },


      /*
      * 上传失败
      * */
      uploadError(err, file, fileList){
        this.$message.error('上传失败!');
        this.setUploadHeaderLoading(false);
      },
      changeHeader(file, fileList){

      },

      /*
       * 设置是否显示上传头像loading
       * @param flag boolean   是否显示loading
       * */
      setUploadHeaderLoading(flag){
        this.loading = flag;
      }
    }
  }
</script>
