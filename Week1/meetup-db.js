var mysql = require("mysql");
var connection = mysql.createConnection({
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
query("CREATE DATABASE meetup", "Database created!");

query("USE meetup", "Database selected");

const inviteeTableQer =
  "CREATE TABLE Invitee (invitee_no int, invitee_name VARCHAR(100), invited_by VARCHAR(100))";

query(inviteeTableQer, "Invitee Table Created!");

const roomTableQuer =
  "CREATE TABLE Room (room_no int, room_name VARCHAR(100), floor_number int)";

query(roomTableQuer, "Room Table Created!");

const meetingQuer =
  "CREATE TABLE Meeting (meeting_no int, meeting_title VARCHAR(100), starting_time datetime, ending_time datetime, room_no int)";

query(meetingQuer, "Meeting Table Created!");

//reusuable funtion to perform query
function query(quer, querMsg) {
  connection.query(quer, (error, results, fields) => {
    if (error) throw error;
    console.log(querMsg);
  });
}

const inviteeInsertQer = `INSERT INTO Invitee (invitee_no , invitee_name, invited_by) VALUES ?  `;
const inviteeData = [
  [1, "Robert Baratheon", "Robb Stark"],
  [2, "Theon Greyjoy", "Sansa Stark"],
  [3, "Samwell Tarly", "John Snow"],
  [4, "Brienne of Tarth", "Jaime Lannister"],
  [5, "Grey Worm", "Missandei"],
];

addDataQuer(inviteeInsertQer, inviteeData, "Invitee data entered");

const roomInsertQuer = `INSERT INTO Room (room_no, room_name, floor_number) VALUES ?  `;
const roomData = [
  [110, "Riverlands", 1],
  [220, "Dragonstone", 2],
  [330, "Dorne", 3],
  [440, "Valyria", 4],
  [550, "Old Wyk", 5],
];

addDataQuer(roomInsertQuer, roomData, "Room data entered");

const meetingInsertQuer = `INSERT INTO Meeting (meeting_no, meeting_title, starting_time, ending_time, room_no) VALUES ?  `;
const meetingData = [
  [1, "The Bells", "2019-01-01 22:10:23", "2019-01-01 22:10:23", 110],
  [2, "The B.O.B", "2019-01-01 22:10:23", "2019-01-01 22:10:23", 220],
  [3, "Hardhome", "2019-01-01 22:10:23", "2019-01-01 22:10:23", 330],
  [4, "Blackwater", "2019-01-01 22:10:23", "2019-01-01 22:10:23", 440],
  [5, "The Long Night", "2019-01-01 22:10:23", "2019-01-01 22:10:23", 550],
];

addDataQuer(meetingInsertQuer, meetingData, "Meeting data entered");

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
