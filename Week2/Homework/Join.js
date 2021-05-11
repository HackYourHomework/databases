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
    console.log(result)
}


connection.query("USE KeysDB",resErr);


connection.query ("SELECT a1.author_name AS Author, a2.author_name AS Mentor FROM authors AS a1 INNER JOIN authors AS a2 ON a1.mentor = a2.author_no",resErr);
 

connection.query ("SELECT author_no,author_name,university,date_of_birth,h_index,gender,paper_title FROM authors LEFT JOIN authors_papers ON authors.author_no = authors_papers.author_no", resErr);

connection.end();