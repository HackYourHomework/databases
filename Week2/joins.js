"use strict";
const util = require("util");
const mysql = require("mysql");
const authorResearchPapers = require("./data/author-researchpapers");
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

//reusuable function to add data to tables
async function addDataQuery() {
  const quer = `INSERT INTO author_research_papers SET ?`;

  try {
    await Promise.all(
      authorResearchPapers.map((author) => execQuery(quer, author))
    );
  } catch (err) {
    console.log(err);
  }

  connection.end();
}

const authorsResearchPaper = `
Select authors.author_name, research_papers.paper_title
from authors
left join research_papers on authors.author_no = research_papers.author_no
`;

query(authorsMentors, "Authors and their correspondant mentors printed!");

//reusuable funtion to perform query
function query(query, queryMessage) {
  connection.query(query, (err, results) => {
    if (err) throw err;
    console.log(queryMessage);
    console.log(results);
  });
}

addDataQuery();
