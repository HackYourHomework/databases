"use strict";
//NPM packages
const mysql = require("mysql");
const util = require("util");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "academy",
  port: 3306,
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  connection.connect();

  //query for authors and their mentors
  const authorsMentors = `
  SELECT a.author_name AS author,
  m.author_name AS mentor FROM authors m
  INNER JOIN authors a
  ON a.author_no = m.mentor
`;

  //query for authors and the research papers they took part in
  const authorsResearchPaper = `
  SELECT authors.author_name, research_papers.paper_title
  FROM authors
  LEFT JOIN author_research_papers ON authors.author_no = author_research_papers.authorNO
  LEFT JOIN research_papers ON author_research_papers.paperID = research_papers.paper_id
  ORDER BY authors.author_name`;

  try {
    console.log(
      "Authors and their respective mentors are: ",
      await execQuery(authorsMentors)
    );
    console.log(
      "Authors and the papers they wrote are:",
      await execQuery(authorsResearchPaper)
    );
  } catch (err) {
    console.log(err);
  }

  connection.end();
}

seedDatabase();
