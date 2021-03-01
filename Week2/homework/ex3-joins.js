const util = require('util');
const mysql = require('mysql');


const CONNECTION_CONFIG = {
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'week2',
  port: 3306
};


const SELECT_AUTHORS_MENTORS = `
    SELECT A1.author_name AS authors, A2.author_name AS mentors
    FROM authors AS A1 LEFT JOIN authors AS A2 
    ON A1.mentor = A2.author_no;
    `;

const SELECT_AUTHORS_PAPERS = `
    SELECT authors.*, research_papers.paper_title
    FROM authors
    LEFT JOIN authors_research_papers ON authors.author_no = authors_research_papers.author_no
    LEFT JOIN research_papers ON authors_research_papers.research_paper_no = research_papers.paper_id;
    `;


async function seedDatabase() {
  const connection = mysql.createConnection(CONNECTION_CONFIG);
  const execQuery = util.promisify(connection.query.bind(connection));
  try {
    // call the function that returns promise

    console.log("Names Of All Authors And Their Corresponding Mentors:");
    console.log(await execQuery(SELECT_AUTHORS_MENTORS));

    console.log("Authors And Their Published Paper Title:");
    console.log(await execQuery(SELECT_AUTHORS_PAPERS));

    connection.end();
  } catch (error) {
    console.error(error.message);
    connection.end();
  } 
}

seedDatabase();
