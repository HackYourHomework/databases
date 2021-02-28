const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'userdb',
});
const CREAT_TABLE_AUTHOR = `
CREATE TABLE IF NOT EXISTS authors(
    author_no INT AUTO_INCREMENT,
    author_name VARCHAR(250),
    university VARCHAR(250),
    date_of_birth DATE,
    h_index FLOAT,
    gender ENUM('m','f'),
    PRIMARY KEY (author_no)
);
`;
const ADD_MENTOR = `
ALTER TABLE authors ADD mentor INT,ADD CONSTRAINT fk_mentor FOREIGN KEY (mentor)  REFERENCES authors(author_no);  
`;

async function seedDatabase() {
  //   const connection = mysql.createConnection(CONNECTION_CONFIG);
  const execQuery = util.promisify(connection.query.bind(connection));

  try {
    await execQuery(CREAT_TABLE_AUTHOR);
    await execQuery(ADD_MENTOR);
  } catch (err) {
    console.error(err.message);
    connection.end();
  }
  connection.end();
}
seedDatabase();
