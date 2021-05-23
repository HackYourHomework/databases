import util from 'util';
import mysql from 'mysql';

const CONNECTION_CONFIG = {
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
};

const DROP_DATABASE_WEEK2 = 'DROP DATABASE IF EXISTS week2_db;';
const CREATE_DATABASE_WEEK2 = 'CREATE DATABASE week2_db;';
const USE_DATABASE_WEEK2 = 'USE week2_db;';
const CREATE_AUTHORS_TABLE =
  "CREATE TABLE IF NOT EXISTS authors(author_no INT PRIMARY KEY, author_name VARCHAR(50), university VARCHAR(50), date_of_birth DATE, h_index INT, gender ENUM('F','M') NOT NULL);";
const ADD_MENTOR_COLUMN =
  'ALTER TABLE authors ADD COLUMN mentor INT, ADD CONSTRAINT FK_Mentor FOREIGN KEY(mentor) REFERENCES authors(author_no)';

const databaseQueries = async () => {
  const connection = mysql.createConnection(CONNECTION_CONFIG);
  const execQuery = util.promisify(connection.query.bind(connection));

  try {
    await execQuery(DROP_DATABASE_WEEK2);
    await execQuery(CREATE_DATABASE_WEEK2);
    await execQuery(USE_DATABASE_WEEK2);
    await execQuery(CREATE_AUTHORS_TABLE);
    await execQuery(ADD_MENTOR_COLUMN);
  } catch (error) {
    console.log('error: ', error);
  }

  connection.end();
};
databaseQueries();
