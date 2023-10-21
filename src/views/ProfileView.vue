<template>
  <head>
    <title>User Profile</title>
  </head>
  <body>
    <div>
      <profile-card>
        <div class="profile-card">
          <div class="profile-header">
            <div class="profile-avatar">
              <img src="../assets/Hometoppic_auto_x2.jpg" alt="User Avatar" />
            </div>
            <h1 class="user-name">{{ user.firstName }} {{ user.lastName }}</h1>
            <p class="user-email">{{ user.email }}</p>
          </div>
          <p class="user-bio">{{ user.bio }}</p>
          <p class="profile-contact">Phone: {{ user.phoneNumber }}</p>
        </div></profile-card>
    </div>
  </body>
</template>

<script>
export default {
  data() {
    return {
      user: {
        firstName: "Kong",
        lastName: "Pracharapol",
        email: "knog@example.com",
        bio: "Frontend Developer",
        phoneNumber: "123-456-7890",
        avatar: "", // URL ของรูปภาพ
      },
    };
  },
  methods: {
    editProfile() {
      this.isEditing = true;
      this.editedUser = { ...this.user };
    },
    saveProfile() {
      this.user = { ...this.editedUser };
      this.isEditing = false;
    },
    cancelEdit() {
      this.isEditing = false;
    },
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
