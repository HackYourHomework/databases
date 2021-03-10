const mysql = require('mysql');
const util = require('util');

const con = {
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'researches'
};

// All research papers and the number of authors that wrote that paper.
const numberOfPapersAuthors = `
  SELECT research_papers.paper_title AS research_papers, COUNT(authors.author_name) AS authors_number
  FROM research_papers
  INNER JOIN authors_research_papers ON research_paper_no = research_papers.paper_id
  INNER JOIN authors ON authors_research_papers.author_no = authors.author_no
  GROUP BY paper_title;
`;

// Sum of the research papers published by all female authors.
const sumOfPapersByFemales = `
  SELECT COUNT(research_papers.paper_title) AS females_papers
  FROM research_papers
  INNER JOIN authors_research_papers ON research_paper_no = research_papers.paper_id
  INNER JOIN authors ON authors_research_papers.author_no = authors.author_no
  WHERE gender = 'f';
`;

// Average of the h-index of all authors per university.
const averageHIndex = `
  SELECT university, AVG(h_index) AS average
  FROM authors
  GROUP BY university;
`;

// Sum of the research papers of the authors per university.
const sumOfPapersPerUniversity = `
  SELECT university,COUNT(research_papers.paper_title) AS research_papers
  FROM research_papers
  INNER JOIN authors_research_papers ON research_paper_no = research_papers.paper_id
  INNER JOIN authors on authors_research_papers.author_no = authors.author_no
  GROUP BY university;
`;

// Minimum and maximum of the h-index of all authors per university.
const minMaxHIndex = `
  SELECT university,  MIN(h_index), MAX(h_index)
  FROM authors
  GROUP BY university;
`;

const seedDatabase = async () => {
  const connection = mysql.createConnection(con);
  const execQuery = util.promisify(connection.query.bind(connection));
  try {
    console.log(await execQuery(numberOfPapersAuthors));
    console.log(await execQuery(sumOfPapersByFemales));
    console.log(await execQuery(averageHIndex));
    console.log(await execQuery(sumOfPapersPerUniversity));
    console.log(await execQuery(minMaxHIndex));
    connection.end();
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  } 
};

seedDatabase(); 