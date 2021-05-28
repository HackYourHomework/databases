const mysql = require('mysql');
const util = require('util');

const authorData = require('./data/authors');
const researchData = require('./data/papers');
const authorReasearchData = require('./data/author_research');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'week2_db'
});

async function seedDatabase() {
  const researchPapersTable = `
    CREATE TABLE IF NOT EXISTS research_papers (
      paper_id INT AUTO_INCREMENT primary key,
      paper_title VARCHAR(50),
      conference VARCHAR(50),
      publish_date DATE
    );`;
    
  const authorResearchTable = `
    CREATE TABLE IF NOT EXISTS author_research(
      author_no INT,
      research_id INT,
      CONSTRAINT fk_author FOREIGN KEY (author_no) REFERENCES authors(author_no),
      CONSTRAINT fk_research FOREIGN KEY (research_id) REFERENCES research_papers(paper_id),
      PRIMARY KEY(author_no, research_id)
    );
  `;
  
  connection.connect();
  
  const execQuery = util.promisify(connection.query.bind(connection));

  try {

    await execQuery(researchPapersTable);
    await execQuery(authorResearchTable);

    // disable foreign key check before running query
    execQuery('SET FOREIGN_KEY_CHECKS=0');

    authorData.forEach(async (author) => {
      await execQuery("INSERT INTO authors SET ?", author);
    });

    execQuery('SET FOREIGN_KEY_CHECKS=1');

    researchData.forEach(async (researchPaper) => {
      await execQuery("INSERT INTO research_papers SET ?", researchPaper);
    });

    authorReasearchData.forEach(async (authorResearchPaper) => {
      await execQuery("INSERT INTO  author_research SET ?", authorResearchPaper);
    });

  } catch (error) {
    console.log(error);
  }
  
    connection.end();
}

seedDatabase();




  


