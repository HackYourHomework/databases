const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
});
connection.connect((err) => {
  if (err) {
    console.log('Not connected');
    throw err;
  } else {
    console.log('Connected');
  }
});

const queryDeleteDb = 'DROP DATABASE IF EXISTS meetup;';
connection.query(queryDeleteDb, (error, results) => {
  if (error) {
    throw error;
  }
  console.log('DROP DATABASE reply is ', results[0]);
});

const queryCreateDb = 'CREATE DATABASE meetup;';
connection.query(queryCreateDb, (error, results) => {
  if (error) {
    throw error;
  }
  console.log('CREATE DATABASE reply is ', results[0]);
});
const querySwitch = 'USE meetup';
connection.query(querySwitch, (error, results) => {
  if (error) {
    console.log('USE error');
    throw error;
  }
  console.log(`USE reply is `, results[0]);
});

function sendQuery(query) {
  connection.query(query, (error, results) => {
    if (error) {
      console.log('error');
      throw error;
    }
    console.log(`the reply ${query} is `, results[0]);
  });
}
const queryTableInvitee =
  'CREATE TABLE Invitee (invitee_no int, invitee_name varchar(50), invited_by varchar(50))';
sendQuery(queryTableInvitee);

const queryTableRoom =
  'CREATE TABLE Room (room_no int, room_name varchar(50), floor_number int)';
sendQuery(queryTableRoom);

const queryTableMeeting =
  'CREATE TABLE Meeting (meeting_no int, meeting_title varchar(50), starting_time datetime, ending_time datetime,room_no int)';
sendQuery(queryTableMeeting);

const queryAddRowsToInvitee =
  'INSERT INTO Invitee VALUES (1,"Jack","Joseph"),(2,"Harry","Jacob"),(3,"Charlie","Oscar"),(4,"James","William"),(5,"Henry","Leo")';
sendQuery(queryAddRowsToInvitee);

const queryAddRowsToRoom =
  'INSERT INTO Room VALUES (24,"red",2),(38,"green",3),(22,"blue",2),(31,"white",3),(29,"black",2)';
sendQuery(queryAddRowsToRoom);

const queryAddRowsToMeeting =
  'INSERT INTO Meeting VALUES (1, "first meeting", "2021-05-10 15:00:00", "2021-05-10 18:00:00",24), (2, "second meeting", "2021-05-11 15:00:00", "2021-05-11 18:00:00",29), (3, "third meeting", "2021-05-12 15:00:00", "2021-05-12 18:00:00",31),(4, "forth meeting", "2021-05-13 15:00:00", "2021-05-13 18:00:00",38),(5, "fifth meeting", "2021-05-14 15:00:00", "2021-05-14 18:00:00",22)';
sendQuery(queryAddRowsToMeeting);

connection.end((error) => {
  if (error) {
    console.log('error with ending connection');
  } else console.log('connection is ended');
});
