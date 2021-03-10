const mysql = require('mysql');
const util = require('util');

const con = {
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'researches'
};

/* Create a table, called authors. Give it the following fields: 
(author_no(Primary Key), author_name, university, date_of_birth, h_index, gender) */
const authorsTableCreated = `
  CREATE TABLE IF NOT EXISTS authors (
    author_no INT auto_increment PRIMARY KEY,
    author_name VARCHAR(100),
    university VARCHAR(100),
    date_of_birth DATE,
    h_index INT,
    gender ENUM('m', 'f')
  );
`;

/* Write a query that adds a column called mentor to authors table that references the column author_no. 
For integrity add a foreign key on this column. */
const authorsTableAltered = `
  ALTER TABLE authors ADD COLUMN mentor INT,
  ADD CONSTRAINT fk_mentor FOREIGN KEY (mentor)
  REFERENCES authors(author_no);
`;

const seedDatabase = async () => {
  const connection = mysql.createConnection(con);
  const execQuery = util.promisify(connection.query.bind(connection));
  try {
    await execQuery(authorsTableCreated);
    await execQuery(authorsTableAltered);
    connection.end();
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  } 
};

seedDatabase();

