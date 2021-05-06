const mysql = require("mysql");

// Create connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Giresun3428@",
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

// Create DB
const deleteDb = "DROP DATABASE IF EXISTS library";
const createDb = "CREATE DATABASE library";
const useDb = "USE library";

addQuery(deleteDb, `Library is deleted....`);
addQuery(createDb, `Database 'Library' is created...`);
addQuery(useDb, `Connected to library...`);

const creatTable = `CREATE TABLE IF NOT EXISTS authors(author_no INT AUTO_INCREMENT PRIMARY KEY, author_name VARCHAR(100), university VARCHAR(100), date_of_birth DATE, h_index INT, gender ENUM("m", "f"))`;
const alterTable = `ALTER TABLE authors ADD COLUMN mentor INT`;
const assignFK = `ALTER TABLE authors ADD CONSTRAINT FK_MENTOR FOREIGN KEY (mentor) REFERENCES authors(author_no)`;

addQuery(creatTable, `Table is added.`);
addQuery(alterTable, `Column is added.`);
addQuery(assignFK, `FK is added and referenced from author_no`);

// queries.forEach((query) => addQuery(query, `Table is created`));
connection.end();