<template>
  <div>
    <!--宿舍管理-->
    <div class="dormitory"  @click="active('dormitoryMess')"><img  src="../../../assets/ambuf/images/dormitory.png" alt=""></div>
    <img src="../../../assets/ambuf/images/arrows.png" alt="">
    <!--大楼管理-->
    <div class="dormitory"  @click="active('buildingMess')"><img src="../../../assets/ambuf/images/buildingManager.png" alt=""></div>
    <img src="../../../assets/ambuf/images/arrows.png" alt="">
    <!--房间管理-->
    <div class="dormitory"  @click="active('roomMess')"><img src="../../../assets/ambuf/images/roomManager.png" alt=""></div>
    <img src="../../../assets/ambuf/images/arrows.png" alt="">
    <!--迁入迁出-->
    <div class="dormitory"  @click="active('inAndOut')"><img src="../../../assets/ambuf/images/inAddOut.png" alt=""></div>
    <img src="../../../assets/ambuf/images/arrows.png" alt="">
    <!--房间使用情况-->
    <div class="dormitory"  @click="active('roomUseing')"><img src="../../../assets/ambuf/images/RoomUsage.png" alt=""></div>
    <img src="../../../assets/ambuf/images/arrows.png" alt="">
    <!--人员入住情况-->
    <div class="dormitory"  @click="active('occupancy')"><img src="../../../assets/ambuf/images/occupancy.png" alt=""></div>
  </div>

</template>
<script>
  export  default {

      data(){
          return{

          }
      },
    methods:{
          active(targer){
            this.$router.push(targer)
          }
    }

  }


</script>
