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

connection.query("DROP DATABASE IF EXISTS meetup;", (error) => {
  if (error) throw error;
  console.log("Database deleted");
});

connection.query("CREATE DATABASE meetup;", (error) => {
  if (error) throw error;
  console.log("Database created");
});

connection.query("USE meetup;", (error) => {
  if (error) throw error;
});

const invitee =
  "CREATE TABLE Invitee (invitee_no INT, invitee_name TEXT, invited_by VARCHAR(50));";

const room =
  "CREATE TABLE Room (room_no INT, room_name text, floor_number INT);";

const meeting =
  "CREATE TABLE Meeting (meeting_no INT, meeting_title text, starting_time DATETIME, ending_time DATETIME, room_no INT);";

function createTables(table) {
  connection.query(table, (error) => {
    if (error) throw error;
  });
}

const inviteeValues = `INSERT INTO invitee VALUES(7, "Rana","Ahmad"), (5, "Khaldoun","Lily"), (9, "Alaa","Jana"), (1, "Reem","Mhd"), (8, "Ihab","Dana") `;

const roomValues = `INSERT INTO room VALUES(2, "conference room 6", 20), (1, "conference room 2", 9), (4, "conference room 9", 11), (3, "conference room 3", 31), (7, "conference room 7", 10)`;

const meetingValues = `INSERT INTO meeting VALUES(13, "weekly meeting", "2021-04-30 10:00:00", "2021-04-30 11:00:00", 27), (21, "daily meeting", "2021-04-29 10:00:00", "2021-04-29 11:00:00", 19), (6, "monthly meeting", "2021-04-28 10:00:00", "2021-04-28 11:00:00", 51), (44, "yearly meeting", "2021-04-27 10:00:00", "2021-04-27 11:00:00", 12), (43, "quarterly meeting", "2021-04-25 10:00:00", "2021-04-25 11:00:00", 32)`;

function createValues(values) {
  connection.query(values, (error) => {
    if (error) throw error;
  });
}
createTables(invitee);
createTables(room);
createTables(meeting);

createValues(inviteeValues);
createValues(roomValues);
createValues(meetingValues);

connection.end();
