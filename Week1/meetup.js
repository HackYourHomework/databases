const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  // port: xxxx,
});

const execQuery = util.promisify(connection.query.bind(connection));

function tblEntries(arr, tbl) {
  arr.map((elem) => execQuery(`INSERT INTO ${tbl} SET ?`, elem));
}

async function meetupDb() {
  const dbName = "meetup";
  const tblInvitee = "Invitee";
  const tblRoom = "Room";
  const tblMeeting = "Meeting";

  const DROP_DATABASE = `DROP DATABASE IF EXISTS ${dbName}`;
  const CREATE_DATABASE = `CREATE DATABASE IF NOT EXISTS ${dbName}`;
  const CREATE_TABLE_INVITEE = `CREATE TABLE IF NOT EXISTS ${tblInvitee} (
    invitee_no INT NOT NULL PRIMARY KEY,
    invitee_name VARCHAR(50),
    invited_by VARCHAR(50)
  )`;
  const CREATE_TABLE_ROOM = `CREATE TABLE IF NOT EXISTS ${tblRoom} (
    room_no INT NOT NULL PRIMARY KEY,
    room_name VARCHAR(50),
    floor_number INT
  )`;
  const CREATE_TABLE_MEETING = `CREATE TABLE IF NOT EXISTS ${tblMeeting} (
    meeting_no INT NOT NULL PRIMARY KEY,
    meeting_title VARCHAR(255) NOT NULL,
    starting_time DATETIME,
    ending_time DATETIME,
    room_no INT,
    FOREIGN KEY (room_no) REFERENCES ${tblRoom}(room_no)
  )`;

  const invitees = [
    {
      invitee_no: 1,
      invitee_name: "Jane Adams",
      invited_by: "Alan Smith",
    },
    {
      invitee_no: 2,
      invitee_name: "Ali Raza",
      invited_by: "Alan Smith",
    },
    {
      invitee_no: 3,
      invitee_name: "James Aaron",
      invited_by: "Bob Cabella",
    },
    {
      invitee_no: 4,
      invitee_name: "Nicolai Julio",
      invited_by: "Wilma Powell",
    },
    {
      invitee_no: 5,
      invitee_name: "Issac Gonzalez",
      invited_by: "Christy Bailey",
    },
  ];

  const rooms = [
    {
      room_no: 21,
      room_name: "Main Ball Room",
      floor_number: 0,
    },
    {
      room_no: 505,
      room_name: "Supreme Arena",
      floor_number: 5,
    },
    {
      room_no: 192,
      room_name: "Pool Club",
      floor_number: 1,
    },
    {
      room_no: 513,
      room_name: "Executive Hall",
      floor_number: 5,
    },
    {
      room_no: 901,
      room_name: "Alpha Receptions",
      floor_number: 9,
    },
  ];

  const meetings = [
    {
      meeting_no: 1,
      meeting_title: "HackYourFuture Class30 Graduation Ceremony",
      starting_time: "2021-03-12 09:00:00",
      ending_time: "2021-03-12 12:00:00",
      room_no: 21,
    },
    {
      meeting_no: 2,
      meeting_title: "HackYourFuture Class2 Meetup",
      starting_time: "2021-03-12 13:00:00",
      ending_time: "2021-03-12 15:00:00",
      room_no: 21,
    },
    {
      meeting_no: 3,
      meeting_title: "HackYourFuture Party",
      starting_time: "2021-05-19 16:00:00",
      ending_time: "2021-05-19 22:00:00",
      room_no: 192,
    },
    {
      meeting_no: 4,
      meeting_title: "Oracle Certification Exams",
      starting_time: "2021-10-02 09:00:00",
      ending_time: "2021-10-05 17:00:00",
      room_no: 901,
    },
    {
      meeting_no: 5,
      meeting_title: "HackYourFuture Board Meeting",
      starting_time: "2021-04-09 10:00:00",
      ending_time: "2021-04-09 14:00:00",
      room_no: 513,
    },
  ];

  connection.connect();

  try {
    await Promise.all([execQuery(DROP_DATABASE), execQuery(CREATE_DATABASE)]);
    console.log(`Database Created: ${dbName}`);

    await Promise.all([execQuery(`USE ${dbName}`)]);
    console.log(`Database Connected: ${dbName}`);

    await Promise.all([
      execQuery(CREATE_TABLE_INVITEE),
      execQuery(CREATE_TABLE_ROOM),
      execQuery(CREATE_TABLE_MEETING),
    ]);
    console.log(`Tables Created: ${tblInvitee}, ${tblRoom}, ${tblMeeting}`);

    await Promise.all([
      tblEntries(invitees, tblInvitee),
      tblEntries(rooms, tblRoom),
      tblEntries(meetings, tblMeeting),
    ]);
    console.log(`New Fields Created In: ${tblInvitee}, ${tblRoom}, ${tblMeeting}`);
  } catch (error) {
    console.error(error);
  }

  connection.end();
}

meetupDb();
