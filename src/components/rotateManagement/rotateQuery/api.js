/*----- 实习生__轮转查询 --------------------------------------------------------------------------------*/
const rotateQuery = 'rotationProcess/rotaryTable';
const api = {
  getRotaryInfos:{
    path : rotateQuery + '/getRotaryInfos',
    method : 'get',
  },
  myRotaryInfo:{
    path : rotateQuery + '/myRotaryInfo',
    method : 'get',
  }
}

export default api
