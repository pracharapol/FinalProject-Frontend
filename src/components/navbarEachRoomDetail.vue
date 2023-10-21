<template>
  <nav id="navDetail">
    <li>
      <router-link to="/DetailPage">Overviews</router-link>
    </li>
    <li>
      <router-link to="/DetailPage/rooms">Rooms</router-link>
    </li>
    <li>
      <router-link to="/DetailPage/facilities">Facilities</router-link>
    </li>
    <li>
      <router-link to="/DetailPage/policy">Policy</router-link>
    </li>
    <div>
      <div v-if="showOverView" class="detailOverview">
        <h1 style="text-align: left; margin-left: 50px; margin-top: 80px">
          Properties Overview
        </h1>
        <div class="containers">
          <div class="left-side">
            <div style="width: 174px; line-height: 48px; margin-top: 12px">
              <img src="../assets/Wifi.png" alt="wifi" />
              <p style="display: inline">Free WIFI</p>
              <img src="../assets/Air-Condition.png" alt="air condition" />
              <p style="display: inline">Air Conditioner</p>
              <img
                src="../assets/Face-recognition.png"
                alt="face recognition"
              />
              <p style="display: inline">Access By Face</p>
              <img src="../assets/Toilet.png" alt="toilet" />
              <p style="display: inline">Public Toilet</p>
            </div>
          </div>
          <div class="right-side">
            <div style="width: 208px; line-height: 48px">
              <img src="../assets/Clock.png" alt="clock" />
              <p style="display: inline">Open 24 Hours</p>
              <img src="../assets/Computer.png" alt="computer" />
              <p style="display: inline">Free One Computer</p>
              <img src="../assets/Snack.png" alt="snack" />
              <p style="display: inline">Snack and Drink Free</p>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="!showOverView && currentRoute === '/DetailPage/rooms'"
        class="detailOverview"
      >
        Room here
      </div>
      <div
        v-if="!showOverView && currentRoute === '/DetailPage/facilities'"
        class="detailOverview"
      >
        ficilities here
      </div>
      <div
        v-if="!showOverView && currentRoute === '/DetailPage/policy'"
        class="detailOverview"
      >
        policy here
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: "navDetail",
  props: {
    currentRoute: String, // รับค่า currentRoute จาก parent component
  },
  data() {
    return {
      showOverView: true,
    };
  },
  watch: {
    $route(to) {
      // เมื่อ URL เปลี่ยน
      if (to.path === "/DetailPage/rooms") {
        this.showOverView = false;
      } else if (to.path === "/DetailPage/facilities") {
        this.showOverView = false;
      } else if (to.path === "/DetailPage/policy") {
        this.showOverView = false;
      } else {
        this.showOverView = true;
      }
    },
  },
};
</script>
<style scoped>
.detailOverview {
  margin-top: 60px;
}
.left-side {
  flex: 3;
  padding-left: 120px;
  padding-top: 10px;
  background-color: none;
  text-align: left;
  color: black;
  font-size: 18px;
}
.right-side {
  flex: 7;
  background-color: none;
  padding-top: 18px;
  padding-left: 40px;
  text-align: left;
  color: black;
  font-size: 18px;
}
.right-side img {
  height: 30px;
  width: 30px;
  margin-bottom: -8px;
  padding-right: 20px;
}
.left-side img {
  height: 30px;
  width: 30px;
  margin-bottom: -8px;
  padding-right: 20px;
}
.containers {
  width: 1200px;
  height: 300px;
  display: flex;
}

li a {
  color: rgb(126, 123, 123);
  border-bottom: 1px white;
  font-size: 18px;
}
li a:hover {
  border-bottom: 1px solid #0c4ced;
  color: #0c4ced;
  transition: 0.1ms;
}
nav {
  border-bottom: none;
  background: none;
}
</style>
