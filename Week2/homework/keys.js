const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

connection.connect((error) => {
  if (error) throw error;
  console.log("connected");
});

connection.query("DROP DATABASE IF EXISTS relations", (error) => {
  if (error) throw error;
  console.log("Database dropped");
});

connection.query("CREATE DATABASE relations", (error) => {
  if (error) throw error;
  console.log("Database created");
});

connection.query("USE relations", (error) => {
  if (error) throw error;
});

const authors = [
  "CREATE TABLE authors(author_no INT NOT NULL, author_name VARCHAR(50), university VARCHAR(50), date_of_birth DATE, h_index INT, gender ENUM('m','f'), PRIMARY KEY(author_no))",
  "ALTER TABLE authors ADD COLUMN mentor INT, ADD CONSTRAINT FOREIGN KEY(mentor) REFERENCES authors(author_no)",
];

function createQueries(queries) {
  queries.forEach((query) => {
    connection.query(query, (error) => {
      if (error) throw error;
    });
  });
}
createQueries(authors);

connection.end();
