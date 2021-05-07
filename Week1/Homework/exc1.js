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

const errFunc = (err)=> {if (err) throw err;}

connection.query('DROP DATABASE IF EXISTS meetup',errFunc);

connection.query("CREATE DATABASE meetup",errFunc);

connection.query('USE meetup',errFunc);


connection.query('CREATE TABLE Invitee ( invitee_no int , invitee_name varchar(25), invited_by varchar(25))',
errFunc);


connection.query('CREATE TABLE Room ( room_no int, room_name varchar(25), floor_number int)',errFunc);


connection.query('CREATE TABLE Meeting ( meeting_no int, meeting_title varchar(40), starting_time datetime, ending_time datetime, room_no int)',errFunc);

connection.query('INSERT INTO Invitee VALUES (1, "Madyan", "Admin"), (2, "Nour", "Admin"), (3, "Yousef", "Admin"), (4, "Nassar", "Admin"), (5, "Hussin", "Admin")',errFunc);

connection.query('INSERT INTO Room VALUES (4, "Room_1", 1), (2, "Room_2", 2),(3, "Room_3", 3),(1, "Room_4", 4),(5, "Room_5", 5)',errFunc);

connection.query('INSERT INTO Meeting VALUES (1, "Meeting_1", "2021-05-02 8:00:00",	"2021-05-02 9:00:00", 1),(2, "Meeting_2", "2021-05-02 09:30:00", "2021-05-02 10:30:00",	2),(3, "Meeting_3",	"2021-05-02 11:00:00",	"2021-05-02 12:00:00",	3),(4,	"Meeting_4",	"2021-05-02 12:30:00","2021-05-02 13:30:00",4),(5,	"Meeting_5", "2021-05-02 13:30:00",	"2021-05-02 14:30:00 ", 5)',errFunc);



connection.query('SELECT * FROM Invitee , Room , Meeting',
(err, result) => {
  if (err) throw err;
  console.table(result);
});


connection.end();