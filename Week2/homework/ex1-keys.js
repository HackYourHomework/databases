
// I Start This Week's Homework By Creating week2 Database On Workbench using SQL Query: create database week2;

const util = require('util');
const mysql = require('mysql');


const CONNECTION_CONFIG = {
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'week2',
  port: 3306
};

const CREATE_AUTHORS_TABLE = `
CREATE TABLE IF NOT EXISTS authors (
    author_no INT auto_increment PRIMARY KEY,
    author_name VARCHAR(100),
    university VARCHAR(100),
    date_of_birth DATE,
    h_index int,
    gender ENUM('m', 'f')
);`;

const ALTER_AUTHORS_TABLE = `ALTER TABLE authors add column mentor int,
                                add constraint fk_mentor foreign key (mentor)
                                references authors(author_no);`;



async function seedDatabase() {
  const connection = mysql.createConnection(CONNECTION_CONFIG);
  const execQuery = util.promisify(connection.query.bind(connection));
  try {
    // call the function that returns promise
    await execQuery(CREATE_AUTHORS_TABLE);
    await execQuery(ALTER_AUTHORS_TABLE);
    connection.end();
  } catch (error) {
    console.error(error.message);
    connection.end();
  } 
}

seedDatabase();
