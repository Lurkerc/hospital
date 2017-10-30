// 工作台待办事项
const state = {
  handle: null, // 待办
  handled: null, // 已办
};

const mutations = {
  // 更新 {type:"handle",res:{totalCount:0,data:[]}}
  update: (state, obj) => state[obj.type] = obj.res
};

const getters = {
  // 总数
  workHandleTotalCount: (state, getters) => (name = 'handle') => {
    return state[name] && state[name]['totalCount'] || 0
  },
  // 数组
  workHandleArr: (state, getters) => (name = 'handle') => {
    return state[name] && state[name]['data'] || []
  },
};

export default {state, mutations, getters}
