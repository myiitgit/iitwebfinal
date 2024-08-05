var mysql = require('mysql2');
//const mysql = require("mysql2");
const express = require("express");
const dotenv = require('dotenv');
const app = express();
const port = 3000;

app.set('view engine', 'hbs')

// other imports
const path = require("path")
const bcrypt = require("bcryptjs")

// Default DB Route
app.get('/', function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  return res.send({error: true, message: 'Kaziwai'})
});

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "01SQLpwd#$",
  database: "kvideodb"
});

//con.connect();

// Connect to DB and select 5 customers
// SELECT 5 records

con.connect(function(err) {
  if (err) throw err;
  var sql = "SELECT * FROM customers LIMIT 5";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
  });
  console.log("MySQL connected!")
});

// Retrive ALL customers
app.get("/customers", function (req,res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  con.query('SELECT * FROM customers', function(error, results, fields){
    if (error) throw error;
    
    return res.send({error: false, data: results, message: 'All customers!'});    
  });
});

// INSERT record into video
app.get("/video", function (req,res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  con.query('SELECT * FROM video', function(error, results, fields){
    if (error) throw error;
    
    return res.send({error: false, data: results, message: 'All videos!'});    
  });
});
  
// CRUD operations
// Display the 5 records
app.get( "/", function(req,res) {
    res.setHeader("Access-Control-Origin-Allow","*");
    res.setHeader('Content-Type','application/json');
    res.status(200);
    res.send(JSON.stringify(
        {
            id: 1,
            firstname: 'Abi',
            lastname: 'Mash',
            email: 'abi@gmail.com',
            password: '123456'
        }
    ));
});

// INSERT 1 customer record
app.post('/', function(req, res){

  res.setHeader("Access-Control-Origin-Allow","*");
  res.setHeader('Content-Type','application/json');
  res.status(200);
  res.send(JSON.stringify(
      {
        id: 2,
        name: 'test',
        email: 'test@gmail.com',
        password: 'testpass',
        password_confirm: 'testpass'
      }
  ));

  var sql = "INSERT INTO customers (name, email, password, password_confirm) VALUES ?";
  var values = [
    ['test', 'test@gmail.com', 'testpass', 'testpass']
  ];
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of customer records inserted: " + result.affectedRows);
  });

});

// Update 1 record
app.put('/', function(req, res){

  res.setHeader("Access-Control-Origin-Allow","*");
  res.setHeader('Content-Type','application/json');
  res.status(200);
  res.send(JSON.stringify(
      {
        id: 1,
        name: 'test',
        email: 'test@gmail.com',
        password: 'testpass',
        password_confirm: 'testpass'
      }
  ));

  var sql = "UPDATE customers SET id = '2' WHERE email = 'tad@gmail.com'";
  var values = [
    ['test', 'test@gmail.com', , 'abcdef','abcdef']
  ];
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of customer records updated: " + result.affectedRows);
  });

});

// Delete 1 record
app.delete('/', function(req, res){

  res.setHeader("Access-Control-Origin-Allow","*");
  res.setHeader('Content-Type','application/json');
  res.status(200);
  res.send(JSON.stringify(
      {
        id: 2,
        name: 'test',
        email: 'test@gmail.com',
        password: 'abcdef',
        password_confirm: 'abcdef'
      }
  ));

  var sql = "DELETE FROM customers WHERE name = 'test'";
  var values = [
    ['test', 'test@gmail.com', 'abcdef', 'abcdef']
  ];
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of customer records deleted: " + result.affectedRows);
  });

});

// INSERT 1 video record
app.post('/', function(req, res){

  res.setHeader("Access-Control-Origin-Allow","*");
  res.setHeader('Content-Type','application/json');
  res.status(200);
  res.send(JSON.stringify(
      {
        videoid: 4,
        customerid: 2,
        locationid: 2,
        title: 'Test video',
        videourl: ' https://github.com/myiitgit/iitDevOps/testvideo.mp4',
        comment: 'Test video',
        rating: 2,
        dateposted: '2024-01-01 09:30:00'
      }
  ));

  var sql = "INSERT INTO video (videoid, customerid, locationid, title, videourl, comment, rating, dateposted) VALUES ?";
  var values = [
    [videoid, customerid, locationid, title, videourl, comment, rating, dateposted]
  ];
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of video records inserted: " + result.affectedRows);
  });

});

app.listen(port, function () {
    console.log('Server listening on port 3000!');
});