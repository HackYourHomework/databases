const mysql = require('mysql');
const util = require('util');

const con = {
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'researches'
};

// Write a query that prints names of all authors and their corresponding mentors.
const authorsMentorsSelected = `
  SELECT A1.author_name AS authors, A2.author_name AS mentors
  FROM authors AS A1 LEFT JOIN authors AS A2 
  ON A1.mentor = A2.author_no;
`;

// Write a query that prints all columns of authors and their published paper_title. 
const authorsPapersSelected = `
  SELECT authors.*, research_papers.paper_title
  FROM authors
  LEFT JOIN authors_research_papers ON authors.author_no = authors_research_papers.author_no
  LEFT JOIN research_papers ON authors_research_papers.research_paper_no = research_papers.paper_id;
`;

const seedDatabase = async () => {
  const connection = mysql.createConnection(con);
  const execQuery = util.promisify(connection.query.bind(connection));
  try {
    console.log(await execQuery(authorsMentorsSelected));
    console.log(await execQuery(authorsPapersSelected));
    connection.end();
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  } 
};

seedDatabase();
