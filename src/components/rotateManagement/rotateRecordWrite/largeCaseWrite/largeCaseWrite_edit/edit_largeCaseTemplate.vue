<!----------------------------------
****-- 大病历模板
****--@date     2017/7/4
****--@author   gx
----------------------------------->
<template>
    <div>
      <el-form :model="formValidate" ref="formValidate" :rules="largeCaseTemplate" class="demo-form-inline" label-width="130px" >
        <!--<el-button style="float: right" type="primary" @click="templateFilling">填充模板</el-button>-->
        <div  style="font-size: 24px;text-align: center; height: 60px;">入院病例</div>
        <el-row class="table-back-one">
          <el-col :span="6" >
            <el-form-item label="姓名:" prop="cname" >
              <el-input v-model="formValidate.cname" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6" >
            <el-form-item label="性别:" prop="csex" >
              <el-radio class="radio" v-model="formValidate.csex" label="男"></el-radio>
              <el-radio class="radio" v-model="formValidate.csex" label="女"></el-radio>
            </el-form-item>
          </el-col >

          <el-col :span="6" >
            <el-form-item label="年龄:" prop="cage" >
              <el-input v-model="formValidate.cage" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col >

          <el-col :span="6" >
            <el-form-item label="婚否:" prop="cisMarry" >
              <el-radio class="radio" v-model="formValidate.cisMarry" label="YES">已婚</el-radio>
              <el-radio class="radio" v-model="formValidate.cisMarry" label="NO">未婚</el-radio>
            </el-form-item>
          </el-col >

        </el-row >

        <el-row class="table-back-two" >
          <el-col :span="6" >
            <el-form-item label="民族:" prop="cnation" >
              <el-select v-model="formValidate.cnation"  style="width:166px" filterable placeholder="请选择">
                <el-option
                  v-for="item in dictionary.nation"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6" >
            <el-form-item label="职业:" prop="czhiye" >
              <el-input v-model="formValidate.czhiye" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col >

          <el-col :span="6" >
            <el-form-item label="住址:" prop="caddress" >
              <el-input v-model="formValidate.caddress" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col >

          <el-col :span="6" >
            <el-form-item label="出生地:" prop="cbirthPlace" >
              <el-input v-model="formValidate.cbirthPlace" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col >
        </el-row >

        <el-row class="table-back-one">
          <el-col :span="6" >
            <el-form-item label="床号:" prop="cbedNo" >
              <el-input v-model="formValidate.cbedNo" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6" >
            <el-form-item label="住院号:" prop="czyNo" >
              <el-input v-model="formValidate.czyNo" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col >

          <el-col :span="12" >
            <el-form-item label="病区:" prop="clesion" >
              <el-input v-model="formValidate.clesion" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col >
        </el-row >

        <el-row class="table-back-two">
          <el-col :span="6" >
            <el-form-item label="入院日期:" prop="cruyuanDate" >
              <el-date-picker
                :editable="false"
                v-model="formValidate.cruyuanDate"
                type="date"
                style="width:166px"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="6" >
            <el-form-item label="记录日期:" prop="cjlDate" >
              <el-date-picker
                style="width:166px"
                v-model="formValidate.cjlDate"
                type="date"
                :editable="false"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col >

          <el-col :span="6" >
            <el-form-item label="病史陈述者:" prop="cbscsz" >
              <el-input v-model="formValidate.cbscsz" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col >
          <el-col :span="6" >
            <el-form-item label="与患者关系:" prop="chuanzheUser" >
              <el-input v-model="formValidate.chuanzheUser" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col >
        </el-row >

        <el-row class="table-back-one">
          <el-col :span="6" >
            <el-form-item label="科室:" prop="cdepName" >
              {{formValidate.cdepName}}
            </el-form-item>
          </el-col>

          <el-col :span="6" >
            <el-form-item label="住院医师:" prop="phone" >
              {{name}}
            </el-form-item>
          </el-col >
        </el-row >

        <el-row class="table-back-two">
          <el-col :span="24" >
            <el-form-item label="主诉:" prop="czs" >
              <el-input type="textarea" v-model="formValidate.czs"></el-input>
            </el-form-item>
          </el-col>
        </el-row >

        <el-row class="table-back-one">
          <el-col :span="24" >
            <el-form-item label="现病史:" prop="cxbs" >
              <el-input type="textarea" v-model="formValidate.cxbs"></el-input>
            </el-form-item>
          </el-col>
        </el-row >

        <el-row >
          <el-col :span="24" >
            <el-collapse v-model="activeNames" >
              <!---->
              <el-collapse-item title="既往史" name="1">
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="平时一般健康情况:" prop="cjwsYbjkqk" >
                      <el-input @keyup.native="keyup('cjwsYbjkqk',$event)" type="textarea" v-model="formValidate.cjwsYbjkqk"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="传染病史:" prop="cjwsCrbs" >
                      <el-input @keyup.native="keyup('cjwsCrbs',$event)" type="textarea" v-model="formValidate.cjwsCrbs"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="手术外伤史:" prop="cjwsSswss" >
                      <el-input @keyup.native="keyup('cjwsSswss',$event)" type="textarea" v-model="formValidate.cjwsSswss"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="药物过敏史:" prop="cjwsYwgms" >
                      <el-input @keyup.native="keyup('cjwsYwgms',$event)" type="textarea" v-model="formValidate.cjwsYwgms"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-collapse-item>
              <!---->
              <el-collapse-item title="系统回顾" name="2">
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="呼吸系统:" prop="cxthgHxxt" >
                      <el-input @keyup.native="keyup('cxthgHxxt',$event)" type="textarea" v-model="formValidate.cxthgHxxt"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="循环系统:" prop="cxthgXuhxt" >
                      <el-input @keyup.native="keyup('cxthgXuhxt',$event)" type="textarea" v-model="formValidate.cxthgXuhxt"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="消化系统:" prop="cxthgXihxt" >
                      <el-input @keyup.native="keyup('cxthgXihxt',$event)" type="textarea" v-model="formValidate.cxthgXihxt"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="泌尿系统:" prop="cxthgMlxt" >
                      <el-input @keyup.native="keyup('cxthgMlxt',$event)" type="textarea" v-model="formValidate.cxthgMlxt"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="血液系统:" prop="cxthgXyxt" >
                      <el-input @keyup.native="keyup('cxthgXyxt',$event)" type="textarea" v-model="formValidate.cxthgXyxt"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="内分泌系统:" prop="cxthgNfmxt" >
                      <el-input @keyup.native="keyup('cxthgNfmxt',$event)" type="textarea" v-model="formValidate.cxthgNfmxt"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="神经系统:" prop="cxthgSjxt1" >
                      <el-input @keyup.native="keyup('cxthgSjxt1',$event)" type="textarea" v-model="formValidate.cxthgSjxt1"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="生殖系统:" prop="cxthgSzxt" >
                      <el-input @keyup.native="keyup('cxthgSzxt',$event)" type="textarea" v-model="formValidate.cxthgSzxt"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="肌肉骨关节系统:" prop="cxthgGgjxt" >
                      <el-input @keyup.native="keyup('cxthgGgjxt',$event)" type="textarea" v-model="formValidate.cxthgGgjxt"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="个人史:" prop="cxthgGrs" >
                      <el-input @keyup.native="keyup('cxthgGrs',$event)" type="textarea" v-model="formValidate.cxthgGrs"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="月经婚育史:" prop="cxthgYjhys" >
                      <el-input @keyup.native="keyup('cxthgYjhys',$event)" type="textarea" v-model="formValidate.cxthgYjhys"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="家庭史:" prop="cxthgJts" >
                      <el-input @keyup.native="keyup('cxthgJts',$event)" type="textarea" v-model="formValidate.cxthgJts"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-collapse-item>
              <!---->
              <el-collapse-item title=" 体格检查" name="3">
                <el-row >
                  <el-col :span="24">
                    <el-form-item label="生命体征:"  >
                      <el-row >
                        <el-col :span="3">
                          <el-form-item label="T:" prop="ctgjcSmtzT" label-width="50px">
                            <el-input @keyup.native="keyup('ctgjcSmtzT',$event)" style="width:100px;"  v-model="formValidate.ctgjcSmtzT"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="3">
                          <el-form-item label="C:" prop="ctgjcSmtzC" label-width="50px">
                            <el-input @keyup.native="keyup('ctgjcSmtzC',$event)" style="width:100px;"  v-model="formValidate.ctgjcSmtzC"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="3">
                          <el-form-item label="P:" prop="ctgjcSmtzP" label-width="50px">
                            <el-input  @keyup.native="keyup('ctgjcSmtzP',$event)" style="width:100px;"  v-model="formValidate.ctgjcSmtzP"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="3">
                          <el-form-item label="	次/分:" prop="ctgjcSmtzCf1" label-width="50px">
                            <el-input @keyup.native="keyup('ctgjcSmtzCf1',$event)" style="width:100px;"  v-model="formValidate.ctgjcSmtzCf1"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="3">
                          <el-form-item label="R:" prop="ctgjcSmtzR" label-width="50px">
                            <el-input @keyup.native="keyup('ctgjcSmtzR',$event)" style="width:100px;"  v-model="formValidate.ctgjcSmtzR"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="3">
                          <el-form-item label="	次/分:" prop="ctgjcSmtzCf2" label-width="50px">
                            <el-input @keyup.native="keyup('ctgjcSmtzCf2',$event)" style="width:100px;"  v-model="formValidate.ctgjcSmtzCf2"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="3">
                          <el-form-item label="BP:" prop="ctgjcSmtzBp" label-width="50px">
                            <el-input @keyup.native="keyup('ctgjcSmtzBp',$event)" style="width:100px;"  v-model="formValidate.ctgjcSmtzBp"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="3">
                          mmHg(kPa)
                        </el-col>
                      </el-row>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="一般情况:" prop="ctgjcYbqk1" >
                      <el-input @keyup.native="keyup('ctgjcYbqk1',$event)" type="textarea" v-model="formValidate.ctgjcYbqk1"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="皮肤粘膜:" prop="ctgjcPfnm" >
                      <el-input @keyup.native="keyup('ctgjcPfnm',$event)" type="textarea" v-model="formValidate.ctgjcPfnm"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="浅表淋巴结:" prop="ctgjcQblbj" >
                      <el-input @keyup.native="keyup('ctgjcQblbj',$event)" type="textarea" v-model="formValidate.ctgjcQblbj"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="头部及其器官:" prop="ctgjcTbqg" >
                      <el-input @keyup.native="keyup('ctgjcTbqg',$event)" type="textarea" v-model="formValidate.ctgjcTbqg"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="颈部:" prop="ctgjcJb" >
                      <el-input @keyup.native="keyup('ctgjcJb',$event)" type="textarea" v-model="formValidate.ctgjcJb"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="胸部:" prop="ctgjcXb" >
                      <el-input @keyup.native="keyup('ctgjcXb',$event)" type="textarea" v-model="formValidate.ctgjcXb"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="胸廊:" prop="ctgjcXl" >
                      <el-input @keyup.native="keyup('ctgjcXl',$event)" type="textarea" v-model="formValidate.ctgjcXl"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="乳腺:" prop="ctgjcRx" >
                      <el-input @keyup.native="keyup('ctgjcRx',$event)" type="textarea" v-model="formValidate.ctgjcRx"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="肺:" prop="ctgjcFei" >
                      <el-input @keyup.native="keyup('ctgjcFei',$event)" type="textarea" v-model="formValidate.ctgjcFei"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="视诊:" prop="ctgjcSz1" >
                      <el-input @keyup.native="keyup('ctgjcSz1',$event)" type="textarea" v-model="formValidate.ctgjcSz1"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="触诊:" prop="ctgjcCz1" >
                      <el-input @keyup.native="keyup('ctgjcCz1',$event)" type="textarea" v-model="formValidate.ctgjcCz1"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="叩诊:" prop="ctgjcKz1" >
                      <el-input @keyup.native="keyup('ctgjcKz1',$event)" type="textarea" v-model="formValidate.ctgjcKz1"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="听诊:" prop="ctgjcTz1" >
                      <el-input @keyup.native="keyup('ctgjcTz1',$event)" type="textarea" v-model="formValidate.ctgjcTz1"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="心脏:" prop="ctgjcXz" >
                      <el-input @keyup.native="keyup('ctgjcXz',$event)" type="textarea" v-model="formValidate.ctgjcXz"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="视诊:" prop="ctgjcSz2" >
                      <el-input @keyup.native="keyup('ctgjcSz2',$event)" type="textarea" v-model="formValidate.ctgjcSz2"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="触诊:" prop="ctgjcCz2" >
                      <el-input @keyup.native="keyup('ctgjcCz2',$event)" type="textarea" v-model="formValidate.ctgjcCz2"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp;   叩诊：心脏相对浊音界如下况：
                <el-row>
                  <el-col :span="3" :offset="2">
                    <div style="text-align: center">右(Cm)</div>
                  </el-col>
                  <el-col  style="text-align: center" :span="3" :offset="2">
                    <div>肋间</div>
                  </el-col>
                  <el-col :span="3" :offset="2">
                    <div  style="text-align: center">左(Cm)</div>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="3" :offset="2">
                    <el-form-item label-width="0" prop="ctgjcKzy1" >
                      <el-input @keyup.native="keyup('ctgjcKzy1',$event)"  v-model="formValidate.ctgjcKzy1"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col  style="text-align: center" :span="3" :offset="2">
                    <div>II</div>
                  </el-col>
                  <el-col :span="3" :offset="2">
                    <el-form-item label-width="0" prop="ctgjcKzz1" >
                      <el-input @keyup.native="keyup('ctgjcKzz1',$event)"  v-model="formValidate.ctgjcKzz1"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="3" :offset="2">
                    <el-form-item label-width="0" prop="ctgjcKzy2" >
                      <el-input  @keyup.native="keyup('ctgjcKzy2',$event)" v-model="formValidate.ctgjcKzy2"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col  style="text-align: center" :span="3" :offset="2">
                    <div>III</div>
                  </el-col>
                  <el-col :span="3" :offset="2">
                    <el-form-item  prop="ctgjcKzz2" label-width="0">
                      <el-input @keyup.native="keyup('ctgjcKzz2',$event)"  v-model="formValidate.ctgjcKzz2"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="3" :offset="2">
                    <el-form-item  prop="ctgjcKzy3" label-width="0">
                      <el-input @keyup.native="keyup('ctgjcKzy3',$event)"  v-model="formValidate.ctgjcKzy3"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col  style="text-align: center" :span="3" :offset="2">
                    <div>IV</div>
                  </el-col>
                  <el-col :span="3" :offset="2">
                    <el-form-item  prop="ctgjcKzz3" label-width="0">
                      <el-input  @keyup.native="keyup('ctgjcKzz3',$event)" v-model="formValidate.ctgjcKzz3"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="3" :offset="2">
                    <el-form-item  prop="ctgjcKzy4" label-width="0">
                      <el-input @keyup.native="keyup('ctgjcKzy4',$event)"  v-model="formValidate.ctgjcKzy4"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col  style="text-align: center" :span="3" :offset="2">
                    <div>V</div>
                  </el-col>
                  <el-col :span="3" :offset="2">
                    <el-form-item  prop="ctgjcKzz4" label-width="0">
                      <el-input @keyup.native="keyup('ctgjcKzz4',$event)"  v-model="formValidate.ctgjcKzz4"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="听诊:" prop="ctgjcTz2" >
                      <el-input @keyup.native="keyup('ctgjcTz2',$event)" type="textarea" v-model="formValidate.ctgjcTz2"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="桡动脉:" prop="ctgjcRdm" >
                      <el-input @keyup.native="keyup('ctgjcRdm',$event)" type="textarea" v-model="formValidate.ctgjcRdm"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="周围血管征:" prop="ctgjcZwxg">
                      <el-input @keyup.native="keyup('ctgjcZwxg',$event)" type="textarea" v-model="formValidate.ctgjcZwxg"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="腹部:" prop="ctgjcFb" >
                      <el-input @keyup.native="keyup('ctgjcFb',$event)" type="textarea" v-model="formValidate.ctgjcFb"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="视诊:" prop="ctgjcSz3" >
                      <el-input @keyup.native="keyup('ctgjcSz3',$event)" type="textarea" v-model="formValidate.ctgjcSz3"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="触诊:" prop="ctgjcCz3" >
                      <el-input @keyup.native="keyup('ctgjcCz3',$event)" type="textarea" v-model="formValidate.ctgjcCz3"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="一般情况:" prop="ctgjcYbqk2" >
                      <el-input  @keyup.native="keyup('ctgjcYbqk2',$event)" type="textarea" v-model="formValidate.ctgjcYbqk2"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="肝脏:" prop="ctgjcGz" >
                      <el-input @keyup.native="keyup('ctgjcGz',$event)" type="textarea" v-model="formValidate.ctgjcGz"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="脾脏:" prop="ctgjcPz" >
                      <el-input @keyup.native="keyup('ctgjcPz',$event)" type="textarea" v-model="formValidate.ctgjcPz"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="肾脏:" prop="ctgjcSz" >
                      <el-input @keyup.native="keyup('ctgjcSz',$event)" type="textarea" v-model="formValidate.ctgjcSz"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="其他:" prop="ctgjcQt" >
                      <el-input @keyup.native="keyup('ctgjcQt',$event)" type="textarea" v-model="formValidate.ctgjcQt"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="叩诊:" prop="ctgjcKz3" >
                      <el-input @keyup.native="keyup('ctgjcKz3',$event)" type="textarea" v-model="formValidate.ctgjcKz3"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="听诊:" prop="ctgjcTz3" >
                      <el-input @keyup.native="keyup('ctgjcTz3',$event)" type="textarea" v-model="formValidate.ctgjcTz3"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="肛门、直肠:" prop="ctgjcGzc" >
                      <el-input @keyup.native="keyup('ctgjcGzc',$event)" type="textarea" v-model="formValidate.ctgjcGzc"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="外生殖器:" prop="ctgjcWszq" >
                      <el-input @keyup.native="keyup('ctgjcWszq',$event)" type="textarea" v-model="formValidate.ctgjcWszq"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="脊柱:" prop="ctgjcJz" >
                      <el-input @keyup.native="keyup('ctgjcJz',$event)" type="textarea" v-model="formValidate.ctgjcJz"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="四肢:" prop="ctgjcShiz" >
                      <el-input @keyup.native="keyup('ctgjcShiz',$event)" type="textarea" v-model="formValidate.ctgjcShiz"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="神经系统:" prop="ctgjcSjxt2" >
                      <el-input @keyup.native="keyup('ctgjcSjxt2',$event)" type="textarea" v-model="formValidate.ctgjcSjxt2"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="专科情况:" prop="ctgjcZkqk" >
                      <el-input @keyup.native="keyup('ctgjcZkqk',$event)" type="textarea" v-model="formValidate.ctgjcZkqk"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="实验室及特殊检查:" prop="ctgjcSysjc" >
                      <el-input @keyup.native="keyup('ctgjcSysjc',$event)" type="textarea" v-model="formValidate.ctgjcSysjc"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-collapse-item>
            </el-collapse>
          </el-col>
        </el-row >

        <el-row class="table-back-one">
          <el-col :span="24" >
            <el-form-item label="病例摘要:" prop="cblzy" >
              <el-input type="textarea" v-model="formValidate.cblzy"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="table-back-two">
          <el-col :span="24" >
            <el-form-item label="初步诊断:" prop="ccbzd" >
              <el-input type="textarea" v-model="formValidate.ccbzd"></el-input>
            </el-form-item>

          </el-col>
          <el-col :span="5" :offset="1">
            <el-form-item label="医师签名:" prop="cysqm1" >
              <el-input  v-model="formValidate.cysqm1"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5" >
            <el-form-item label="时间:" prop="cysqm1Date" label-width="70px">
              <el-date-picker
                :editable="false"
                v-model="formValidate.cysqm1Date"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="table-back-one">
          <el-col :span="24" >
            <el-form-item label="入院诊断:" prop="cryzd" >
              <el-input type="textarea" v-model="formValidate.cryzd"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5" :offset="1">
            <el-form-item label="医师签名:" prop="cysqm2" >
              <el-input  v-model="formValidate.cysqm2"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5" >
            <el-form-item label-width="70px" label="时间:" prop="cysqm2Date" >
              <el-date-picker
                :editable="false"
                v-model="formValidate.cysqm2Date"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="table-back-two-d">
          <el-col :span="10" >
            <el-form-item label="相关资料:" >
             <upload-file  :uploadFiles="formValidate.fileList"   @setUploadFiles="expenseFileEvent"></upload-file>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      </br>
      <div style="margin-left: 100px">
        <load-btn @saveSubEvent="saveSubEvent" :btnData="saveBtn"></load-btn>
        <load-btn @appearSubEvent="appearSubEvent" :btnData="loadBtn"></load-btn>
        <el-button  @click="cancel">取消</el-button>
      </div>
    </div>
</template>
<script>
    /*当前组件必要引入*/
    import {largeCaseTemplate} from '../../../rules'
    //当前组件引入全局的util
    //前台业务字典组件引入
    import dictionary from '../../../../../libs/dictionary.js';
    let Util = null;
    export default{
        props:['operailityData','url','podId'],
        data() {
            return {
              largeCaseTemplate,
              saveBtn: {title: '提交', callParEvent: 'saveSubEvent'},
              loadBtn: {title: '上报', callParEvent: 'appearSubEvent'},
              name: '',
              activeNames: [],
              dictionary: dictionary,
              formValidate: {
                /*"caseId": '',
//                "ctype": "DBL 大病例 MJJL 麻醉记录 YXZL 影像资料",
                "cname": "姓名",
                "csex": "男",
                "cage": "13",
                "cisMarry": "YES",
                "cnation": "汉族",
                "czhiye": "职业",
                "caddress": "住址",
                "cbirthPlace": "出生地",
                "cbedNo": "床号",
                "czyNo": "住院号",
                "clesion": "病区",
                "cruyuanDate": "2012-02-01",
                "cjlDate": "2012-02-01",
                "cbscsz": "病史陈述者",
                "chuanzheUser": "与患者关系",
                "cdepId": this.depId,
                "cdepName": this.depName,
                "cpodId": this.podId,
                "czs": "主诉",
                "cxbs": "现病史",
                "cjwsYbjkqk": "平时一般健康情况",
                "cjwsCrbs": "传染病史",
                "cjwsSswss": "手术外伤史",
                "cjwsYwgms": "药物过敏史",
                "cxthgHxxt": "呼吸系统",
                "cxthgXuhxt": "循环系统",
                "cxthgXihxt": "消化系统",
                "cxthgMlxt": "泌尿系统",
                "cxthgXyxt": "血液系统",
                "cxthgNfmxt": "内分泌系统",
                "cxthgSjxt1": "神经系统",
                "cxthgSzxt": "生殖系统",
                "cxthgGgjxt": "肌肉骨关节系统",
                "cxthgGrs": "个人史",
                "cxthgYjhys": "月经婚育史",
                "cxthgJts": "家庭史",
                "ctgjcSmtzT": "生命体征T",
                "ctgjcSmtzC": "生命体征C",
                "ctgjcSmtzP": "生命体征P",
                "ctgjcSmtzCf1": "生命特征 次/分",
                "ctgjcSmtzR": "生命体征R",
                "ctgjcSmtzCf2": "生命特征 次/分2",
                "ctgjcSmtzBp": "生命特征bp",
                "ctgjcYbqk1": "一般情况",
                "ctgjcPfnm": "皮肤粘膜",
                "ctgjcQblbj": "浅表淋巴结",
                "ctgjcTbqg": "头部及其器官",
                "ctgjcJb": "颈部",
                "ctgjcXb": "胸部",
                "ctgjcXl": "胸廊",
                "ctgjcRx": "乳腺",
                "ctgjcFei": "肺",
                "ctgjcSz1": "视诊",
                "ctgjcCz1": "触诊",
                "ctgjcKz1": "叩诊",
                "ctgjcTz1": "听诊",
                "ctgjcXz": "心脏",
                "ctgjcSz2": "视诊",
                "ctgjcCz2": "触诊",
                "ctgjcKzy1": "叩右1",
                "ctgjcKzy2": "叩右2",
                "ctgjcKzy3": "叩右3",
                "ctgjcKzy4": "叩右4",
                "ctgjcKzz1": "叩左1",
                "ctgjcKzz2": "叩左2",
                "ctgjcKzz3": "叩左3",
                "ctgjcKzz4": "叩左4",
                "ctgjcTz2": "听诊",
                "ctgjcRdm": "桡动脉",
                "ctgjcZwxg": "周围血管征",
                "ctgjcFb": "腹部",
                "ctgjcSz3": "视诊",
                "ctgjcCz3": "触诊",
                "ctgjcYbqk2": "一般情况",
                "ctgjcGz": "肝脏",
                "ctgjcPz": "脾脏",
                "ctgjcSz": "肾脏",
                "ctgjcQt": "其他",
                "ctgjcKz3": "叩诊",
                "ctgjcTz3": "听诊",
                "ctgjcGzc": "肛门、直肠",
                "ctgjcWszq": "外生殖器",
                "ctgjcJz": "脊柱",
                "ctgjcShiz": "四肢",
                "ctgjcSjxt2": "神经系统",
                "ctgjcZkqk": "专科情况",
                "ctgjcSysjc": "实验室及特殊检查",
                "cblzy": "病例摘要",
                "ccbzd": "初步诊断",
                "cysqm1": "医师签名",
                "cysqm1Date": "2012-02-01",
                "cryzd": "入院诊断",
                "cysqm2": "医师签名1",
                "cysqm2Date": "2012-02-01",
                "copyField": [
                  {
                    "fieldName": "cjwsYbjkqk",
                    "isCopy": 0
                  },
                  {
                    "fieldName": "cjwsCrbs",
                    "isCopy": 0
                  },
                  {
                    "fieldName": "cjwsSswss",
                    "isCopy": 0
                  },
                  {
                    "fieldName": "cjwsYwgms",
                    "isCopy": 0
                  },
                  {
                    "fieldName": "cxthgHxxt",
                    "isCopy": 0
                  },
                  {
                    "fieldName": "cxthgXuhxt",
                    "isCopy": 0
                  },
                  {
                    "fieldName": "cxthgXihxt",
                    "isCopy": 0
                  },
                  {
                    "fieldName": "cxthgMlxt",
                    "isCopy": 0
                  },
                  {
                    "fieldName": "cxthgXyxt",
                    "isCopy": 0
                  },
                  {
                    "fieldName": "cxthgNfmxt",
                    "isCopy": 0
                  },
                  {
                    "fieldName": "cxthgSjxt1",
                    "isCopy": 0
                  },
                  {
                    "fieldName": "cxthgSzxt",
                    "isCopy": 0
                  },
                  {
                    "fieldName": "cxthgGgjxt",
                    "isCopy": 0
                  },
                  {
                    "fieldName": "cxthgGrs",
                    "isCopy": 0
                  },
                  {
                    "fieldName": "cxthgYjhys",
                    "isCopy": 0
                  },
                  {
                    "fieldName": "cxthgJts",
                    "isCopy": 0
                  },
                  {
                    "fieldName": "ctgjcSmtzT",
                    "isCopy": 0
                  },
                  {
                    "fieldName": "ctgjcSmtzC",
                    "isCopy": 0
                  },
                  {
                    "fieldName": "ctgjcSmtzP",
                    "isCopy": 0
                  },
                  {
                    "fieldName": "ctgjcSmtzCf1",
                    "isCopy": 0
                  },
                  {
                    "fieldName": "ctgjcSmtzR",
                    "isCopy": 0
                  },
                  {
                    "fieldName": "ctgjcSmtzCf2",
                    "isCopy": 0
                  },
                  {
                    "fieldName": "ctgjcSmtzBp",
                    "isCopy": 0
                  },
                  {
                    "fieldName": "ctgjcYbqk1",
                    "isCopy": 0
                  },
                  {
                    "fieldName": "ctgjcPfnm",
                    "isCopy": 0
                  },
                  {
                    "fieldName": "ctgjcQblbj",
                    "isCopy": 0
                  },
                  {
                    "fieldName": "ctgjcTbqg",
                    "isCopy": 0
                  },
                  {
                    "fieldName": "ctgjcJb",
                    "isCopy": 0
                  },
                  {
                    "fieldName": "ctgjcXb",
                    "isCopy": 0
                  },
                  {
                    "fieldName": "ctgjcXl",
                    "isCopy": 0
                  },
                  {
                    "fieldName": "ctgjcRx",
                    "isCopy": 0
                  },
                  {
                    "fieldName": "ctgjcFei",
                    "isCopy": 0
                  },
                  {
                    "fieldName": "ctgjcSz1",
                    "isCopy": 0
                  },
                  {
                    "fieldName": "ctgjcCz1",
                    "isCopy": 0
                  },
                  {
                    "fieldName": "ctgjcKz1",
                    "isCopy": 0
                  },
                  {
                    "fieldName": "ctgjcTz1",
                    "isCopy": 0
                  },
                  {
                    "fieldName": "ctgjcXz",
                    "isCopy": 0
                  },
                  {
                    "fieldName": "ctgjcSz2",
                    "isCopy": 0
                  },
                  {
                    "fieldName": "ctgjcCz2",
                    "isCopy": 0
                  },
                  {
                    "fieldName": "ctgjcKzy1",
                    "isCopy": 0
                  },
                  {
                    "fieldName": "ctgjcKzy2",
                    "isCopy": 0
                  },
                  {
                    "fieldName": "ctgjcKzy3",
                    "isCopy": 0
                  },
                  {
                    "fieldName": "ctgjcKzy4",
                    "isCopy": 0
                  },
                  {
                    "fieldName": "ctgjcKzz1",
                    "isCopy": 0
                  },
                  {
                    "fieldName": "ctgjcKzz2",
                    "isCopy": 0
                  },
                  {
                    "fieldName": "ctgjcKzz3",
                    "isCopy": 0
                  },
                  {
                    "fieldName": "ctgjcKzz4",
                    "isCopy": 0
                  },
                  {
                    "fieldName": "ctgjcTz2",
                    "isCopy": 0
                  },
                  {
                    "fieldName": "ctgjcRdm",
                    "isCopy": 0
                  },
                  {
                    "fieldName": "ctgjcZwxg",
                    "isCopy": 0
                  },
                  {
                    "fieldName": "ctgjcFb",
                    "isCopy": 0
                  },
                  {
                    "fieldName": "ctgjcSz3",
                    "isCopy": 0
                  },
                  {
                    "fieldName": "ctgjcCz3",
                    "isCopy": 0
                  },
                  {
                    "fieldName": "ctgjcYbqk2",
                    "isCopy": 0
                  },
                  {
                    "fieldName": "ctgjcGz",
                    "isCopy": 0
                  },
                  {
                    "fieldName": "ctgjcPz",
                    "isCopy": 0
                  },
                  {
                    "fieldName": "ctgjcSz",
                    "isCopy": 0
                  },
                  {
                    "fieldName": "ctgjcQt",
                    "isCopy": 0
                  },
                  {
                    "fieldName": "ctgjcKz3",
                    "isCopy": 0
                  },
                  {
                    "fieldName": "ctgjcTz3",
                    "isCopy": 0
                  },
                  {
                    "fieldName": "ctgjcGzc",
                    "isCopy": 0
                  },
                  {
                    "fieldName": "ctgjcWszq",
                    "isCopy": 0
                  },
                  {
                    "fieldName": "ctgjcJz",
                    "isCopy": 0
                  },
                  {
                    "fieldName": "ctgjcShiz",
                    "isCopy": 0
                  },
                  {
                    "fieldName": "ctgjcSjxt2",
                    "isCopy": 0
                  },
                  {
                    "fieldName": "ctgjcZkqk",
                    "isCopy": 0
                  },
                  {
                    "fieldName": "ctgjcSysjc",
                    "isCopy": 0
                  }
                ],
                "mapBigLog": {
                  "cname": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "cSex": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "cage": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "cisMarry": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "cnation": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "czhiye": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "caddress": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "cbirthPlace": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "cbedNo": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "czyNo": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "clesion": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "cruyuanDate": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "cjlDate": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "cbscsz": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "chuanzheUser": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "czs": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "cxbs": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "cjwsYbjkqk": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "cjwsCrbs": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "cjwsSswss": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "cjwsYwgms": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "cxthgHxxt": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "cxthgXuhxt": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "cxthgXihxt": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "cxthgMlxt": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "cxthgXyxt": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "cxthgNfmxt": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "cxthgSjxt1": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "cxthgSzxt": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "cxthgGgjxt": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "cxthgGrs": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "cxthgYjhys": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "cxthgJts": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "ctgjcSmtzT": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "ctgjcSmtzC": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "ctgjcSmtzP": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "ctgjcSmtzCf1": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "ctgjcSmtzR": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "ctgjcSmtzCf2": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "ctgjcSmtzBp": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "ctgjcYbqk1": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "ctgjcPfnm": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "ctgjcQblbj": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "ctgjcTbqg": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "ctgjcJb": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "ctgjcXb": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "ctgjcXl": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "ctgjcRx": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "ctgjcFei": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "ctgjcSz1": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "ctgjcCz1": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "ctgjcKz1": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "ctgjcTz1": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "ctgjcXz": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "ctgjcSz2": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "ctgjcCz2": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "ctgjcKzy1": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "ctgjcKzy2": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "ctgjcKzy3": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "ctgjcKzy4": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "ctgjcKzz1": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "ctgjcKzz2": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "ctgjcKzz3": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "ctgjcKzz4": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "ctgjcTz2": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "ctgjcRdm": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "ctgjcZwxg": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "ctgjcFb": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "ctgjcSz3": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "ctgjcCz3": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "ctgjcYbqk2": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "ctgjcGz": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "ctgjcPz": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "ctgjcSz": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "ctgjcQt": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "ctgjcKz3": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "ctgjcTz3": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "ctgjcGzc": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "ctgjcWszq": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "ctgjcJz": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "ctgjcShiz": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "ctgjcSjxt2": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "ctgjcZkqk": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "ctgjcSysjc": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "cblzy": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "ccbzd": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "cysqm1": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "cysqm1Date": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "cryzd": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "cysqm2": {
                    "bcValue": "",
                    "bcValueIng": ""
                  },
                  "cysqm2Date": {
                    "bcValue": "",
                    "bcValueIng": ""
                  }
                },
                "fileList": [
                  {
                    "id": 1,
                    "fileName": "123",
                    "fileType": "txt",
                    "fileUrl": "www.baidu.com"
                  }
                ],
                "review": [
                  {
                    "createUserName": "审核人",
                    "createTime": "审核时间",
                    "reviewMess": "审核意见",
                    "spState": "审核状态(PASS 通过 REJECT 驳回)"
                  }
                ],
                "copyBl": 0.8
*/              },
              template: {
                "czs": "反复四肢关节肿痛半年。",
                "cxbs": "患者自诉半年前无明显诱因出现双膝关节肿痛，持续性关节，关节活动受限，行走困难，逐渐波及双腕、双手掌指、近端指间关节、双肘、双肩关节，伴晨僵，持续时间大于1小时，无发热、畏寒，无皮疹、口腔溃疡、光过敏，无口干、眼干，无肌痛、肌无力，于私人诊所药物治疗及自服药物治疗（具体不详），关节疼痛反复发作并逐渐加重，现为系统诊治到我院就诊，门诊拟“类风湿关节炎”收入院。入院症见：双膝、双腕、双手掌指及近端指间、双肩关节疼痛，活动受限，行走困难，偶有咳嗽，痰粘难咳出，无发热、畏寒，无胸闷、心悸、气喘，纳寐欠佳，二便调。近2月体重下降约10余斤。",
                "cjwsYbjkqk": "既往体健。否认有“高血压”、“高血脂”、“糖尿病”、“冠心病”、“肝炎”、“结核”、“胃炎”等重大疾病史。",
                "cjwsCrbs": "否认”乙肝“、“结核”等重大传染病史。",
                "cjwsSswss": "否认重大外伤及手术史。",
                "cjwsYwgms": "否认药物及食物过敏史。",
                "cxthgHxxt": "无咳嗽、咯痰、呼吸困难、咯血、发热、盗汗。",
                "cxthgXuhxt": "无心悸、气促、咯血、发绀，无心前区痛、晕厥、水肿及高血压。",
                "cxthgXihxt": "无腹胀、腹痛、嗳气、反酸、呕血、便血。",
                "cxthgMlxt": "无尿频、尿急、尿痛、排尿不畅。尿色未见异常。",
                "cxthgXyxt": "无头晕、乏力，皮肤或粘膜瘀斑、紫癜、血肿，无反复鼻出血。",
                "cxthgNfmxt": "无畏寒、怕热、多汗、食欲异常、烦渴、多饮、多尿、头痛、视力障碍、肌肉震颤。",
                "cxthgSjxt1": "无头痛、失眠或意识障碍、昏厥、痉挛、瘫痪、视力障碍。",
                "cxthgSzxt": "未检。",
                "cxthgGgjxt": "无关节疼痛，活动障碍，无红肿、肢体麻木、痉挛、萎缩、瘫痪。",
                "cxthgGrs": "出生本地，居于本市，居住环境良好，无潮湿之弊，否认放射物、毒物、疫区等接触史。否认职业病史及病毒暴露史，无吸烟饮酒的嗜好，无精神创伤及冶游史。",
                "cxthgYjhys": "适龄结婚，子女及配偶体健。",
                "cxthgJts": "否认家族遗传病史、传染病史、精神病史。",
                "ctgjcSmtzT": "36.4",
                "ctgjcSmtzC": "",
                "ctgjcSmtzP": "75",
                "ctgjcSmtzCf1": "",
                "ctgjcSmtzR": "20",
                "ctgjcSmtzCf2": "",
                "ctgjcSmtzBp": "140/80",
                "ctgjcYbqk1": "神清，精神可，发育正常，营养中等，形体适中，正常面容。自动体位，查体合作。言语不利，语声有力，对答切题，呼吸均匀，无异常气味闻及。舌暗淡，苔薄白，脉沉滑。",
                "ctgjcPfnm": "全身皮肤黏膜未见明显黄染及出血点，未见肝掌、蜘蛛痣。皮肤弹性可。温度、湿度适中。",
                "ctgjcQblbj": "全身浅表淋巴结未触及肿大",
                "ctgjcTbqg": "头颅大小正常，无畸形，头发分布正常。眉毛、眼睑、结膜、眼球正常，双侧巩膜无黄染，瞳孔等大等圆2.5mm，双侧瞳孔对光反射未见异常。双耳外观未见异常，乳突无压痛，外耳道未见分泌物。鼻部外观未见异常，无鼻翼扇动，鼻旁窦无压痛，鼻腔无分泌物。唇，舌，牙齿，牙龈正常。咽部未见异常，声音正常。扁桃体未见肿大，表面未见分泌物。",
                "ctgjcJb": "颈软无抵抗，颈动脉脉搏正常，颈静脉无怒张，气管居中，肝-颈静脉回流征阴性，甲状腺无肿大。无血管杂音。",
                "ctgjcXb": "胸部",
                "ctgjcXl": "对称，未见明显畸形，无皮下气肿，无静脉怒张及回流异常，胸骨无压痛，胸廊挤压征阴性。呼吸活动一致。",
                "ctgjcRx": "未扪及包块",
                "ctgjcFei": "双侧呼吸运动均匀对称，无增强或者减弱。双肺触觉语颤对称无异常，未触及胸膜摩擦感，未触及皮下捻发感。双肺叩诊呈清音。双肺呼吸音清，未闻及干湿啰音及胸膜摩擦音。",
                "ctgjcSz1": "呼吸动度对称，节律规则，胸式呼吸为主。",
                "ctgjcCz1": "两侧语颤对等，无胸膜摩擦感及皮下捻发感。",
                "ctgjcKz1": "两肺清音，肺下界于肩胛线第十肋隙，肺下缘移动度3厘米。",
                "ctgjcTz1": "双肺呼吸音清晰，未闻及干湿罗音，语音传导正常。",
                "ctgjcXz": "心钱区无隆起，未触及震颤，心界不大，心律84次/分，心律整齐，心音正常，未闻及奔马律，各瓣膜区未闻及病理性杂音，未闻及心包摩擦音。",
                "ctgjcSz2": "心前区无隆起，心尖搏动在第5肋间隙锁骨中线内1.5厘米，范围约1.5×1.5厘米。",
                "ctgjcCz2": "心尖搏动位置与范围同视诊，搏动有利，无震颤及心包摩擦感。",
                "ctgjcKzy1": "2.5",
                "ctgjcKzy2": "2.5",
                "ctgjcKzy3": "4",
                "ctgjcKzy4": "",
                "ctgjcKzz1": "2.5",
                "ctgjcKzz2": "4",
                "ctgjcKzz3": "5.5",
                "ctgjcKzz4": "8",
                "ctgjcTz2": "心率90次/分，心律整齐，心音正常，未闻及奔马律，各瓣膜区未闻及病理性杂音，无心包摩擦音。",
                "ctgjcRdm": "脉率、节律规则，无奇脉、交替脉。",
                "ctgjcZwxg": "未见毛细血管搏动征，未闻及水冲脉，未闻及枪击音等。",
                "ctgjcFb": "腹部",
                "ctgjcSz3": "形状对称平坦，呼吸运动，胃肠蠕动波未见异常，无皮疹、色素、条纹、瘢痕，无腹壁静脉曲张、疝或局部隆起。",
                "ctgjcCz3": "腹壁紧张度未见异常，无压痛、反跳痛、液波震颤、包块。肝脏、胆囊、脾脏未触及，肾脏未触及，无叩击痛、无压痛，膀胱未触及，输尿管压痛点无压痛。",
                "ctgjcYbqk2": "腹部外形正常，腹式呼吸正常，未见胃形，未见肠形，未见蠕动波，脐部正常。腹壁静脉无曲张，无手术瘢痕，腹软，全腹无压痛及反跳痛，未触及液波震颤，全腹未触及包块，肝脏肋下未触及，胆囊未触及，Murphy征阴性，脾脏肋下未触及，肾脏未触及。肝浊音界正常，肝上界位于锁骨中线第五肋间，移动性浊音阴性，肾区无叩痛。肠鸣音正常，未闻及血管杂音及振水音。",
                "ctgjcGz": "肝浊音界正常，肝上界位于锁骨中线第五肋间，移动性浊音阴性。",
                "ctgjcPz": "未触及，脾区无压痛。",
                "ctgjcSz": "双肾无叩击痛，无腰酸痛。",
                "ctgjcQt": "肠鸣音正常，膀胱未触及，输尿管无压痛。",
                "ctgjcKz3": "肝区无叩击痛，无移动性浊音、高度鼓音、肾区叩击痛。",
                "ctgjcTz3": "肠鸣音正常，4次/分，无振水音、血管杂音。",
                "ctgjcGzc": "未检。",
                "ctgjcWszq": "未检。",
                "ctgjcJz": "脊柱未见明显畸形。无棘突压痛。",
                "ctgjcShiz": "四肢肌力正常，肌张力正常，双下肢无水肿，肤温正常，未见溃疡。关节活动正常。",
                "ctgjcSjxt2": "四肢肌力、肌张力正常。双侧肱二、三头肌腱反射正常引出。双膝反射（++），踝反射（++）。Babinski征阴性。Kerning征阴性。踝阵挛阴性。",
                "ctgjcZkqk": "高级神经活动：神清，精神可，认知功能正常，语音流利清晰，右利手。颅神经检查：嗅觉检查正常。双眼视力及视野粗查正常，眼底未窥入。双侧瞳孔等大瞪圆，直径2.5mm，直接和间接对光反射正常。双眼闭目有力，眼动充分，无复视及眼震，双侧眼角膜反射正常，面部感觉对称，咀嚼肌有力，张口下颌居中，额纹对称，示齿鼻唇沟对称，伸舌居中，味觉正常。软腭提升良好，咽反射存在。声音清晰，转颈耸肩有力。舌肌无萎缩。运动神经：四肢肌肉无萎缩，四肢肌力、肌张力正常。无不自主运动。共济运动：指鼻试验、轮替试验、跟膝胫试验均正常。感觉系统：四肢痛触觉、音叉振动觉、关节位置未见异常。反射系统：双上肢肱二、三肌腱反射（++），挠骨摸反射（++），双膝反射（+），踝反射（+），髌阵挛、踝阵挛阴性。掌颌反应阳性，双上肢Hoffmann及Rossolimo征阴性。左侧Babinski阳性，双侧Chaddock、Openhein和Gordon征阴性。颈无抵抗，Kerning征和Brudzinski征阴性。Lasegue征、臂丛牵拉试验阴性。植物神经系统：皮肤黏膜色泽，温度，毛发分布，指甲形态，汗液分布正常，汗液分布正常，排尿排便无障碍。",
                "ctgjcSysjc": "入院随机血糖：mmol/L。",
                "cblzy": "患者，女，岁，因“”入院。入院症见：查体：",

              },
              copyField:{},
              //当前组件提交(add)数据时,ajax处理的 基础信息设置
              addMessTitle: {},
              listMessTitle:{
                ajaxSuccess:'SuccessGetCurrData',
                ajaxParams:{
                  url:this.url.caseRecordGet+this.operailityData.cid,
                }
              },
          }
        },
        methods: {
          //初始化请求列表数据
          init(){
//              获取当前登录人的信息
            let userInfo = this.$store.getters.getUserInfo;
            this.name= userInfo.name;
            this.ajax(this.listMessTitle);
          },

          SuccessGetCurrData(res){
            let data = res.data;
            if(!data) return;
            this.formValidate = data;

          },
          /*
           * 点击提交按钮 监听是否提交数据
           * @param isLoadingFun boolean  form表单验证是否通过
           * */
          listenSubEvent(isLoadingFun){
            let isSubmit = this.submitForm("formValidate");
            if(isSubmit){
              if(!isLoadingFun) isLoadingFun=function(){};
              isLoadingFun(true);
              let formValidate = this.getFormData(this.formValidate);
              formValidate.copyField = this.conductCopyField( formValidate.copyField);
              this.addMessTitle.ajaxParams.data=this.formDate(formValidate,['cysqm1Date','cysqm2Date','cruyuanDate','cjlDate'],'yyyy-MM-dd');
              this.ajax(this.addMessTitle,isLoadingFun);
            }
          },

          //处理要提交的的数据 ，，粘贴数据
          conductCopyField(data){
            for(let i=0 ;i<data.length;i++){
              if(this.copyField[data[i].fieldName]){
                data[i].isCopy = 1
              }
            }
            return data;
          },

          /*
           * 点击提交按钮 监听是否验证通过
           * @param formName string  form表单v-model数据对象名称
           * @return flag boolean   form表单验证是否通过
           * */
          submitForm(formName){
            let flag = false;
            this.$refs[formName].validate((valid) => {
              if (valid) {
                flag= true;
              }
            });
            return flag;
          },
          //保存
          saveSubEvent(isLoadingFun){
            let addMessTitle={
              type:'edit',
              successTitle:'修改成功!',
              errorTitle:'修改失败!',
              ajaxSuccess:'ajaxSuccess',
              ajaxError:'ajaxError',
              ajaxParams:{
                jsonString:true,
                url:this.url.caseRecordBigCasesModify+this.operailityData.cid,
                method:'put',
                data:{},
              }
            };
            this.addMessTitle = addMessTitle;
            this.listenSubEvent(isLoadingFun)
          },

          //上报
          appearSubEvent(isLoadingFun){
            let addMessTitle={
              type:'edit',
              successTitle:'上报成功!',
              errorTitle:'上报失败!',
              ajaxSuccess:'ajaxSuccess',
              ajaxError:'ajaxError',
              ajaxParams:{
                jsonString:true,
                url:this.url.caseRecordBigCasesModifyRelease+this.operailityData.cid,
                method:'put',
                data:{},
              }
            };
            this.addMessTitle = addMessTitle;
            this.listenSubEvent(isLoadingFun)
          },

         //取消
          cancel(){
            this.$emit('cancel',this.addMessTitle.type);
          },

         //上传文件
          expenseFileEvent(ids){

            this.formValidate.fileIds = ids;
          },

          /*
           * 获取表单数据
           * @return string  格式:id=0&name=aa
           * */
          getFormData(data){
            let myData = this.$util._.defaultsDeep({},data);
            return myData;
          },

          templateFilling(){
          this.formValidate = Object.assign(this.formValidate,this.template)
          },


          //键盘监听事件，监听是否按下ctrl + v
          keyup(key,event){
            event = event || window.event;
            if(event.keyCode==86 &&event.ctrlKey){
              this.copyField[key] = 1;
            }
          },
        },
        created(){
            this.init();


        },
        mounted(){
        },
        components: {}
    }
</script>
