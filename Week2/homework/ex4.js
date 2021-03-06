// const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'Week_two',
  port: 3306
});

connection.connect();
const all_research_papers_and_the_number_of_author = 
`SELECT research_papers.paper_title, count(author_research_papers.author_no)
FROM research_papers
LEFT JOIN author_research_papers ON author_research_papers.paper_id= research_papers.paper_id 
GROUP BY paper_title`;

const number_of_research_papers_published_by_all_females = 
`SELECT count(distinct research_papers.paper_title) AS female_Authors 
FROM research_papers 
LEFT JOIN author_research_papers ON author_research_papers.paper_id = research_papers.paper_id 
LEFT JOIN authors ON author_research_papers.author_no = authors.author_no WHERE gender = 'f'`;

const average_of_the_h_index_of_all_authors_per_university = `SELECT university, avg(h_index) FROM authors GROUP BY university`;

const research_papers_of_the_authors_per_university = `SELECT university, count(author_research_papers.paper_id) FROM author_research_papers
LEFT JOIN authors ON author_research_papers.author_no = authors.author_no
GROUP BY university`;

const minimum_and_maximum_h_index_of_all_authors_per_university = `SELECT university, max(h_index), min(h_index) 
FROM authors
GROUP BY university`;


 function runQuery(query){
     connection.query(query, function (error, results, fields) {
         if (error) {
             throw error;
         }
         console.log(results);
     });
    }

 runQuery(all_research_papers_and_the_number_of_author);
 runQuery(number_of_research_papers_published_by_all_females);
 runQuery(average_of_the_h_index_of_all_authors_per_university);
 runQuery(research_papers_of_the_authors_per_university);
 runQuery(minimum_and_maximum_h_index_of_all_authors_per_university );

connection.end();

