
// I Start This Week's Homework By Creating week3 Database On Workbench using SQL Query: CREATE DATABASE week3;

const util = require('util');
const mysql = require('mysql');


const CONNECTION_CONFIG = {
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'week3',
  port: 3306
};

const CREATE_ACCOUNT_TABLE = `
CREATE TABLE IF NOT EXISTS account (
    account_number INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    balance DECIMAL CHECK (balance >= 0)
)AUTO_INCREMENT=100;`;

const CREATE_ACCOUNT_CHANGES_TABLE = `
CREATE TABLE IF NOT EXISTS account_changes (
    change_number INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    account_number INT NOT NULL,
    amount DECIMAL NOT NULL,
    changed_date DATETIME,
    remark VARCHAR(100) NOT NULL,
	CONSTRAINT fk_account_number FOREIGN KEY (account_number)
	REFERENCES account(account_number)
);`;



async function seedDatabase() {
  const connection = mysql.createConnection(CONNECTION_CONFIG);
  const execQuery = util.promisify(connection.query.bind(connection));
  try {
    // call the function that returns promise
    await execQuery(CREATE_ACCOUNT_TABLE);
    await execQuery(CREATE_ACCOUNT_CHANGES_TABLE);
    connection.end();
  } catch (error) {
    console.error(error.message);
    connection.end();
  } 
}

seedDatabase();
