<!-- <template>
    <navbarLogin/>
    <div>
      
      <router-link to ="/HomeComponent"><img src="../assets/backIcon.png" alt="backIcon" style="margin-right:1520px;width: 30px;height: 30px;margin-top: 30px;"/></router-link>
    </div>
    
    <div style="padding-left:130px;padding-right: 120px;margin-top:-60px">
        
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
          <h2 class="topicRoom">Room One</h2>
          <p class="detailTopicRoom">Comfortable for small team (4 persons)</p>
          <p class="detailTopicRoom2">Excellent</p>
          <div class="reviewButton">
            <p>8.5</p>
          </div>
          <p class="amountOfPeopleReview">150 reviews</p>

        </div >
        <div style="margin-left:-8px ;">
          <div class="underlineSquare"/>
          <div style="margin-top: -56.5px;">
            <navbarEachRoomDetail :currentRoute="currentRoute"/>
          </div>
         
        </div>
      
        
        
      
    </div>
    <div class="backGroundButtom">
        <h2 style="text-align: left;margin-left:170px;padding-top:20px">Rooms</h2>
        <div style="margin-left: 70px;">
          <div class="containRooms">
            <img src="../assets/Room8person-Home.jpg" alt="roomtwo"/>
            <h2 style="text-align: left; font-size:20px;margin-left: 20px;">Room Two</h2>
            <div class="resizepic">
              <img src="../assets/graph.png" alt="clock" style="width: 30px;height: 30px;transform: translateY(6px);">
              <p style=" font-size:16px;margin-left: 10px ;display: inline;" >20 sqm</p>
              <img src="../assets/man.png" alt="clock" style="width: 30px;height: 30px;transform: translateY(6px);margin-top: -2px;margin-left:6px;">
              <p style=" font-size:16px;margin-left: 10px ;display: inline;" >7 people</p>
              <img src="../assets/Wifi.png" alt="clock" style="width: 30px;height: 30px;transform: translateY(6px);margin-top: -2px;margin-left:12px;">
              <p style=" font-size:16px;margin-left: 10px ;display: inline;" >Free Wifi</p>
              <div style="padding-left: 310px;">
                <li class="containRooms-button"><router-link to="/Login">Book Now</router-link></li>
              </div>
              
            </div>
          </div>
          <div class="containRooms" style="margin-left:540px;margin-top:-460px">
            <img src="../assets/Room10person-Home.jpg" alt="roomthree"/>
            <h2 style="text-align: left; font-size:20px;margin-left: 20px;">Room Two</h2>
            <div class="resizepic">
              <img src="../assets/graph.png" alt="clock" style="width: 30px;height: 30px;transform: translateY(6px);margin-bottom:2px">
              <p style=" font-size:16px;margin-left: 10px ;display: inline;" >35 sqm</p>
              <img src="../assets/man.png" alt="clock" style="width: 30px;height: 30px;transform: translateY(6px);transform: translateX(8px);margin-top: -2px;margin-left:7px;">
              <p style=" font-size:16px;margin-left: 15px ;display: inline;" >14 people</p>
              <img src="../assets/Wifi.png" alt="clock" style="width: 30px;height: 30px;transform: translateY(6px);margin-top: -6px;margin-left:12px;">
              <p style=" font-size:16px;margin-left: 10px ;display: inline;" >Free Wifi</p>
              <div style="padding-left: 310px;">
                <li class="containRooms-button"><router-link to="/Login">Book Now</router-link></li>
              </div>
              
            </div>
          </div>
          <div class="containRooms " style="margin-left:1050px;margin-top:-460px">
            <img src="../assets/Room20person.jpg" alt="roomthree"/>
            <h2 style="text-align: left; font-size:20px;margin-left: 20px;">Room Two</h2>
            <div class="resizepic">
              <img src="../assets/graph.png" alt="clock" style="width: 30px;height: 30px;transform: translateY(6px);">
              <p style=" font-size:16px;margin-left: 10px ;display: inline;" >50 sqm</p>
              <img src="../assets/man.png" alt="clock" style="width: 30px;height: 30px;transform: translateY(6px);transform: translateX(8px);margin-top: -2px;margin-left:7px;">
              <p style=" font-size:16px;margin-left: 10px ;display: inline;" >30 people</p>
              <img src="../assets/Wifi.png" alt="clock" style="width: 30px;height: 30px;transform: translateY(6px);margin-top: -6px;margin-left:12px;">
              <p style=" font-size:16px;margin-left: 10px ;display: inline;" >Free Wifi</p>
              <div style="padding-left: 310px;">
                <li class="containRooms-button"><router-link to="/Login">Book Now</router-link></li>
              </div>
              
            </div>
          </div>
        </div>
        
    </div>
  
</template>
<script>
import navbarLogin  from '@/components/navbarLogin.vue'
import navbarEachRoomDetail from '@/components/navbarEachRoomDetail.vue'



export default {
  name: 'DetailRoom',
    components: {
        navbarLogin,
        navbarEachRoomDetail,
    },
    data() {
        return {
            currentRoute: '', // เก็บค่า URL ปัจจุบัน
        }
    },
    watch: {
        '$route'(to) {
            // เมื่อ URL เปลี่ยน
            this.currentRoute = to.path; // อัปเดตค่า currentRoute
        },
    },
    mounted() {
    window.scrollTo(0, 0);
  }
}

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
    width: 720px;
    height:450px;
    margin-right:100%;
    border-radius:20px;
    
   
}
.room4piccom{
    width: 320px;
    height:215px;
    margin-left:20px;
    border-radius:10px;
   
}
.room4Bar{
    width: 320px;
    height:215px;
    margin-left:20px;
    border-radius:10px;
}
.room4Toilet{
    width: 320px;
    height:215px;
    border-radius:10px;
    margin-top:235px;
    margin-left:-1000px;
}
.room4PublicSpace{
    width: 320px;
    height:215px;
    border-radius:10px;
    margin-top:235px;
    margin-left:-320px;
}
.topicRoom{
  
  text-align: left;
  font-size: 36px;
}
.backGroundButtom{
    width:100%;
    height:560px;
    background-color: rgb(223, 220, 220);
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
    width: 80px;
    height: 40px;
    background-color: rgb(149, 105, 74);
    border-radius: 20px;
    margin-left:90%;
    margin-top: -40px;
    color: white;
    /* ถ้าจะจัดให้ text อยู่ตรงกลางbutton ต่างๆ */
    display: flex; 
    align-items: center; 
    justify-content: center; 
}

.reviewButton p  {
    font-size: 18px;
    color: white;
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
</style> -->
