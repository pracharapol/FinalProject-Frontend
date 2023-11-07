<template>
  <navbarLogin/>
  <div class="container">
    
    <img
      alt="Hometoppic"
      src="../assets/Hometoppic_auto_x2.jpg"
      class="full-screen-image"
    />

    <div class="Topic-container">
      <div class="Topic">
        <!-- <navHome class="HelpNavHome" /> -->
        <h1 style="margin-top:30px ;">BEST CO-WORKING SPACE</h1>
        <li><router-link to="/room">Book</router-link></li>
      </div>
    </div>
  </div>
  <div class="BgScreen-Homepic" />
  <div
    style="margin-left: 3vw; width: 90vw; margin-top: -100px; font-size: 18px"
  >
    Step into a world of convenience and productivity with our co-working space
    reservation services. Experience the ease of booking your ideal workspace
    right from the comfort of your home. Join our community of professionals who
    have already unlocked the benefits of hassle-free reservations. Don't wait –
    seize the opportunity to enhance your work-life balance today.
  </div>
  <h1 style="margin-top: 120px; margin-left: 40px">Recommended Rooms</h1>


  <div v-for="(room, index) in rooms" :key="room.roomdetail_id" style="padding-left: 40px">
    <div class="containers" style="margin-top: 60px" v-if="index < 2">
      <div class="left-side">
        <img
          alt="pic4personal"
          src="../assets/Room4person-Home.jpg"
          class="Helppic4personal"
        />
      </div>
      <div class="right-side">
        <h2 class="detailPicOneTopic">Room {{room.room_num}}</h2>
        <p class="detailPicOneDetail">
          We invite all members of the company's team to use our well-appointed meeting rooms. Our meeting rooms are fully 
          equipped to accommodate a wide range of professional needs, whether it's critical strategy meetings, creative brainstorming 
          or dealing with important matters. With favorable environment, modern facilities.
        </p>
        <p class="detailPicOneDetail">
          {{ room.roomdetail_desc }}
        </p>
        <h2 class="detailPicOneDetail">
          status: <span :style="statusStyle(room.status_room)" class="statusGreen">{{ room.status_room }}</span>
        </h2>
        <h2 class="detailPicOneDetail">
          {{ room.room_person }} <span>persons</span>
        </h2>
        <li style="margin-left: -12px">
          <router-link :to="'/room/' + room.roomdetail_id">See Detail</router-link>
        </li>
      </div>
    </div>
  </div>

<div v-for="(room, index) in rooms" :key="room.roomdetail_id">
  <div v-if="index == 2" style="margin-top: 100px" class="containerforpicture" >
    <img
      alt="pic10personal"
      src="../assets/Room10person-Home.jpg"
      class="Helppic10personal"
    />
    <h2 style="text-align: center">Room {{room.room_num}}</h2>
    <div class="detailPicThreeDetail">
      <p>
          We invite all members of the company's team to use our well-appointed meeting rooms. Our meeting rooms are fully 
          equipped to accommodate a wide range of professional needs, whether it's critical strategy meetings, creative brainstorming 
          or dealing with important matters. With favorable environment, modern facilities.
        </p>
    </div>
    <p >
          {{ room.roomdetail_desc }}
        </p>
        <h2 >
          status: <span :style="statusStyle(room.status_room)" class="statusGreen">{{ room.status_room }}</span>
        </h2>
        <h2 style="margin-bottom: 50px;">
          {{ room.room_person }} <span>persons</span>
        </h2>
    <div class="seeDetailPicThree">
    <li style="margin-top: -40px">
      <router-link :to="'/room/' + room.roomdetail_id">See Detail</router-link>
    </li>
    </div>
  </div>
</div>

  <div class="bottom-bar">
    <div style="margin-left: 170px">
      <div style="text-align: left; padding-top: 50px; color: white">
        <h1 style="display: inline">Meeting Room</h1>
        <h1 style="display: inline; margin-left: 600px">About</h1>
        <h1 style="display: inline; margin-left: 150px">Contact</h1>
      </div>
      <div
        style="
          text-align: left;
          width: 600px;
          font-size: 18px;
          color: white;
          line-height: 30px;
        "
      >
        <p>
          When seeking an office space, you may be wondering if a meeting room
          is worth considering. After all, it may be a useful facility to assist
          your business operations and help your team work more effectively.
          Whether you decide to lease your own meeting room or use a coworking
          space, there are many advantages to expect.
        </p>
        <div
          style="
            width: 10px;
            line-height: 30px;
            margin-left: 804px;
            margin-top: -140px;
          "
        >
          <p>Story Features Reviews Privacy</p>
        </div>
        <div
          style="
            width: 150px;
            line-height: 30px;
            margin-left: 1040px;
            margin-top: -140px;
          "
        >
          <p>093-652-2236 Booking1234@gmail.com</p>
        </div>
      </div>
      <div
        style="
          width: 90%;
          height: 1px;
          background-color: white;
          margin-top: 120px;
        "
      />
      <div style="margin-left: 890px; margin-top: 20px">
        <p
          style="
            font-size: 18px;
            color: white;
            word-spacing: 4px;
            display: inline;
            margin-left: 40px;
          "
        >
          Contact Us
        </p>
        <p
          style="
            font-size: 18px;
            color: white;
            display: inline;
            margin-left: 40px;
          "
        >
          Terms
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import navbarLogin  from '@/components/navbarLogin.vue'

export default {
  name: "HomePage",
  components: {
    navbarLogin,
    
  },
  data() {
    return {
      rooms: [],
    };
  },
  created() {
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
  },
  mounted() {
    setInterval(this.fetchRoomData, 5 * 60 * 1000);
  },
};
</script>

<style scoped>
.container {
  position: relative;
  width: 100%;
  height: 600px;
  text-align: center;
  overflow: hidden;
  margin-top: -10px;
}
.containerforpicture {
  position: relative;
  width: 100%;
  height: auto;
  text-align: center;
  overflow: hidden;
  margin-top: -100px;
}
.bottom-bar {
  width: 100vw;
  height: 350px;
  background-color: rgb(210, 184, 165);
  margin-top: 120px;
}
.detailPicOneTopic {
  width: 600px;
  text-align: left;
  margin-top: -30px;
  margin-bottom: 20px;
  margin-left: 50px;
}
.detailPicOneDetail {
  width: 40vw;
  text-align: left;
  margin-left: 50px;
  color: rgb(113, 113, 113);
  font-size: 18px;
  line-height: 26px;
}
.detailPicThreeDetail {
  margin-left: 150px;
  margin-right: 150px;
  text-align: center;
  color: rgb(113, 113, 113);
  font-size: 18px;
  line-height: 26px;
}
.seeDetailPicThree {
  display: flex;
  justify-content: center;
  align-items: center;
}
.seeDetailPicThree li {
  color: white;
}
.seeDetailPicThree li a {
  color: rgb(64, 60, 58);
  border-radius: 10px;
  font-size: 22px;
  border: 1px solid #606060;
}
.seeDetailPicThree li a:hover {
  color: rgb(136, 91, 59);
  background-color: rgb(242, 235, 235);
  border: 1px solid rgb(136, 91, 59);
  transition: 0.5s;
}

.right-side li {
  color: white;
}
.right-side li a {
  color: rgb(64, 60, 58);
  border-radius: 10px;
  font-size: 22px;
  margin-left: 50px;
  border: 1px solid #606060;
}
.right-side li a:hover {
  color: rgb(136, 91, 59);
  background-color: rgb(242, 235, 235);
  border: 1px solid rgb(136, 91, 59);
  transition: 0.5s;
}
.left-side-two li {
  color: white;
}
.left-side-two li a {
  color: rgb(64, 60, 58);
  border-radius: 10px;
  font-size: 22px;
  margin-left: 24px;
  border: 1px solid #606060;
}
.left-side-two li a:hover {
  color: rgb(136, 91, 59);
  background-color: rgb(242, 235, 235);
  border: 1px solid rgb(136, 91, 59);
  transition: 0.5s;
}
.Topic li {
  position: absolute;
  top: 200px;
  left: 35%;
}
.Topic li a {
  color: rgb(255, 255, 255);
  background-color: black;
  border-radius: 40px;
  font-size: 26px;
}
.Topic li a:hover {
  color: rgb(136, 91, 59);
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(136, 91, 59);
  transition: 0.5s;
}

.Topic-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: 50px;
  background-color: black;
  width: 800px;
  height: 100px;
  color: rgb(255, 255, 255);
  border-radius: 60px;
  z-index: 2;
  display: flex;
  justify-content: center;
  opacity: 0.7;
}

.Topic {
  position: relative;
  z-index: 3;
  word-spacing: 18px;
}
.HelpNavHome {
  margin-top: -180px;
  margin-bottom: 160px;
}
.Helppic4personal {
  width: 40vw;
  height: 450px;
  border-radius: 20px;
}
.Helppic8personal {
  width: 40vw;
  height: 450px;
  border-radius: 20px;
}
.statusGreen{
  color: green;
}
.full-screen-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}
.Helppic10personal {
  width: 84%;
  height: 500px;
  object-fit: cover;
  border-radius: 20px;
}
.BgScreen-Homepic {
  width: 100%;
  height: 160px;
  background-color: rgb(248, 247, 247);
  color: black;
  margin-top: -20px;
}
.left-side {
  flex: 5;
  padding-left: 7.2vw;
  padding-top: 30px;
}
.right-side {
  flex: 5;
  background-color: white;
  padding-top: 60px;
  padding-right: 100px;
  text-align: center;
}
.left-side-two {
  flex: 5;
  background-color: white;
  padding-top: 60px;
  padding-left: 0px;
  text-align: center;
}
.right-side-two {
  flex: 5;
  padding-left: 7.2vw;
  padding-top: 30px;
}
.containers {
  width: 1200px;
  height: 500px;
  background-color: none;
  display: flex;
}
</style>
