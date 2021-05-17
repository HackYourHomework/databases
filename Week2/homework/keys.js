const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'week2_db'
});

const authorsTable = `
  CREATE TABLE IF NOT EXISTS authors (
    author_no INT primary key,
    author_name VARCHAR(50),
    university VARCHAR(50),
    date_of_birth DATE,
    h_index INT,
    gender ENUM('m', 'f')
  )`;

  // mentor column with the foreign key constraint
const mentors = `
ALTER TABLE authors
    ADD COLUMN mentor INT,
    ADD CONSTRAINT fk_mentor FOREIGN KEY (mentor) REFERENCES authors(author_no);
`;

// database connection
async function seedDatabase() {
  const execQuery = util.promisify(connection.query.bind(connection));

  try {
    await execQuery(authorsTable);
    await execQuery(mentors);
    
  } catch (err) {
    console.log(err);
    connection.end();
  };
};

seedDatabase();


