"use strict";

//I'm aware of the console.log statement left here and that
//shouldn't be the case in production code. Only here for reference
//as an update on the DB status.

//meetup data
const meetup = require("./meetup-data.js");

const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  port: 3306,
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

//create and use meetup DB
query("CREATE DATABASE IF NOT EXISTS meetup", "Database created!");
query("USE meetup", "Database selected");

//create Invitee table
const inviteeTableQuer =
  "CREATE TABLE Invitee (invitee_no int, invitee_name VARCHAR(100), invited_by VARCHAR(100))";
query(inviteeTableQuer, "Invitee Table Created!");

//create Room table
const roomTableQuer =
  "CREATE TABLE Room (room_no int, room_name VARCHAR(100), floor_number int)";
query(roomTableQuer, "Room Table Created!");

//create meeting table
const meetingQuer =
  "CREATE TABLE Meeting (meeting_no int, meeting_title VARCHAR(100), starting_time datetime, ending_time datetime, room_no int)";
query(meetingQuer, "Meeting Table Created!");

//insert data into Invitee table
addDataQuer(
  meetup.inviteeInsertQer,
  meetup.inviteeData,
  "Invitee data entered"
);

//insert data into Room table
addDataQuer(meetup.roomInsertQuer, meetup.roomData, "Room data entered");

//insert data into Meeting table
addDataQuer(
  meetup.meetingInsertQuer,
  meetup.meetingData,
  "Meeting data entered"
);

//reusuable funtion to perform query
function query(quer, querMsg) {
  connection.query(quer, (error, results) => {
    if (error) throw error;
    console.log(querMsg);
  });
}

//reusuable function to add data to tables
function addDataQuer(quer, data, querMsg) {
  connection.query(quer, [data], (err, results) => {
    if (err) {
      return console.error(err.message);
    }
    // get inserted rows
    console.log(querMsg);
    console.log("Row inserted:" + results.affectedRows);
  });
}

connection.end();
