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

const authorsNumber = `
SELECT paper_title AS research_papers, COUNT(author_name) AS authors_number
FROM research_Papers
JOIN author_research
ON research_Papers.paper_id = author_research.paper_id
JOIN authors
ON authors.author_no = author_research.author_no
GROUP BY paper_title
`;
createQuery(authorsNumber);

const femalesResearch = `
SELECT COUNT(paper_title) AS females_research
FROM research_Papers
JOIN author_research
ON research_Papers.paper_id = author_research.paper_id
JOIN authors
ON authors.author_no = author_research.author_no
WHERE gender = "f"
`;
createQuery(femalesResearch);

const avgIndex = `
SELECT AVG(h_index) AS average, university
FROM authors
GROUP BY university
`;
createQuery(avgIndex);

const researchPapers = `
SELECT COUNT(paper_title) AS research_papers, university
FROM research_Papers
JOIN author_research
ON research_Papers.paper_id = author_research.paper_id
JOIN authors
ON authors.author_no = author_research.author_no
GROUP BY university
`;
createQuery(researchPapers);

const minMaxIndex = `
SELECT MIN(h_index) AS minimum , MAX(h_index) AS maximum, university
FROM authors
GROUP BY university
`;
createQuery(minMaxIndex);

function createQuery(query) {
  connection.query(query, (error) => {
    if (error) throw error;
  });
}
connection.end();
