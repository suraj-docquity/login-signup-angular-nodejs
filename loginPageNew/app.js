const express = require("express");
const app = express();
const mysql = require('mysql');
const path = require('path');
const bcrypt = require("bcrypt")
const dotenv = require("dotenv")
const authToken = require("./authToken")
const cors = require("cors");
const JWT = require("jsonwebtoken");

// ------------------------  Set up Global configuration access ------------------------ 

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.use(express.static(path.join(__dirname, '/public')));

dotenv.config();

// ------------------------ Enabling CORS (corss-origin-resource-sharing) Connection ------------------------ 

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

const mySalt = process.env.MY_SALT;

// ------------------------ Database Connection ------------------------ 

let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
})

connection.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    }
    console.log('Connected to MYSQL server');
})

// ------------------------ Handling Routes : GET Routes ------------------------ 

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/index.html");
});

app.get("/signup", function (req, res) {
    res.sendFile(__dirname + "/views/signup.html");
});

app.get("/tables", function (req, res) {

    const token = req.headers["authorization"]

    if (!token) {
        res.json({ "Message": "Token not found", "code": false });
        return
    }

    JWT.verify(token, process.env.JWT_SECRET_KEY, function (err, decode) {
        if (!err) {
            connection.query('SELECT * FROM p_user', function (err, rows) {
                if (err) {
                    req.json(err);
                } else {
                    res.json({ "code": true, "rows": rows });
                }
            })
        } else {
            res.json({ "Message": "Invalid Token", "err": err, "code": false });
        }
    })

})

// ------------------------ Handling Routes : POST Routes ------------------------ 

app.post("/login", async function (req, res) {

    let email = req.body.email;
    let password = req.body.password;

    var sql = 'SELECT * FROM p_user WHERE Email = ' + connection.escape(email);

    await connection.query(sql, async function (err, rows) {
        if (err) {
            res.json(err);
            return;
        } else {
            if (rows.length > 0) {
                const dbPass = rows[0].Password;
                let match = await bcrypt.compare(password, dbPass); // (password_text,password_hashed)
                if (match) {
                    const tknData = {email : email}
                    const accessToken = authToken.generateAccessToken(tknData)
                    res.json({ "Message": "Valid user", "Status": "Logged in", "code": true, "accessToken": accessToken });  // perform login
                } else {
                    res.json({ "Message": "Invalid user", "Status": "Login Failed", "code": false }); // login failed
                }
            }
            else {
                res.json({ "Message": "User does not exists", "code": false })
            }
        }
    });
});

app.post("/signup", async function (req, res) {

    let name = req.body.name;
    let username = req.body.username;
    let phone = req.body.phone;
    let email = req.body.email;
    let password = req.body.password;

    const pHash = await bcrypt.hash(password, mySalt);

    var query = 'SELECT * FROM p_user WHERE Email = ' + connection.escape(email);
    await connection.query(query, function (err, rows) {
        if (err) {
            res.json({ "Message": "Registration Failed", "code": false, "Status": "DB error" })
        }
        else {
            if (rows.length > 0) {
                res.json({ "Message": "User Already Exists", "userExists": true })
            }
            else {
                var queryNew = 'INSERT INTO p_user (Name,Username,Email,Number,Password) VALUES (?,?,?,?,?) ';
                let data = [name, username, email, phone, pHash];

                connection.query(queryNew, data, function (err, rows) {
                    if (err) {
                        res.json({ "Message": "Registration Failed", "code": false, error:err })
                    } else {
                        res.json({ "Message": "Registration successful", "code": true })
                    }
                });
            }
        }
    });
});


// ------------------------ Listening Port ------------------------ 

app.listen(process.env.PORT, function () {
    console.log(`Server is running on localhost: ${process.env.PORT}`);
});