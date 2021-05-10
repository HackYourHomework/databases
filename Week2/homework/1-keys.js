const mysql = require("mysql");
const util = require("util");

// Create connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  const deleteDb = "DROP DATABASE IF EXISTS library";
  const createDb = "CREATE DATABASE library";
  const useDb = "USE library";
  const creatTable = `CREATE TABLE IF NOT EXISTS authors(author_no INT AUTO_INCREMENT PRIMARY KEY, author_name VARCHAR(100), university VARCHAR(100), date_of_birth DATE, h_index INT, gender ENUM("m", "f"))`;
  const alterTable = `ALTER TABLE authors ADD COLUMN mentor INT`;
  const assignFK = `ALTER TABLE authors ADD CONSTRAINT FK_MENTOR FOREIGN KEY (mentor) REFERENCES authors(author_no)`;

  connection.connect();

  try {
    // call the function that returns promise
    await execQuery(deleteDb);
    await execQuery(createDb);
    await execQuery(useDb);
    await execQuery(creatTable);
    await execQuery(alterTable);
    await execQuery(assignFK);
   
  } catch (error) {
    console.error(error);
    connection.end();
  }

  connection.end();
}

seedDatabase();
