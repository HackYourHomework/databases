const util = require('util');
const mysql = require('mysql');

const CONNECTION_CONFIG = {
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'week2-db'
};

// Create the table called authors and set the attributes.
const CREATE_AUTHORS_TABLE = `
    CREATE TABLE IF NOT EXISTS authors (
        author_no INT AUTO_INCREMENT,
        author_name VARCHAR(50),
        university VARCHAR(50),
        date_of_birth DATE,
        h_index INT,
        gender ENUM('m', 'f'),
        PRIMARY KEY(author_no)
    );
`;

// Add a new column named mentor with the foreign key constraint
const ADD_MENTOR_COLUMN = `
    ALTER TABLE authors
        ADD COLUMN mentor INT,
        ADD CONSTRAINT fk_mentor FOREIGN KEY (mentor) REFERENCES authors(author_no);
`;

// Async function for the database connection
async function seedDatabase() {
  const connection = mysql.createConnection(CONNECTION_CONFIG);
  const execQuery = util.promisify(connection.query.bind(connection));

  try {
    await execQuery(CREATE_AUTHORS_TABLE);
    await execQuery(ADD_MENTOR_COLUMN);

    connection.end();
  } catch (err) {
    console.log(err);
    connection.end();
  };
};

seedDatabase();