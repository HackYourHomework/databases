const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "meetup",
});
con.connect(function (err) {
  if (err) throw err;
});
con.query("CREATE DATABASE IF NOT EXISTS meetup", function (err, result) {
  if (err) throw err;
});

const createTableInvitee =
  "CREATE TABLE IF NOT EXISTS Invitee (invitee_no INT, invitee_name VARCHAR(50),invited_by VARCHAR(50))";

con.query(createTableInvitee, (err, result) => {
  if (err) throw err;
});
const createTableRoom =
  "CREATE TABLE IF NOT EXISTS Room (room_no INT PRIMARY KEY, room_name VARCHAR(50),floor_number INT)";

con.query(createTableRoom, (err, result) => {
  if (err) throw err;
});
const createTableMeeting =
  "CREATE TABLE IF NOT EXISTS Meeting (meeting_no INT, meeting_title VARCHAR(50),starting_time TIME ," +
  "ending_time TIME, room_no INT,  FOREIGN KEY (room_no) REFERENCES Room(room_no))";
con.query(createTableMeeting, (err, result) => {
  if (err) throw err;
  console.log(result);
});

const sqlInsertTableInvitee =
  "INSERT INTO Invitee (invitee_no,invitee_name,invited_by)" +
  " VALUES (1,'osama','Eman'), (2,'mohamed','Rob'),(3,'mahmoud','olga'),(4,'ismael','jack'),(5,'ahmed','john') ";
con.query(sqlInsertTableInvitee, function (err, result) {
  if (err) throw err;
});

const sqlInsertTableRoom =
  "INSERT INTO Room (room_no,room_name,floor_number)" +
  "VALUES (1,'osama',1), (2,'mohamed',2),(3,'mahmoud',3),(4,'ismael',4),(5,'ahmed',5) ";
con.query(sqlInsertTableRoom, function (err, result) {
  if (err) throw err;
});

const sqlInsertTableMeeting =
  "INSERT INTO Meeting (meeting_no,meeting_title,starting_time,ending_time,room_no)" +
  "VALUES (1,'chat','05:02','06:00',1), (2,'eating','06:02','07:00',2),(3,'drink','07:02','08:00',3)," +
  "(4,'standup','09:02','10:00',4),(5,'business','11:15','12:00',5) ";
con.query(sqlInsertTableMeeting, function (err, result) {
  if (err) throw err;
});
con.end();
