const mysql = require("mysql");
const util = require("util");

const connectionConfig = {
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "researchers",
};

const createAuthorsTable = `
  CREATE TABLE IF NOT EXISTS authors (
    author_no INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    author_name VARCHAR(50) NOT NULL,
    university VARCHAR(50) NOT NULL,
    date_of_birth DATE NOT NULL,
    h_index INT NOT NULL,
    gender ENUM('m', 'f')
  );`;

const alterAuthorsTable = `
  ALTER TABLE authors ADD COLUMN mentor INT NOT NULL,
  ADD CONSTRAINT fk_mentor
  FOREIGN KEY (mentor) REFERENCES authors(author_no)
  `;

const addTables = async () => {
  const connection = mysql.createConnection(connectionConfig);
  const execQuery = util.promisify(connection.query.bind(connection));

  try {
    await execQuery(createAuthorsTable);
    await execQuery(alterAuthorsTable);
    //if all good we must end connection
    connection.end();
    process.exit(0);
  } catch (err) {
    console.error(err.message);
    //if there is error we also must end the connection
    connection.end();
    process.exit(1);
  }
};

addTables();
