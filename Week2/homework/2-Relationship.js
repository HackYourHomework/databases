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
    paper_title VARCHAR(250),
    conference VARCHAR(250),
    publish_date DATE,
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

    execQuery('SET FOREIGN_KEY_CHECKS=0');
    await executeQuery(
      `INSERT INTO authors (author_name, university, date_of_birth, h_index, gender, mentor) VALUES ?`,
      data.authorDetails
    );
    execQuery('SET FOREIGN_KEY_CHECKS=1');

    await executeQuery(
      `INSERT INTO research_papers (paper_title, conference, publish_date) VALUES ? `,
      data.researchDetails
    );

    execQuery('SET FOREIGN_KEY_CHECKS=0');
    await executeQuery(
      `INSERT INTO author_research (author_no,research_id) VALUES ? `,
      data.authorResearchRelation
    );
    execQuery('SET FOREIGN_KEY_CHECKS=1');
  } catch (err) {
    console.error(err.message);
    connection.end();
  }
  connection.end();
}
seedDatabase();
