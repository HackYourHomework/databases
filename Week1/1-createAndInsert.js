var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
});

connection.connect(function (err) {
  if (err) throw err;
  console.log('Node.js connected to MySQl!');
});

// // Create a database called meetup
// connection.query('CREATE DATABASE meetup', function (err, result) {
//   if (err) throw err;
//   console.log('Database created');
// });

// use the created database
connection.query('use meetup', function (err, result) {
  if (err) throw err;
  console.log('we are in the database');
});
// Create a table called Invitee with the following fields (invitee_no, invitee_name and invited_by).
// connection.query(
//   'CREATE TABLE Invitee (invitee_no INT(10), invitee_name VARCHAR(50), invited_by VARCHAR(50))',
//   function (err, result) {
//     if (err) throw err;
//     console.log('table created');
//   }
// );

// //Create a table called Room with the following fields (room_no, room_name and floor_number)
// connection.query(
//   'CREATE TABLE Room (room_no INT(5), room_name VARCHAR(20),floor_number INT(10))',
//   function (err, result) {
//     if (err) throw err;
//     console.log('table created');
//   }
// );
// // Create a table called Meeting with the following fields (meeting_no, meeting_title, starting_time, ending_time,room_no)
// connection.query(
//   'CREATE TABLE Meeting (meeting_no INT(5), meeting_title VARCHAR(30), starting_time DATE, ending_time DATE,room_no INT(10))',
//   function (err, result) {
//     if (err) throw err;
//     console.log('table created');
//   }
// );
// // Insert 5 rows into each table with relevant fields. Find a way to create the data for those fields
for (i = 0; i < 5; i++) {}
