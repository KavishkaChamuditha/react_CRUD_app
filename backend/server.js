const express = require("express");
const mysql = require('mysql');
const cors = require('cors');
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

// initialize express
const app = express();
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));


app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false, 
    maxAge: 1000 * 60 * 60 * 7 // One day
  }
}))

// connecting to the mysql db 
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crudreact"
});
 
app.get('/', (req, res) => {  
   if(req.session.name, req.session.role, req.session.email, req.session.password){
    return res.json({valid: true, name: req.session.name, role: req.session.role, email: req.session.email, password: req.session.password})
   } else {
    return res.json({valid: false})
   }

})

// taking users data from database
app.get('/users', (req, res) => {
  const sql = "SELECT * FROM usertbl";
  db.query(sql, (err, data) => {
    if (err) {
      return res.json("Error");
    }
    return res.json(data);
  });
})

// creating new users 
app.post('/create', (req, res) => {
  const sql = "INSERT INTO usertbl (name, role, email, password) VALUES (?)"; 
  const values = [
    req.body.name,
    req.body.role,
    req.body.email,
    req.body.password
  ]

  db.query(sql, [values], (err, data) => { 
    if (err)  
      return res.json("Something went wrong while creating new user, Try again");
      return res.json(data);
  })

})

//update users 
app.put('/update/:id', (req, res) => {
  const sql = "UPDATE usertbl SET `name` = ?, `role` = ?, `email` = ?, `password` = ? WHERE id = ?";

  const values = [
    req.body.name,  
    req.body.role,
    req.body.email,
    req.body.password
  ]  

  const id = req.params.id;

  db.query(sql, [...values, id], (err, data) => { 
    if (err)  
      return res.json("Something went wrong while creating new user, Try again");
      return res.json(data);
  })

})

// delete user 
app.delete('/users/:id', (req, res) => {
  const sql = "DELETE FROM usertbl WHERE id = ?";
  const id = req.params.id;

  db.query(sql, [id], (err, data) => { 
    if (err)  
      return res.json("Something went wrong while deleting the user. Please try again.");
    return res.json(data);
  })    
});

// inserting users data into database
app.post('/signup', (req, res) => {
  const sql = "INSERT INTO usertbl (name, role, email, password) VALUES (?)";
  const values = [req.body.name, req.body.role, req.body.email, req.body.password];
  db.query(sql, [values], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    return res.json(data);
  });
});

// check the login and password is matchted or not
app.post('/login', (req, res) => {
  const sql = "SELECT * FROM usertbl WHERE email = ? AND password = ?";
  db.query(sql, [req.body.email, req.body.password ], (err, result) => {
    if (err) {
      return res.json("Error");
    }
    if(result.length > 0){
      req.session.name = result[0].name;
      //console.log(req.session.name);
      req.session.role = result[0].role;
      //console.log(req.session.role);
      req.session.email = result[0].email;
      req.session.password = result[0].password;
      return res.json({Login: true})
  } else {
    return res.json({Login: false});
  }
});
});

// check the server is running or not 
app.listen(8081, () => {
  console.log("Server is running on port 8081");
});
