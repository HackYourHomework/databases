const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "relations",
});

connection.connect((error) => {
  if (error) throw error;
  console.log("connected");
});

connection.query("USE relations", (error) => {
  if (error) throw error;
});

const authorsMentors = `
SELECT a1.author_name AS authors, a2.author_name AS mentors
FROM authors AS a1 LEFT JOIN authors AS a2
ON a1.mentor = a2.author_no
`;
createQuery(authorsMentors);

const authorsPaperTitle = `
SELECT authors.*, paper_title
FROM authors
LEFT JOIN author_research
ON authors.author_no = author_research.author_no
LEFT JOIN research_Papers
ON author_research.paper_id = research_Papers.paper_id
`;
createQuery(authorsPaperTitle);

function createQuery(query) {
  connection.query(query, (error) => {
    if (error) throw error;
  });
}

connection.end();
