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
const queryAuthorsMentors =
  'SELECT authors.author_name AS author_name, mentors.author_name AS mentor_name FROM authors LEFT JOIN authors AS mentors ON authors.mentor=mentors.author_no';
sendQuery(queryAuthorsMentors);

const queryPapers =
  'SELECT authors.*, research_papers.paper_title FROM authors LEFT JOIN author_paper ON authors.author_no=author_paper.auth_no LEFT JOIN research_papers ON author_paper.paper_no=research_papers.paper_id';
sendQuery(queryPapers);

connection.end((error) => {
  if (error) {
    console.log('error with ending connection');
  } else console.log('connection is ended');
});
