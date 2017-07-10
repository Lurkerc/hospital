<!----------------------------------
****-- 大病历模板
****--@date     2017/7/4
****--@author   gx
----------------------------------->
<template>
    <div>
      <el-form   class="demo-form-inline" label-width="130px" >
        <el-row class="table-back-one">
          <el-col :span="6" >
            <el-form-item label="姓名:" prop="cname" >
              {{formValidate.cname}}
            </el-form-item>
          </el-col>

          <el-col :span="6" >
            <el-form-item label="性别:" prop="csex" >
              {{formValidate.csex}}
            </el-form-item>
          </el-col >

          <el-col :span="6" >
            <el-form-item label="年龄:" prop="cage" >
              {{formValidate.cage}}
            </el-form-item>
          </el-col >

          <el-col :span="6" >
            <el-form-item label="婚否:" prop="cisMarry" >
              {{formValidate.cisMarry | typeText}}
            </el-form-item>
          </el-col >

        </el-row >

        <el-row class="table-back-two" >
          <el-col :span="6" >
            <el-form-item label="民族:" prop="cnation" >
              {{formValidate.cnation}}
            </el-form-item>
          </el-col>

          <el-col :span="6" >
            <el-form-item label="职业:" prop="czhiye" >
              {{formValidate.czhiye}}
            </el-form-item>
          </el-col >

          <el-col :span="6" >
            <el-form-item label="住址:" prop="caddress" >
              {{formValidate.caddress}}
            </el-form-item>
          </el-col >

          <el-col :span="6" >
            <el-form-item label="出生地:" prop="cbirthPlace" >
              {{formValidate.cbirthPlace}}
            </el-form-item>
          </el-col >
        </el-row >

        <el-row class="table-back-one">
          <el-col :span="6" >
            <el-form-item label="床号:" prop="cbedNo" >
              {{formValidate.cbedNo}}
            </el-form-item>
          </el-col>

          <el-col :span="6" >
            <el-form-item label="住院号:" prop="czyNo" >
              {{formValidate.czyNo}}
            </el-form-item>
          </el-col >

          <el-col :span="12" >
            <el-form-item label="病区:" prop="clesion" >
              {{formValidate.clesion}}
            </el-form-item>
          </el-col >
        </el-row >

        <el-row class="table-back-two">
          <el-col :span="6" >
            <el-form-item label="入院日期:" prop="cruyuanDate" >
              {{formValidate.cruyuanDate}}
            </el-form-item>
          </el-col>

          <el-col :span="6" >
            <el-form-item label="记录日期:" prop="cjlDate" >
              {{formValidate.cjlDate}}
            </el-form-item>
          </el-col >

          <el-col :span="6" >
            <el-form-item label="病史陈述者:" prop="cbscsz" >
              {{formValidate.cbscsz}}
            </el-form-item>
          </el-col >
          <el-col :span="6" >
            <el-form-item label="与患者关系:" prop="chuanzheUser" >
              {{formValidate.chuanzheUser}}
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
              <el-input type="textarea" readonly v-model="formValidate.czs"></el-input>
            </el-form-item>
          </el-col>
        </el-row >

        <el-row class="table-back-one">
          <el-col :span="24" >
            <el-form-item label="现病史:" prop="cxbs" >
              <el-input type="textarea" readonly v-model="formValidate.cxbs"></el-input>
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
                      <el-input readonly type="textarea" v-model="formValidate.cjwsYbjkqk"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="传染病史:" prop="cjwsCrbs" >
                      <el-input readonly type="textarea" v-model="formValidate.cjwsCrbs"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="手术外伤史:" prop="cjwsSswss" >
                      <el-input readonly type="textarea" v-model="formValidate.cjwsSswss"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="药物过敏史:" prop="cjwsYwgms" >
                      <el-input readonly type="textarea" v-model="formValidate.cjwsYwgms"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-collapse-item>
              <!---->
              <el-collapse-item title="系统回顾" name="2">
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="呼吸系统:" prop="cxthgHxxt" >
                      <el-input readonly type="textarea" v-model="formValidate.cxthgHxxt"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="循环系统:" prop="cxthgXuhxt" >
                      <el-input type="textarea" v-model="formValidate.cxthgXuhxt"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="消化系统:" prop="cxthgXihxt" >
                      <el-input readonly type="textarea" v-model="formValidate.cxthgXihxt"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="泌尿系统:" prop="cxthgMlxt" >
                      <el-input readonly type="textarea" v-model="formValidate.cxthgMlxt"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="血液系统:" prop="cxthgXyxt" >
                      <el-input readonly type="textarea" v-model="formValidate.cxthgXyxt"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="内分泌系统:" prop="cxthgNfmxt" >
                      <el-input readonly type="textarea" v-model="formValidate.cxthgNfmxt"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="神经系统:" prop="cxthgSjxt1" >
                      <el-input readonly type="textarea" v-model="formValidate.cxthgSjxt1"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="生殖系统:" prop="cxthgSzxt" >
                      <el-input  readonly type="textarea" v-model="formValidate.cxthgSzxt"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="肌肉骨关节系统:" prop="cxthgGgjxt" >
                      <el-input readonly type="textarea" v-model="formValidate.cxthgGgjxt"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="个人史:" prop="cxthgGrs" >
                      <el-input readonly type="textarea" v-model="formValidate.cxthgGrs"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="月经婚育史:" prop="cxthgYjhys" >
                      <el-input  readonly type="textarea" v-model="formValidate.cxthgYjhys"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="家庭史:" prop="cxthgJts" >
                      <el-input readonly type="textarea" v-model="formValidate.cxthgJts"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-collapse-item>
              <!---->
              <el-collapse-item title=" 体格检查" name="3">
                <el-row >
                  <el-col :span="24">
                    <el-form-item label="生命体征:" prop="cxbs" >
                      <el-row >
                        <el-col :span="3">
                          <el-form-item label="T:" prop="ctgjcSmtzT" label-width="50px">
                            {{formValidate.ctgjcSmtzT}}
                          </el-form-item>
                        </el-col>
                        <el-col :span="3">
                          <el-form-item label="C:" prop="ctgjcSmtzC" label-width="50px">
                            {{formValidate.ctgjcSmtzC}}
                          </el-form-item>
                        </el-col>
                        <el-col :span="3">
                          <el-form-item label="P:" prop="ctgjcSmtzP" label-width="50px">
                            {{formValidate.ctgjcSmtzP}}
                          </el-form-item>
                        </el-col>
                        <el-col :span="3">
                          <el-form-item label="	次/分:" prop="ctgjcSmtzCf1" label-width="50px">
                            {{formValidate.ctgjcSmtzCf1}}
                          </el-form-item>
                        </el-col>
                        <el-col :span="3">
                          <el-form-item label="R:" prop="ctgjcSmtzR" label-width="50px">
                            {{formValidate.ctgjcSmtzR}}
                          </el-form-item>
                        </el-col>
                        <el-col :span="3">
                          <el-form-item label="	次/分:" prop="ctgjcSmtzCf2" label-width="50px">
                            {{formValidate.ctgjcSmtzCf2}}
                          </el-form-item>
                        </el-col>
                        <el-col :span="3">
                          <el-form-item label="BP:" prop="ctgjcSmtzBp" label-width="50px">
                            {{formValidate.ctgjcSmtzBp}}
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
                      <el-input type="textarea" readonly v-model="formValidate.ctgjcYbqk1"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="皮肤粘膜:" prop="ctgjcPfnm" >
                      <el-input type="textarea" readonly v-model="formValidate.ctgjcPfnm"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="浅表淋巴结:" prop="ctgjcQblbj" >
                      <el-input type="textarea" readonly v-model="formValidate.ctgjcQblbj"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="头部及其器官:" prop="ctgjcTbqg" >
                      <el-input type="textarea" readonly v-model="formValidate.ctgjcTbqg"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="颈部:" prop="ctgjcJb" >
                      <el-input type="textarea" readonly v-model="formValidate.ctgjcJb"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="胸部:" prop="ctgjcXb" >
                      <el-input type="textarea" readonly v-model="formValidate.ctgjcXb"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="胸廊:" prop="ctgjcXl" >
                      <el-input type="textarea"  readonly v-model="formValidate.ctgjcXl"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="乳腺:" prop="ctgjcRx" >
                      <el-input type="textarea" readonly v-model="formValidate.ctgjcRx"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="肺:" prop="ctgjcFei" >
                      <el-input type="textarea" readonly v-model="formValidate.ctgjcFei"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="视诊:" prop="ctgjcSz1" >
                      <el-input type="textarea" readonly v-model="formValidate.ctgjcSz1"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="触诊:" prop="ctgjcCz1" >
                      <el-input type="textarea"  readonly v-model="formValidate.ctgjcCz1"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="叩诊:" prop="ctgjcKz1" >
                      <el-input type="textarea" readonly v-model="formValidate.ctgjcKz1"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="听诊:" prop="ctgjcTz1" >
                      <el-input type="textarea" readonly v-model="formValidate.ctgjcTz1"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="心脏:" prop="ctgjcXz" >
                      <el-input type="textarea" readonly v-model="formValidate.ctgjcXz"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="视诊:" prop="ctgjcSz2" >
                      <el-input type="textarea" readonly v-model="formValidate.ctgjcSz2"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="触诊:" prop="ctgjcCz2" >
                      <el-input type="textarea" readonly v-model="formValidate.ctgjcCz2"></el-input>
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

                <el-row style="text-align: center">
                  <el-col :span="3" :offset="2">
                    <el-form-item label-width="0" prop="ctgjcKzy1" >
                      {{formValidate.ctgjcKzy1}}
                    </el-form-item>
                  </el-col>
                  <el-col  style="text-align: center" :span="3" :offset="2">
                    <div>II</div>
                  </el-col>
                  <el-col :span="3" :offset="2">
                    <el-form-item label-width="0" prop="ctgjcKzz1" >
                      {{formValidate.ctgjcKzz1}}
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row style="text-align: center">
                  <el-col :span="3" :offset="2">
                    <el-form-item label-width="0" prop="ctgjcKzy2" >
                      {{formValidate.ctgjcKzy2}}
                    </el-form-item>
                  </el-col>
                  <el-col  style="text-align: center" :span="3" :offset="2">
                    <div>III</div>
                  </el-col>
                  <el-col :span="3" :offset="2">
                    <el-form-item  prop="ctgjcKzz2" label-width="0">
                      {{formValidate.ctgjcKzz2}}
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row style="text-align: center">
                  <el-col :span="3" :offset="2">
                    <el-form-item  prop="ctgjcKzy3" label-width="0">
                      {{formValidate.ctgjcKzy3}}
                    </el-form-item>
                  </el-col>
                  <el-col  style="text-align: center" :span="3" :offset="2">
                    <div>IV</div>
                  </el-col>
                  <el-col :span="3" :offset="2">
                    <el-form-item  prop="ctgjcKzz3" label-width="0">
                      {{formValidate.ctgjcKzz3}}
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row style="text-align: center">
                  <el-col :span="3" :offset="2">
                    <el-form-item  prop="ctgjcKzy4" label-width="0">
                      {{formValidate.ctgjcKzy4}}
                    </el-form-item>
                  </el-col>
                  <el-col  style="text-align: center" :span="3" :offset="2">
                    <div>V</div>
                  </el-col>
                  <el-col :span="3" :offset="2">
                    <el-form-item  prop="ctgjcKzz4" label-width="0">
                      {{formValidate.ctgjcKzz4}}
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="听诊:" prop="ctgjcTz2" >
                      <el-input type="textarea" readonly v-model="formValidate.ctgjcTz2"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="桡动脉:" prop="ctgjcRdm" >
                      <el-input type="textarea" readonly v-model="formValidate.ctgjcRdm"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="周围血管征:" prop="ctgjcZwxg" >
                      <el-input type="textarea" readonly v-model="formValidate.ctgjcZwxg"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="腹部:" prop="ctgjcFb" >
                      <el-input type="textarea" readonly v-model="formValidate.ctgjcFb"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="视诊:" prop="ctgjcSz3" >
                      <el-input type="textarea" readonly v-model="formValidate.ctgjcSz3"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="触诊:" prop="ctgjcCz3" >
                      <el-input type="textarea" readonly v-model="formValidate.ctgjcCz3"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="一般情况:" prop="ctgjcYbqk2" >
                      <el-input type="textarea" readonly v-model="formValidate.ctgjcYbqk2"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="肝脏:" prop="ctgjcGz" >
                      <el-input type="textarea" readonly v-model="formValidate.ctgjcGz"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="脾脏:" prop="ctgjcPz" >
                      <el-input type="textarea" readonly v-model="formValidate.ctgjcPz"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="肾脏:" prop="ctgjcSz" >
                      <el-input type="textarea" readonly v-model="formValidate.ctgjcSz"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="其他:" prop="ctgjcQt" >
                      <el-input type="textarea"  readonly v-model="formValidate.ctgjcQt"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="叩诊:" prop="ctgjcKz3" >
                      <el-input type="textarea" readonly v-model="formValidate.ctgjcKz3"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="听诊:" prop="ctgjcTz3" >
                      <el-input type="textarea" readonly v-model="formValidate.ctgjcTz3"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="肛门、直肠:" prop="ctgjcGzc" >
                      <el-input type="textarea" readonly v-model="formValidate.ctgjcGzc"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="外生殖器:" prop="ctgjcWszq" >
                      <el-input type="textarea"  readonly v-model="formValidate.ctgjcWszq"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="脊柱:" prop="ctgjcJz" >
                      <el-input type="textarea" readonly v-model="formValidate.ctgjcJz"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="四肢:" prop="ctgjcShiz" >
                      <el-input type="textarea" readonly v-model="formValidate.ctgjcShiz"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="神经系统:" prop="ctgjcSjxt2" >
                      <el-input type="textarea" readonly v-model="formValidate.ctgjcSjxt2"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="专科情况:" prop="ctgjcZkqk" >
                      <el-input type="textarea"  readonly v-model="formValidate.ctgjcZkqk"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="24" >
                    <el-form-item label="实验室及特殊检查:" prop="ctgjcSysjc" >
                      <el-input type="textarea" readonly v-model="formValidate.ctgjcSysjc"></el-input>
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
              <el-input type="textarea" readonly v-model="formValidate.cblzy"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="table-back-two">
          <el-col :span="24" >
            <el-form-item label="初步诊断:" prop="ccbzd" >
              <el-input type="textarea" readonly v-model="formValidate.ccbzd"></el-input>
            </el-form-item>

          </el-col>
          <el-col :span="5" :offset="1">
            <el-form-item label="医师签名:" prop="cysqm1" >
              {{formValidate.cysqm1}}
            </el-form-item>
          </el-col>
          <el-col :span="5" >
            <el-form-item label="时间:" prop="cysqm1Date" label-width="70px">
              {{formValidate.cysqm1Date}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="table-back-one">
          <el-col :span="24" >
            <el-form-item label="入院诊断:" prop="cryzd" >
              <el-input readonly type="textarea" v-model="formValidate.cryzd"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5" :offset="1">
            <el-form-item label="医师签名:" prop="cysqm2" >
              {{formValidate.cysqm2}}
            </el-form-item>
          </el-col>
          <el-col :span="5" >
            <el-form-item label-width="70px" label="时间:" prop="cysqm2Date" >
              {{formValidate.cysqm2Date}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="table-back-two-d">
          <el-col :span="10" >
            <el-form-item  label="相关资料:" >
              <upload-file :uploadFiles="formValidate.fileList"  :show="true" ></upload-file>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
</template>
<script>
    /*当前组件必要引入*/

    //当前组件引入全局的util
    //前台业务字典组件引入
    import dictionary from '../../../../../libs/dictionary.js';
    let Util = null;
    export default{
        props:['url','operailityData'],
        data() {
            return {
              saveBtn: {title: '提交', callParEvent: 'saveSubEvent'},
              loadBtn: {title: '上报', callParEvent: 'appearSubEvent'},
              name: '',
              activeNames: [],
              dictionary: dictionary,
              formValidate: {
               /* "caseId": 111,
                "ctype": "DBL 大病例 MJJL 麻醉记录 YXZL 影像资料",
                "cname": "姓名",
                "csex": "男",
                "cage": "年龄",
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
                "cpodId": "轮转ID",
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
                "cstate": "NO_SUBMIT 未上报,REJECT 驳回,NO_PASS 待审核,PASS 审核通过",
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
                "copyBl": 0.8*/
              },
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
//          获取当前登录人的信息
            let userInfo = this.$store.getters.getUserInfo;
            this.name= userInfo.name;
            console.log(this.operailityData);
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
              this.addMessTitle.ajaxParams.data=this.formDate(this.getFormData(this.formValidate),['cysqm1Date','cysqm2Date','cruyuanDate','cjlDate'],'yyyy-MM-dd');
              this.ajax(this.addMessTitle,isLoadingFun)
            }
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
              type:'add',
              successTitle:'添加成功!',
              errorTitle:'添加失败!',
              ajaxSuccess:'ajaxSuccess',
              ajaxError:'ajaxError',
              ajaxParams:{
                jsonString:true,
                url:this.url.caseRecordBigCasesAdd,
                method:'post',
                data:{},
              }
            };
            this.addMessTitle = addMessTitle;
            this.listenSubEvent(isLoadingFun)
          },

          //上报
          appearSubEvent(isLoadingFun){
            let addMessTitle={
              type:'add',
              successTitle:'上报成功!',
              errorTitle:'上报失败!',
              ajaxSuccess:'ajaxSuccess',
              ajaxError:'ajaxError',
              ajaxParams:{
                url:this.url.caseRecordBigCasesAddRelease,
                method:'post',
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
        },
        created(){
            this.init();


        },
        mounted(){
        },
        components: {}
    }
</script>
