/**
 * 全日历
 *
 * 默认属性及事件设置
 *
 * @date     2014-04-12
 * @author   zyc<332533011@qq.com>
 */
const calendar = {
  fcEvents : [],
  tpl:0,
  itemLimit:7,
  lang:"zh",
  setCalData(data){
    this.fcEvents = data;
    /*for(var i in data){
      this.fcEvents.push(data[i]);
    }*/
  }
}
calendar.fcEvents = [];
export default calendar
