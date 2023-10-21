<template>
    <div class="bodyroom">
      <div class="content1">
          <h1 style="text-align: center; font-size: 40px; font-weight: bold; margin-top: 20px; color: #000000;">KongTel</h1>
          <div class="text-form"><router-link to="/HomeComponent">Home</router-link></div>
          <div class="text-form2"><router-link to="/rooms">Room&nbsp;&nbsp;&nbsp;></router-link></div>
      </div>
      <div class="content2">
      <h2 style="text-align: left; font-size: 30px; font-weight: bold; margin-top: 20px; color: #000000; padding-left: 5%;">Rooms List</h2>
      <div class="topnav">
        <a href="#home">All Room(59)</a>
        <a href="#about">Available Room(20)</a>
        <a href="#contact">Booked(10)</a>
        <input type="text" placeholder="🔎Search..">
      </div>

      <div class="showheader">
        <div style="width: 35%;">Room Name</div>
        <div style="width: 12%;">Persons</div>
        <div style="width: 33%;">Facility</div>
        <div style="width: 20%;">Status</div>
      </div>

      <div class="detailroomshow">
        <div style="width: 20%;">
          <img class="Imgrooms" src="../assets/Room8person-Home.jpg" alt="roomtwo"/>
        </div>
        <div style="width: 15%;">
        <h3 style="font-size: 20px; color: #0047FF; margin-top: 25%;">#001</h3>
        <h3 style="font-size: 20px; color: #5D5D5D;">Room One</h3>
        </div>
        <div style="width: 12%;"><h3 style="font-size: 20px; color: #5D5D5D; margin-top: 45%; margin-left: 5%;">4</h3></div>
        <div style="width: 33%;"><h3 style="font-size: 20px; color: #5D5D5D; margin-top: 10%;">Free Wifi ,Free Computer, Free Snack, Access Control , Snack and Bar</h3></div>
        <div style="width: 16%; margin-bottom: 20px;"><h3 style="font-size: 20px; color: #5D5D5D; margin-top: 35%; color: #00A41A;">Available</h3></div>
      </div>

      <div class="detailroomshow">
        <div style="width: 20%;">
          <img class="Imgrooms" src="../assets/Room8person-Home.jpg" alt="roomtwo"/>
        </div>
        <div style="width: 15%;">
        <h3 style="font-size: 20px; color: #0047FF; margin-top: 25%;">#001</h3>
        <h3 style="font-size: 20px; color: #5D5D5D;">Room One</h3>
        </div>
        <div style="width: 12%;"><h3 style="font-size: 20px; color: #5D5D5D; margin-top: 45%; margin-left: 5%;">4</h3></div>
        <div style="width: 33%;"><h3 style="font-size: 20px; color: #5D5D5D; margin-top: 10%;">Free Wifi ,Free Computer, Free Snack, Access Control , Snack and Bar</h3></div>
        <div style="width: 16%; margin-bottom: 20px;"><h3 style="font-size: 20px; color: #5D5D5D; margin-top: 35%; color: #FF0000;">Booked</h3></div>
      </div>

      <div class="detailroomshow">
        <div style="width: 20%;">
          <img class="Imgrooms" src="../assets/Room8person-Home.jpg" alt="roomtwo"/>
        </div>
        <div style="width: 15%;">
        <h3 style="font-size: 20px; color: #0047FF; margin-top: 25%;">#001</h3>
        <h3 style="font-size: 20px; color: #5D5D5D;">Room One</h3>
        </div>
        <div style="width: 12%;"><h3 style="font-size: 20px; color: #5D5D5D; margin-top: 45%; margin-left: 5%;">4</h3></div>
        <div style="width: 33%;"><h3 style="font-size: 20px; color: #5D5D5D; margin-top: 10%;">Free Wifi ,Free Computer, Free Snack, Access Control , Snack and Bar</h3></div>
        <div style="width: 16%; margin-bottom: 20px;"><h3 style="font-size: 20px; color: #5D5D5D; margin-top: 35%; color: #FF0000;">Booked</h3></div>
      </div>

      <div class="detailroomshow">
        <div style="width: 20%;">
          <img class="Imgrooms" src="../assets/Room8person-Home.jpg" alt="roomtwo"/>
        </div>
        <div style="width: 15%;">
        <h3 style="font-size: 20px; color: #0047FF; margin-top: 25%;">#001</h3>
        <h3 style="font-size: 20px; color: #5D5D5D;">Room One</h3>
        </div>
        <div style="width: 12%;"><h3 style="font-size: 20px; color: #5D5D5D; margin-top: 45%; margin-left: 5%;">4</h3></div>
        <div style="width: 33%;"><h3 style="font-size: 20px; color: #5D5D5D; margin-top: 10%;">Free Wifi ,Free Computer, Free Snack, Access Control , Snack and Bar</h3></div>
        <div style="width: 16%; margin-bottom: 20px;"><h3 style="font-size: 20px; color: #5D5D5D; margin-top: 35%; color: #FF0000;">Booked</h3></div>
      </div>
      





    </div>
  </div>
  </template>
  <script>

  export default {
    name: 'Room-Detail',
    }
  
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

}
.Imgrooms{
  background-size: cover;
  width: fit-content;
  height: 86%;
  margin: 5%;
  border-radius: 10px;
}
  </style> 
  