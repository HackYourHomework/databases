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
    statement: `
    SELECT r.paper_id, COUNT(author_name)
    FROM research_papers AS r
    INNER JOIN authors_papers AS p
    ON p.paper_id = r.paper_id
    INNER JOIN authors AS a
    ON a.author_no = p.author_no
    GROUP BY paper_id 
    ORDER by paper_id DESC`,
    message: `All research papers and the number of authors that wrote that paper....`,
  },
  {
    statement: `
    SELECT DISTINCT gender, count(paper_title)
    FROM authors AS a
    INNER JOIN authors_papers AS p
    ON a.author_no = p.author_no
    INNER JOIN research_papers AS r
    ON r.paper_id = p.paper_id
    WHERE gender = "f"`,
    message: `Sum of the research papers published by all female authors....`,
  },
  {
    statement: `
    SELECT university, AVG(h_index)
    FROM authors
    GROUP BY university
    ORDER BY h_index DESC`,
    message: `Average of the h-index of all authors per university...`,
  },
  {
    statement: `
    SELECT university , COUNT(DISTINCT p.paper_id) AS "Total Papers"
    FROM authors AS a
    LEFT JOIN authors_papers AS p
    ON a.author_no = p.author_no
    GROUP BY university
    ORDER BY COUNT(DISTINCT p.paper_id) DESC	`,
    message: `Sum of the research papers of the authors per university...`,
  },
  {
    statement: `
    SELECT university, MIN(h_index), MAX(h_index)
    FROM authors
    GROUP BY university`,
    message: `Minimum and maximum of the h-index of all authors per university...`,
  },
];

// Messages are inserted into insertQueries...
aggregateQueries.map(addMessage);

// Execution of queries
aggregateQueries.forEach((query) => insertQuery(query, `Queries are executed...`));

connection.end();
