var mysql = require('mysql');

var con = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
});

con.connect(function (err) {
  if (err) throw err;
  console.log('Connected!');
});

con.query('DROP DATABASE IF EXISTS meetup', (err, result) => {
  if (err) throw err;
  console.log('Database deleted.');
});
con.query('CREATE DATABASE meetup', (err, result) => {
  if (err) throw err;
  console.log('Database created.');
});

con.query('USE meetup', (err, result) => {
  if (err) throw err;
  console.log('Using meetup database.');
});

const createInvitee =
  'CREATE TABLE invitee (invitee_no INT, invitee_name VARCHAR(255), invited_by VARCHAR(255))';
con.query(createInvitee, function (err, result) {
  if (err) throw err;
  console.log('Invitee created.');
});

const inviteeData = [
  { invitee_no: 1, invitee_name: 'Mahmood', invited_by: 'Reza' },
  { invitee_no: 2, invitee_name: 'Hamid', invited_by: 'Nima' },
  { invitee_no: 3, invitee_name: 'Karim', invited_by: 'Vahid' },
  { invitee_no: 4, invitee_name: 'Hasan', invited_by: 'Mohsen' },
  { invitee_no: 5, invitee_name: 'Arash', invited_by: 'Ali' },
];

const inviteeDataArrayFormat = inviteeData.map((item) => {
  return Object.values(item);
});

console.log(inviteeDataArrayFormat);

const inviteeInsertQuery =
  'INSERT INTO invitee(invitee_no, invitee_name, invited_by) VALUES ?';
con.query(inviteeInsertQuery, [inviteeDataArrayFormat], (err, result) => {
  if (err) throw err;
  console.log('Adding data to invitee table result: ', result);
});

const createRoom =
  'CREATE TABLE room (room_no INT, room_name VARCHAR(255), floor_number INT)';
con.query(createRoom, function (err, result) {
  if (err) throw err;
  console.log('Room created.');
});

const roomData = [
  [1, 'This is room 101', 11],
  [2, 'This is room 102', 12],
  [3, 'This is room 103', 13],
  [4, 'This is room 104', 14],
  [5, 'This is room 105', 15],
];

const roomInsertQuery =
  'INSERT INTO room(room_no, room_name, floor_number) VALUES ?';
con.query(roomInsertQuery, [roomData], (err, result) => {
  if (err) throw err;
  console.log('Adding data to room table result: ', result);
});

const createMeeting =
  'CREATE TABLE meeting (meeting_no INT, meeting_title VARCHAR(255), starting_time DATETIME, ending_time DATETIME, room_no INT)';
con.query(createMeeting, function (err, result) {
  if (err) throw err;
  console.log('Meeting created.');
});

const dateNow = new Date();
function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result.toISOString().slice(0, 19).replace('T', ' ');
}

const meetingData = [
  [
    1,
    'This is meeting about subject 1',
    addDays(dateNow, 1),
    addDays(dateNow, 2),
    1,
  ],
  [
    2,
    'This is meeting about subject 2',
    addDays(dateNow, 3),
    addDays(dateNow, 4),
    2,
  ],
  [
    3,
    'This is meeting about subject 3',
    addDays(dateNow, 5),
    addDays(dateNow, 6),
    3,
  ],
  [
    4,
    'This is meeting about subject 4',
    addDays(dateNow, 7),
    addDays(dateNow, 8),
    4,
  ],
  [
    5,
    'This is meeting about subject 5',
    addDays(dateNow, 9),
    addDays(dateNow, 10),
    5,
  ],
];

const meetingInsertQuery =
  'INSERT INTO meeting(meeting_no, meeting_title, starting_time, ending_time, room_no) VALUES ?';
con.query(meetingInsertQuery, [meetingData], (err, result) => {
  if (err) throw err;
  console.log('Adding data to meeting table result: ', result);
});

con.end(function (err) {
  if (err) throw err;
  console.log('Disconnected!');
});
