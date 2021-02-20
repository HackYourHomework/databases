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

// Create a database called meetup
// connection.query('CREATE DATABASE testdb1', function (err, result) {
//   if (err) throw err;
//   console.log('Database created');
// });

// Create a table called Invitee with the following fields (invitee_no, invitee_name and invited_by).

// Create a table called Meeting with the following fields (meeting_no, meeting_title, starting_time, ending_time,room_no)

// Insert 5 rows into each table with relevant fields. Find a way to create the data for those fields
