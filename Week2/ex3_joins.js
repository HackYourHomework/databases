const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "HYFWEEK2",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to database...");
});
function insertQuery(sqlQueries) {
  db.query(sqlQueries.sql, function (err, result) {
    if (err) throw err;
    console.log(result);
  });
}

const sqlQueries = [
  {
    //names of all `authors` and their corresponding `mentors`
    sql: `
    SELECT auth.author_name AS "author_name", ment.author_name AS "mentor_name"
    FROM authors AS auth
    JOIN authors AS ment
    ON auth.mentor = ment.author_no`,
  },
  {
    //all columns of `authors` and their published `paper_title
    sql: `
    SELECT auth.*, paper_title
    FROM authors AS auth
    LEFT JOIN authors_papers AS auth_paper
    ON auth.author_no = auth_paper.author_no
    LEFT JOIN research_papers AS research
    ON auth_paper.paper_id = research.paper_id`,
  },
];

sqlQueries.forEach((query) => insertQuery(query));

db.end();
