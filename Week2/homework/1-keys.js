const mysql = require("mysql");

// Create connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Giresun3428@",
  database: "library",
});

// Connect
connection.connect((err) => {
  if (err) throw err;
  console.log("MySql Connected...");
});

// Adding query for Database
const addQuery = (query, msg) => {
  connection.query(query, (err) => {
    if (err) throw err;
    console.log(msg);
  });
};


const createDb = `CREATE DATABASE IF NOT EXISTS library`;
addQuery(createDb, `Database library is created.`);

const creatTable = `CREATE TABLE IF NOT EXISTS authors(author_no INT PRIMARY KEY, author_name VARCHAR(100), university VARCHAR(100), date_of_birth DATE, h_index INT, gender ENUM("m", "f"))`;
const alterTable = `ALTER TABLE authors ADD COLUMN mentor INT`;
const assignFK = `ALTER TABLE authors ADD CONSTRAINT FK_MENTOR FOREIGN KEY (mentor) REFERENCES authors(author_no)`;

addQuery(creatTable, `Table is added.`);
addQuery(alterTable, `Column is added.`);
addQuery(assignFK, `FK is added and referenced from author_no`);

// queries.forEach((query) => addQuery(query, `Table is created`));
connection.end(); 