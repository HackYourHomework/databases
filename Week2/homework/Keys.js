const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
});
connection.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log('Connected');
  }
});

function sendQuery(query) {
  connection.query(query, (error, results) => {
    if (error) {
      throw error;
    }
    console.log(`the reply ${query} is `, results);
  });
}
const queryCreateDb = 'CREATE DATABASE IF NOT EXISTS week2';
sendQuery(queryCreateDb);

const querySwitch = 'USE week2';
sendQuery(querySwitch);

const queryTableAuthors =
  'CREATE TABLE IF NOT EXISTS authors (author_no int NOT NULL, author_name varchar(50), university varchar(50), date_of_birth datetime, h_index int, gender enum("m","f"), PRIMARY KEY (author_no))';
sendQuery(queryTableAuthors);

const queryAddColumn =
  'ALTER TABLE authors ADD COLUMN mentor int, ADD CONSTRAINT fk_mentor FOREIGN KEY (mentor) REFERENCES authors(author_no) ON DELETE CASCADE';
sendQuery(queryAddColumn);

connection.end((error) => {
  if (error) {
    console.log('error with ending connection');
  } else console.log('connection is ended');
});
