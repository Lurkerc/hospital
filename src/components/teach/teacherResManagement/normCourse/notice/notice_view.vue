<template>
  <!-- 公告 -->
  <div>
    <el-row>
      <div v-if="noticeList.length">
        <el-col v-for="item in noticeList" :key="item.id">
          <p class="noticeDate">{{ item.createTime | formatDate('yyyy-MM-dd') }}</p>
          <div class="noticeCon">{{ item.content }}</div>
        </el-col>
      </div>
      <p v-else class="noNoticeTips">暂无公告</p>
      <el-col class="noticeLoadMore" align="center" v-if="parseInt(totalCount/formValidate.pageSize) > formValidate.curPage">
        <el-button type="info" @click="loadMore">加载更多</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import api from './api';
  export default {
    data() {
      return {
        noticeList: [],
        formValidate: {
          pageSize: 8,
          courseId: '',
          curPage: 1,
        },
        totalCount: 0,
      }
    },
    methods: {
      init() {
        this.formValidate.courseId = this.$store.state.curriculum.look.course.id;
        this.getNotice()
      },
      getNotice() {
        let opt = {
          ajaxSuccess: res => {
            this.noticeList = res.data;
            this.totalCount = res.totalCount;
          },
          ajaxParams: {
            url: api.get.path,
            params: this.formValidate
          }
        };
        this.ajax(opt)
      },
      loadMore() {
        this.formValidate.curPage++;
        this.getNotice()
      },
    },
    created() {
      this.init()
    },
  }

</script>

<style>
  /* 公告 */

  .noticeDate {
    margin: 10px 0;
  }

  .noticeCon {
    margin-bottom: 10px;
  }

  .noNoticeTips {
    text-align: center;
    line-height: 200px;
  }

</style>
