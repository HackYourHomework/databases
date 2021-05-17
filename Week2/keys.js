const mysql = require("mysql");
const util = require("util");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Alphagama6",
  database: "company",
});
const execQuery = util.promisify(connection.query.bind(connection));
async function seedDatabase() {
  const CREATE_AUTHORS_TABLE = `
      CREATE TABLE IF NOT EXISTS authors(author_no INT PRIMARY KEY, author_name VARCHAR(50), university VARCHAR(50), date_of_birth DATE, h_index INT, gender ENUM('M','F'));`;
  const ADDING_COLUMN_TO_AUTHORS = `ALTER TABLE authors ADD COLUMN mentor INT,ADD FOREIGN KEY (mentor) REFERENCES authors(author_no)`;
  connection.connect();
  try {
    // call the function that returns promise
    await execQuery(CREATE_AUTHORS_TABLE);
    await execQuery(ADDING_COLUMN_TO_AUTHORS);
  } catch (error) {
    console.error(error);
    connection.end();
  }
  connection.end();
}
seedDatabase();
