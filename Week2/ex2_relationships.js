const mysql = require("mysql");
const dataToInsert = require("./data.js");
const fs = require("fs");

const db = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "HYFWEEK2",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to database...");
});

const addQuery = (query) => {
  db.query(query, (err) => {
    if (err) throw err;
  });
};

function insertDataIntoTables(dataToInsert) {
  db.query(dataToInsert.sql, [dataToInsert.data], function (err, result) {
    if (err) throw err;
    console.log(result);
  });
}

const create_table_research_papers = `CREATE TABLE IF NOT EXISTS research_papers(paper_id  INT AUTO_INCREMENT PRIMARY KEY, paper_title TEXT, conference  VARCHAR(50), publish_date DATETIME)`;
const create_table_authors_papers = `CREATE TABLE IF NOT EXISTS authors_papers(PRIMARY KEY(author_no, paper_id), author_no INT, paper_id INT, CONSTRAINT FK_AUTH FOREIGN KEY (author_no) REFERENCES authors(author_no), CONSTRAINT FK_PAPER FOREIGN KEY(paper_id) REFERENCES research_papers(paper_id))`;

addQuery(create_table_research_papers);
addQuery(create_table_authors_papers);

const myData = Array.from(dataToInsert);
console.log(myData);

myData.forEach((query) => insertDataIntoTables(query));

db.end();

//There is an M-M relationship between the 'authors' table and 'research_papers' table.
//This is because an author may have written more than one paper,
//or a paper may have been written by more than one author.
