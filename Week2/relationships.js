"use strict";

const util = require("util");
const mysql = require("mysql");

//authors data
const authors = require("./data/authors");
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  port: 3306,
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  const useDatabase = "use academy";

  const createResearchPapersTable = `
  CREATE TABLE IF NOT EXISTS research_papers (
    paper_id INT,
    paper_title VARCHAR(50),
    conference VARCHAR(50),
    publish_date DATE,
    PRIMARY KEY (paper_id)
  );`;

  //create an intermediary table representing the many-to-many relationship
  //between the authors and research_papers tables
  const createAuthorPapersTable = `
  CREATE TABLE IF NOT EXISTS author_research_papers (
    author_no INT,
    paper_id INT,
    FOREIGN KEY (author_no) REFERENCES authors(author_no),
    FOREIGN KEY (paper_id) REFERENCES research_papers(paper_id)
  );`;

  connection.connect();

  try {
    await Promise.all[
      (execQuery(useDatabase),
      execQuery(createResearchPapersTable),
      execQuery(createAuthorPapersTable))
    ];

    await Promise.all(
      authors.map((author) => execQuery("INSERT INTO authors SET ?", author))
    );
  } catch (error) {
    console.error(error);
  }

  connection.end();
}

seedDatabase();
