const mysql = require("mysql");
const util = require("util");
const fs = require("fs");

const CREATE_RESEARCH_PAPERS_TABLE = `
CREATE TABLE IF NOT EXISTS research_Papers(
  paper_id INT NOT NULL,
  paper_title VARCHAR(50),
  conference INT,
  publish_date DATE,
  PRIMARY KEY(paper_id)
  )
`;

const CREATE_AUTHORS_RESEARCH_TABLE = `
CREATE TABLE IF NOT EXISTS author_research(
  author_no INT NOT NULL,
  paper_id INT NOT NULL,
  CONSTRAINT fk_auth FOREIGN KEY (author_no) REFERENCES authors(author_no),
  CONSTRAINT fk_paper FOREIGN KEY (paper_id) REFERENCES research_Papers(paper_id),
  PRIMARY KEY(author_no, paper_id)
)
`;

async function seedDatabase() {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "hyfuser",
    password: "hyfpassword",
    database: "relations",
  });

  const readFile = util.promisify(fs.readFile);
  const execQuery = util.promisify(connection.query.bind(connection));

  try {
    await execQuery(`SET FOREIGN_KEY_CHECKS = 0`);
    await execQuery(CREATE_RESEARCH_PAPERS_TABLE);
    await execQuery(CREATE_AUTHORS_RESEARCH_TABLE);

    const researchPapersData = await readFile(
      __dirname + "/researchPapers.json",
      "utf8"
    );
    const researchPapers = JSON.parse(researchPapersData);

    const promiseResearchPapers = researchPapers.map((researchPaper) =>
      execQuery(`INSERT INTO research_Papers SET ?`, researchPaper)
    );

    const authorsData = await readFile(__dirname + "/authors.json", "utf8");
    const authors = JSON.parse(authorsData);

    const promiseAuthors = authors.map((author) =>
      execQuery(`INSERT INTO authors SET ?`, author)
    );

    const authResearchData = await readFile(
      __dirname + "/auth_research.json",
      "utf8"
    );
    const authorsResearch = JSON.parse(authResearchData);

    const promiseAuthResearch = authorsResearch.map((authorResearch) =>
      execQuery(`INSERT INTO author_research SET ?`, authorResearch)
    );

    await Promise.all(
      promiseResearchPapers,
      promiseAuthors,
      promiseAuthResearch
    );
    connection.end();
  } catch (err) {
    console.error(err.message);
    connection.end();
  }
}

seedDatabase();
