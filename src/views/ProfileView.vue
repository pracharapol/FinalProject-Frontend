<template>
  <div>
    <div style="text-align: left;">
      <router-link to="/HomeComponent"><img src="../assets/backIcon.png" alt="backIcon" style="width: 30px;height: 30px;margin-top: 30px;"/></router-link>
    </div>
    <profile-card v-if="user">
      <div class="profile-card">
        <div class="profile-header">
          <div class="profile-avatar">
            <img :src=user.usimg alt="User Avatar" />
          </div>
          <h1 class="user-name">{{ user.firstName }} {{ user.lastName }}</h1>
          <p class="user-email">{{ user.email }}</p>
        </div>
        <p class="user-bio">MY PROFILE</p>
        <p class="profile-contact">Phone: {{ user.phoneNumber }}</p>
      </div>
    </profile-card>
    <div class="loadingProfile" v-else>Loading...</div>
    <button v-if="user" class="edit-profile" @click="openEditModal">Edit Profile</button>
    <EditModal v-if="showEditModal" @close="closeEditModal" />
    <button v-if="user" class="change-pass" @click="openChangePassModal">Change Password</button>
    <ChangePassModal v-if="showChangePassModal" @close="closeChangePassModal" />
  </div>
</template>

<script>
import axios from 'axios';
import ChangePassModal from '@/components/ChangePassModal.vue'
import EditModal from '@/components/EditModal.vue'
import URL from '@/components/url.js'
export default {
  components: {
    ChangePassModal,
    EditModal,
  },
  data() {
    return {
      user: null,
      showChangePassModal: false,
      showEditModal: false,
    };
  },
  methods: {
    fetchUserProfile(token) {
      axios
        .get(URL+`/profile/${token}`)
        .then((response) => {
          const { status, usname, usemail, usphone, usimg } = response.data;
          if (status === 'ok') {
            this.user = {
              firstName: usname.split(' ')[0],
              lastName: usname.split(' ')[1],
              email: usemail,
              phoneNumber: usphone,
              usimg: usimg,
              
            };
            alert(usimg)
          } else {
            console.error(response.data.message);
          }
        })
        .catch((error) => {
          console.error('Failed to fetch user profile.', error);
        });
    },
    
    openChangePassModal() {
      this.showChangePassModal = true;
    },
    closeChangePassModal() {
      this.showChangePassModal = false;
    },
    openEditModal() {
      this.showEditModal = true;
    },
    closeEditModal() {
      this.showEditModal = false;
    },
  },
  mounted() {
    const token = localStorage.getItem('token');
    if (token) {
      this.fetchUserProfile(token);
    }
  },
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  background-color: rgb(248, 247, 247);
  text-align: center;
  margin: 0;
  padding: 0;
}

.profile-card {
  max-width: 400px;
  margin: 20px auto;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

.profile-header {
  background-color: rgb(136, 91, 59);
  color: #fff;
  padding: 20px;
  text-align: center;
}

.profile-avatar img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 3px solid #fff;
}

.user-name {
  font-size: 24px;
  margin: 10px 0;
}

.user-email {
  font-size: 18px;
  margin: 0;
}

.user-bio {
  font-size: 16px;
  padding: 20px;
  text-align: center;
}

.profile-contact {
  font-size: 18px;
  margin: 10px 0;
}

.edit-profile {
  background-color: #885B3B;
  color: #fff;
  padding: 10px 10px;
  height: 42px;
  border: none;
  border-radius: 10px;
  width: 300px;
  cursor: pointer;
  font-weight: bold;
  font-family: serif;
  margin-left: 15px;
  margin-top: 20px;
  font-size: 18px;
  margin-bottom:50px ;
}

.edit-profile:hover{
  background-color:#ffffff;
  border: 1px solid #885B3B;
  color: #885B3B;
  transition: 0.5s;
}

.change-pass {
  background-color: #885B3B;
  color: #fff;
  padding: 10px 10px;
  height: 42px;
  border: none;
  border-radius: 10px;
  width: 300px;
  cursor: pointer;
  font-weight: bold;
  font-family: serif;
  margin-left: 15px;
  margin-top: 20px;
  font-size: 18px;
  margin-bottom:50px ;
}

.change-pass:hover{
  background-color:#ffffff;
  border: 1px solid #885B3B;
  color: #885B3B;
  transition: 0.5s;
}
.loadingProfile{
  text-align: center;
  
}
</style>
