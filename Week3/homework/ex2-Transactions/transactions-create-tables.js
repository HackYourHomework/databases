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
const queryCreateDb = 'CREATE DATABASE IF NOT EXISTS week3';
sendQuery(queryCreateDb);

const querySwitch = 'USE week3';
sendQuery(querySwitch);

const queryTableAccount =
  'CREATE TABLE IF NOT EXISTS account (account_number int NOT NULL, balance float, PRIMARY KEY (account_number))';
sendQuery(queryTableAccount);

const queryTableAccountChanges =
  'CREATE TABLE IF NOT EXISTS account_changes (change_number int AUTO_INCREMENT, account_number int, amount float, changed_date datetime, remark varchar(50), PRIMARY KEY (change_number), FOREIGN KEY (account_number) REFERENCES account(account_number))';
sendQuery(queryTableAccountChanges);

connection.end((error) => {
  if (error) {
    console.log('error with ending connection');
  } else console.log('connection is ended');
});
