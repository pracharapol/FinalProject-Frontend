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
app.use(cors())

const mysql = require('mysql2');
const req = require('express/lib/request');
// const { timeout } = require('nodemon/lib/config')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'mydb'
});
// checkEmailError-------------------------------------------------------------------------------------------------------------------
const checkEmailError = (req, res, results) => {
    if (results.length > 0) {
        for (let i = 0; i < results.length; i++) {
            if (((results[i].user_username.toLowerCase() == req.body.user_username.toLowerCase())) || ((results[i].user_email.toLowerCase() == req.body.user_email.toLowerCase())) || [((results[i].user_Fname.toLowerCase() == req.body.user_Fname.toLowerCase()) && (results[i].user_Lname.toLowerCase() == req.body.user_Lname.toLowerCase()))]) {
                return true
            }
        }
        return false
    }
}
// checkEmailError-------------------------------------------------------------------------------------------------------------------

// Register-------------------------------------------------------------------------------------------------------------------
app.post('/register', jsonParser, function (req, res, next) {
    connection.execute(
        'SELECT * FROM user_insystem WHERE user_email=? or user_username=? or user_Fname=? and user_Lname=?', [req.body.user_username, req.body.user_email, req.body.user_Fname, req.body.user_Lname],
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
                            'INSERT INTO user_insystem (user_email, user_password, user_Fname, user_Lname, user_username, user_phone) VALUES (?, ?, ?, ?, ?, ?)',
                            [req.body.user_email, hash, req.body.user_Fname, req.body.user_Lname, req.body.user_username, req.body.user_phone],
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
// Register-------------------------------------------------------------------------------------------------------------------

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
            bcrypt.compare(req.body.user_password, users[0].user_password, function (err, isLogin) {
                if (isLogin) {
                    var token = jwt.sign({ username: users[0].user_username }, secret, { expiresIn: '12h' });
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


app.listen(3333, function () {
  console.log('CORS-enabled web server listening on port 3333')
})