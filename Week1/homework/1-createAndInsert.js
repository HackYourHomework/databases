const data = require('./1-data');
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
});
connection.connect(function (err) {
  if (err) throw err;
  console.log('Node.js connected to MySQl!');
});

// function to execute sql query and other function to insert data to tables
function sqlQuery(queryString, message) {
  connection.query(queryString, function (err, result) {
    if (err) throw err;
    console.log(message);
  });
}
function insertRow(queryString, data) {
  connection.query(queryString, [data], function (err, results) {
    if (err) throw err;
    console.log('Data Inserted');
  });
}

// Create a database called meetup
sqlQuery('CREATE DATABASE IF NOT EXISTS meetup', 'Database created');
// use the created database
sqlQuery('use meetup', 'we are in the database');
// Create a table called Invitee with the following fields (invitee_no, invitee_name and invited_by).
sqlQuery(
  'CREATE TABLE IF NOT EXISTS Invitee (invitee_no INT(10) AUTO_INCREMENT, invitee_name VARCHAR(50), invited_by VARCHAR(50), PRIMARY KEY(invitee_no))',
  'table created'
);
//Create a table called Room with the following fields (room_no, room_name and floor_number)
sqlQuery(
  'CREATE TABLE IF NOT EXISTS Room (room_no INT(5) AUTO_INCREMENT, room_name VARCHAR(50),floor_number INT(10),PRIMARY KEY(room_no))',
  'table created'
);
// Create a table called Meeting with the following fields (meeting_no, meeting_title, starting_time, ending_time,room_no)
sqlQuery(
  'CREATE TABLE IF NOT EXISTS Meeting (meeting_no INT(5) AUTO_INCREMENT, meeting_title VARCHAR(250), starting_time DATETIME, ending_time DATETIME,room_no INT(10),PRIMARY KEY(meeting_no))',
  'table created'
);

// Insert 5 rows into each table with relevant fields. Find a way to create the data for those fields
insertRow(
  'INSERT INTO Invitee( invitee_name, invited_by )VALUES ?',
  data.inviteeData
);
insertRow(
  'INSERT INTO Room (room_name, floor_number ) VALUES ?',
  data.roomsData
);
insertRow(
  'INSERT INTO Meeting ( meeting_title, starting_time, ending_time, room_no)VALUES ?',
  data.meetingData
);

connection.end();
