<template>
  <navbarLogin/>
  <div style="text-align: left;">
    <router-link to ="/HomeComponent"><img src="../assets/backIcon.png" alt="backIcon" style="width: 30px;height: 30px;margin-top: 30px;"/></router-link>
  </div>
  
  <div style="padding-left:100px;margin-top:-60px">
      
      <div style="display: flex; margin-top:80px ;width:88%;height: 450px;background-color: none;">
        <div >
          <img alt="RoomFour" src="../assets/Room4person-Home.jpg" class="resize-room4">
        </div>
        <div>
          <img alt="RoomFourpic1" src="../assets/Room4PicComputer.jpg" class="room4piccom">
        </div>
        <div>
          <img alt="RoomFourpic2" src="../assets/Room4PicBar.jpg" class="room4Bar">
        </div>
        <div>
          <img alt="RoomFourpic3" src="../assets/Room4PicToilet.jpg" class="room4Toilet">
        </div>
        <div>
          <img alt="RoomFourpic4" src="../assets/Room4PicPublicSpace.jpg" class="room4PublicSpace">
        </div>
      </div>
      <div style="width: 100%;height: auto;">
        <h2 class="topicRoom">Room {{room.room_num}}</h2>
        <p class="detailTopicRoom">Comfortable for small team ({{room.room_person}} persons)</p>
        <button class="reviewButton" @click="openModal">
          Book Now
        </button>
        <BookingModal v-if="showModal" @close="closeModal" />
      </div >
      
      <div style="margin-left:-8px ;">
        <div class="underlineSquare"/>
        <div style="margin-top: -56.5px;">
          <navbarEachRoomDetail :currentRoute="currentRoute"/>
        </div>
       
      </div>
  </div>

  <div class="backGroundButtom" style="display: flex;">
    <div v-for="(room, index) in rooms" :key="room.roomdetail_id" >
    <div v-if="index < 4" class="containRooms" style="display: flex; margin: 0 10px; flex-direction: column;">
        <div>
            <img src="../assets/Room8person-Home.jpg" alt="roomtwo"/>
            <h2 style="text-align: left; font-size: 20px; margin-left: 20px;">Room {{ room.room_num }}</h2>
            <div class="resizepic">
                <img src="../assets/graph.png" alt="clock" style="width: 30px; height: 30px; transform: translateY(6px);display: inline;">
                <p :style="statusStyle(room.status_room)" class="statusGreens">{{ room.status_room }}</p>
                <img src="../assets/man.png" alt="clock" style="width: 30px; height: 30px; transform: translateY(6px); margin-top: -2px; margin-left: 6px;">
                <p style="font-size: 16px; margin-left: 10px; display: inline;">{{room.room_person}} persons</p>
                <img src="../assets/Wifi.png" alt="clock" style="width: 30px; height: 30px; transform: translateY(6px); margin-top: -2px; margin-left: 12px;">
                <p style="font-size: 16px; margin-left: 10px; display: inline;">Free Wifi</p>
                <div style="padding-left: 310px;">
                    <li  @click="bookRoom" class="containRooms-button"><router-link :to="'/room/' + room.roomdetail_id">Book Now</router-link></li>
                </div>
            </div>
        </div>
      </div>
    </div>
</div>

</template>
  
  <script>
  import axios from 'axios';
  import navbarLogin  from '@/components/navbarLogin.vue'
  import navbarEachRoomDetail from '@/components/navbarEachRoomDetail.vue'
  import BookingModal from '@/components/BookingModal.vue'

  export default {
    name: 'RoomDetail',
    components: {
    navbarLogin,
    navbarEachRoomDetail,
    BookingModal,
  },
    data() {
      return {
        room: {},
        rooms: [],
        showModal: false,
      };
    },
    created() {
      const roomDetailId = this.$route.params.roomdetail_id;
      
      // เรียก API เพื่อดึงข้อมูลห้อง
      axios
        .get(`http://localhost:3333/room/${roomDetailId}`)
        .then((response) => {
          this.room = response.data.room;
        })
        .catch((error) => {
          console.error('Failed to retrieve room details.', error);
        });
        this.fetchRoomData();
    },
    methods: {
    statusStyle(status) {
      if (status === 'booked') {
        return { color: 'red' };
      }
      return {};
    },
    fetchRoomData() {
      axios
        .get('http://localhost:3333/room')
        .then((response) => {
          this.rooms = response.data.rooms;
          console.log(response.data.rooms);
        })
        .catch((error) => {
          console.error('Failed to retrieve room list.', error);
        });
    },
    bookRoom() {
      this.$router.go(0)
    },
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
  },
  mounted() {
    setInterval(this.fetchRoomData, 5 * 60 * 1000);
  },
  };
  </script>

<style scoped>
.containRooms-button {
  float: right;
  padding-left: 120px;
  color: white;
 
}
.containRooms-button a{
  border-radius: 20px; 
  background-color: #8E5F34;
  border: 1px solid #8E5F34;
  color: #ffffff;
  width: 100px;
}
.statusGreens{
  color: green;
  font-size: 16px; 
  margin-left: 10px; 
  display: inline;
  font-weight: bold;
}
.containRooms-button a:hover{
  background-color: #ffffff;
  color: #8E5F34;
  border: 1px solid #8E5F34;
  transition: 0.5s;
}
.resizepic{
 
  width: 115px;
  margin-left:10px;
  margin-top:-20px;
    }
.resizepic p{
  padding-top:-200px;
}
.resize-room4{
    width: 670px;
    height:450px;
    margin-right:100%;
    border-radius:20px;
    
   
}
.room4piccom{
    width: 280px;
    height:215px;
    margin-left:20px;
    border-radius:10px;
   
}
.room4Bar{
    width: 280px;
    height:215px;
    margin-left:20px;
    border-radius:10px;
}
.room4Toilet{
    width: 280px;
    height:215px;
    border-radius:10px;
    margin-top:235px;
    margin-left:-880px;
}
.room4PublicSpace{
    width: 280px;
    height:215px;
    border-radius:10px;
    margin-top:235px;
    margin-left:-280px;
}
.topicRoom{
  
  text-align: left;
  font-size: 36px;
}
.backGroundButtom{
    width:100%;
    height:550px;
    background-color: rgb(223, 220, 220);
    overflow-x: scroll;
    padding-top:60px;
  }
.containRooms{
  width:450px;
  height:460px;
  background-color: white;
  border-radius: 20px;
  margin-left:30px;
  
  
}  
.containRooms img{
  width:420px;
  height: 220px;
  margin-top:15px;
  border-radius: 20px;
  

}
.detailTopicRoom{
  margin-top:-10px;
  text-align: left;
  font-size: 22px;
  color: rgb(126, 123, 123);
}
.detailTopicRoom2{
 margin-right: 160px;
 margin-top:-50px;
 text-align: right;
 font-size: 22px;
 color: rgb(0, 0, 0);
}
.reviewButton {
    width: 190px;
    height: 40px;
    background-color: rgb(149, 105, 74);
    border-radius: 20px;
    margin-left:80%;
    margin-top: -40px;
    color: white;
    display: flex; 
    align-items: center; 
    justify-content: center; 
    font-size: 16px;
    color: white;
    font-family: 'serif';
    border: 1px solid #8E5F34;
}
.reviewButton:hover {
  background-color: #ffffff;
  color: #8E5F34;
  border: 1px solid #8E5F34;
  transition: 0.5s;
  cursor: pointer;
}

.amountOfPeopleReview{
  margin-top:-20px ;
  text-align: right;
  margin-right: 166px;
  font-size:16px ;
  color:rgb(126, 123, 123) ;
}
.underlineSquare{
  width:97%;
  height: 1px;
  background-color: rgb(126, 123, 123) ;
  margin-top:60px;
  margin-left: 10px;
}
</style>