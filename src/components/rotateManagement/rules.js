import _ from 'lodash';
import baseRules from '../../formRules/base'; // 公共规则

/**
 * 实习生 - 出科技能补考 - 审核
 */
let givenSkillMakeUpAudit = {
  mark: baseRules.numberMust, // 技能成绩 - 必须为数字
};

export {
  givenSkillMakeUpAudit,
};
