import util from 'util';
import mysql from 'mysql';
import fs from 'fs';
import path from 'path';

const CONNECTION_CONFIG = {
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'week2_db',
};

const CREATE_RESEARCH_PAPERS_TABLE =
  'CREATE TABLE IF NOT EXISTS research_papers(paper_id INT PRIMARY KEY, paper_title VARCHAR(50), conference VARCHAR(50), publish_date DATE);';
const CREATE_AUTHORS_RESEARCH_PAPERS_TABLE = `CREATE TABLE IF NOT EXISTS authors_research_papers(
    relation_id INT PRIMARY KEY, 
    author_no INT, 
    paper_id INT,
    CONSTRAINT FK_Author FOREIGN KEY (author_no) REFERENCES authors(author_no),
    CONSTRAINT FK_Paper FOREIGN KEY (paper_id) REFERENCES research_papers(paper_id)
    );`;
const DROP_FOREIGN_KEY_MENTOR =
  'ALTER TABLE authors DROP FOREIGN KEY FK_Mentor;';
const ADD_FOREIGN_KEY_MENTOR =
  'ALTER TABLE authors ADD CONSTRAINT FK_Mentor FOREIGN KEY(mentor) REFERENCES authors(author_no);';
const DELETE_AUTHORS_ALL_ROWS = 'DELETE FROM authors;';
const DELETE_RESEARCH_PAPERS_ALL_ROWS = 'DELETE FROM research_papers;';

const databaseQueries = async () => {
  const connection = mysql.createConnection(CONNECTION_CONFIG);
  const execQuery = util.promisify(connection.query.bind(connection));

  try {
    await execQuery(CREATE_RESEARCH_PAPERS_TABLE);
    await execQuery(CREATE_AUTHORS_RESEARCH_PAPERS_TABLE);

    const authors = JSON.parse(
      fs.readFileSync(path.resolve('data/authors.json')),
    );
    const researchPapers = JSON.parse(
      fs.readFileSync(path.resolve('data/research_papers.json')),
    );

    await execQuery(DROP_FOREIGN_KEY_MENTOR);
    await execQuery(DELETE_AUTHORS_ALL_ROWS);
    await execQuery(DELETE_RESEARCH_PAPERS_ALL_ROWS);

    const authorsPromises = authors.map((author) =>
      execQuery('INSERT INTO authors SET ?', author),
    );
    await Promise.all(authorsPromises);

    const researchPapersPromises = researchPapers.map((researchPaper) =>
      execQuery('INSERT INTO research_papers SET ?', researchPaper),
    );
    await Promise.all(researchPapersPromises);

    await execQuery(ADD_FOREIGN_KEY_MENTOR);
  } catch (error) {
    console.log('error: ', error);
  }

  connection.end();
};
databaseQueries();
