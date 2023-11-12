<template>
  <body>
  <div>
    <profile-card v-if="user">
      <div class="profile-card">
        <div class="profile-header">
          <div class="profile-avatar">
            <img src="../assets/Hometoppic_auto_x2.jpg" alt="User Avatar" />
          </div>
          <h1 class="user-name">{{ user.firstName }} {{ user.lastName }}</h1>
          <p class="user-email">{{ user.email }}</p>
        </div>
        <p class="user-bio">online: 24 Hour</p>
        <p class="profile-contact">Phone: {{ user.phoneNumber }}</p>
      </div>
    </profile-card>
    <div v-else>Loading...</div>
  </div>
</body>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: null,
    };
  },
  methods: {
    fetchUserProfile(token) {
      axios
        .get(`http://localhost:3333/profile/${token}`)
        .then((response) => {
          const { status, usname, usemail, usphone } = response.data;
          if (status === 'ok') {
            this.user = {
              firstName: usname.split(' ')[0],
              lastName: usname.split(' ')[1],
              email: usemail,
              phoneNumber: usphone,
            };
          } else {
            console.error(response.data.message);
          }
        })
        .catch((error) => {
          console.error('Failed to fetch user profile.', error);
        });
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
  text-align: left;
}

.profile-contact {
  font-size: 18px;
  margin: 10px 0;
}
</style>
