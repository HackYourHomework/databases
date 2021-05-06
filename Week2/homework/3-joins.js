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

function insertQuery(insertQueries, msg) {
  connection.query(insertQueries.statement, function (err, result) {
    if (err) throw err;
    console.log(msg);
    console.log(result);
  });
}

function addMessage(insertQuery, index) {
  return { ...insertQuery, message: `${index} is executed...` };
}

const insertQueries = [
  {
    statement: `
    SELECT a.author_name AS "author_name", m.author_name AS "mentor_name"
    FROM authors AS a
    JOIN authors AS m
    ON a.mentor = m.author_no`,
    message: `Names of all authors and their corresponding mentors...`,
  },
  {
    statement: `
   SELECT a.*, paper_title
   FROM authors AS a
   LEFT JOIN authors_papers AS p
   ON a.author_no = p.author_no
   LEFT JOIN research_papers AS r
   ON p.paper_id = r.paper_id`,
    message: `All columns of authors and their published paper_title...`,
  },
];

// Messages are inserted into insertQueries...
insertQueries.map(addMessage);

// Execution of queries
insertQueries.forEach((query) => insertQuery(query, `Queries are executed...`));

connection.end();

