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
}

connection.query("SELECT paper_title, COUNT(author_name) FROM research_papers INNER JOIN authors ON authors.author_no = research_Papers.paper_id GROUP BY paper_title" ,resErr);

connection.query("SELECT gender, COUNT(paper_title) FROM authors INNER JOIN authors_papers ON authors.author_no = authors_papers.author_no INNER JOIN research_papers ON research_papers.paper_id = authors_papers.paper_id WHERE gender = 'FEMALE'" ,resErr);

connection.query("SELECT university, AVG(h_index) FROM authors GROUP BY university ORDER BY h_index DESC " ,resErr);

connection.query("SELECT university, COUNT(paper_title) FROM research_papers LEFT JOIN authors ON authors.author_no = research_Papers.paper_id GROUP BY university" ,resErr);

connection.query("SELECT university, MIN(h_index), MAX(h_index) FROM authors GROUP BY  university" ,resErr);



connection.end();