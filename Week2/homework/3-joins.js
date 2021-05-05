const mysql = require("mysql");

// Create connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Giresun3428@",
  database: "library",
});

// Connect
connection.connect((err) => {
  if (err) throw err;
  console.log("MySql Connected...");
});

// Adding query for Database
const addQuery = (query, msg) => {
  connection.query(query, (err) => {
    if (err) throw err;
    console.log(msg);
  });
};

const authors_mentor = `SELECT a.author_no, a.author_name AS "author", m.author_name AS "mentor" FROM authors AS a JOIN authors AS m ON a.mentor = m.author_no;`;

addQuery(
  authors_mentor,
  `names of all authors and their corresponding mentors`
);

connection.end();
