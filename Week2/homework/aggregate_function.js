const mysql = require('mysql');
const util = require('util');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'week2_db'
});

// All research papers and the number of authors that wrote that paper.
const numPapersAuthors = `
  SELECT research_papers.paper_title AS research_papers, COUNT(authors.author_name) AS authors_number
  FROM research_papers
  INNER JOIN author_research ON research_id = research_papers.paper_id
  INNER JOIN authors ON author_research.author_no = authors.author_no
  GROUP BY paper_id;
`;

// Sum of the research papers published by all female authors.
const sumPapersByFemales = `
  SELECT COUNT(DISTINCT research_papers.paper_id) AS females_papers
  FROM research_papers
  INNER JOIN author_research ON research_id = research_papers.paper_id
  INNER JOIN authors ON author_research.author_no = authors.author_no
  WHERE gender = 'f';
`;

// Average of the h-index of all authors per university.
const averageHIndex = `
  SELECT university, AVG(h_index) AS average
  FROM authors
  GROUP BY university;
`;

// Sum of the research papers of the authors per university.
const sumPapersPerUniversity = `
  SELECT university, COUNT(DISTINCT research_papers.paper_id) AS research_papers
  FROM research_papers
  INNER JOIN author_research ON research_id = research_papers.paper_id
  INNER JOIN authors ON author_research.author_no = authors.author_no
  GROUP BY university;
`;

// Minimum and maximum of the h-index of all authors per university.
const minMaxHIndex = `
  SELECT university, MIN(h_index), MAX(h_index)
  FROM authors
  GROUP BY university;
`;

async function seedDatabase() {
  const execQuery = util.promisify(connection.query.bind(connection));
  try {
    console.log(await execQuery(numPapersAuthors));
    console.log(await execQuery(sumPapersByFemales));
    console.log(await execQuery(averageHIndex));
    console.log(await execQuery(sumPapersPerUniversity));
    console.log(await execQuery(minMaxHIndex));
    connection.end();
  } catch (error) {
    console.log(error.message);
  } 
};

seedDatabase(); 