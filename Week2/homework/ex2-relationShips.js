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
        paper_id INT auto_increment PRIMARY KEY,
        paper_title VARCHAR(255),
        conference VARCHAR(255),
        publish_date DATE
    );`;

const CREATE_AUTHORS_RESEARCH_TABLE = `
    CREATE TABLE authors_research_papers(
        author_no int not null,
        research_paper_no int not null,
        constraint fk_author foreign key(author_no) references authors(author_no),
        constraint fk_paper foreign key(research_paper_no) references research_papers(paper_id),
        primary key(author_no,research_paper_no)
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

    const authorPromise = authors.map(author => execQuery('INSERT INTO authors SET ?', author));
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
