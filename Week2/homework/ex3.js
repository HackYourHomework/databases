const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'Week_two',
  port: 3306
});

connection.connect();

const names_of_all_authors_and_their_corresponding_mentors = `SELECT E1.author_name, E2.author_name AS mentors  
FROM authors AS E1 LEFT JOIN authors AS E2 ON E1.mentor = E2.author_no`;

const all_columns_of_authors_and_their_published_paper_title = `SELECT authors.*, research_papers.paper_title FROM authors 
LEFT JOIN author_research_papers ON authors.author_no = author_research_papers.author_no  
LEFT JOIN research_papers ON author_research_papers.paper_id = research_papers.paper_id`;


function runQuery(queries){
  connection.query(queries, function (error, results, fields) {
      if (error) {
          throw error;
      }
      console.log(results);
  });
 }

runQuery(names_of_all_authors_and_their_corresponding_mentors);
runQuery(all_columns_of_authors_and_their_published_paper_title );

connection.end();