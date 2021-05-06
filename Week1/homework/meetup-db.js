const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword'
});

connection.connect(err => {
  if (err) throw err;
  console.log('connected to database');
});

// To execute sql query
function executeQuery(queryString) {
  connection.query(queryString, (err, results) => {
    if (err) throw err;
    console.log(results[0]);
  });
}

// Create and use database
executeQuery('CREATE DATABASE IF NOT EXISTS meetup');
executeQuery('USE meetup');

// Create tables
executeQuery('CREATE TABLE IF NOT EXISTS Invitee ( invitee_no INT , invitee_name VARCHAR(50), invited_by INT)');
executeQuery("CREATE TABLE IF NOT EXISTS Room (room_no INT, room_name VARCHAR(50), floor_no INT)");
executeQuery("CREATE TABLE IF NOT EXISTS Meeting (meeting_no INT, meeting_title VARCHAR(50), starting_time DATETIME, ending_time DATETIME, room_no INT)");

// Insert rows
executeQuery('INSERT INTO Invitee VALUES (1, "Mario", "Olympic games"), (2, "Yoshi", "Olympic games"), (3, "Luigi", "Olympic games"), (4, "Daisy", "Olympic games"), (5, "Wario", "Olympic games")');
executeQuery('INSERT INTO Room VALUES (1, "Stadium 6", 1), (2, "cave", 4), (3, "backyard", 7), (4, "gym", 6), (5, "stadium 2", 2)');
executeQuery('INSERT INTO Meeting VALUES (1, "Sprint", "2021-09-08 09:00:00", "2021-09-08 10:00:00", 2), (2, "Archery", "2021-09-03 02:00:00", "2021-09-03 03:00:00", 8), (3, "Long jump", "2021-09-08 09:00:00", "2021-09-08 10:00:00", 2), (4, "Gymnastics", "2021-09-13 09:00:00", "2021-09-13 10:00:00", 2), (5, "Cross country", "2021-09-15 11:00:00", "2021-09-15 13:00:00", 9)');

connection.end();
