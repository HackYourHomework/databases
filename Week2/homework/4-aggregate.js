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

function insertQuery(aggregateQueries, msg) {
  connection.query(aggregateQueries.statement, function (err, result) {
    if (err) throw err;
    console.log(msg);
    console.log(result);
  });
}

function addMessage(aggregateQueries, index) {
  return { ...aggregateQueries, message: `${index} is executed...` };
}

const aggregateQueries = [
  {
    statement: `SELECT research_papers.paper_id, COUNT(author_name) FROM research_papers INNER JOIN authors_papers ON authors_papers.paper_id = research_papers.paper_id  INNER JOIN authors  ON authors.author_no = authors_papers.author_no GROUP BY paper_id`,
    message: `All research papers and the number of authors that wrote that paper....`,
  },
  {
    statement: `SELECT DISTINCT gender, count(paper_title) FROM authors au INNER JOIN authors_papers ap ON au.author_no = ap.author_no  INNER JOIN research_papers rp ON rp.paper_id = ap.paper_id WHERE gender = "f"`,
    message: `Sum of the research papers published by all female authors....`,
  },
  {
    statement: `SELECT university, AVG(h_index) FROM authors GROUP BY university`,
    message: `Average of the h-index of all authors per university...`,
  },
  {
    statement: `SELECT university, COUNT(DISTINCT authors_papers.paper_id) FROM authors LEFT JOIN authors_papers ON authors.author_no = authors_papers.author_no GROUP BY university`,
    message: `Sum of the research papers of the authors per university...`,
  },
  {
    statement: `SELECT university, MIN(h_index), MAX(h_index) FROM authors GROUP BY university`,
    message: `Minimum and maximum of the h-index of all authors per university...`,
  },
];

// Messages are inserted into insertQueries...
aggregateQueries.map(addMessage);

// Execution of queries
aggregateQueries.forEach((query) => insertQuery(query, `Queries are executed...`));

connection.end();
