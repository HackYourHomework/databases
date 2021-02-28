const data = require('./data');
const util = require('util');
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'userdb',
});

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
   research_id INT NOT NULL,
   CONSTRAINT fk_author FOREIGN KEY (author_no) REFERENCES authors(author_no),
   CONSTRAINT fk_research FOREIGN KEY (research_id) REFERENCES research_papers(paper_id),
   PRIMARY KEY (author_no, research_id)
);
`;

const INSERT_INTO_AUTHORS_TABLE = `
INSERT INTO authors (author_name, university, date_of_birth, h_index, gender, mentor)
VALUES (${data.authorName}, ${data.universityName}, ${data.dateOfBirth}, ${data.hIndex}, ${data.gender}, ${data.mentorNo});
`;
// const INSERT_INTO_RESEARCH_TABLE = `
// INSERT INTO research_papers (paper_title, conference, publish_data)
// VALUES (${data.paperTitle}, ${data.conferenceName}, ${data.publishDate});
// `;
// const INSERT_INTO_AUTHORS_AND_RESEARCH_TABLE = `
// INSERT INTO author_research (author_no, research_id)
// VALUES (${data.authorNo}, ${data.researchId});
// `;
async function seedDatabase() {
  const execQuery = util.promisify(connection.query.bind(connection));

  try {
    await execQuery(CREATE_TABLE_RESEARCH_PAPERS);
    await execQuery(CREATE_TABLE_AUTHOR_RESEARCH_RELATIONSHIP);

    // await execQuery(INSERT_INTO_RESEARCH_TABLE);
    // await execQuery(INSERT_INTO_AUTHORS_AND_RESEARCH_TABLE);
  } catch (err) {
    console.error(err.message);
    connection.end();
  }
  connection.end();
}
seedDatabase();
