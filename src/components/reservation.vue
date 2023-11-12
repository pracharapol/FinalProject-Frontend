<template>
    <div class="bodyroom">
      <div class="content1">
          <h1 style="text-align: center; font-size: 40px; font-weight: bold; margin-top: 20px; color: #000000;">KongTel</h1>
          <div class="text-form"><router-link to="/HomeComponent">Home</router-link></div>
          <div class="text-form2"><router-link to="/reservation">Reservation&nbsp;&nbsp;&nbsp;></router-link></div>
      </div>
      
      <div class="content2">
      <div class="showheader">
        <div style="width: 20%;">Room Name</div>
        <div style="width: 20%;">Date</div>
        <div style="width: 20%;">Start-Time</div>
        <div style="width: 20%;">End-Time</div>
        <div style="width: 20%;">Cancel</div>
      </div>


        <div style="width: 100%; height: 20%;" v-for="reservation in reservations" :key="reservation.reservation_id" class="detailroomshow">
        
            <div style="width: 20%;">
                <h3 style="font-size: 20px; color: #00A41A; margin-top: 20%; margin-left: 10%;">{{ reservation.room_id }}</h3>
                <h3 style="font-size: 20px; color: #5D5D5D; margin-left: 10%;">Room {{ reservation.room_id }}</h3>
            </div>
            <div style="width: 20%;">
              <h3 style="font-size: 20px; color: #00A41A; margin-top: 30%;">{{ String(reservation.date_reservation).split('T')[0] }}</h3>
              
            </div>
            <div style="width: 20%;"><h3 style="font-size: 20px; color: #00A41A; margin-top: 30%; margin-left: 5%;">{{ reservation.start_time }}</h3></div>
            <div style="width: 20%;"><h3 style="font-size: 20px; color: red; margin-top: 30%; margin-left: 5%;">{{ reservation.end_time }}</h3></div>
            <div style="width: 20%;"><h3 style="font-size: 20px; margin-top: 25%; margin-right: 10%;"><button @click="cancelReservation(reservation)" class="button-cancel">Cancel</button></h3></div>
        
        </div>
    </div>
    </div>

  </template>
  <script>
  import axios from 'axios';
  
  export default {
    name: 'Reservation-list',
    data() {
      return {
        reservations: [],
      };
    },
    methods: {
        fetchReservation(token) {
      axios
        .get(`http://localhost:3333/getreservations/${token}`)
        .then((response) => {
          const {status, reservations } = response.data;
          if (status === 'ok') {
            this.reservations = reservations;
          } else {
            console.error(response.data.message);
          }
        })
        .catch((error) => {
          console.error('Failed to fetch user reservations.', error);
        });
    },
    cancelReservation(reservation) {
    const token = localStorage.getItem('token');
    console.log('Attempting to cancel reservation with ID:', reservation.reservation_id);

    axios
        .delete(`http://localhost:3333/cancelreservation/${reservation.reservation_id}/${token}`)
        .then((response) => {
            console.log(response);  // Log the response
            const { status, message } = response.data;
            if (status === 'ok') {
                // Remove the canceled reservation from the local list
                this.reservations = this.reservations.filter(res => res.reservation_id !== reservation.reservation_id);
                this.$router.go(0);
                console.log(message);
            } else {
                console.error(message);
            }
        })
        .catch((error) => {
            console.error('Failed to cancel reservation.', error);
        });
},
      
    },
    mounted() {
    setInterval(this.fetchReservation, 5 * 60 * 1000);  // Change to fetchReservation
    const token = localStorage.getItem('token');
    if (token) {
        this.fetchReservation(token);
    }
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
.button-cancel{
    border-radius: 10px; 
  background-color: #8E5F34;
  border: 1px solid #8E5F34;
  color: #ffffff;
  padding: 10px 44px;
}
.button-cancel:hover{
    cursor: pointer;
  background-color: #ffffff;
  color: #8E5F34;
  border: 1px solid #8E5F34;
  transition: 0.5s;
}
</style> 