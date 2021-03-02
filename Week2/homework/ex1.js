const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'Week_two',
  port: 3306
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  const createTableAuthors = `
    CREATE TABLE IF NOT EXISTS authors (
      author_no INT PRIMARY KEY,
      author_name VARCHAR(50),
      university VARCHAR(100),
      date_of_birth DATE,
      h_index INT,
      gender ENUM('m', 'f')
      );`;
   
  const AddColumnMentor ="ALTER TABLE authors ADD COLUMN mentor INT,ADD constraint fk_mentor FOREIGN KEY (mentor) references authors(author_no)";


  connection.connect();

  try {
    // call the function that returns promise
    await execQuery(createTableAuthors);
    await execQuery(AddColumnMentor);
   
  } catch (error) {
    console.error(error);
    connection.end();
  }

  connection.end();
}

seedDatabase();



