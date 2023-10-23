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
                            'INSERT INTO user_insystem (user_email, user_password, user_fname, user_lname, user_username, user_phone) VALUES (?, ?, ?, ?, ?, ?)',
                            [req.body.user_email, hash, req.body.user_fname, req.body.user_lname, req.body.user_username, req.body.user_phone],
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
                let Usname = results[0].user_fname + ["   "] + results[0].user_lname
                let Usemail = results[0].user_email
                let Usphone = results[0].user_phone
                res.json({ status: 'ok', message: 'success', usname: Usname, usemail: Usemail, usphone: Usphone })
                return
            }

        )

    } catch (err) {
        res.json({ status: 'error', message: err.message })
    }
})
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

                                    res.send(results)
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

app.listen(3333, function () {
  console.log('CORS-enabled web server listening on port 3333')
})