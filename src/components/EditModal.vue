<template>
    <div class="editmodal">
      <div class="editmodal-content">
        <h2>Edit Profile</h2>
        <p>Are you sure you want to change your Profile?</p>
        <div class="edit-container">
          <form @submit.prevent="confirmEdit">
            <div class="form-edit">
              <label for="fname" style="font-size: 20px; padding-left:11px ;">Fistname</label>
              <input class="editprofile" type="text" id="fname" style="text-align: center;" v-model="fname" required>
            </div>
            <div class="form-changepass">
              <label for="lname" style="font-size: 20px; padding-left:9px">Lastname</label>
              <input class="editprofile" type="text" id="lname" style="text-align: center;" v-model="lname" required>
            </div>
            <div class="form-changepass">
              <label for="phone" style="font-size: 20px; padding-left:35px">Phone</label>
              <input class="editprofile" type="phone" id="phone" style="text-align: center;" v-model="phone" required>
            </div>
            <button  @click="closeEditModal" class="buttonEdit">Cancel</button>
            <button type="submit" class="buttonEdit">Confirm</button>
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
        fname: '',
        lname: '',
        phone: '',
      };
    },
    mounted() {
    const Token = localStorage.getItem('token');
    axios.get(`http://localhost:3333/profile/${Token}`)
      .then(response => {
        const data = response.data;
        if (data.status === 'ok') {
          this.fname = data.usname.split(' ')[0];
          this.lname = data.usname.split(' ')[1]; 
          this.phone = data.usphone;
        } else {
          alert(data.message);
        }
      })
      .catch(error => {
        console.error(error);
      });
  },
    methods: {
        confirmEdit() {
        const Token = localStorage.getItem('token');
          axios.put('http://localhost:3333/newProfile', {
              token: Token,
              user_fname: this.fname,
              user_lname: this.lname,
              user_phone: this.phone
          })
          .then(response => {
            const data = response.data;
            if (data.status === 'ok') {
                this.$router.go(0)
            }else {
              const errorMessage = data.message;
              alert(errorMessage)
            }
          })
          .catch(error => {
            console.error(error);
          });
      },
      closeEditModal() {
        this.$emit('close');
      },
    }
  };
  </script>
  
  <style scoped>
  .editmodal {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  
  .editmodal-content {
    background-color: white;
    padding: 20px;
    width: 500px;
    margin: 10% auto;
    border-radius: 20px;
  }
  
  .editprofile {
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
  

  
  .buttonEdit {
    border-radius: 10px;
    background-color: #8E5F34;
    border: 1px solid #8E5F34;
    color: #ffffff;
    padding: 10px 44px;
    margin-left: 20px;
    margin-right: 20px;
  }
  
  .buttonEdit:hover {
    cursor: pointer;
    background-color: #ffffff;
    color: #8E5F34;
    border: 1px solid #8E5F34;
    transition: 0.5s;
  }
  </style>
  