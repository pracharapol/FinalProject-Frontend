<template>
  <nav id="nav">
    <li><router-link to="/" style="background-color: rgb(255, 255, 255); font-size: 20px; font-weight: bold;">ABC Rooms</router-link></li>
    <li v-if="!isLoggedIn" class="Login-button"><router-link to="/Login">Login</router-link></li>
    <li v-if="!isLoggedIn" class="Sign-button"><router-link to="/Register">Sign-up</router-link></li>
    <li v-if="isLoggedIn" class="dropdown"><button class="dropbtn">Menu
      <i class="fa fa-caret-down"></i>
    </button>
    <div class="dropdown-content">
      <router-link to="/profile">Profile</router-link>
      <a href="/reservation">Reservation</a>
      <a @click="logout">Log-out</a>
    </div></li>


  </nav>
  <router-view/>
</template>

<script>
export default {
  name: "NavbarLogin",
  data() {
    return {
      isLoggedIn: false,
    };
  },
  methods: {
    fetchAuthen() {
      const token = localStorage.getItem('token');
      if (token) {
        this.isLoggedIn = true;
      }
    },
    logout() {
      // Remove the token from local storage
      localStorage.removeItem('token');
      // Set isLoggedIn to false
      this.isLoggedIn = false;
      // Navigate to the login page
      this.$router.push('/Login');
    },
  },
  mounted() {
    this.fetchAuthen();
  },
};
</script>
<style>
.Sign-button {
  float: right;
}
.Sign-button a{
  border-radius: 10px; 
  background-color: #ffffff;
  border: 1px solid #8E5F34;
  color: #8E5F34;
}
.Login-button {
  float: right;
  padding-right: 20px;
}
.Login-button a{
  border-radius: 10px; 
  background-color: #8E5F34;
  border: 1px solid #8E5F34;
  color: #ffffff;
}
.Login-button a:hover{
  background-color: #ffffff;
  color: #8E5F34;
  border: 1px solid #8E5F34;
  transition: 0.5s;
}
.Sign-button a:hover{
  background-color: #8E5F34;
  color: #ffffff;
  border: 1px solid #8E5F34;
  transition: 0.5s;
}
nav {
  list-style-type: none;
  margin: 10px 0px;
  padding: 0;
  overflow: hidden;
  background-color: #ffffff;
  border-bottom: 2px solid #C5BDBD;
  
}
li {
  float: left;
  margin-top: 5px;
  margin-bottom: 10px;
  padding-left: 10px;
  
}


li a {
  display: block;
  color: #8E8282;
  text-align: center;
  padding: 10px 44px;
  text-decoration: none;
}
li a:hover {
  color: #111;
  transition: 0.5s;
}

nav a.router-link-exact-active {
  color: #8E5F34;
}
.dropdown {
  float: right;
  padding-right: 20px;
}
.dropbtn{
  border-radius: 10px; 
  background-color: #8E5F34;
  border: 1px solid #8E5F34;
  color: #ffffff;
  padding: 10px 44px;
  
}
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content a {
  float: none;
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
}

.dropdown-content a:hover {
  background-color: #ddd;
  
}

.dropdown:hover .dropdown-content {
  display: block;
  
}
.dropbtn:hover{
  cursor: pointer;
  background-color: #ffffff;
  color: #8E5F34;
  border: 1px solid #8E5F34;
  transition: 0.5s;
}
.dropdown-content a:hover{
  cursor: pointer;
}
</style>