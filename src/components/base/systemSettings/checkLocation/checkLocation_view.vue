<template>

  <div class="volunteerActivity-view">
    <fieldset   class="layui-elem-field layui-field-title">
      <legend >打卡地点</legend>
    </fieldset>

    <el-row class="lose-margin2">
      <el-col :span="10" :offset="2">
        <p ><span class="text-w">经度：</span><span>{{formValidate.longitude}}</span></p>
      </el-col>
      </el-col >
      <el-col :span="10">
        <p ><span class="text-w">可打卡范围：</span><span>{{formValidate.scope | unit('m')}}</span></p>
      </el-col >
    </el-row >
    <el-row class="lose-margin2">
      <el-col :span="10" :offset="2">
        <p ><span class="text-w">纬度：</span><span>{{formValidate.latitude}}</span></p>
      </el-col>
      </el-col >
      <el-col :span="10">
        <p><span class="text-w">可打卡对象：</span>
          <span v-if="formValidate.setType=='ALL'">所有人</span>
          <span v-if="formValidate.setType!='ALL'">
          <el-tag style="margin-left: 5px;" v-for="(item,index) in formValidate.rolelist" :key="item.roleId" type="primary">{{item.roleCName}}</el-tag>
        </span>
        </p>
      </el-col >
    </el-row >
    <el-row class="lose-margin2">
      <el-col :span="10" :offset="2">
        <p ><span class="text-w">地点名：</span><span>{{formValidate.placeName}}</span></p>
      </el-col>
      </el-col >
      <el-col :span="10">
        <p ><span class="text-w">有效时间：</span>
          <span v-if="formValidate.effectiveType=='ALL'">永久有效</span>
          <span v-if="formValidate.effectiveType!='ALL'">{{formValidate.startDate}}~{{formValidate.endDate}}</span>
        </p>
      </el-col >
    </el-row >


    <!---->
    <div id="allmap" style="height:500px;width:100%;"></div>
  </div>
</template>
<script >
  export default {
    props: ['operailityData'],
    data (){
      return{
        formValidate: {
          longitude: '116.404',
          latitude: '39.915',
          placeName:'北京',
          scope: '100',
          setType: "role",
          rolelist:[
            {
              "roleId":"1",
              "roleCName":"住院医"
            },
            {
              "roleId":"2",
              "roleCName":"实习生"
            },
            {
              "roleId":"3",
              "roleCName":"带教干事"
            }
          ],
          effectiveType:"ALL",
          startDate:"",
          endDate:"",
          status:0,
        },
        //当前组件默认请求(list)数据时,ajax处理的 基础信息设置
        initMessTitle:{
          ajaxSuccess:'SuccessGetCurrData',
          ajaxParams:{
            url:'/attendance/clockSet/get/'+this.operailityData.id
          }
        }
      }
    },

    mounted(){
      //初始化
      this.init();
    },
    methods:{
      /*
       * 默认组件第一次请求数据
       * @param res JSON  数据请求成功后返回的数据
       * */
      SuccessGetCurrData(responseData){
        let data = responseData.data;
        this.formValidate = data;
        this.getPoint();
      },
      /*
       * 组件初始化入口
       * */
      init(){
        //默认请求加载数据
        this.ajax(this.initMessTitle);
        //this.getPoint()
      },
      //根据经纬度来定位
      getPoint(){
        let map = new BMap.Map("allmap");
        map.centerAndZoom(new BMap.Point(this.formValidate.longitude,this.formValidate.latitude),17);
        this.setMarker(map);
        this.addControl(map);
      },
      //经纬度设置地图中心点，并添加标注
      setMarker(map){
        // 用经纬度设置地图中心点
        map.clearOverlays();
        var new_point = new BMap.Point(this.formValidate.longitude, this.formValidate.latitude);
        var marker = new BMap.Marker(new_point);  // 创建标注
        map.addOverlay(marker);              // 将标注添加到地图中
        map.panTo(new_point);
    //添加圆
          var circle = new BMap.Circle(new_point,this.formValidate.scope||100);
          map.addOverlay(circle);            //增加圆
      },

      addControl(map){
        let navigationControl = new BMap.NavigationControl({
          // 靠左上角位置
          anchor: BMAP_ANCHOR_TOP_LEFT,
          // LARGE类型
          type: BMAP_NAVIGATION_CONTROL_LARGE,
          // 启用显示定位
          enableGeolocation: true
        });
        map.addControl(navigationControl);

        // 添加定位控件
      },

      confirm(){
        this.$emit('cancel','show')
      }

    }

  }
</script>
