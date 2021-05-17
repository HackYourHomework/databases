const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'week2',
});
connection.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log('Connected');
  }
});

function sendQuery(query) {
  connection.query(query, (error, results) => {
    if (error) {
      throw error;
    }
    console.log(`the reply ${query} is `, results);
  });
}

//1. All research papers and the number of authors that wrote that paper.
const queryCountPapers =
  'SELECT research_papers.*, count(auth_no) FROM research_papers LEFT JOIN author_paper ON research_papers.paper_id=author_paper.paper_no GROUP BY research_papers.paper_id';
sendQuery(queryCountPapers);

//2. Sum of the research papers published by all female authors.
const queryPapersOfWomen =
  'SELECT COUNT(distinct(author_paper.paper_no)) AS papers_of_women FROM author_paper JOIN authors ON author_paper.auth_no=authors.author_no GROUP BY authors.gender HAVING authors.gender = "f"';
sendQuery(queryPapersOfWomen);

//3. Average of the h-index of all authors per university.
const queryHIndex =
  'SELECT university, AVG(h_index) FROM authors GROUP BY university';
sendQuery(queryHIndex);

//4. Sum of the research papers of the authors per university.
const querySumPapers =
  'SELECT authors.university, COUNT(distinct(paper_no)) AS sum_of_papers FROM authors LEFT JOIN author_paper ON authors.author_no=author_paper.auth_no GROUP BY authors.university';
sendQuery(querySumPapers);

//5. Minimum and maximum of the h-index of all authors per university.
const queryMinMax =
  'SELECT university, MIN(h_index), MAX(h_index) FROM authors GROUP BY university';
sendQuery(queryMinMax);

connection.end((error) => {
  if (error) {
    console.log('error with ending connection');
  } else console.log('connection is ended');
});
