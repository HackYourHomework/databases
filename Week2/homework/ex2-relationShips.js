const util = require('util');
const fs = require('fs');
const mysql = require('mysql');

const CONNECTION_CONFIG = {
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'week2',
  port: 3306
};

const CREATE_RESEARCH_PAPERS_TABLE = `
    CREATE TABLE IF NOT EXISTS research_papers(
        paper_id INT AUTO_INCREMENT PRIMARY KEY,
        paper_title VARCHAR(255),
        conference VARCHAR(255),
        publish_date DATE
    );`;

const CREATE_AUTHORS_RESEARCH_TABLE = `
    CREATE TABLE authors_research_papers(
        author_no INT NOT NULL,
        research_paper_no INT NOT NULL,
        CONSTRAINT fk_author FOREIGN KEY(author_no) REFERENCES authors(author_no),
        CONSTRAINT fk_paper FOREIGN KEY(research_paper_no) REFERENCES research_papers(paper_id),
        PRIMARY KEY(author_no,research_paper_no)
    );`;


// The relation between authors table and research table is Many To Many
// because every author may have many papers and every research paper may have many authors 

async function seedDatabase() {
  
  const connection = mysql.createConnection(CONNECTION_CONFIG);
  const readFile = util.promisify(fs.readFile);
  const execQuery = util.promisify(connection.query.bind(connection));

  try {
    await execQuery(CREATE_RESEARCH_PAPERS_TABLE);
    await execQuery(CREATE_AUTHORS_RESEARCH_TABLE);

    const authorsData = await readFile(__dirname + '/authors.json', 'utf8');
    const researchPapersData = await readFile(__dirname + '/researchPapers.json', 'utf8');
    const authorsResearchPapersData = await readFile(__dirname + '/authorsResearchPapers.json', 'utf8');
  
    const authors = JSON.parse(authorsData);
    const researchPapers = JSON.parse(researchPapersData);
    const authorsResearchPapers = JSON.parse(authorsResearchPapersData);
    // I have to stop checking foreign keys to fill in the data on mentor column, since it reference to author_no column 
    // I cant's give the author (which has author_no = 3 as an example) a mentor as author has number 9 (author number 9 is not exists yet) and so on....
    //I have to stop checking foreign keys to fill in the data on the mentor column, since it refers to author_no column, I can't give the author (which has author_no = 3 as an example) a mentor as an author has number 9 (author number 9 does not exist yet) and so on...
    //Or
    //Fill in the data manual and give the first author a mentor NULL, second author a mentor 1, third author a mentor 2, and so on...
    //Or
    //Fill all mentor NULL and then UPDATE the mentor column with exists authors numbers. 
    execQuery('SET FOREIGN_KEY_CHECKS=0');
    const authorPromise = authors.map(author => execQuery('INSERT INTO authors SET ?', author));
    execQuery('SET FOREIGN_KEY_CHECKS=1');
    const researchPapersPromise = researchPapers.map(researchPaper => execQuery('INSERT INTO research_papers SET ?', researchPaper));
    const authorsResearchPapersPromise = authorsResearchPapers.map(authorResearchPaper => execQuery('INSERT INTO authors_research_papers SET ?', authorResearchPaper));
 
    await Promise.all(authorPromise,researchPapersPromise,authorsResearchPapersPromise);
    connection.end();

  } catch (error) {
    console.error(error.message);
    connection.end();
  } 

}

seedDatabase();
