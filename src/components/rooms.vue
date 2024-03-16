<template>
    <div class="bodyroom">
      <div class="content1">
          <h1 style="text-align: center; font-size: 40px; font-weight: bold; margin-top: 20px; color: #000000;">ABC Rooms</h1>
          <div class="text-form"><router-link to="/HomeComponent">Home</router-link></div>
          <div class="text-form2"><router-link to="/room">Room&nbsp;&nbsp;&nbsp;></router-link></div>
      </div>
      
      <div class="content2">
      <h2 style="text-align: left; font-size: 30px; font-weight: bold; margin-top: 20px; color: #000000; padding-left: 5%;">Rooms List</h2>
      <div class="topnav">
        <a href="#allrooms" @click="showAllRooms">All Room({{allRooms.length}})</a>
        <a href="#availableRooms" @click="showAvailableRooms">Available Room({{ availableRooms.length }})</a>
        <a href="#bookedRooms" @click="showBookedRooms">Booked({{bookedRooms.length}})</a>
        <input type="text" v-model="searchQuery" placeholder="🔎 Search.." @input="filterRooms" @keypress="showSearchRooms"/>
      </div>

      <div class="showheader">
        <div style="width: 35%;">Room Name</div>
        <div style="width: 12%;">Persons</div>
        <div style="width: 33%;">Facility</div>
        <div style="width: 16%;">Status</div>
      </div>


        <div v-if="showAllRoom" style="width: 100%; height: 100%;">
          <router-link :to="'/room/' + room.roomdetail_id" v-for="room in rooms" :key="room.roomdetail_id" class="detailroomshow">
            <div style="width: 20%;">
              <img class="Imgrooms" src="../assets/Room8person-Home.jpg" alt="roomtwo" />
            </div>
            <div style="width: 15%;">
              <h3 style="font-size: 20px; color: #00A41A; margin-top: 25%;">{{ room.room_num }}</h3>
              <h3 style="font-size: 20px; color: #5D5D5D;">Room {{ room.room_num }}</h3>
            </div>
            <div style="width: 12%;"><h3 style="font-size: 20px; color: #5D5D5D; margin-top: 45%; margin-left: 5%;">{{ room.room_person }}</h3></div>
            <div style="width: 33%;"><h3 style="font-size: 20px; color: #5D5D5D; margin-top: 10%; margin-right: 10%;">{{ room.roomdetail_desc }}</h3></div>
            <div style="width: 16%; margin-bottom: 20px;"><h3 :style="statusStyle(room.status_room)" class="statusRoom">{{ room.status_room }}</h3></div>
          </router-link>
        </div>

        <div v-if="showAvailableRoom" style="width: 100%; height: 100%;">
          <router-link :to="'/room/' + room.roomdetail_id" v-for="room in availableRooms" :key="room.roomdetail_id" class="detailroomshow">
            <div style="width: 20%;">
              <img class="Imgrooms" src="../assets/Room8person-Home.jpg" alt="roomtwo" />
            </div>
            <div style="width: 15%;">
              <h3 style="font-size: 20px; color: #00A41A; margin-top: 25%;">{{ room.room_num }}</h3>
              <h3 style="font-size: 20px; color: #5D5D5D;">Room {{ room.room_num }}</h3>
            </div>
            <div style="width: 12%;"><h3 style="font-size: 20px; color: #5D5D5D; margin-top: 45%; margin-left: 5%;">{{ room.room_person }}</h3></div>
            <div style="width: 33%;"><h3 style="font-size: 20px; color: #5D5D5D; margin-top: 10%; margin-right: 10%;">{{ room.roomdetail_desc }}</h3></div>
            <div style="width: 16%; margin-bottom: 20px;"><h3 :style="statusStyle(room.status_room)" class="statusRoom">{{ room.status_room }}</h3></div>
          </router-link>
        </div>

        <div v-if="showBookedRoom" style="width: 100%; height: 100%;">
          <router-link :to="'/room/' + room.roomdetail_id" v-for="room in bookedRooms" :key="room.roomdetail_id" class="detailroomshow">
            <div style="width: 20%;">
              <img class="Imgrooms" src="../assets/Room8person-Home.jpg" alt="roomtwo" />
            </div>
            <div style="width: 15%;">
              <h3 style="font-size: 20px; color: #00A41A; margin-top: 25%;">{{ room.room_num }}</h3>
              <h3 style="font-size: 20px; color: #5D5D5D;">Room {{ room.room_num }}</h3>
            </div>
            <div style="width: 12%;"><h3 style="font-size: 20px; color: #5D5D5D; margin-top: 45%; margin-left: 5%;">{{ room.room_person }}</h3></div>
            <div style="width: 33%;"><h3 style="font-size: 20px; color: #5D5D5D; margin-top: 10%; margin-right: 10%;">{{ room.roomdetail_desc }}</h3></div>
            <div style="width: 16%; margin-bottom: 20px;"><h3 :style="statusStyle(room.status_room)" class="statusRoom">{{ room.status_room }}</h3></div>
          </router-link>
        </div>

        <div v-if="showSearchRoom" style="width: 100%; height: 100%;">
          <router-link :to="'/room/' + room.roomdetail_id" v-for="room in filteredRooms" :key="room.roomdetail_id" class="detailroomshow">
              <div style="width: 20%;">
              <img class="Imgrooms" src="../assets/Room8person-Home.jpg" alt="roomtwo" />
            </div>
            <div style="width: 15%;">
              <h3 style="font-size: 20px; color: #00A41A; margin-top: 25%;">{{ room.room_num }}</h3>
              <h3 style="font-size: 20px; color: #5D5D5D;">Room {{ room.room_num }}</h3>
            </div>
            <div style="width: 12%;"><h3 style="font-size: 20px; color: #5D5D5D; margin-top: 45%; margin-left: 5%;">{{ room.room_person }}</h3></div>
            <div style="width: 33%;"><h3 style="font-size: 20px; color: #5D5D5D; margin-top: 10%; margin-right: 10%;">{{ room.roomdetail_desc }}</h3></div>
            <div style="width: 16%; margin-bottom: 20px;"><h3 :style="statusStyle(room.status_room)" class="statusRoom">{{ room.status_room }}</h3></div>
          </router-link>
        </div>

    </div>
  </div>
  </template>
<script>
import axios from 'axios';
import URL from '@/components/url.js'
export default {
  name: 'Room-list',
  data() {
    return {
      rooms: [],
      showAvailableRoom: false,
      showAllRoom: true,
      showBookedRoom: false,
      showSearchRoom: false,
      searchQuery: '',
      filteredRooms: [],
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
        .get(URL+'/room')
        .then((response) => {
          this.rooms = response.data.rooms;
          console.log(response.data.rooms);
        })
        .catch((error) => {
          console.error('Failed to retrieve room list.', error);
        });
    },
    showAllRooms() {
      this.showAllRoom = true;
      this.showAvailableRoom = false;
      this.showBookedRoom = false;
      this.showSearchRoom = false;
    },
    showAvailableRooms() {
      this.showAllRoom = false;
      this.showAvailableRoom = true;
      this.showBookedRoom = false;
      this.showSearchRoom = false;
    },
    showBookedRooms() {
      this.showAllRoom = false;
      this.showAvailableRoom = false;
      this.showBookedRoom = true;
      this.showSearchRoom = false;
    },
    showSearchRooms() {
      this.showAllRoom = false;
      this.showAvailableRoom = false;
      this.showBookedRoom = false;
      this.showSearchRoom = true;
    },
    filterRooms() {
  const query = this.searchQuery.toLowerCase();
  const filteredRooms = this.rooms.filter((room) =>
    (Number.isInteger(room.room_num) && room.room_num.toString().includes(query)) ||
    (typeof room.roomdetail_desc === 'string' && room.roomdetail_desc.toLowerCase().includes(query)) ||
    (Number.isInteger(room.room_person) && room.room_person.toString().includes(query))
  );

  this.filteredRooms = filteredRooms;
  console.log('Filtered Rooms:', this.filteredRooms);
}
  },
  mounted() {
    setInterval(this.fetchRoomData, 5 * 60 * 1000);
  },
  computed: {
    availableRooms() {
      return this.rooms.filter(room => room.status_room === 'available');
    },
    bookedRooms() {
      return this.rooms.filter(room => room.status_room === 'booked');
    },
    allRooms() {
      return this.rooms;
    },
  },
};
</script>
  <style scoped>
  .bodyroom {
    margin: 0;
    padding: 0;
    height: 100vh;
    display: flex;
  }
  .content1 {
    width: 25%;
    background-color: #F5F0E8;
    list-style-type: none;
    padding: 0;
    overflow: hidden;
    border-bottom: 2px solid #C5BDBD;
  }
  .content2 {
    width: 75%;
    background-color: #ffffff;
    list-style-type: none;
    padding: 0;
    overflow: hidden;
    border-bottom: 2px solid #C5BDBD;
    overflow: auto; /* เพิ่มการเลื่อนในทิศทางที่คุณต้องการ */
    overflow-y: scroll; /* เลื่อนแนวตั้ง */
  }
  .statusRoom{
    font-size: 20px;
    margin-top: 35%; 
    color: #00A41A;
  }
  .text-form{
    margin-top: 100px;
    padding-left: 20px;
    padding-right: 20px;
  }
  .text-form a{
    display: block;
    color: #000000;
    padding: 10px 44px;
    text-decoration: none;
    font-size: 30px;
    text-align: center;
  }
  .text-form2{
    margin-top: 30px;
    padding-left: 20px;
    padding-right: 20px;
  }
  .text-form2 a{
    display: block;
    color: #ffffff;
    padding: 10px 44px;
    text-decoration: none;
    font-size: 30px;
    text-align: center;
    background-color: #A78565;
    border-radius: 10px; 
  }
  .topnav {
    margin-top: 50px;
    overflow: hidden;
    background-color: #ffffff;
}
.topnav a {
  float: left;
  display: block;
  color: #A4A4A4;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 24px;
  margin-left: 30px;
}
.topnav a:hover {
  text-decoration: underline;
  color: black;
  transition: 0.5s;
}
.topnav input[type=text] {
  float: right;
  padding: 6px;
  margin-top: 8px;
  margin-right: 16px;
  border: none;
  font-size: 17px;
  border-radius: 10px;
  border: 1px solid #000000;
  width: 30%;
}
.showheader {
  width: 100%;
  display: flex;
  font-size: 24px;
  margin-left: 46px;
  text-align: left;
  margin-top: 20px;
}

.detailroomshow{
  width: 100%;
  height: 20%;
  background-color: #F7F7F7;
  display: flex;
  font-size: 24px;
  margin-left: 46px;
  text-align: left;
  margin-top: 20px;
  text-decoration: none;
  border-radius: 10px;

}
.detailroomshow:hover{
  background-color: #c6c6c6;
  transition: 0.5s;
}
.Imgrooms{
  background-size: cover;
  width: fit-content;
  height: 86%;
  margin: 5%;
  border-radius: 10px;
}
  </style> 
  