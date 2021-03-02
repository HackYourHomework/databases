const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "userdb",
});

const execQuery = util.promisify(connection.query.bind(connection));

async function addingKeys() {
  const CREATE_TABLE_AUTHORS = `
    CREATE TABLE IF NOT EXISTS authors (
      author_no INT AUTO_INCREMENT PRIMARY KEY,
      author_name VARCHAR(100) NOT NULL,
      university VARCHAR(100),
      date_of_birth DATE,
      h_index INT,
      gender ENUM("m", "f")
    );
  `;
  const ALTER_TABLE_AUTHORS = `
    ALTER TABLE authors
    ADD IF NOT EXISTS mentor INT,
    ADD CONSTRAINT FOREIGN KEY (mentor) REFERENCES authors(author_no);
  `;

  connection.connect();

  try {
    await execQuery(CREATE_TABLE_AUTHORS);
    await execQuery(ALTER_TABLE_AUTHORS);
  } catch (error) {
    console.error(error);
    connection.end();
  }

  connection.end();
}

addingKeys();
