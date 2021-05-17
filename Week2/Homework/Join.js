const mysql = require("mysql");


const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "KeysDB",
});

connection.connect((err) => {
    if (err) throw err;
    console.log("connect to database");
  });


const resErr = (err , result) => {
    if (err) throw err;
    console.log(result);
}


connection.query("USE KeysDB",resErr);

connection.query (`SELECT A1.author_name AS Author,
A2.author_name AS Mentor
FROM authors AS A1
LEFT JOIN authors AS A2
ON A1.mentor = A2.author_no`,
resErr);

connection.query (`SELECT authors.*, paper_title
FROM authors
LEFT JOIN authors_papers
ON authors.author_no = authors_papers.author_no
LEFT JOIN research_papers
ON authors_papers.paper_id = research_papers.paper_id`,
resErr);
  
connection.end();