/* eslint-disable no-unused-vars */
var express = require('express')
var cors = require('cors')
var app = express()
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
const secret = "visiblepassword"
const moment = require('moment-timezone');
const thailandTimezone = 'Asia/Bangkok'; // โซนเวลาของประเทศไทย
const nowThailand = moment().tz(thailandTimezone);

app.use(cors())


const mysql = require('mysql2');
const req = require('express/lib/request');
// const { timeout } = require('nodemon/lib/config')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'mydb'
});
// checkEmailError-----------------------------------------------------------------------------------------------------------
const checkEmailError = (req, res, results) => {
    if (results.length > 0) {
        for (let i = 0; i < results.length; i++) {
            if (((results[i].user_username.toLowerCase() == req.body.user_username.toLowerCase())) || ((results[i].user_email.toLowerCase() == req.body.user_email.toLowerCase())) || [((results[i].user_fname.toLowerCase() == req.body.user_fname.toLowerCase()) && (results[i].user_lname.toLowerCase() == req.body.user_lname.toLowerCase()))]) {
                return true
            }
        }
        return false
    }
}
// checkEmailError------------------------------------------------------------------------------------------------------------

// Register-------------------------------------------------------------------------------------------------------------------
app.post('/register', jsonParser, function (req, res, next) {
    connection.execute(
        'SELECT * FROM user_insystem WHERE user_email=? or user_username=? or user_fname=? and user_lname=?', [req.body.user_username, req.body.user_email, req.body.user_fname, req.body.user_lname],
        function (err, results) {
            if (err) {
                return res
                    .json({ status: 'error', message: err })
            }
            else {
                if (checkEmailError(req, res, results)) {
                    return res.json({ status: 'email or name Duplecate' });
                }
                else {
                    bcrypt.hash(req.body.user_password, saltRounds, function (err, hash) {
                        connection.execute(
                            'INSERT INTO user_insystem (user_username, user_email, user_password, user_fname, user_lname, user_phone, user_faceimagefile) VALUES (?, ?, ?, ?, ?, ?, ?)',
                            [req.body.user_username, req.body.user_email, hash, req.body.user_fname, req.body.user_lname, req.body.user_phone, req.body.user_faceimagefile],
                            function (err, results, fields) {
                                if (err) {
                                    return res
                                        .json({ status: 'error', message: err })

                                }
                                return res
                                .json({ status: 'ok' })
                            }
                        );

                    });
                }
            }
        }
    )
})
// Register----------------------------------------------------------------------------------------------------------------

// Login-------------------------------------------------------------------------------------------------------------------
app.post('/login', jsonParser, function (req, res, next) {
    connection.execute(
        'SELECT * FROM user_insystem WHERE user_username=?',
        [req.body.user_username],
        function (err, users, fields) {
            if (err) {
                res.json({ status: 'error', message: err })
                return
            }
            if (users.length == 0) {
                res.json({ status: 'error', message: 'no user found' })
                return
            }else{
            const userId = users[0].user_id;
            bcrypt.compare(req.body.user_password, users[0].user_password, function (err, isLogin) {
                if (isLogin) {
                    var token = jwt.sign({ user_id: userId, username: users[0].user_username }, secret, { expiresIn: '10h' });
                    res.json({ status: 'ok', message: 'login success', token })

                }
                else {
                    res.json({ status: 'error', message: isLogin })
                }
            });
        }
        }
    )
})
// Login-------------------------------------------------------------------------------------------------------------------

// Authen-------------------------------------------------------------------------------------------------------------------

app.post('/authen', jsonParser, function (req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1]
        var decoded = jwt.verify(token, secret);
        res.json({ status: 'ok', decoded })
    } catch (err) {
        res.json({ status: 'error', message: err.message })
    }
})
// Authen-------------------------------------------------------------------------------------------------------------------

// Profile-------------------------------------------------------------------------------------------------------------------
app.get('/profile/:token', function (req, res) {
    try {
        const decode = jwt.verify(req.params.token, secret);
        const { username } = decode
        connection.execute(
            'SELECT * FROM user_insystem WHERE user_username=?',
            [username],
            function (err, results) {

                if (err) {
                    res.json({ status: 'error', message: err })
                    return
                }
                if (results.length == 0) {
                    res.json({ status: 'error', message: 'no user found' })
                    return
                }
                let Usname = results[0].user_fname + [" "] + results[0].user_lname
                let Usemail = results[0].user_email
                let Usphone = results[0].user_phone
                let Usimg = results[0].user_faceimagefile
                res.json({ status: 'ok', message: 'success', usname: Usname, usemail: Usemail, usphone: Usphone, usimg:Usimg })
                return
            }

        )

    } catch (err) {
        res.json({ status: 'error', message: err.message })
    }
})

app.put('/newProfile', jsonParser, function(req, res){
    const decode = jwt.verify(req.body.token, secret);
    const { username } = decode;
    const fname = req.body.user_fname;
    const lname = req.body.user_lname;
    const phone = req.body.user_phone;
    connection.query(
        'UPDATE user_insystem SET user_fname=?, user_lname=?, user_phone=? WHERE user_username=?', [fname, lname, phone, username],
        function (err, results) {
            if (err) {
                res.json({ status: 'error', message: err });
                return;
            }
            if (results.affectedRows === 0) {
                res.json({ status: 'not found user' });
                return;
            } else {
                res.json({ status: 'ok', message: 'Profile edited successfully' });
                return;
            }
        }
    );
});

// Profile-------------------------------------------------------------------------------------------------------------------

// NewPassword-------------------------------------------------------------------------------------------------------------------
app.put('/newPassword', jsonParser, function (req, res) {
    const decode = jwt.verify(req.body.token, secret);
    const { username } = decode
    connection.query(
        'SELECT user_password FROM user_insystem WHERE user_username=?', [username],
        function (err, users, fields) {
            bcrypt.compare(req.body.user_password, users[0].user_password, function (err, isLogin) {

                if (isLogin) {

                    bcrypt.hash(req.body.user_newpassword, saltRounds, function (err, hash) {

                        connection.execute(
                            'UPDATE user_insystem SET user_password =? WHERE user_username=? ', [hash, username],

                            function (err, results) {

                                if (err) {
                                    res.json({ status: 'error', message: err })
                                    return
                                }
                                if (results.length == 0) {
                                    res.json({ status: 'not found user ' })
                                    return
                                }
                                if (req.body.password == hash) {
                                    res.json({ status: 'error', message: err })
                                    return
                                }
                                else {

                                    res.json({ status: 'ok', message: 'Password updated successfully' });
                                    return
                                }
                            }
                        );

                    });
                }
                else {
                    res.json({ status: 'error', message: 'Your password is incorrect.' })
                }
                if (err) {
                    res.json({ status: 'error', message: err })
                    return
                }
            }
            );
        });
})
// NewPassword-------------------------------------------------------------------------------------------------------------------

// Reservation-------------------------------------------------------------------------------------------------------------------
app.post('/room/:roomdetail_id', jsonParser, async function (req, res) {
    try {
        const decode = jwt.verify(req.body.token, secret);
        const { username, user_id } = decode;
        const roomDetail = req.params.roomdetail_id;
        
        if (username && user_id) {
            const startTime = req.body.start_time;
            const endTime = req.body.end_time;
            const dateReserve = req.body.date_reservation;
            const createReserve = dateReserve;
            const updateReserve = req.body.update_reservlog;
            
            // ดึงข้อมูล roomDetail โดยใช้ Promise
            const roomDetailData = await getRoomDetail(roomDetail);
            const roomIsAvailable = await isRoomAvailable(roomDetail, dateReserve, startTime, endTime);

            if (startTime >= endTime) {
                res.json({ status: 'error', message: 'Start time cannot be greater than or equal to end time' });
                return;
            }
            if(roomIsAvailable) {
            if (roomDetailData) {
                // เพิ่มการจองโดยใช้ Promise
                await addReservation(startTime, endTime, user_id, dateReserve, createReserve, updateReserve, roomDetail);
                
                res.json({ status: 'ok', message: 'Room reserved successfully' });
            } else {
                res.json({ status: 'error', message: 'Room detail not found' });
            }
        }else {
            res.json({ status: 'error', message: 'Room not available' });
        }

        } else {
            res.json({ status: 'error', message: 'Unauthorized' });
        }
    } catch (err) {
        res.json({ status: 'error', message: err.message });
    }
});

// ฟังก์ชันสำหรับดึงข้อมูล roomDetail แบบ asynchronous
function getRoomDetail(roomDetail) {
    return new Promise((resolve, reject) => {
        connection.execute('SELECT * FROM roomdetail WHERE roomdetail_id=?', [roomDetail], (err, results, fields) => {
            if (err) {
                reject(err);
            } else {
                if (results.length > 0) {
                    resolve(results[0]);
                } else {
                    resolve(null);
                }
            }
        });
    });
}
// ฟังก์ชันสำหรับเพิ่มการจองแบบ asynchronous
function addReservation(startTime, endTime, user_id, dateReserve, createReserve, updateReserve, roomDetail) {
    return new Promise((resolve, reject) => {
        connection.execute(
            'INSERT INTO reservation (start_time, end_time, user_id, date_reservation, create_reservlog, update_reservlog, roomdetail_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [startTime, endTime, user_id, dateReserve, createReserve, updateReserve, roomDetail],
            (err, results, fields) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            }
        );
    });
}

async function isRoomAvailable(roomDetail, dateReserve, startTime, endTime) {
    const reservations = await getReservationsForRoomAndDate(roomDetail, dateReserve);
    if (reservations.length > 0) {
        const overlappingReservations = reservations.filter(reservation => {
            return (
                (reservation.start_time >= startTime && reservation.start_time < endTime) ||
                (reservation.end_time > startTime && reservation.end_time <= endTime) ||
                (reservation.start_time < startTime && reservation.end_time > endTime) ||
                (startTime >= reservation.start_time && endTime <= reservation.end_time)
            );
        });

        if (overlappingReservations.length > 0) {
            return false;
        } else {
            return true;
        }
    } else {
        return true;
    }
}

// ฟังก์ชันสำหรับดึงข้อมูลการจองสำหรับห้องและวันที่ที่กำหนด
function getReservationsForRoomAndDate(roomDetail, dateReserve) {
    return new Promise((resolve, reject) => {
        connection.execute(
            'SELECT * FROM reservation WHERE roomdetail_id=? AND date_reservation=?',
            [roomDetail, dateReserve],
            (err, results, fields) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            }
        );
    });
}
// Reservation-------------------------------------------------------------------------------------------------------------------

// Get Room URL-------------------------------------------------------------------------------------------------------------------
app.get('/room/:room_id', async function (req, res) {
    try {
        const roomDetailId = req.params.room_id;
        
        if (roomDetailId) {
            // ดึงข้อมูลห้องโดยใช้ Promise หรือฟังก์ชันที่เหมาะสม
            const roomData = await getRoomDetail(roomDetailId);
            
            if (roomData) {
                res.json({ status: 'ok', room: roomData });
            } else {
                res.json({ status: 'error', message: 'Room not found' });
            }
        } else {
            res.json({ status: 'error', message: 'Invalid input data' });
        }
    } catch (err) {
        res.json({ status: 'error', message: err.message });
    }
});


app.get('/room', (req, res) => {
    connection.query('SELECT * FROM roomdetail', (err, results) => {
      if (err) {
        console.error('Error querying MySQL:', err);
        res.status(500).json({ status: 'error', message: 'Failed to retrieve room list' });
      } else {
        // ปรับเปลี่ยนค่า status_room เป็นคำอธิบายที่เหมาะสม
        const roomsWithStatusDescription = results.map((room) => {
          if (room.status_room === 0) {
            room.status_room = 'booked';
          } else if (room.status_room === 1) {
            room.status_room = 'available';
          }
          return room;
        });
  
        res.status(200).json({ status: 'ok', rooms: roomsWithStatusDescription });
      }
    });
  });
// Get Room URL-------------------------------------------------------------------------------------------------------------------

// API endpoint สำหรับอัปเดต status_room จากฐานข้อมูล reservation--------------------------------------------------------------------
function updateRoomStatus(roomdetail_id, status) {
    connection.query('UPDATE roomdetail SET status_room = ? WHERE roomdetail_id = ?', [status, roomdetail_id], (err) => {
      if (err) {
        console.error(`Failed to update status for room ${roomdetail_id}`, err);
      }
    });
  }
  function compareAndUpdateRoomStatus() {
    connection.query('SELECT roomdetail_id, start_time, end_time, date_reservation FROM reservation', (err, results) => {
      if (err) {
        console.error('Failed to fetch reservation data', err);
        return;
      }
      
      results.forEach((result) => {
        const { roomdetail_id, start_time, end_time, date_reservation } = result;
        const startTime = moment(start_time, 'HH:mm:ss').format('HH:mm:ss');
        const datereservationTime = moment(date_reservation, 'YYYY-MM-DD').format('YYYY-MM-DD');
        const reservationTime = moment(datereservationTime + 'T' + startTime).format('YYYY-MM-DD'+'T'+'HH:mm:ss');
        const endTime1 = moment(end_time, 'HH:mm:ss').format('HH:mm:ss');
        const endTime = moment(datereservationTime + 'T' + endTime1).format('YYYY-MM-DD'+'T'+'HH:mm:ss');
  
        if (nowThailand.format('YYYY-MM-DD'+'T'+'HH:mm:ss') >= reservationTime && nowThailand.format('YYYY-MM-DD'+'T'+'HH:mm:ss') <= endTime) {
          updateRoomStatus(roomdetail_id, 0);
        } else {
          updateRoomStatus(roomdetail_id, 1);
        //   console.log('reservationTime',reservationTime)
        //   console.log('endTime',endTime)
        //   console.log('nowThailand',nowThailand.format('YYYY-MM-DD'+'T'+'HH:mm:ss'))
        }
      });
    });
  }

  app.put('/update-room-status', (req, res) => {
    compareAndUpdateRoomStatus();
    res.status(200).json({ status: 'ok' });
  });
  
// API endpoint สำหรับอัปเดต status_room จากฐานข้อมูล reservation--------------------------------------------------------------------

// GetReservation-------------------------------------------------------------------------------------------------------------------
app.get('/getreservations/:token', function (req, res) {
    try {
        const decode = jwt.verify(req.params.token, secret);
        const { username } = decode;
        connection.execute(
            'SELECT * FROM reservation WHERE user_id IN (SELECT user_id FROM user_insystem WHERE user_username = ?)',
            [username],
            function (err, results) {
                if (err) {
                    res.json({ status: 'error', message: err });
                    return;
                }
                if (results.length === 0) {
                    res.json({ status: 'error', message: 'No reservations found for this user' });
                    return;
                }

                // สร้างรายการข้อมูลการจอง
                
                const reservations = results.map((result) => {
                    const date_reservation = moment(result.date_reservation); // แปลงเป็น Moment object
                    date_reservation.add(7, 'hours');
                    return {
                        start_time: result.start_time,
                        end_time: result.end_time,
                        room_id: result.roomdetail_id,
                        date_reservation: date_reservation,
                        reservation_id: result.reservation_id
                        
                    };
                    
                });
                
                res.json({ status: 'ok', message: 'Success', reservations: reservations });
                return;
                
            }
        );
    } catch (err) {
        res.json({ status: 'error', message: err.message });
    }
});
// GetReservation-------------------------------------------------------------------------------------------------------------------

//adminroomdetail---------------------------------------------------------------------------------------------------------------
app.post('/roomdetail',jsonParser, (req, res) => {
    const roomNum = req.body.room_num;
    const statusRoom = req.body.status_room;
    const roomDesc = req.body.roomdetail_desc;
    const roomPerson = req.body.room_person;
    if (roomNum && statusRoom && roomPerson && roomDesc) {
      connection.execute(
        'INSERT INTO roomdetail (room_num, status_room, roomdetail_desc, room_person) VALUES (?, ?, ?, ?)',
        [roomNum,statusRoom,roomDesc,roomPerson],
        function (err, results) {
          if (err) {
            return res.json({ status: 'error', message: err });
          }
          return res.json({ status: 'ok' });
        }
      );
    } else {
      return res.json({ status: 'error', message: 'Invalid input data' });
    }
  });
  
  app.put('/roomdetail/:roomdetail_id/:token', jsonParser, (req, res) => {
    const roomDetailId = req.params.roomdetail_id;
    const statusRoom = req.body.status_room;
    const roomNumber = req.body.room_num;
    if (roomDetailId && statusRoom && roomNumber) {
      connection.execute(
        'UPDATE roomdetail SET status_room = ? ,  room_num = ? WHERE roomdetail_id = ?',
        [statusRoom, roomNumber,roomDetailId],
        function (err, results) {
          if (err) {
            return res.json({ status: 'error', message: err });
          }
          return res.json({ status: 'ok' });
        }
      );
    } else {
      return res.json({ status: 'error', message: 'Invalid input data' });
    }
  });
  
  
  //roomdetail---------------------------------------------------------------------------------------------------------------

  //Cancel reservation---------------------------------------------------------------------------------------------------------------
  app.delete('/cancelreservation/:reservation_id/:token', function (req, res) {
    try {
        const decode = jwt.verify(req.params.token, secret);
        const { username } = decode;
        const reservationId = req.params.reservation_id;

        if (reservationId) {
            // ตรวจสอบว่าผู้ใช้ที่ต้องการยกเลิกการจองเป็นเจ้าของการจอง
            connection.execute(
                'SELECT user_id FROM user_insystem WHERE user_username = ?',
                [username],
                function (err, results) {
                    if (err) {
                        res.json({ status: 'error', message: err });
                        return;
                    }

                    if (results.length === 0) {
                        res.json({ status: 'error', message: 'User not found' });
                        return;
                    }

                    const userId = results[0].user_id;

                    // ตรวจสอบว่าการจองที่ต้องการยกเลิกมี userId ตรงกับผู้ใช้ปัจจุบัน
                    connection.execute(
                        'SELECT user_id FROM reservation WHERE reservation_id = ?',
                        [reservationId],
                        function (err, results) {
                            if (err) {
                                res.json({ status: 'error', message: err });
                                return;
                            }

                            if (results.length === 0) {
                                res.json({ status: 'error', message: 'Reservation not found' });
                                return;
                            }

                            if (results[0].user_id !== userId) {
                                res.json({ status: 'error', message: 'You are not authorized to cancel this reservation' });
                                return;
                            }

                            // ถ้าผู้ใช้มีสิทธิ์ยกเลิกการจอง ให้ลบการจอง
                            connection.execute(
                                'DELETE FROM reservation WHERE reservation_id = ?',
                                [reservationId],
                                function (err, results) {
                                    if (err) {
                                        res.json({ status: 'error', message: err });
                                        return;
                                    }

                                    res.json({ status: 'ok', message: 'Reservation canceled successfully' });
                                }
                            );
                        }
                    );
                }
            );
        } else {
            res.json({ status: 'error', message: 'Invalid input data' });
        }
    } catch (err) {
        res.json({ status: 'error', message: err.message });
    }
});
  //Cancel reservation---------------------------------------------------------------------------------------------------------------

  //Get time reservation---------------------------------------------------------------------------------------------------------------
  app.get('/checkanddelete/:roomdetail_id', function (req, res) {
    try {
        const roomDetailId = req.params.roomdetail_id;
        
        // คิวรีเรียกข้อมูลการจองในห้องที่ระบุ
        connection.execute(
            'SELECT * FROM reservation WHERE roomdetail_id = ?',
            [roomDetailId],
            function (err, results) {
                if (err) {
                    return res.json({ status: 'error', message: err });
                }

                const reservationsToDelete = [];
                const reservationsToKeep = [];

                results.forEach((reservation) => {
                    const end_time = moment(reservation.end_time, 'HH:mm:ss');
                    const date_reservation = moment(reservation.date_reservation, 'YYYY-MM-DD');

                    if (end_time.isBefore(nowThailand) && date_reservation.isBefore(nowThailand)) {
                        reservationsToDelete.push(reservation);
                    } else {
                        reservationsToKeep.push(reservation);
                    }
                });

                if (reservationsToDelete.length > 0) {
                    // ลูปผ่านการจองที่ต้องการลบและลบข้อมูลการจอง
                    for (const reservation of reservationsToDelete) {
                        connection.execute(
                            'DELETE FROM reservation WHERE reservation_id = ?',
                            [reservation.reservation_id],
                            function (err, deleteResult) {
                                if (err) {
                                    return res.json({ status: 'error', message: err });
                                }
                            }
                        );
                    }
                    return res.json({
                        status: 'ok',
                        message: 'Checked and deleted reservations for the room',
                        reservationsToDelete: reservationsToDelete,
                        reservationsToKeep: reservationsToKeep,
                        nowThailand: nowThailand.format()
                    });
                } else {
                    return res.json({
                        status: 'ok',
                        message: 'No reservations to delete for the room',
                        reservationsToDelete: [],
                        reservationsToKeep: reservationsToKeep,
                        nowThailand: nowThailand.format()
                    });
                }
            }
        );
    } catch (err) {
        return res.json({ status: 'error', message: err.message });
    }
});
//Get time reservation---------------------------------------------------------------------------------------------------------------

//Get attendee---------------------------------------------------------------------------------------------------------------
app.get('/attendee', function (req, res) {
    try {
        connection.execute(
            'SELECT user_email FROM user_insystem',
            function (err, results) {
                if (err) {
                    return res.json({ status: 'error', message: err });
                }
                if (results.length == 0) {
                    return res.json({ status: 'error', message: 'no user found' });
                }
                // ต้องดึงออกจาก results ในรูปแบบของ array
                let allMails = results.map(result => result.user_email);
                res.json({ status: 'ok', message: 'success', allmail: allMails });
                return;
            }
        );
    } catch (err) {
        return res.json({ status: 'error', message: err.message });
    }
});

//Get attendee---------------------------------------------------------------------------------------------------------------

//setInterval------------------------------------------------------------------------------------------------------------------------
const updateInterval = 5 * 60 * 1000; // 5 นาทีในมิลลิวินาที
setInterval(compareAndUpdateRoomStatus, updateInterval);
compareAndUpdateRoomStatus();
//setInterval------------------------------------------------------------------------------------------------------------------------

app.listen(3333, function () {
  console.log('CORS-enabled web server listening on port 3333')
})