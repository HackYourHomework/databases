const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("connected");
});

const errFunc = (err) => {if (err) throw err};

connection.query("DROP DATABASE IF EXISTS KeysDB", errFunc);

connection.query("CREATE DATABASE KeysDB", errFunc);

connection.query("USE KeysDB", errFunc);

connection.query(`CREATE TABLE authors (author_no INT PRIMARY KEY,
  author_name VARCHAR(50),
  university VARCHAR(50),
  date_of_birth DATETIME,
  h_index INT,
  gender ENUM ("MALE", "FEMALE"))`,
  errFunc);


connection.query(`ALTER TABLE authors
  ADD COLUMN mentor INT,
  ADD CONSTRAINT FOREIGN KEY (mentor) REFERENCES authors(author_no)`,
  errFunc);

connection.end();