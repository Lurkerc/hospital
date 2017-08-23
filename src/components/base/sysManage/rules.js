import _ from 'lodash';
import baseRules from '../../../formRules/base'; // 公共规则

/**
 * 住院医 - 专业基地
 **/
let jdManagement = {
  jdName: baseRules.required,        //基地名称
  jdProclass: baseRules.required,    //基地专业
  jdZrUsername: baseRules.requiredNoEvent,  //基地主任
  jdDep: [                           //基地科室,
    {
    type: 'array', required: true, message: '请至少添加一个科室',
  }],
};


export {
  jdManagement
};
