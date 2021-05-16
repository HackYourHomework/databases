const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

connection.connect((error) => {
  if (error) throw error;
  console.log("connected");
});

connection.query("DROP DATABASE IF EXISTS meetup", (error) => {
  if (error) throw error;
  console.log("Database deleted");
});

connection.query("CREATE DATABASE meetup", (error) => {
  if (error) throw error;
  console.log("Database created");
});

connection.query("USE meetup", (error) => {
  if (error) throw error;
});

const invitee = [
  "CREATE TABLE invitee (invitee_no INT, invitee_name VARCHAR(50), invited_by VARCHAR(50))",
  'INSERT INTO invitee VALUES(7, "Rana","Ahmad"), (5, "Khaldoun","Lily"), (9, "Alaa","Jana"), (1, "Reem","Mhd"), (8, "Ihab","Dana")',
];

const room = [
  "CREATE TABLE room (room_no INT, room_name VARCHAR(50), floor_number INT)",
  'INSERT INTO room VALUES(2, "conference room 6", 20), (1, "conference room 2", 9), (4, "conference room 9", 11), (3, "conference room 3", 31), (7, "conference room 7", 10)',
];

const meeting = [
  "CREATE TABLE meeting (meeting_no INT, meeting_title VARCHAR(50), starting_time DATETIME, ending_time DATETIME, room_no INT)",
  'INSERT INTO meeting VALUES(13, "weekly meeting", "2021-04-30 10:00:00", "2021-04-30 11:00:00", 27), (21, "daily meeting", "2021-04-29 10:00:00", "2021-04-29 11:00:00", 19), (6, "monthly meeting", "2021-04-28 10:00:00", "2021-04-28 11:00:00", 51), (44, "yearly meeting", "2021-04-27 10:00:00", "2021-04-27 11:00:00", 12), (43, "quarterly meeting", "2021-04-25 10:00:00", "2021-04-25 11:00:00", 32)',
];

function createQueries(queries) {
  queries.forEach((query) => {
    connection.query(query, (error) => {
      if (error) throw error;
    });
  });
}
createQueries(invitee);
createQueries(room);
createQueries(meeting);

connection.end();
