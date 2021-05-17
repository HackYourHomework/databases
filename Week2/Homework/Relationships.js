const mysql = require("mysql");
const util = require('util');

const authors = require('./authors.js');
const researchPapers = require('./researchPaper.js');
const authorsPapers = require("./authorsPapers.js");


const connection = mysql.createConnection({
    host: "localhost",
    user: "hyfuser",
    password: "hyfpassword",
    database: "KeysDB",
  });


const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
const research_papers_table = `CREATE TABLE IF NOT EXISTS research_papers(
 paper_id  INT AUTO_INCREMENT PRIMARY KEY,
 paper_title  VARCHAR(50),
 conference  VARCHAR(50),
 publish_date DATE)`;

const authors_papers_table = `CREATE TABLE IF NOT EXISTS authors_papers(
 PRIMARY KEY(author_no, paper_id),
 author_no INT,
 paper_id INT,
 CONSTRAINT FK_AUTH FOREIGN KEY (author_no) REFERENCES authors(author_no),
 CONSTRAINT FK_PAPER FOREIGN KEY(paper_id) REFERENCES research_papers(paper_id))`;


connection.connect();

    
try {
      await execQuery(research_papers_table);
      await execQuery(authors_papers_table);

      authors.forEach(async (author) => {
        await execQuery("INSERT INTO authors SET ?", author);
      });
      researchPapers.forEach(async (paper) => {
        await execQuery("INSERT INTO research_papers SET ?", paper);
      });
      authorsPapers.forEach(async (authorPaper) => {
        await execQuery("INSERT INTO authors_papers SET ?", authorPaper);
      });

    } catch (err) {
      if (err) console.log(err);
    }
  
    connection.end();
}
  

seedDatabase();