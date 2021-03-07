const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'userdb',
});

connection.connect(function (err) {
  if (err) throw err;
  console.log('Node.js connected to MySQl!');
});

// function to send SELECT query
function sqlQuery(queryString) {
  connection.query(queryString, function (err, result) {
    if (err) throw err;
    console.log('The requested data are ', result);
  });
}

// All research papers and the number of authors that wrote that paper.
sqlQuery(
  `SELECT research_papers.paper_title, COUNT(author_research.research_id) AS total_authors FROM research_papers join author_research ON research_papers.paper_id = author_research.research_id GROUP BY author_research.research_id;`
);

// Sum of the research papers published by all female authors.
sqlQuery(
  `SELECT COUNT(DISTINCT author_research.research_id) AS total_researches, authors.gender FROM authors JOIN author_research ON authors.author_no = author_research.author_no WHERE authors.gender="f";`
);

// Average of the h-index of all authors per university.
sqlQuery(
  `SELECT AVG(h_index) average_h_index, university FROM authors GROUP BY university`
);

// Sum of the research papers of the authors per university.
sqlQuery(
  `SELECT COUNT(DISTINCT author_research.research_id) AS total_researches, authors.university FROM authors JOIN author_research ON authors.author_no = author_research.author_no GROUP BY authors.university`
);

// Minimum and maximum of the h-index of all authors per university.
sqlQuery(
  `SELECT MAX(h_index) maximum, MIN(h_index) minimum, university FROM authors JOIN author_research ON authors.author_no = author_research.author_no GROUP BY university`
);

connection.end();
