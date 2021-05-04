const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword"
});

connection.connect((err) => {
  if (err) throw err;
  console.log("connected");
});

connection.query('DROP DATABASE IF EXISTS meetup', (err) => {
    if (err) throw err;
    console.log('Database is deleted');
  });

  connection.query("CREATE DATABASE meetup", (err) => {
    if (err) throw err;
    console.log('Database is created');
  });

connection.query('USE meetup', (err) => {
    if (err) throw err;
  });


  connection.query('CREATE TABLE Invitee ( invitee_no int , invitee_name varchar(25), invited_by varchar(25))',
(err) => {
  if (err) throw err;
});


connection.query('CREATE TABLE Room ( room_no int, room_name varchar(25), floor_number int);',
(err) => {
    if (err) throw err;
});


connection.query('CREATE TABLE Meeting ( meeting_no int, meeting_title varchar(40), starting_time datetime, ending_time datetime, room_no int);',
(err) => {
    if (err) throw err;
});

connection.query('INSERT INTO Invitee VALUES (1, "Madyan", "Admin"), (2, "Nour", "Admin"), (3, "Yousef", "Admin"), (4, "Nassar", "Admin"), (5, "Hussin", "Admin");',
(err) => {
    if (err) throw err;
});

connection.query('INSERT INTO Room VALUES (4, "Room_1", 1), (2, "Room_2", 2),(3, "Room_3", 3),(1, "Room_4", 4),(5, "Room_5", 5)',
(err) => {
    if (err) throw err;
});

connection.query('INSERT INTO Meeting VALUES (1, "Meeting_1", "2021-05-02 8:00:00",	"2021-05-02 9:00:00", 1),(2, "Meeting_2", "2021-05-02 09:30:00", "2021-05-02 10:30:00",	2),(3, "Meeting_3",	"2021-05-02 11:00:00",	"2021-05-02 12:00:00",	3),(4,	"Meeting_4",	"2021-05-02 12:30:00","2021-05-02 13:30:00",4),(5,	"Meeting_5", "2021-05-02 13:30:00",	"2021-05-02 14:30:00 ", 5)',
(err) => {
    if (err) throw err;
});

connection.query('SELECT * FROM Invitee , Room , Meeting  ;',
(err, result) => {
  if (err) throw err;
  console.table(result);
});


connection.end();