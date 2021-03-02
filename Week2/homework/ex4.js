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
const All_research_papers_and_the_number_of_author = 
`SELECT research_Papers.paper_title, count(authors.author_name)
FROM research_Papers
LEFT JOIN author_researchPapers ON author_researchPapers.paperNumber = research_Papers.paper_id 
LEFT JOIN authors ON author_researchPapers.authorNumber = authors.author_no
GROUP BY paper_title;`;

const number_of_research_papers_published_by_all_females = 
`SELECT count(research_Papers.paper_title) AS female_Authors 
FROM research_Papers 
LEFT JOIN author_researchPapers ON author_researchPapers.paperNumber = research_Papers.paper_id 
LEFT JOIN authors ON author_researchPapers.authorNumber = authors.author_no
WHERE gender = 'f'`;

const Average_of_the_h_index_of_all_authors_per_university = `SELECT university, count(author_name), avg(h_index) FROM authors GROUP BY university`;

const research_papers_of_the_authors_per_university = `SELECT university, count(research_Papers.paper_title) FROM research_Papers
LEFT JOIN author_researchPapers ON author_researchPapers.paperNumber = research_Papers.paper_id
LEFT JOIN authors ON author_researchPapers.authorNumber = authors.author_no
GROUP BY university`;
const Minimum_and_maximum_h_index_of_all_authors_per_university = `SELECT count(author_name), university, max(h_index), min(h_index) 
FROM authors
GROUP BY university`;


 function runQuery(queries){
     connection.query(queries, function (error, results, fields) {
         if (error) {
             throw error;
         }
         console.log(results);
     });
    }

 runQuery(All_research_papers_and_the_number_of_author);
 runQuery(number_of_research_papers_published_by_all_females);
 runQuery(Average_of_the_h_index_of_all_authors_per_university);
 runQuery(research_papers_of_the_authors_per_university);
 runQuery(Minimum_and_maximum_h_index_of_all_authors_per_university );

connection.end();

