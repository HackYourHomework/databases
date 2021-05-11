const mysql = require('mysql');
const util = require('util');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'week2_db'
});

// Query that prints all authors and their mentors
const authorsMentors = `
  SELECT A1.author_name AS authors, A2.author_name AS mentors
  FROM authors AS A1 LEFT JOIN authors AS A2 
  ON A1.mentor = A2.author_no;
`;

// Query that prints all columns of authors and their published paper_title
const authorsPapers = `
  SELECT authors.*, research_papers.paper_title
  FROM authors
  LEFT JOIN author_research ON authors.author_no = author_research.author_no
  LEFT JOIN research_papers ON author_research.research_id = research_papers.paper_id;
`;

async function seedDatabase() {
  const execQuery = util.promisify(connection.query.bind(connection));

  try {
    const authorsAndMentors = await execQuery(authorsMentors);
    console.log(authorsAndMentors);
    const authorsAndPapers = await execQuery(authorsPapers);
    console.log(authorsAndPapers);

    connection.end();

  } catch (error) {
    console.log(error);
  } 
};

seedDatabase();

