const util = require('util');
const mysql = require('mysql');

const CONNECTION_CONFIG = {
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'week2-db'
};

// Query for the names of all authors and their mentors
const QUERY_AUTHORS_AND_MENTORS = `
  SELECT author_name, mentor FROM authors;
`;

// Query for all columns of authors and their published paper_title
const QUERY_AUTHORS_AND_PAPER_TITLE = `
  SELECT authors.*, research_Papers.paper_title FROM authors LEFT JOIN paper_author ON authors.author_no = paper_author.author_no LEFT JOIN research_Papers ON paper_author.paper_id = research_Papers.paper_id;
`;

// Async function for the database connection
async function seedDatabase() {
  const connection = mysql.createConnection(CONNECTION_CONFIG);
  const execQuery = util.promisify(connection.query.bind(connection));

  try {
    // Print the names of all authors and their mentors
    const AuthorsAndMentors = await execQuery(QUERY_AUTHORS_AND_MENTORS);
    console.log(AuthorsAndMentors);

    // Print all columns of authors and their published paper_title
    const AuthorsAndPaperTitle = await execQuery(QUERY_AUTHORS_AND_PAPER_TITLE);
    console.log(AuthorsAndPaperTitle);

    connection.end();
  } catch (err) {
    console.log(err);
    connection.end();
  };
};

seedDatabase();