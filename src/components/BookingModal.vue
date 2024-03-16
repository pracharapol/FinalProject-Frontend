<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div class="modal">
    <div class="modal-content">
      <h2>Booking Confirmation</h2>
      <p>Are you sure you want to book this room?</p>
      <div class="reserve-container">
        <h1 style="text-align: center; font-size: 24px; margin-bottom: 25px; margin-top: 40px; margin-left:20px">SELECT</h1>
        <form @submit.prevent="confirmBooking">
          <div class="form-reserve">
            <label for="date" style="font-size: 20px;">Date</label>
            <input class="date" type="date" id="date" style="text-align: center;" v-model="dateReserve" required>
          </div>
          <div class="form-reserve">
            <label for="starttime" style="font-size: 20px;">Start-Time</label>
            <select class="date2" v-model="startTime" required>
              <option class="opttime" value="">Select</option>
              <template v-for="hour in Array.from({ length: 24 }, (_, index) => index)" :key="hour">
                <template v-for="minute in [0, 30]" :key="minute">
                  <option :value="`${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`" >
                    {{ String(hour).padStart(2, '0') }}:{{ String(minute).padStart(2, '0') }}
                  </option>
                </template>
              </template>
            </select>
          </div>
          <div class="form-reserve">
            <label for="endtime" style="font-size: 20px; margin-right: 5px;">End-Time</label>
            <select class="date2" v-model="endTime" required>
              <option class="opttime" value="">Select</option>
              <template v-for="hour in Array.from({ length: 24 }, (_, index) => index)" :key="hour">
                <template v-for="minute in [0, 30]" :key="minute">
                  <option :value="`${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`" >
                    {{ String(hour).padStart(2, '0') }}:{{ String(minute).padStart(2, '0') }}
                  </option>
                </template>
              </template>
            </select>
          </div>
          <div class="form-reserve">
            <label for="attendee" style="font-size: 20px; margin-right: 20px;">attendee</label>
              <select class="date2" v-model="selectedAttendee" required>
                <option value="">Select</option>
                <option v-for="attendee in getattendee" :value="attendee">{{ attendee }}</option>
              </select>
          </div>
          <button @click="closeModal" class="buttonBook">Cancel</button>
          <button type="submit" class="buttonBook">Confirm</button>
        </form>
      </div>
    </div>
  </div>
</template>

  
  <script>
    import axios from 'axios';
    import URL from '@/components/url.js'
  export default {
    data() {
    return {
      dateReserve: '',
      startTime: '',
      endTime: '',
      roomDetailId: null,
      getattendee: [],
      selectedAttendee: '',
    };
  },
  created() {
    // Set roomDetailId based on route parameter
    const roomDetailId = this.$route.params.roomdetail_id;

    // Fetch room details
    axios
      .get(URL+`/room/${roomDetailId}`)
      .then((response) => {
        this.room = response.data.room;
      })
      .catch((error) => {
        console.error('Failed to retrieve room details.', error);
      });
      this.fetchattendee();
  },
  methods: {
    fetchattendee() {
      axios
        .get(URL+'/attendee')
        .then((response) => {
          this.getattendee = response.data.allmail;
        })
        .catch((error) => {
          console.error('Failed to find attendee.', error);
        });
    },
    async confirmBooking() {
      try {
        const response = await this.reserveRoom();
        if (response.status === 'ok') {
          console.log('Room reserved successfully');
          this.closeModal();
          window.location = '/reservation';
        } else {
          alert(response.message);
          console.error('Error reserving room:', response.message);
        }
      } catch (error) {
        console.error('An unexpected error occurred:', error.message);
      }
    },
    async reserveRoom() {
  try {
    const roomDetailId = this.$route.params.roomdetail_id;
    const token = localStorage.getItem('token');
    const response = await fetch(URL+`/room/${roomDetailId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: token,
        start_time: this.formattedStartTime,
        end_time: this.formattedEndTime,
        date_reservation: this.formattedDate,
        update_reservlog: this.formattedDate,
        attendee_email: this.selectedAttendee,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to reserve room. Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('An unexpected error occurred while reserving the room:', error.message);
    throw error;
  }
},
    closeModal() {
      this.$emit('close');
    },
  },
    computed: {
    formattedDate() {
      // Format the date as 'yyyy-mm-dd'
      if (this.dateReserve) {
        const dateObject = new Date(this.dateReserve);
        const year = dateObject.getFullYear();
        const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const day = dateObject.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
      }
      return '';
    },
    formattedStartTime() {
      // Format the time as 'HH:mm:ss'
      if (this.startTime) {
        const [hours, minutes] = this.startTime.split(':');
        return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:00`;
      }
      return '';
    },
    formattedEndTime() {
      // Format the time as 'HH:mm:ss'
      if (this.endTime) {
        const [hours, minutes] = this.endTime.split(':');
        return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:00`;
      }
      return '';
    },
  },
  };
  </script>
  
  <style scoped>
  .modal {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
  
  .modal-content {
    background-color: white;
    padding: 20px;
    width: 500px;
    margin: 10% auto;
    border-radius: 20px;
  }
  .date {
  font-family: 'serif';
  font-size: 20px;
  width: 350px;
  height: 30px;
  padding: 5px 0px;
  border: none;
  border-bottom: 2px solid rgb(136, 91, 59);
  position: relative;
  padding-left: 5px;
  background-color: rgba(255, 255, 255, 0.7); /* ตั้งค่าพื้นหลังเป็นสีดำ */
  color: rgb(0, 0, 0); /* ตั้งค่าสีข้อความเป็นสีขาว */
  margin-left: 17px;
  margin-bottom: 30px;
}
.date2 {
  font-family: 'serif';
  font-size: 20px;
  width: 180px;
  height: 35px;
  padding: 5px 0px;
  border: 2px solid rgb(136, 91, 59);
  border-radius: 10px;
  position: relative;
  padding-left: 5px;
  background-color: rgba(255, 255, 255, 0.7); /* ตั้งค่าพื้นหลังเป็นสีดำ */
  color: rgb(0, 0, 0); /* ตั้งค่าสีข้อความเป็นสีขาว */
  margin-left: 17px;
  margin-bottom: 30px;
  text-align: center;
}

.buttonBook{
    border-radius: 10px; 
  background-color: #8E5F34;
  border: 1px solid #8E5F34;
  color: #ffffff;
  padding: 10px 44px;
  margin-left: 20px;
  margin-right: 20px;
  
}
.buttonBook:hover{
    cursor: pointer;
  background-color: #ffffff;
  color: #8E5F34;
  border: 1px solid #8E5F34;
  transition: 0.5s;
}
  </style>