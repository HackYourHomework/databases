const express = require("express");
const mysql = require("mysql");

// Create connection
const db = mysql.createConnection({
  // host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "meetup",
});

// Connect
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySql Connected...");
});

const app = express();

// Create DB
app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE IF NOT EXISTS meetup";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Database created...");
  });
});

// Create Invitees table
app.get("/createinviteestable", (req, res) => {
  let sql =
    "CREATE TABLE IF NOT EXISTS Invitees(invitee_no INT AUTO_INCREMENT, invitee_name VARCHAR(255), invited_by VARCHAR(255), PRIMARY KEY(invitee_no))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Invitees table created...");
  });
});
// Create Room table
app.get("/createroomtable", (req, res) => {
  let sql =
    "CREATE TABLE IF NOT EXISTS Room(room_no INT AUTO_INCREMENT, room_name VARCHAR(255), floor_number VARCHAR(255), PRIMARY KEY(room_no))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Room table created...");
  });
});
// Create Meeting table
app.get("/createmeetingtable", (req, res) => {
  let sql =
    "CREATE TABLE IF NOT EXISTS Meeting(meeting_no INT AUTO_INCREMENT, meeting_title VARCHAR(255), starting_time datetime, ending_time datetime, room_no VARCHAR(255), PRIMARY KEY(meeting_no))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Meeting table created...");
  });
});
// Insert multiple rows into invitees table
app.get("/addmultipleinvitees", (req, res) => {
  let sql = `INSERT INTO Invitees(invitee_name,invited_by)  VALUES ?  `;
  let post = [
    ["Marwa", "Deedee"],
    ["Wouter", "Rob"],
    ["Unmesh", "Breus"],
    ["Maher", "Cemal"],
    ["Tjebbe", "Fede"],
  ];
  let query = db.query(sql, [post], (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Multiple invitees added to invitees table...");
  });
});

// Insert multiple rows of into room table
app.get("/addmultiplerooms", (req, res) => {
  let sql = `INSERT INTO Room(room_name,floor_number)  VALUES ?  `;
  let post = [
    ["Room Number One", 1],
    ["Room Number Two", 2],
    ["Room Number Three", 3],
    ["Room Number Four", 4],
    ["Room Number Five", 5],
  ];
  let query = db.query(sql, [post], (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Multiple rows added to room table...");
  });
});

// Insert multiple rows of into meeting table
app.get("/addmultiplemeetings", (req, res) => {
  let sql = `INSERT INTO Meeting(meeting_title,starting_time,ending_time, room_no)  VALUES ?  `;
  let post = [
    ["Class 30 Stand-up", "2021-05-01 11:00", "2021-05-01 12:00", 1],
    ["Class 31 Stand-Up", "2021-05-02 10:00", "2021-05-02 11:00", 2],
    ["Class 32 Stand-Up", "2021-05-03 12:00", "2021-05-03 13:00", 3],
    ["Class 33 Introduction", "2021-05-04 14:00", "2021-05-04 16:00", 4],
    ["Class 31 Q&A", "2021-05-05 12:00", "2021-05-05 16:00", 5],
  ];
  let query = db.query(sql, [post], (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Multiple rows added into meeting table...");
  });
});

// Select invitees(If we want to render the invitees table)(We could do this for room and meeting tables as well)
app.get("/getinvitees", (req, res) => {
  let sql = "SELECT * FROM invitees";
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send(results);
  });
});

app.listen("3000", () => {
  console.log("Server started on port 3000");
});
