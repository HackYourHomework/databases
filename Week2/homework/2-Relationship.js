const data = require('./data');
const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'userdb',
});

// function to execute insert queries
function executeQuery(queryString, data) {
  const execQuery = util.promisify(connection.query.bind(connection));
  execQuery(queryString, [data]);
}

const CREATE_TABLE_RESEARCH_PAPERS = `
CREATE TABLE IF NOT EXISTS research_papers(
    paper_id INT AUTO_INCREMENT,
    paper_title VARCHAR(250) NOT NULL,
    conference VARCHAR(250) NOT NULL,
    publish_date DATE NOT NULL,
    PRIMARY KEY (paper_id)
);
`;

const CREATE_TABLE_AUTHOR_RESEARCH_RELATIONSHIP = `
CREATE TABLE IF NOT EXISTS author_research(
   author_no INT NOT NULL,
   research_id INT NOT NULL ,
   CONSTRAINT fk_author FOREIGN KEY (author_no) REFERENCES authors(author_no),
   CONSTRAINT fk_research FOREIGN KEY (research_id) REFERENCES research_papers(paper_id)
);
`;

async function seedDatabase() {
  const execQuery = util.promisify(connection.query.bind(connection));

  try {
    await execQuery(CREATE_TABLE_RESEARCH_PAPERS);
    await execQuery(CREATE_TABLE_AUTHOR_RESEARCH_RELATIONSHIP);

    await executeQuery(
      `INSERT INTO authors (author_name, university, date_of_birth, h_index, gender) VALUES ?`,
      data.authorDetails
    );

    await executeQuery(`UPDATE authors SET mentor = 4 WHERE author_no = 1 `);
    await executeQuery(`UPDATE authors SET mentor = 15 WHERE author_no = 2 `);
    await executeQuery(`UPDATE authors SET mentor = 13 WHERE author_no = 3 `);
    await executeQuery(`UPDATE authors SET mentor = 12 WHERE author_no = 4 `);
    await executeQuery(`UPDATE authors SET mentor = 7 WHERE author_no = 5 `);
    await executeQuery(`UPDATE authors SET mentor = 11 WHERE author_no = 6 `);
    await executeQuery(`UPDATE authors SET mentor = 14 WHERE author_no = 7 `);
    await executeQuery(`UPDATE authors SET mentor = 13 WHERE author_no = 8 `);
    await executeQuery(`UPDATE authors SET mentor = 2 WHERE author_no = 9 `);
    await executeQuery(`UPDATE authors SET mentor = 6 WHERE author_no = 10 `);
    await executeQuery(`UPDATE authors SET mentor = 1 WHERE author_no = 11 `);
    await executeQuery(`UPDATE authors SET mentor = 7 WHERE author_no = 12 `);
    await executeQuery(`UPDATE authors SET mentor = 8 WHERE author_no = 13 `);
    await executeQuery(`UPDATE authors SET mentor = 2 WHERE author_no = 14 `);
    await executeQuery(`UPDATE authors SET mentor = 2 WHERE author_no = 15 `);

    await executeQuery(
      `INSERT INTO research_papers (paper_title, conference, publish_date) VALUES ? `,
      data.researchDetails
    );

    await executeQuery(
      `INSERT INTO author_research (author_no,research_id) VALUES ? `,
      data.authorResearchRelation
    );
  } catch (err) {
    console.error(err.message);
  }
  connection.end();
}
seedDatabase();
