<template>

  <div>
    <el-form   class="demo-form-inline" label-width="90px" >
      <el-row >
        <el-col :span="8" :offset="2">
          <el-form-item label="研究生姓名:"  >
            {{operailityData.name}}
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="2">
          <el-form-item label="汉语拼音:"  >
            {{operailityData.pinyin}}
          </el-form-item>
        </el-col>
      </el-row >
      <el-row >
        <el-col :span="8" :offset="2">
          <el-form-item label="性别:" >
            {{operailityData.sex |typeText}}
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="2">
          <el-form-item label="出生年月:">
            {{operailityData.birthDate}}
          </el-form-item>
        </el-col>
      </el-row >
      <el-row >
        <el-col :span="8" :offset="2">
          <el-form-item label="入学年月:" >
            {{operailityData.entranceDate}}
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="2">
          <el-form-item label="学科专业:" >
            {{operailityData.specialtyName}}
          </el-form-item>
        </el-col>
      </el-row >

      <!--     -->
      <el-row >
        <el-col :span="8" :offset="2">
          <el-form-item label="研究方向:"  >
            {{operailityData.researchDirection}}
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="2">
          <el-form-item label="课题名称:"  >
            {{operailityData.topicName}}
          </el-form-item>
        </el-col>

      </el-row >

      <el-row >
        <el-col :span="8" :offset="2">
          <el-form-item label="导师姓名:"  >
            {{operailityData.tutorName}}
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="2">
          <el-form-item label="职称:" >
            {{operailityData.positionalTitle}}
          </el-form-item>
        </el-col>
      </el-row >

      <el-row >
        <el-col :span="18" :offset="2">
          <el-form-item label="指导小组成员:"  >
            <el-tag
              style="margin: 5px"
              :key="tag"
              v-for="tag in operailityData.groupMember"
              :close-transition="false"
              type="primary">
              {{tag}}
            </el-tag>
          </el-form-item>
        </el-col>
      </el-row >

      <el-row >
        <el-col :span="8" :offset="2">
          <el-form-item label="开题报告日期:"  >
            {{operailityData.reportDate}}
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="2">
          <el-form-item label="出席人数:"  >
            {{operailityData.attendance}}
          </el-form-item>
        </el-col>
      </el-row >

      <el-row >
        <el-col :span="18" :offset="2">
          <el-form-item label="主持人:" >
            {{operailityData.moderator}}
          </el-form-item>
        </el-col>
      </el-row >

      <el-row >
        <el-col :span="18" :offset="2">
          <el-form-item label="记录员:"  >
            {{operailityData.recorder}}
          </el-form-item>
        </el-col>
      </el-row >

      <el-row >
        <el-col :span="18" :offset="2">
          <el-form-item    label="出席人员评价:">

            <el-input type="textarea" readonly v-model="operailityData.evaluationOpinion" placeholder="出席人员对课题的评价，提出的主要问题记录"></el-input>
          </el-form-item>
        </el-col>
      </el-row >

    </el-form>
  </div>
</template>
<script>
  //当前组件引入全局的util
  let Util=null;
  export default {
    props:['operailityData','view','peport'],
    data (){
      return{

      }
    },
    created(){
      //给当前组件注入全局util
      Util = this.$util;
    },
    mounted(){
      //初始化
    },
    methods:{

    },


  }
</script>

