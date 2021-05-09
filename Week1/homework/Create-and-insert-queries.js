const mysql = require("mysql");

//create connection
const db = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "123456",
});

//handle error
const checkError = (error) => {
  if (error) {
    throw error;
  }
};

//Three tables Invitee, Room, Meeting
const sqlInputs = [
  `CREATE TABLE Invitee (
      invitee_no INT AUTO_INCREMENT,
      invitee_name VARCHAR(200),
      invited_by INT,
      PRIMARY KEY(invitee_no))`,
  `CREATE TABLE Room (
      room_no INT AUTO_INCREMENT,
      room_name VARCHAR(200),
      floor_number INT,
      PRIMARY KEY(room_no)
  )`,
  `CREATE TABLE Meeting (
      meeting_no INT AUTO_INCREMENT,
      meeting_title VARCHAR(200),
      starting_time DATETIME DEFAULT CURRENT_TIMESTAMP,
      ending_time DATETIME DEFAULT CURRENT_TIMESTAMP,
      room_no INT,
      PRIMARY KEY(meeting_no),
      FOREIGN KEY (room_no) REFERENCES Room(room_no)
  )`,
];

//Input for 5 rows into each table with relevant fields
const inputs = [
  `INSERT INTO Invitee
  (invitee_name, invited_by)
  values
  ('Peter', 21), ('Will', 22), ('Watson', 23),
  ('Tom', 24), ('Jackson', 25)`,
  `INSERT INTO Room 
  (room_name, floor_number)
  values
  ('Formal parlor', 1), ('Office', 2), ('Master room', 3),
  ('Guest room', 4), ('Music room', 5)`,
  `INSERT INTO Meeting
   (meeting_title)
   values
   ('Information Sharing Meeting'), ('Problem Solving Meeting'), ('Innovation Meeting'), 
   ('Team Building Meeting'), ('Status Update Meeting')`,
];

// function Create a database:
const createDatabase = (dbName) => {
  const sqlCreate = `CREATE DATABASE ${dbName}`;
  db.query(sqlCreate, (err, result) => {
    checkError(err);
    console.log(`${dbName} is created as database.`);
  });
};
// function to use the database:
const useDatabase = (dbName) => {
  const sqlUse = `USE ${dbName}`;
  db.query(sqlUse, (err, result) => {
    checkError(err);
    console.log(`${dbName} is used.`);
  });
};

// function create the three tables and insert inputs into:
const createTable = () => {
  for (let i = 0; i < sql.length; i++) {
    db.query(sqlInputs[i], (err, result) => {
      checkError(err);
      console.log(`Table ${i++} is created`);
    });
    db.query(inputs[i], (err, input) => {
      checkError(err);
      console.log(`Input ${i++} is inserted in table ${i++}`);
    });
  }
};

//connection
db.connect((err) => {
  checkError(err);
  console.log(`Mysql connected ..`);
});

createDatabase(`meetup`);
useDatabase(`meetup`);
createTable();

db.end((err) => {
  checkError(err);
  console.log(`Mysql disconnected ..`);
});
