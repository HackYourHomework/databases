import mysql from 'mysql';

const connection = mysql.createConnection({
  user: 'hyfuser',
  password: 'hyfpassword',
});

connection.connect();

connection.query('DROP DATABASE IF EXISTS meetup', error => {
  if (error) throw error;
  console.log('Database is dropped.');
});

connection.query('CREATE DATABASE meetup', error => {
  if (error) throw error;
  console.log('Meetup database is created.');
});

connection.query('USE meetup', error => {
  if (error) throw error;
});

const tableInvitee = 'CREATE TABLE Invitee (invitee_no INT, invitee_name VARCHAR(50), invited_by VARCHAR(50))';
const tableRoom = 'CREATE TABLE Room (room_no INT, room_name VARCHAR(50), floor_number INT)';
const tableMeeting = 'CREATE TABLE Meeting (meeting_no INT, meeting_title VARCHAR(50), starting_time DATETIME, ending_time DATETIME, room_no INT)';

const createTable = (query, tableName) => {
  connection.query(query, error => {
    if (error) throw error;
    console.log(`${tableName} is created.`);
  });
};

const inviteeTableValues = [
  "INSERT INTO Invitee VALUES (1, 'Yoyo', 'Ata')",
  "INSERT INTO Invitee VALUES (2, 'Baba', 'Bono')",
  "INSERT INTO Invitee VALUES (3, 'Duda', 'Bono')",
  "INSERT INTO Invitee VALUES (4, 'Mama', 'Ata')",
  "INSERT INTO Invitee VALUES (5, 'Popo', 'Bono')",
];

const roomTableValues = [
  "INSERT INTO Room VALUES (11, 'Conference Room', 1)",
  "INSERT INTO Room VALUES (11, 'Conference Room', 1)",
  "INSERT INTO Room VALUES (12, 'Conference Room 2', 1)",
  "INSERT INTO Room VALUES (12, 'Conference Room 2', 1)",
  "INSERT INTO Room VALUES (12, 'Conference Room 2', 1)",
];

const meetingTableValues = [
  "INSERT INTO Meeting VALUES (1, 'Global Warming', '2021-01-01 09:00:00', '2021-01-01 15:00:00', 11)",
  "INSERT INTO Meeting VALUES (1, 'Global Warming', '2021-01-01 09:00:00', '2021-01-01 15:00:00', 11)",
  "INSERT INTO Meeting VALUES (2, 'Pandemics', '2021-01-01 09:00:00', '2021-01-01 15:00:00', 12)",
  "INSERT INTO Meeting VALUES (2, 'Pandemics', '2021-01-01 09:00:00', '2021-01-01 15:00:00', 12)",
  "INSERT INTO Meeting VALUES (2, 'Pandemics', '2021-01-01 09:00:00', '2021-01-01 15:00:00', 12)",
];

const insertValuesIntoTable = values => {
  values.forEach(value => {
    connection.query(value, error => {
      if (error) throw error;
    });
  });
  console.log('Values added.');
};

createTable(tableInvitee, 'Invitee');
createTable(tableRoom, 'Room');
createTable(tableMeeting, 'Meeting');
insertValuesIntoTable(inviteeTableValues);
insertValuesIntoTable(roomTableValues);
insertValuesIntoTable(meetingTableValues);

connection.end();
