<!--请假条 修改-->
<template>
  <div >
    <el-form :model="formValidate1"  ref="formValidate" :rules="rules"   class="demo-form-inline"  label-width="100px" >
       <el-row >
        <el-col :span="20" :offset="2">
          <el-form-item label="科室ID" prop="depId">
            <el-input v-model="formValidate1.depId"></el-input>
          </el-form-item>
        </el-col >
      </el-row >
       <el-row >
        <el-col :span="20" :offset="2">
          <el-form-item label="请假人ID" prop="applicantId">
            <el-input v-model="formValidate1.applicantId"></el-input>
          </el-form-item>
        </el-col >
      </el-row >
       <el-row >
        <el-col :span="20" :offset="2">
          <el-form-item label="请假类型（枚举：SHI.事假、BING.病假、SANG.丧假、CHAN产假、TAN探亲假、HUN婚假、OTHER其他...）" prop="leaveType">
            <el-input v-model="formValidate1.leaveType"></el-input>
          </el-form-item>
        </el-col >
      </el-row >
      	<el-row >
         <el-col :span="20" :offset="2">
          <el-form-item label="开始时间">
            <el-date-picker  prop="beginDate"
              v-model="formValidate1.beginDate"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions0"
              @change="handleStartTime">
            </el-date-picker>
          </el-form-item>
        </el-col>
       </el-row >
      	<el-row >
         <el-col :span="20" :offset="2">
          <el-form-item label="结束时间">
            <el-date-picker  prop="endDate"
              v-model="formValidate1.endDate"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions0"
              @change="handleStartTime">
            </el-date-picker>
          </el-form-item>
        </el-col>
       </el-row >
       <el-row >
        <el-col :span="20" :offset="2">
          <el-form-item label="小时" prop="timeLength">
            <el-input v-model="formValidate1.timeLength"></el-input>
          </el-form-item>
        </el-col >
      </el-row >
       <el-row >
        <el-col :span="20" :offset="2">
          <el-form-item label="请假事由" prop="explains">
             <el-input type="textarea" resize="none" :rows="5" v-model="formValidate1.explains"></el-input>
          </el-form-item>
        </el-col >
      </el-row >
       <el-row >
        <el-col :span="20" :offset="2">
          <el-form-item label="WSB.未上报、DSH.审核中(待审)、TG.通过、BTG.不通过、BH.驳回修改" prop="status">
            <el-input v-model="formValidate1.status"></el-input>
          </el-form-item>
        </el-col >
      </el-row >
       <el-row >
        <el-col :span="20" :offset="2">
          <el-form-item label="创建时间" prop="createTime">
            <el-input v-model="formValidate1.createTime"></el-input>
          </el-form-item>
        </el-col >
      </el-row >
       <el-row >
        <el-col :span="20" :offset="2">
          <el-form-item label="修改时间" prop="updateTime">
            <el-input v-model="formValidate1.updateTime"></el-input>
          </el-form-item>
        </el-col >
      </el-row >
       <el-row >
        <el-col :span="20" :offset="2">
          <el-form-item label="0.没有，1有" prop="isAttachment">
            <el-input v-model="formValidate1.isAttachment"></el-input>
          </el-form-item>
        </el-col >
      </el-row >
       <el-row >
        <el-col :span="20" :offset="2">
          <el-form-item label="SXS实习生、YJS研究生、ZYY住院医、JXS进修生" prop="userType">
            <el-input v-model="formValidate1.userType"></el-input>
          </el-form-item>
        </el-col >
      </el-row >
       <el-row >
        <el-col :span="20" :offset="2">
          <el-form-item label="0未删除，1删除" prop="isDelete">
            <el-input v-model="formValidate1.isDelete"></el-input>
          </el-form-item>
        </el-col >
      </el-row >
    </el-form>
    <el-row >
      <el-col :span="8" :offset="16">
        <el-button type="primary" @click="confirm" >提交</el-button>
        <el-button  >取消</el-button>
      </el-col>
    </el-row >
  </div>
</template>
<script>
  export default {
    props: ['editData'],
    data (){
      return{
        countDate:0,
        options:[{
          value: '0',
          label: '待审核'
        }, {
          value: '1',
          label: '审核通过'
        }, {
          value: '2',
          label: '未审核'
        }],
        radio2:2,
        formValidate: {
          status:'',
        },
        rules: {
         	applicantId:[
         	{ required: true, message: '请假人ID不能为空', trigger: 'blur' }
         	],
         	explains:[
         	{ max: 200, message: '长度最多200个字符', trigger: 'blur' }
         	],
        },
         formValidate1:{
         	depId:'',
         	applicantId:'',
         	leaveType:'',
         	beginDate:'',
         	endDate:'',
         	timeLength:'',
         	explains:'',
         	status:'',
         	createTime:'',
         	updateTime:'',
         	isAttachment:'',
         	userType:'',
         	isDelete:''
         },
        starTimes:'',
        endTimes:'',
        pickerOptions0: {
          //选择开始时间后设置结束日期的限制
          disabledDate:(time)=> {
            if(this.endTimes!="") {
              return time.getTime() >= this.endTimes;
            }
          }
        },
        pickerOptions1: {
          //选择结束时间后设置开始日期的限制
          disabledDate:(time)=> {
            if(this.starTimes!="") {
              return time.getTime() <= this.starTimes;
            }
          }
        },
        value1:'',
        value2:'',
        ruleValidate:{}
      }
    },
    methods:{
      deformatterDate(d){
        return new Date(d).getTime()-1000*60*60*24;
      },
      handleStartTime(d){
        this.starTimes = this.deformatterDate(d);
      },
      handleEndTime(d){
        this.endTimes = this.deformatterDate(d);
      },
      confirm(){
        alert(this.editData)
      },
      newspapers(){
        alert('上报 ')
      }
    }
  }
</script>
