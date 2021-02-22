var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  port: 3306,
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

connection.query("CREATE DATABASE meetup", function (err, result) {
  if (err) throw err;
  console.log("Database created");
});

connection.query("USE meetup", function (err, result) {
  if (err) throw err;
  console.log("Database selected");
});

const inviteeQerry =
  "CREATE TABLE Invitee (invitee_no int, invitee_name VARCHAR(100), invited_by VARCHAR(100))";

connection.query(inviteeQerry, (error, results, fields) => {
  if (error) throw error;
  console.log("Invitee Table Created");
});

connection.end();
