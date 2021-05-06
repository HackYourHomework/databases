const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
});
connection.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log('Connected');
  }
});

function sendQuery(query) {
  connection.query(query, (error, results) => {
    if (error) {
      throw error;
    }
    console.log(`the reply ${query} is `, results[0]);
  });
}
const queryDeleteDb = 'DROP DATABASE IF EXISTS meetup;';
sendQuery(queryDeleteDb);

const queryCreateDb = 'CREATE DATABASE meetup;';
sendQuery(queryCreateDb);

const querySwitch = 'USE meetup';
sendQuery(querySwitch);

const queryTableInvitee =
  'CREATE TABLE Invitee (invitee_no int, invitee_name varchar(50), invited_by int)';
sendQuery(queryTableInvitee);

const queryTableRoom =
  'CREATE TABLE Room (room_no int, room_name varchar(50), floor_number int)';
sendQuery(queryTableRoom);

const queryTableMeeting =
  'CREATE TABLE Meeting (meeting_no int, meeting_title varchar(50), starting_time datetime, ending_time datetime, room_no int)';
sendQuery(queryTableMeeting);

const rowsForInvitee = [
  { invitee_no: 1, invitee_name: 'Jack', invited_by: 2 },
  { invitee_no: 2, invitee_name: 'Harry', invited_by: 5 },
  { invitee_no: 3, invitee_name: 'Charlie', invited_by: 1 },
  { invitee_no: 4, invitee_name: 'James', invited_by: 3 },
  { invitee_no: 5, invitee_name: 'Henry', invited_by: 4 },
];
const rowsForRoom = [
  { room_no: 24, room_name: 'red', floor_number: 2 },
  { room_no: 38, room_name: 'green', floor_number: 3 },
  { room_no: 22, room_name: 'blue', floor_number: 2 },
  { room_no: 31, room_name: 'white', floor_number: 3 },
  { room_no: 29, room_name: 'black', floor_number: 2 },
];
const rowsForMeeting = [
  {
    meeting_no: 1,
    meeting_title: 'first meeting',
    starting_time: '2021-05-10 15:00:00',
    ending_time: '2021-05-10 18:00:00',
    room_no: 24,
  },
  {
    meeting_no: 2,
    meeting_title: 'second meeting',
    starting_time: '2021-05-11 15:00:00',
    ending_time: '2021-05-11 18:00:00',
    room_no: 29,
  },
  {
    meeting_no: 3,
    meeting_title: 'third meeting',
    starting_time: '2021-05-12 15:00:00',
    ending_time: '2021-05-12 18:00:00',
    room_no: 31,
  },
  {
    meeting_no: 4,
    meeting_title: 'forth meeting',
    starting_time: '2021-05-13 15:00:00',
    ending_time: '2021-05-13 18:00:00',
    room_no: 38,
  },
  {
    meeting_no: 5,
    meeting_title: 'fifth meeting',
    starting_time: '2021-05-14 15:00:00',
    ending_time: '2021-05-14 18:00:00',
    room_no: 22,
  },
];

function addRows(arr, table) {
  arr.forEach((row) => {
    const objToArr = Object.entries(row);
    let arrToString = '';
    for (i = 0; i < objToArr.length; i++) {
      let value = objToArr[i][1];
      const key = objToArr[i][0];
      if (typeof value === 'string') {
        value = `"${value}"`;
      }
      if (i === objToArr.length - 1) {
        arrToString = arrToString + `${key}=${value}`;
      } else arrToString = arrToString + `${key}=${value}, `;
    }
    const query = `INSERT INTO ${table} SET ${arrToString}`;
    sendQuery(query);
  });
}
addRows(rowsForInvitee, 'Invitee');
addRows(rowsForRoom, 'Room');
addRows(rowsForMeeting, 'Meeting');

connection.end((error) => {
  if (error) {
    console.log('error with ending connection');
  } else console.log('connection is ended');
});
