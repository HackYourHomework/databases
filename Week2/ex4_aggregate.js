const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "hyfweek2",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database...");
});
function execQuery(sqlQueries) {
  db.query(sqlQueries.sql, function (err, result) {
    if (err) throw err;
    console.log(JSON.parse(JSON.stringify(result)));
  });
}

const sqlQueries = [
  {
    //All research papers and the number of authors that wrote that paper
    sql: `
    SELECT research_papers.paper_title, count(authors_papers.author_no) AS number_of_authors
    FROM research_papers
    LEFT JOIN authors_papers ON authors_papers.paper_id = research_papers.paper_id 
    GROUP BY paper_title;`,
  },
  {
    //Sum of the research papers published by all female authors
    sql: `
    SELECT COUNT(research_papers.paper_title) AS number_of_female_authors FROM research_papers 
    LEFT JOIN authors_papers ON authors_papers.paper_id = research_papers.paper_id 
    LEFT JOIN authors ON authors_papers.author_no = authors.author_no
    WHERE gender = 'f'`,
  },
  {
    //Average of the h-index of all authors per university
    sql: `
    SELECT university, avg(h_index) FROM authors GROUP BY university`,
  },
  {
    //Sum of the research papers of the authors per university
    sql: `
    SELECT university, count(paper_title) FROM research_papers
    LEFT JOIN authors_papers ON authors_papers.paper_id = research_papers.paper_id
    LEFT JOIN authors ON authors_papers.author_no = authors.author_no
    GROUP BY university`,
  },
  {
    //Minimum and maximum of the h-index of all authors per university
    sql: `
    SELECT university, max(h_index), min(h_index) FROM authors
    GROUP BY university`,
  },
];

sqlQueries.forEach((query) => execQuery(query));

db.end();
