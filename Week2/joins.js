"use strict";
const util = require("util");
const mysql = require("mysql");

const authors = require("./data/authors");
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "academy",
  port: 3306,
});

const execQuery = util.promisify(connection.query.bind(connection));

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

//create and use meetup DB
const authorsMentors = `
SELECT a.author_name as author,
m.author_name as mentor FROM authors m
inner join authors a
ON a.author_no = m.mentor
`;

query(authorsMentors, "Authors and their correspondant mentors printed!");

const authorsResearchPaper = `
SELECT authors.author_name, research_papers.paper_title
FROM authors
LEFT JOIN author_research_papers ON authors.author_no = author_research_papers.authorNO
LEFT JOIN research_papers ON author_research_papers.paperID = research_papers.paper_id
ORDER BY authors.author_name`;

query(
  authorsResearchPaper,
  "Authors and their correspondant researchpapers printed!"
);

//reusuable funtion to perform query
function query(query, queryMessage) {
  connection.query(query, (err, results) => {
    if (err) throw err;
    console.log(queryMessage);
    console.log(results);
  });
}

connection.end();
