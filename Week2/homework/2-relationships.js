const mysql = require("mysql");
const util = require("util");
const authors = require("./authors");
const papers = require("./papers");
const authors_papers = require("./authors_papers");

// Create connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "library",
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  const tablePapers = `CREATE TABLE IF NOT EXISTS research_papers(paper_id  INT AUTO_INCREMENT PRIMARY KEY, paper_title  VARCHAR(50), conference  VARCHAR(50), publish_date DATE)`;
  const tableAuthorsPapers = `CREATE TABLE IF NOT EXISTS authors_papers(PRIMARY KEY(author_no, paper_id), author_no INT, paper_id INT, CONSTRAINT FK_AUTH FOREIGN KEY (author_no) REFERENCES authors(author_no), CONSTRAINT FK_PAPER FOREIGN KEY(paper_id) REFERENCES research_papers(paper_id))`;


  connection.connect();

  try {
    // call the function that returns promise
    await execQuery(tablePapers);
    await execQuery(tableAuthorsPapers);
    authors.forEach(async (author) => {
      await execQuery("INSERT INTO authors SET ?", author);
    });
    papers.forEach(async (paper) => {
      await execQuery("INSERT INTO research_papers SET ?", paper);
    });
    authors_papers.forEach(async (authors_paper) => {
      await execQuery("INSERT INTO authors_papers SET ?", authors_paper);
    });
  } catch (error) {
    console.error(error);
    connection.end();
  }

  connection.end();
}

seedDatabase();
