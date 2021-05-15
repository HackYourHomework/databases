const util = require("util");
const fs = require("fs");
const mysql = require("mysql");

const CONNECTION_CONFIG = {
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "hyfweek2",
};

const create_table_research_papers = `
  CREATE TABLE IF NOT EXISTS research_papers(
    paper_id  INT AUTO_INCREMENT PRIMARY KEY, 
    paper_title TEXT, 
    conference  VARCHAR(50), 
    publish_date DATETIME
  )`;
const create_table_authors_papers = `
  CREATE TABLE IF NOT EXISTS authors_papers(
    PRIMARY KEY(author_no, paper_id), 
    author_no INT, 
    paper_id INT, 
    CONSTRAINT FK_AUTH FOREIGN KEY (author_no) REFERENCES authors(author_no), 
    CONSTRAINT FK_PAPER FOREIGN KEY(paper_id) REFERENCES research_papers(paper_id)
  )`;

async function seedDatabase() {
  const connection = mysql.createConnection(CONNECTION_CONFIG);
  const readFile = util.promisify(fs.readFile);

  const execQuery = util.promisify(connection.query.bind(connection));

  try {
    await execQuery(create_table_research_papers);
    await execQuery(create_table_authors_papers);

    const dataAuthors = await readFile(__dirname + "/authors.json", "utf8");
    const dataResearchPapers = await readFile(
      __dirname + "/research_papers.json",
      "utf8"
    );
    const dataAuthorsPapers = await readFile(
      __dirname + "/authors_papers.json",
      "utf8"
    );

    const myAuthors = JSON.parse(dataAuthors);
    const myResearchPapers = JSON.parse(dataResearchPapers);
    const myAuthorsPapers = JSON.parse(dataAuthorsPapers);

    execQuery("SET FOREIGN_KEY_CHECKS=0");

    const promise1 = myAuthors.map((author) =>
      execQuery("INSERT INTO authors SET ?", author)
    );

    execQuery("SET FOREIGN_KEY_CHECKS=0");

    const promise2 = myResearchPapers.map((paper) =>
      execQuery("INSERT INTO research_papers SET ?", paper)
    );

    const promise3 = myAuthorsPapers.map((common) =>
      execQuery("INSERT INTO authors_papers SET ?", common)
    );

    await Promise.all(promise1);
    await Promise.all(promise2);
    await Promise.all(promise3);
    connection.end();
  } catch (err) {
    console.error(err.message);
    connection.end();
  }
}

seedDatabase();
