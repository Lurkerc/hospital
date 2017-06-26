<template>
  <my-table :class="{'student-FREE':this.sceneType=='FREE'}" :height="height" v-if="headers[0]" border :columns="headers" :data="list"
    style="width: 100%">
    {{this.sceneType=='FREE'}}
  </my-table>
  <span v-else></span>
</template>
<script>
  import myTable from '../../../common/myTable.vue';
  export default {
    props: ['height',
      'tableList',
      'headerList',
      'config',
      'sceneType'
    ],
    data() {
      let list = []
      let headers = []
      /*if (this.headerList) {
        headers = this.conductHead(this.headerList);
      }
      if (this.tableList) {
        let headersLen = headers[].length+1;
        list = this.conductList(this.tableList,headers[]);
      }*/
      return {
        defaultParams: {
          keys: ['stationName', 'roomNum', 'teacherNames'], //头部排列顺序
          headLeft: ['站点名称', '房间号', '监考老师'], //左侧第一列显示的信息
          headLeftKey: 'time', //左侧第一列匹配的key
          width: '200', //单元格的宽度
          key: 'roomNum', //主题内容拼配的名，通过名来获取值当匹配项
          rowSpanKey: 'timeCount', // 合并单元格的key
          cellKey: 'userName', // cell的key
          tableBodyKey: 'arrangementList', // 获取的数据内容主题列表的key
        },
        headLen: 0,
        listMessTitle: {
          ajaxSuccess: 'listDataSuccess',
          ajaxParams: {
            url: '/scene/arrangement/preview',
            params: {}
          }
        },
        headersLen: 0,
        headerRoom: {},
        headers: headers,
        list: list,
      }
    },
    created() {
      // alert(this.height)
      if (this.headerList) {
        this.headersLen = this.headerList.length + 1;
        for (var i = 0; i < this.headerList.length; i++) {
          this.headerRoom[this.headerList[i]["roomNum"]] = (i + 1);
        }
        this.headers = this.conductHead(this.headerList);
      }
      if (this.tableList) {
        this.list = this.conductList(this.tableList, this.headerRoom);
      }
    },
    mounted() {},
    methods: {
      conductHead(data) {
        let headerList = [];
        let defaultParams = {
          keys: ['stationName', 'roomNum', 'teacherNames'], //头部排列顺序
          headLeft: ['站点名称', '房间号', '监考老师'], //左侧第一列显示的信息
          headLeftKey: 'time', //左侧第一列匹配的key
          width: '150', //单元格的宽度
          key: 'roomNum', //主题内容拼配的名，通过名来获取值当匹配项
          rowSpanKey: 'timeCount', // 合并单元格的key
          cellKey: 'userName', // cell的key
          tableBodyKey: 'arrangementList', // 获取的数据内容主题列表的key
        };
        defaultParams = Object.assign({}, defaultParams, this.config) //头部对象的名
        let keys = defaultParams.keys;
        let headLeft = defaultParams.headLeft; //头部左侧第一列
        let headLeftKey = defaultParams.headLeftKey;
        let width = defaultParams.width;
        let key = defaultParams.key;
        for (let i = 0; i < keys.length; i++) {
          headerList[i] = [];
          headerList[i].push({
            title: headLeft[i],
            key: headLeftKey,
            width: width || 150
          })
          for (let k = 0; k < data.length; k++) {
            headerList[i].push({
              title: data[k][keys[i]],
              key: data[k][key],
              width: width || 50
            })
          }
        }
        return headerList;
      },
      conductList(data, headerRoom) {
        let defaultParams = {
          keys: ['stationName', 'roomNum', 'teacherNames'], //头部排列顺序
          headLeft: ['站点名称', '房间号', '监考老师'], //左侧第一列显示的信息
          headLeftKey: 'time', //左侧第一列匹配的key
          width: '50', //单元格的宽度
          key: 'roomNum', //主题内容拼配的名，通过名来获取值当匹配项
          rowSpanKey: 'timeCount', // 合并单元格的key
          cellKey: 'userName', // cell的key
          tableBodyKey: 'arrangementList', // 获取的数据内容主题列表的key
        };
        defaultParams = Object.assign({}, defaultParams, this.config) //处理list数据
        let list = [];
        let key = defaultParams.key;
        let headLeftKey = defaultParams.headLeftKey;
        let cellKey = defaultParams.cellKey;
        let rowSpanKey = defaultParams.rowSpanKey;
        let tableBodyKey = defaultParams.tableBodyKey; //console.log('tee',headerRoom);
        let prevTrRowSpan = {};
        let Util = this.$util;
        let $_ = Util._;
        for (let i = 0; i < data.length; i++) {
          let tempObj = $_.defaultsDeep({}, headerRoom);
          let arrangementList
          if (this.valDataType(data[i], 'Array')) {
            arrangementList = data[i];
          } else {
            list[i] = {};
            if (this.sceneType != 'FREE') {
              list[i][headLeftKey] = data[i][headLeftKey];
            } else {
              list[i][headLeftKey] = ' ';
            }
            arrangementList = data[i][tableBodyKey] == "" ? [] : data[i][tableBodyKey]; //提取data里的每一个arrangementList，最终生成一个对象，房间号+'Row'为合并的数值
          }
          for (let k = 0; k < arrangementList.length; k++) {
            delete(tempObj[arrangementList[k][key]]);
            if (list[i][arrangementList[k][key]]) {
              list[i][arrangementList[k][key]] += ' , ' + arrangementList[k][cellKey]
            } else {
              if (typeof prevTrRowSpan[arrangementList[k][key]] == "undefined") {
                list[i][arrangementList[k][key]] = arrangementList[k][cellKey];
                list[i][arrangementList[k][key] + 'Row'] = arrangementList[k][rowSpanKey];
                let rowSpanNum = parseInt(arrangementList[k][rowSpanKey]);
                if (arrangementList[k][rowSpanKey] > 1) {
                  prevTrRowSpan[arrangementList[k][key]] = rowSpanNum;
                }
              }
            }

          } //console.log(prevTrRowSpan);
          $_.forEach(tempObj, function (n, key) {
            let isEmpty = Util.isEmptyObject(prevTrRowSpan);
            let flag = true;
            if (!isEmpty) {
              if (typeof prevTrRowSpan[key] != "undefined") {
                let span = prevTrRowSpan[key];
                span--;
                prevTrRowSpan[key] = span;
                if (span == 1) {
                  delete(prevTrRowSpan[key]);
                }
                flag = false;
              }
            }
            if (flag) {
              list[i][key] = " ";
              list[i][key + 'Row'] = 1;
            }
          })
        } // console.table(list);
        return list;
      },
    },
    components: {
      myTable,
    },
    watch: {
      tableList(val, oldVal) {
        if (!val) return; //this.list = this.conductList(val,headersLen);
      },
      headerList(val) {
        if (!val) return; //this.headers = this.conductHead(val);
      },
    }
  }

</script>
