const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'week2',
  port: 3306
});

// Promisify the bind function of query function of connection object
// Pass connection object (because bind expects "this")
// Afterwards execQuery will work as a function that returns a promise but
// we don't have to call "then" over that promise
const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  const CREATE_AUTHORS_TABLE = `
    CREATE TABLE IF NOT EXISTS authors (
        author_no INT auto_increment PRIMARY KEY ,
        author_name VARCHAR(50),
        university VARCHAR(50),
        date_of_birth DATE,
        h_index int,
        gender ENUM('m', 'f')
    );`;
    const ALTER_AUTHORS_TABLE = `
        ALTER TABLE authors add column mentor int,
        add constraint fk_author foreign key (mentor) references authors(author_no);`;
  
  connection.connect();

  try {
    // call the function that returns promise
    await execQuery(CREATE_AUTHORS_TABLE);
    await execQuery(ALTER_AUTHORS_TABLE);
  } catch (error) {
    console.error(error);
    connection.end();
  }

  connection.end();
}

seedDatabase();
