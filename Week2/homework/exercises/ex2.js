const mysql = require('mysql');
const util = require('util');
const fs = require('fs');

const con = {
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'researches'
};

/* Create another table, called research_Papers with the following fields: 
(paper_id, paper_title, conference, publish_date, ...) */
const researchPapersCreated = `
  CREATE TABLE IF NOT EXISTS research_papers (
    paper_id INT AUTO_INCREMENT PRIMARY KEY,
    paper_title VARCHAR(255),
    conference VARCHAR(255),
    publish_date DATE
  );
`;

const authorsResearchTableCreated = `
  CREATE TABLE authors_research_papers (
    author_no INT NOT NULL,
    research_paper_no INT NOT NULL,
    CONSTRAINT fk_author FOREIGN KEY(author_no) REFERENCES authors(author_no),
    CONSTRAINT fk_paper FOREIGN KEY(research_paper_no) REFERENCES research_papers(paper_id),
    PRIMARY KEY(author_no, research_paper_no)
  );
`;

const seedDatabase = async () => {
  const connection = mysql.createConnection(con);
  const readFile = util.promisify(fs.readFile);
  const execQuery = util.promisify(connection.query.bind(connection));
  try {
    await execQuery(researchPapersCreated);
    await execQuery(authorsResearchTableCreated);
    const authorsData = await readFile(__dirname + '/authors.json', 'utf8');
    const authors = JSON.parse(authorsData);
    const researchPapersData = await readFile(__dirname + '/researchPapers.json', 'utf8');
    const researchPapers = JSON.parse(researchPapersData);
    const authorsResearchPapersData = await readFile(__dirname + '/authorsResearchPapers.json', 'utf8');
    const authorsResearchPapers = JSON.parse(authorsResearchPapersData);
    execQuery('SET FOREIGN_KEY_CHECKS=0');
    const authorPromise = authors.map(author => execQuery('INSERT INTO authors SET ?', author));
    execQuery('SET FOREIGN_KEY_CHECKS=1');
    const researchPapersPromise = researchPapers.map(researchPaper => execQuery('INSERT INTO research_papers SET ?', researchPaper));
    const authorsResearchPapersPromise = authorsResearchPapers.map(authorResearchPaper => execQuery('INSERT INTO authors_research_papers SET ?', authorResearchPaper));
    await Promise.all(authorPromise, researchPapersPromise, authorsResearchPapersPromise);
    connection.end();
  } catch (error) {
    console.log(error.message);
    // exit.connection(1);
  }
};

seedDatabase();