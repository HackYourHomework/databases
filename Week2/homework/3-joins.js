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

// Write a query that prints names of all authors and their corresponding mentors.
sqlQuery(
  'SELECT author.author_name AS author_name, mentor.author_name AS mentor_name FROM authors AS author JOIN authors AS mentor ON mentor.author_no = author.mentor '
);

// Write a query that prints all columns of authors and their published paper_title. If there is an author without any research_Papers, print the information of that author too.
sqlQuery(
  'SELECT authors.*,research_papers.paper_title FROM authors LEFT JOIN author_research ON authors.author_no = author_research.author_no LEFT JOIN research_papers ON author_research.research_id = research_papers.paper_id'
);

connection.end();
