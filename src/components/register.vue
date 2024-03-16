<template>
   <div class="Rimage-container">
    <h1 style=" margin-top: -520px;width:200px;color: rgb(255, 255, 255);font-size: 40px;">WEBSITE NAME</h1>
  </div>
  <div class="register-container">
    <h1 style="text-align: center; font-size: 24px; margin-bottom: 25px; margin-top: 40px;margin-left:20px">SIGN-UP</h1>
    <form @submit.prevent="Register">
    <div v-if="showRform" class="Rform-group">
        <label for="username" style="font-size: 20px;">Username</label>
        <input class="Rinpuserpass" type="text" id="username" style="text-align: center;" v-model="username" required>
      </div>
      <div v-if="showRform" class="Rform-group">
        <label for="email" style="font-size: 20px;">Email</label>
        <input class="Rinpuserpass" type="text" id="email" style="text-align: center;" v-model="email" required>
      </div>
      <div v-if="showRform" class="Rform-group">
        <label for="password" style="font-size: 20px;">Password</label>
        <input class="Rinpuserpass" type="password" id="password" style="text-align: center;" v-model="password" required>
      </div>
      
      <button v-if="showRform" type="submit">Next</button>
      
      <div v-if="showRform" class="Rclick">have an account? <router-link to="/Login" class="Rhere">Click here</router-link></div>
    </form>

    <form @submit.prevent="Registername">
      <div v-if="!showRform && currentRoute === '/Register/id'" class="Rform-group">
        <label for="Firstname" style="font-size: 20px;">Firstname</label>
        <input class="Rinpuserpass" type="text" id="Firstname" style="text-align: center;" v-model="Firstname" required>
      </div>
      <div v-if="!showRform && currentRoute === '/Register/id'" class="Rform-group">
        <label for="Lastname" style="font-size: 20px;">Lastname</label>
        <input class="Rinpuserpass" type="text" id="Lastname" style="text-align: center;" v-model="Lastname" required>
      </div>
      <div v-if="!showRform && currentRoute === '/Register/id'" class="Rform-group">
        <label for="Phone" style="font-size: 20px;">Phone</label>
        <input class="Rinpuserpass" type="text" id="Phone" style="text-align: center;" v-model="Phone" required>
      </div>
      <button v-if="!showRform && currentRoute === '/Register/id'" type="submit">Next</button>
    </form>

    <form @submit.prevent="Registerphoto">
      <div  v-if="!showRform && currentRoute === '/Register/photo'" class="Rform-group">
        <label for="image" style="font-size: 20px; text-align: center;">Upload an image:</label>
        <input style="font-size: 16px; text-align: center; padding-left: 100px;padding-top: 40px;padding-bottom: 30px;" type="file" id="image" accept="image/*" @change="handleImageUpload" />
      </div>
      <button v-if="!showRform && currentRoute === '/Register/photo'" type="submit">Confirm</button>
    </form>

    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import URL from '@/components/url.js'
  export default {
    name: 'RegisterForm', // ระบุชื่อของคอมโพเนนต์เป็น "LoginForm"
    data() {
      return {
        currentRoute: '',
        showRform: true,
        username: '',
        email:'',
        password: '',
        Firstname: '',
        Lastname: '',
        Phone: '',
        imageBase64: '',
        userishost: 1,
      };
    },
    methods: {
        Register() {
          if (this.username != '' && this.password != '') {
        this.$router.push('/Register/id'); 
      }
       else {
        alert('register failed. Please check your credentials.');
      }
      },
      Registername() {
        if (this.Firstname != '' && this.Lastname!= '' && this.Phone != '') {
          this.$router.push('/Register/photo');
      }
       else {
        alert('register failed. Please check your credentials.');
      }},
      handleImageUpload(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    this.imageBase64 = e.target.result; // เก็บข้อมูลรูปภาพในรูปแบบ base64
  };

  reader.readAsDataURL(file);
},

Registerphoto() {
  
  axios
    .post(URL+'/register', {
      user_username: this.username,
        user_email: this.email,
        user_password: this.password,
        user_fname: this.Firstname,
        user_lname: this.Lastname,
        user_phone: this.Phone,
        user_faceimagefile: this.imageBase64,
        user_ishost: this.userishost,
  }).then((response) => {
    const data = response.data;
    if (data.status === 'ok') {
      window.location = '/Login'
    } else {
      const errorMessage = data.message;
      alert(errorMessage)
    }
  }).catch(error => {
    console.error(error);
  });
}

    },
    watch: {
        '$route'(to) {
            this.currentRoute = to.path; 
            if (to.path === '/Register/id') {
          this.showRform = false; 
        } else if (to.path === '/Register/photo') {
          this.showRform = false; 
        } 
        else {
          this.showRform = true;
        }
        },
    },
  };
  </script>
  
  <style scoped>
.Rimage-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width:100%;
  background: url(../assets/firstPagePic.png) no-repeat center center;
  background-size: cover;
  overflow: hidden;
  
}
.register-container {
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

.Rform-group {
  margin-bottom: 22px;
  
}
.Rclick {
  margin-bottom: 25px;
  margin-top: 20px;
  text-align: center;
  font-size: 18px;
}
.Rhere{
  text-decoration: underline;
  color: #885B3B;
}
.Rhere:hover{
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

.Rinpuserpass {
  font-family: 'serif';
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
  font-size: 20px;
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