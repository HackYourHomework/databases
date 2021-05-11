const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to database...");
});

db.query("DROP DATABASE IF EXISTS HYFWEEK2;", handleError);
db.query("CREATE DATABASE HYFWEEK2;", handleError);
db.query("USE HYFWEEK2;", handleError);

db.query(
  `CREATE TABLE IF NOT EXISTS authors(author_no INT AUTO_INCREMENT PRIMARY KEY, author_name VARCHAR(100), university VARCHAR(100), date_of_birth DATE, h_index INT, gender ENUM("m", "f"))`
);
db.query(`ALTER TABLE authors ADD COLUMN mentor INT`);
db.query(
  `ALTER TABLE authors ADD CONSTRAINT FK_MENTOR FOREIGN KEY (mentor) REFERENCES authors(author_no)`
);

function handleError(error) {
  if (error) throw error;
}

db.end();
