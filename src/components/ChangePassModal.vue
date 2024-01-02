<template>
  <div class="changepassmodal">
    <div class="changepassmodal-content">
      <h2>Change Password</h2>
      <p>Are you sure you want to change your password?</p>
      <div class="changepass-container">
        <form @submit.prevent="confirmChangepass">
          <div class="form-changepass">
            <label for="password" style="font-size: 20px; padding-left:70px ;">Password</label>
            <input class="changepassword" type="password" id="password" style="text-align: center;" v-model="changepassword" required>
          </div>
          <div class="form-changepass">
            <label for="confirmpassword" style="font-size: 20px; padding-left:30px">New Password</label>
            <input class="confirmpassword" type="password" id="confirmpassword" style="text-align: center;" v-model="confirmpassword" required>
          </div>
          <div class="form-changepass">
            <label for="confirmpasswordagain" style="font-size: 20px;">Confirm Password</label>
            <input class="confirmpassword" type="password" id="confirmpasswordagain" style="text-align: center;" v-model="confirmpasswordagain" required>
          </div>
          <button  @click="closechangepassModal" class="buttonChangepass">Cancel</button>
          <button type="submit" class="buttonChangepass">Confirm</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      changepassword: '',
      confirmpassword: '',
      confirmpasswordagain: '',
    };
  },
  methods: {
    confirmChangepass() {
      const Token = localStorage.getItem('token');
      if (this.confirmpassword === this.confirmpasswordagain) {
        axios.put('http://localhost:3333/newPassword', {
            token: Token,
            user_password: this.changepassword,
            user_newpassword: this.confirmpassword
        })
        .then(response => {
          const data = response.data;
          if (data.status === 'ok') {
          localStorage.removeItem('token');
          this.isLoggedIn = false;
          this.$router.push('/Login');
          }else {
            const errorMessage = data.message;
            alert(errorMessage)
          }
        })
        .catch(error => {
          console.error(error);
        });
      } else {
        alert('New passwords do not match');
      }
    },
    closechangepassModal() {
      this.$emit('close');
    },
  }
};
</script>

<style scoped>
.changepassmodal {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.changepassmodal-content {
  background-color: white;
  padding: 20px;
  width: 500px;
  margin: 10% auto;
  border-radius: 20px;
}

.changepassword {
  font-family: 'serif';
  font-size: 20px;
  width: 300px;
  height: 30px;
  padding: 5px 0px;
  border: none;
  border-bottom: 2px solid rgb(136, 91, 59);
  position: relative;
  padding-left: 5px;
  background-color: rgba(255, 255, 255, 0.7);
  color: rgb(0, 0, 0);
  margin-left: 17px;
  margin-bottom: 30px;
}

.confirmpassword {
  font-family: 'serif';
  font-size: 20px;
  width: 300px;
  height: 30px;
  padding: 5px 0px;
  border: none;
  border-bottom: 2px solid rgb(136, 91, 59);
  position: relative;
  padding-left: 5px;
  background-color: rgba(255, 255, 255, 0.7);
  color: rgb(0, 0, 0);
  margin-left: 17px;
  margin-bottom: 30px;
}

.buttonChangepass {
  border-radius: 10px;
  background-color: #8E5F34;
  border: 1px solid #8E5F34;
  color: #ffffff;
  padding: 10px 44px;
  margin-left: 20px;
  margin-right: 20px;
}

.buttonChangepass:hover {
  cursor: pointer;
  background-color: #ffffff;
  color: #8E5F34;
  border: 1px solid #8E5F34;
  transition: 0.5s;
}
</style>
