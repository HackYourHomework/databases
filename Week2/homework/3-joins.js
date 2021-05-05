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
    statement: `SELECT a.author_no, a.author_name AS "author", m.author_name AS "mentor" FROM authors AS a JOIN authors AS m ON a.mentor = m.author_no`,
    message: `Names of all authors and their corresponding mentors...`,
  },
  {
    statement: `SELECT author_name, university, date_of_birth, h_index, gender, mentor, paper_title FROM authors LEFT JOIN authors_papers ON authors.author_no = authors_papers.author_no LEFT JOIN research_papers ON authors_papers.paper_id = research_papers.paper_id`,
    message: `All columns of authors and their published paper_title...`,
  },
];

// Messages are inserted into insertQueries...
insertQueries.map(addMessage);

// Execution of queries
insertQueries.forEach((query) => insertQuery(query, `Queries are executed...`));

connection.end();

