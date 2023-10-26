
<template>
  <div class="image-container">
    <h1 style=" margin-top: -520px;width:200px;color: rgb(255, 255, 255);font-size: 40px;">WEBSITE NAME</h1>
  </div>
  <div class="login-container">
    
    <h1 style="text-align: center; font-size: 24px; margin-bottom: 25px; margin-top: 40px;margin-left:20px">LOGIN</h1>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="username" style="font-size: 20px;">Username</label>
        <input class="inpuserpass" type="text" id="username" style="text-align: center;" v-model="user_username" required>
      </div>
      <div class="form-group">
        <label for="password" style="font-size: 20px;">Password</label>
        <input class="inpuserpass" type="password" id="password" style="text-align: center;" v-model="user_password" required>
      </div>
      <button type="submit">Submit</button>
      <div class="click">Dont have account? <router-link to="/Register" class="here">Click here</router-link></div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  
  name: 'LoginForm', // ระบุชื่อของคอมโพเนนต์เป็น "LoginForm"
  data() {
    return {
      user_username: '',
      user_password: '',
    };
  },
  methods: {
    login(event) {
      event.preventDefault();

      // ส่ง POST request เพื่อ login
      axios
        .post('http://localhost:3333/login', {
          user_username: this.user_username,
          user_password: this.user_password,
        })
        .then((response) => {
          const data = response.data;
          if (data.status === 'ok') {
            const token = data.token;
            localStorage.setItem('token', token)
            window.location = '/HomeComponent'
          } else {
            const errorMessage = data.message;
            alert(errorMessage)
          }
        })
        .catch((error) => {
          
          console.error('Error:', error);
        });
    },
  },
};
</script>

<style scoped>

.login-container {
  width: 450px;
  height: 480px;
  margin: 0 auto;
  padding-right: 15px;
  border-radius: 10px;
  background-color: rgba(195, 195, 195, 0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}

.image-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width:100%;
  background: url(../assets/firstPagePic.png) no-repeat center center;
  filter: brightness(0.7);
  background-size: cover;
  overflow: hidden;
  
}

.form-group {
  margin-bottom: 22px;
  
}
.click {
  margin-bottom: 25px;
  margin-top: 20px;
  text-align: center;
  font-size: 18px;
}
.here{
  text-decoration: underline;
  color: #885B3B;
}
.here:hover{
  color: rgb(255, 0, 0);
  transition: 0.5s;
}
label {
  display: block;
  margin-bottom: 5px;
  text-align: left;
  margin-left: 17px;
  font-weight: bold;
}

.inpuserpass {
  font-family: 'serif';
  font-size: 20px;
  width: 350px;
  height: 30px;
  padding: 5px 0px;
  border: 2px solid rgb(136, 91, 59);
  border-radius: 10px;
  position: relative;
  padding-left: 5px;
  background-color: rgba(255, 255, 255, 0.7); /* ตั้งค่าพื้นหลังเป็นสีดำ */
  color: rgb(0, 0, 0); /* ตั้งค่าสีข้อความเป็นสีขาว */
  margin-left: 17px;
}

button {
  background-color: #885B3B;
  color: #fff;
  padding: 10px 15px;
  height: 42px;
  border: none;
  border-radius: 10px;
  width: 350px;
  cursor: pointer;
  font-weight: bold;
  font-family: serif;
  margin-left: 15px;
  margin-top: 0px;
  font-size: 18px;
}

button:hover{
  background-color:#a88063;
  border: none;
  color: #ffffff;
  transition: 0.5s;
}

</style>
