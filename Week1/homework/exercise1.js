const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
});

connection.query('CREATE DATABASE IF  NOT EXISTS meetup ;', handleError);

connection.query('USE meetup;', handleError);

connection.query(
  'CREATE TABLE IF  NOT EXISTS Invitee ( invitee_no int , invitee_name varchar(20), invited_by varchar(20));',
  handleError,
);
connection.query(
  'CREATE TABLE IF  NOT EXISTS Room ( room_no int, room_name varchar(20), floor_number int);',
  handleError,
);
connection.query(
  'CREATE TABLE  IF  NOT EXISTS Meeting ( meeting_no int, meeting_title varchar(50), starting_time datetime, ending_time datetime, room_no int);',
  handleError,
);
connection.query(
  'INSERT INTO Invitee VALUES (1, "Deedee", "HYF team"), (2, "Rana", "HYF team"), (3, "Wael", "HYF team"), (4, "Osama", "HYF team"), (5, "Cemal", "HYF team");',
  handleError,
);
connection.query(
  'INSERT INTO Room VALUES (5,	"Red Room",	2), (2,	"Green Room",	2),(4,	"Vintage Room",	7),(1,	"Wooden Room",	6),(3,	"Marvel Room",	1)',
  handleError,
);
connection.query(
  'INSERT INTO Meeting VALUES (1, "Stand-up",	"2021-05-01 10:00:00",	"2021-05-01 10:30:00",	5),(2,	"Project review", 	"2021-05-01 11:00:00",	"2021-05-01 11:30:00",	3),(3,	"New project",	"2021-05-01 12:00:00",	"2021-05-01 13:00:00",	6),(4,	"Meeting with sponsors",	"2021-05-01 14:00:00","2021-05-01 14:30:00",1),(5,	"Council",	"2021-05-01 16:00:00",	"2021-05-01 17:00:00	", 5)',
  handleError,
);

function handleError(error) {
  if (error) throw error;
}

connection.end();
