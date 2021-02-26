const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "meetup",
});

//make a connection to the database;
connection.connect(err => {
  if (err) throw err;
  console.log("Connected!");
});

//dropping the database if it exsists
tableManipulation("DROP DATABASE IF EXISTS meetup");

//creating a databsae for meetup
connection.query("CREATE DATABASE meetup", (err, result) => {
  if (err) throw err;
  console.log("Database created!");
});
//to check list of databases inside mySQL CLI - show databases;

//general purpose function, for easier creation of tables and data insertion or deleting tables:
const tableManipulation = parameters => {
  const sql = parameters;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log("Everything went okay!");
  });
};

//check if table already exists, if so - remove it, in order to recreate them again:
tableManipulation("DROP TABLE IF EXISTS Invitee, Room, Meeting");

//-----------------------TABLE CREATION ----------------------

//invitee table:
tableManipulation(
  "CREATE TABLE Invitee (invitee_no INT PRIMARY KEY, invitee_name VARCHAR(255), invited_by VARCHAR(255))"
);

//Create a table called Room with the following fields (room_no, room_name and floor_number)
tableManipulation(
  "CREATE TABLE Room(room_no INT PRIMARY KEY, room_name VARCHAR(255), floor_number INT)"
);

//Create a table called Meeting with the following fields (meeting_no, meeting_title, starting_time, ending_time,room_no)
//DATETIME values in ' YYYY-MM-DD hh:mm:ss ' format.
tableManipulation(
  "CREATE TABLE Meeting(meeting_no INT PRIMARY KEY, meeting_title VARCHAR(255), starting_time DATETIME NOT NULL, ending_time DATETIME, room_no INT)"
);

//in mySQL CLI - USE nameOfDatabase - to change database, show tables - to show exsisting tables, describe tableName - to get data about what need to be filled in the table

//------------------------INSERT DATA INTO THE TABLES-----------------------
//invitee:
tableManipulation(
  "INSERT INTO Invitee (invitee_no, invitee_name, invited_by) VALUES(111, 'Chandler', 'Monica'),(112, 'Rachel', 'Ross'), (113, 'Joey', 'Phoebe'), (114, 'Lilly', 'Marshal'), (115, 'Ted', 'Robin')"
);

//room:
tableManipulation(
  "INSERT INTO Room (room_no, room_name, floor_number) VALUES(105, 'Meetings', 2), (201, 'Conference room', 5), (303, 'The Great Outdoors', 1), (404, 'Orion Room', 5), (500, 'Flatiron Room', 2)"
);

//meeting:
tableManipulation(
  "INSERT INTO Meeting (meeting_no, meeting_title, starting_time, ending_time, room_no) VALUES(1, 'Meeting Of The Minds','2020-02-22 14:15:00', '2020-02-22 16:30:00', 110), (2, 'Cutting edge insights','2020-02-23 10:00:00', '2020-02-23 13:00:00', 500), (3, 'Introduction day to interns','2020-02-23 10:00:00', '2020-02-23 14:00:00', 303), (4, 'Professional development','2020-02-24 09:00:00', '2020-02-24 11:00:00', 201), (5, 'Sharing Session','2020-02-26 18:00:00', '2020-02-26 19:00:00', 303)"
);

//to check content of created tables: inside mySQL CLI SELECT * FROM nameOfTable

connection.end();
