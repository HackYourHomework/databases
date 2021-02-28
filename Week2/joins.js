"use strict";

const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "academy",
  port: 3306,
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

//create and use meetup DB
const authorsMentors = `
SELECT a.author_name as author,
m.author_name as mentor FROM authors m
inner join authors a
ON a.author_no = m.mentor
`;
query(authorsMentors, "Authors and their correspondant mentors printed!");

//insert data into Room table
// addDataQuer(meetup.roomInsertQuer, meetup.roomData, "Room data entered");

//reusuable funtion to perform query
function query(query, queryMessage) {
  connection.query(query, (err, results) => {
    if (err) throw err;
    console.log(queryMessage);
    console.log(results);
  });
}

//reusuable function to add data to tables
function addDataQuery(query, data, queryMessage) {
  connection.query(query, [data], (err, results) => {
    if (err) {
      return console.error(err.message);
    }
    // get inserted rows
    console.log(queryMessage);
    console.log("Row inserted:" + results.affectedRows);
  });
}

connection.end();
