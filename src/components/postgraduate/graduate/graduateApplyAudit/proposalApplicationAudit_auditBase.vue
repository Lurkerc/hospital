<template>

  <div>
    <el-form    class="demo-form-inline" label-width="100px" >
      <fieldset class="layui-elem-field ">
        <el-row>
          <el-col :span="11" :offset="1" style="border-left: 1px solid #ececec;border-top: 1px solid #ececec;">
            <el-form-item label="申请人:" style="padding:4px 0;margin: 0;">
              {{operailityData.name}}
            </el-form-item>
          </el-col>
          <el-col :span="11" style="border: 1px solid #ececec;border-bottom: none;">
            <el-form-item label="学号:" style="padding:4px 0;margin: 0;">
              {{operailityData.studentId}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11" :offset="1" style="border-left: 1px solid #ececec;border-top: 1px solid #ececec;">
            <el-form-item label="年级:" style="padding:4px 0;margin: 0;">
              {{operailityData.boundary}}
            </el-form-item>
          </el-col>
          <el-col :span="11" style="border: 1px solid #ececec;border-bottom: none;">
            <el-form-item label="手机号:" style="padding:4px 0;margin: 0;">
              {{operailityData.phone}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11" :offset="1" style="border: 1px solid #ececec;border-right: none;">
            <el-form-item label="专业代码:" style="padding:4px 0;margin: 0;">
              {{operailityData.specialtyCode}}
            </el-form-item>
          </el-col>
          <el-col :span="11" style="border: 1px solid #ececec;">
            <el-form-item label="专业名称:" style="padding:4px 0;margin: 0;">
              {{operailityData.specialtyName}}
            </el-form-item>
          </el-col>
        </el-row>
        <br/>

        <el-row>
          <el-col :span="22" :offset="1">
            <el-table
              align="center"
              max-height="400"
              :data="operailityData.graduationSublist"
              tooltip-effect="dark"
              highlight-current-row
              style="width: 100%">
              <el-table-column
                align="center"
                label="序号"
                type="index"
                width="80">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                prop="article"
                class-name="valiTableStyle"
                label="发表文章">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="periodical"
                class-name="valiTableStyle"
                label="期卷号">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="publication"
                class-name="valiTableStyle"
                label="刊物名称">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="author"
                label="是否第一作者"
                class-name="valiTableStyle">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="signature"
                class-name="valiTableStyle"
                label="文章署名单位"
              >
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="correspondent"
                class-name="valiTableStyle"
                label="通讯作者">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="included"
                class-name="valiTableStyle"
                label="是否SCI收录">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="influence"
                class-name="valiTableStyle"
                label="影响因子">
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <br>
        <el-row >
          <br>
          <el-col :span="8" :offset="2">
            <el-form-item label="离院时间:"  >
              {{operailityData.leaveDate}}
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="2">
            <el-form-item label="毕业去向:" prop="whereabouts" >
              {{operailityData.whereabouts}}
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="2">
            <el-form-item label="是否三甲医院:" >
              {{operailityData.isThree?'是':'否'}}
            </el-form-item>
          </el-col>
        </el-row >
        <el-row >
          <el-col :span="18" :offset="2">
            <el-form-item label="附件:" prop="notice">
              <upload-file :show="true" :uploadFiles="operailityData.fileList" ></upload-file>
            </el-form-item>
          </el-col>
        </el-row >

        <el-row >
          <el-col :span="8" :offset="2">
            <el-form-item label="状态:" >
              {{operailityData.status | typeText}}
            </el-form-item>
          </el-col>
        </el-row >

        <!--审核列表-->

      </fieldset>
    </el-form>
  </div>
</template>
<script>
  //当前组件引入全局的util
  let Util=null;
  export default {
    props:['operailityData','view'],
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

