const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "KeysDB",
});

connection.connect((err) => {
    if (err) throw err;
    console.log("connected");
  });

  
const resErr = (err , result) => {
    if (err) throw err;
    console.log(result);
};



connection.query(`SELECT research_papers.paper_title, COUNT(authors.author_name) AS no_of_authors
FROM research_papers
LEFT JOIN authors_papers
ON authors_papers.paper_id = research_papers.paper_id
LEFT JOIN authors
ON authors.author_no = authors_papers.author_no`
,resErr);

connection.query(`SELECT gender, COUNT(paper_title) AS female_research_papers
FROM authors
LEFT JOIN authors_papers
ON authors.author_no = authors_papers.author_no
LEFT JOIN research_papers
ON research_papers.paper_id = authors_papers.paper_id
WHERE gender = "FEMALE"`
,resErr);


connection.query(`SELECT university, AVG(h_index) FROM authors
GROUP BY university
ORDER BY h_index DESC`
,resErr);


connection.query(`SELECT university , COUNT(authors_papers.paper_id)
FROM authors
LEFT JOIN authors_papers
ON authors.author_no = authors_papers.author_no
GROUP BY university
ORDER BY COUNT(authors_papers.paper_id) DESC`
,resErr);

connection.query(`SELECT university, MIN(h_index), MAX(h_index)
FROM authors
GROUP BY university`
,resErr
);

connection.end();