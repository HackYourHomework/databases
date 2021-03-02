"use strict";
//NPM packages
const util = require("util");
const mysql = require("mysql");

//Authors and research paper data
const authors = require("./data/authors");
const papers = require("./data/research-papers");
const authorResearchPapers = require("./data/author-researchpapers");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "academy",
  port: 3306,
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  //reseach paper table
  const createResearchPapersTable = `
  CREATE TABLE IF NOT EXISTS research_papers (
    paper_id INT,
    paper_title VARCHAR(150),
    conference VARCHAR(150),
    publish_date DATE,
    PRIMARY KEY (paper_id)
  );`;

  //create an intermediary table representing the many-to-many relationship
  //between the authors and research_papers tables
  const createAuthorPapersTable = `
  CREATE TABLE IF NOT EXISTS author_research_papers (
    authorNO INT,
    paperID INT,
    FOREIGN KEY (authorNO) REFERENCES authors(author_no),
    FOREIGN KEY (paperID) REFERENCES research_papers(paper_id)
  );`;

  const mentorData = `
  UPDATE authors
    SET mentor = CASE
    WHEN author_no = '1' THEN '15'
    WHEN author_no = '2' THEN '4'
    WHEN author_no = '3' THEN '14'
    WHEN author_no = '4' THEN '7'
    WHEN author_no = '5' THEN '3'
    WHEN author_no = '6' THEN '9'
    WHEN author_no = '7' THEN '6'
    WHEN author_no = '8' THEN '13'
    WHEN author_no = '9' THEN '2'
    WHEN author_no = '10' THEN '12'
    WHEN author_no = '11' THEN '5'
    WHEN author_no = '12' THEN '8'
    WHEN author_no = '13' THEN '10'
    WHEN author_no = '14' THEN '1'
    WHEN author_no = '15' THEN '11'
    ELSE mentor
    END
    WHERE author_no IN (1,2,3,4,5,6,7,8,9,10,11,12,13,14,15)`;

  connection.connect();

  try {
    //
    await Promise.all(
      (execQuery(createResearchPapersTable),
      execQuery(createAuthorPapersTable),
      authors.map((author) => execQuery("INSERT INTO authors SET ?", author))),
      execQuery(mentorData)
    );

    //insert research paper data
    await Promise.all(
      papers.map((paper) =>
        execQuery("INSERT INTO research_papers SET ?", paper)
      )
    );

    //feed the intermediary table representing the m-to-m relationship
    await Promise.all(
      authorResearchPapers.map((author) =>
        execQuery(`INSERT INTO author_research_papers SET ?`, author)
      )
    );
  } catch (err) {
    console.error(err);
  }

  connection.end();
}

seedDatabase();
