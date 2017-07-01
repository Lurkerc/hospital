<template>
  <div style="padding-top: 70px">
    <!--宿舍管理-->
    <div class="dormitory"  @click="active('/manage/baseSetting/dormitoryMess')"><img src="../../assets/ambuf/images/dormitory-b.png" alt=""></div>
    <img src="../../assets/ambuf/images/arrows-b.png" alt="">
    <!--大楼管理-->
    <div class="dormitory" @click="active('/manage/baseSetting/buildingMess')"><img src="../../assets/ambuf/images/buildingManager-b.png" alt=""></div>
    <img src="../../assets/ambuf/images/arrows-b.png" alt="">
    <!--房间管理-->
    <div class="dormitory"  @click="active('/manage/baseSetting/roomMess')"><img src="../../assets/ambuf/images/roomManager-b.png" alt=""></div>
    <img src="../../assets/ambuf/images/arrows-b.png" alt="">
    <!--迁入迁出-->
    <div class="dormitory"  @click="active('/manage/stayManagement/inAndOut')"><img src="../../assets/ambuf/images/inAddOut-b.png" alt=""></div>
    <img src="../../assets/ambuf/images/arrows-b.png" alt="">
    <img src="../../assets/ambuf/images/arrows-two-b.png" alt="">

    <!--房间使用情况-->
    <div class="dormitory"  @click="active('/manage/dorQueryStatistic/roomUseing')"><img style="position: relative;top: -100px;" src="../../assets/ambuf/images/RoomUsage-b.png" alt=""></div>

    <!--人员入住情况-->
    <div class="dormitory"  @click="active('/manage/dorQueryStatistic/occupancy')"><img style="position: relative;top: 100px;left:-124px;" src="../../assets/ambuf/images/occupancy-b.png" alt=""></div>
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
        this.$router.replace(targer)
      }
    }

  }


</script>
