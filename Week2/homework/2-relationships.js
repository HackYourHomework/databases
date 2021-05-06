const mysql = require("mysql");

// Create connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Giresun3428@",
  database: "library",
});

// Connect
connection.connect((err) => {
  if (err) throw err;
  console.log("MySql Connected...");
});

// Adding query for Database
const addQuery = (query, msg) => {
  connection.query(query, (err) => {
    if (err) throw err;
    console.log(msg);
  });
};

// Insert Values
function insertQuery(insertQueries, msg) {
  connection.query(insertQueries.statement, [insertQueries.values], (err) => {
    if (err) throw err;
    console.log(msg);
  });
}

function addMessage(insertQuery, index) {
  return { ...insertQuery, message: `Hi Burak ${index}!` };
}

const FK = `SET GLOBAL FOREIGN_KEY_CHECKS=0`;
addQuery(FK, `FK`);

const tablePapers = `CREATE TABLE IF NOT EXISTS research_papers(paper_id  INT AUTO_INCREMENT PRIMARY KEY, paper_title  VARCHAR(50), conference  VARCHAR(50), publish_date DATETIME)`;
const tableAuthorsPapers = `CREATE TABLE IF NOT EXISTS authors_papers(PRIMARY KEY(author_no, paper_id), author_no INT, paper_id INT, CONSTRAINT FK_AUTH FOREIGN KEY (author_no) REFERENCES authors(author_no), CONSTRAINT FK_PAPER FOREIGN KEY(paper_id) REFERENCES research_papers(paper_id))`;
addQuery(tablePapers, `Research_Papers is created.`);
addQuery(tableAuthorsPapers, `AuthorsPapers is created.`);



const insertQueries = [
  {
    statement: `INSERT INTO authors(author_name, university, date_of_birth, h_index, gender, mentor) VALUES ?`,
    values: [
      ["Carl Sagan", "Harvard", "1950-9-8", 900, "f", 5],
      ["Smol JP", "Columbia", "1959-10-8", 250, "m", 7],
      ["Xie P", "London", "1953-9-8", 260, "f", 6],
      ["Effler SW", "California", "1956-10-8", 21, "m", 12],
      ["Hecky RE", "Zurich", "1953-9-10", 52, "f", 11],
      ["Lotter AF", "California", "1956-9-8", 75, "m", 10],
      ["Wuest A", "Harvard", "1950-9-8", 30, "f", 13],
      ["Jones ML", "Columbia", "1959-12-8", 86, "m", 9],
      ["Imberger J", "Harvard", "1953-9-12", 78, "f", 3],
      ["Cole JJ", "London", "1956-9-25", 45, "m", 4],
      ["Kong FX", "Harvard", "1953-10-24", 65, "f", 1],
      ["Jeppesen E", "Yale", "1956-10-21", 72, "m", 14],
      ["Cirpka OA", "Zurich", "1950-4-10", 10, "f", 2],
      ["Rinaldo A", "Yale", "1959-12-4", 140, "m", 8],
      ["Middelburg JJ", "Zurich", "1953-2-8", 47, "f", 15],
    ],
    message: "",
  },
  {
    statement: `INSERT INTO research_papers(paper_title, conference, publish_date) VALUES ?`,
    values: [
      ["title 0", "conference 0", "2018-1-1"],
      ["title 1", "conference 1", "2019-2-2"],
      ["title 2", "conference 2", "2018-3-3"],
      ["title 3", "conference 3", "2020-4-4"],
      ["title 4", "conference 4", "2018-5-5"],
      ["title 5", "conference 5", "2019-6-1"],
      ["title 6", "conference 6", "2018-7-11"],
      ["title 7", "conference 7", "2020-8-25"],
      ["title 8", "conference 8", "2018-9-17"],
      ["title 9", "conference 9", "2019-10-27"],
      ["title 10", "conference 10", "2018-12-14"],
      ["title 11", "conference 11", "2019-11-25"],
      ["title 12", "conference 12", "2018-10-12"],
      ["title 13", "conference 13", "2018-8-7"],
      ["title 14", "conference 14", "2019-7-12"],
      ["title 15", "conference 15", "2020-5-15"],
      ["title 16", "conference 16", "2020-4-14"],
      ["title 17", "conference 17", "2018-1-13"],
      ["title 18", "conference 18", "2019-9-19"],
      ["title 19", "conference 19", "2018-8-14"],
      ["title 20", "conference 20", "2019-11-10"],
      ["title 21", "conference 21", "2018-11-12"],
      ["title 22", "conference 22", "2018-7-21"],
      ["title 23", "conference 23", "2020-6-23"],
      ["title 24", "conference 24", "2018-11-26"],
      ["title 25", "conference 25", "2019-12-10"],
      ["title 26", "conference 26", "2020-4-29"],
      ["title 27", "conference 27", "2019-3-24"],
      ["title 28", "conference 28", "2018-1-17"],
      ["title 29", "conference 29", "2018-10-1"],
    ],
    message: "",
  },
  {
    statement: `INSERT INTO authors_papers(author_no, paper_id) VALUES ?`,
    values: [
      [3, 27],
      [1, 18],
      [2, 2],
      [3, 18],
      [15, 22],
      [5, 5],
      [12, 6],
      [7, 1],
      [14, 18],
      [9, 27],
      [10, 10],
      [11, 11],
      [12, 27],
      [13, 13],
      [14, 27],
      [15, 5],
      [14, 10],
      [1, 17],
      [2, 18],
      [3, 10],
      [15, 1],
      [5, 21],
      [4, 10],
      [7, 11],
      [14, 24],
      [9, 10],
      [10, 27],
      [11, 27],
      [12, 29],
      [13, 29],
    ],
    message: "",
  },
];

insertQueries.forEach((query) => insertQuery(query, `Values are inserted`));

insertQueries.map(addMessage);

connection.end();
