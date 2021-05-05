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

const tablePapers = `CREATE TABLE IF NOT EXISTS research_papers(paper_id INT AUTO_INCREMENT PRIMARY KEY, paper_title  VARCHAR(50), conference  VARCHAR(50), publish_date TIME)`;
const tableAuthorsPapers = `CREATE TABLE IF NOT EXISTS authors_papers(author_no INT, paper_id INT, PRIMARY KEY(author_no, paper_id), CONSTRAINT FK_AUTH FOREIGN KEY (author_no) REFERENCES authors(author_no), CONSTRAINT FK_PAPER FOREIGN KEY(paper_id) REFERENCES research_papers(paper_id))`;
addQuery(tablePapers, `Research_Papers is created.`);
addQuery(tableAuthorsPapers, `AuthorsPapers is created.`);

// const FK = `SET GLOBAL FOREIGN_KEY_CHECKS=0`;
// addQuery(FK, `FK`);

const insertQueries = [
  {
    statement: `INSERT IGNORE INTO authors(author_no, author_name, university, date_of_birth, h_index, gender, mentor) VALUES ?`,
    values: [
      [0, "Burak", "Harvard", "1950-9-8", 900, "f", 14],
      [1, "Adam", "Oxford", "1959-9-8", 250, "m", 25],
      [2, "Micheal", "Harvard", "1953-9-8", 90, "f", 112],
      [3, "Cemal", "Oxford", "1956-9-8", 25, "m", 25],
      [4, "Ahmet", "Harvard", "1953-9-8", 90, "f", 112],
      [5, "Cemal", "Oxford", "1956-9-8", 25, "m", 25],
      [6, "Burak", "Harvard", "1950-9-8", 900, "f", 14],
      [7, "Adam", "Oxford", "1959-9-8", 250, "m", 25],
      [8, "Micheal", "Harvard", "1953-9-8", 90, "f", 112],
      [9, "Cemal", "Oxford", "1956-9-8", 25, "m", 25],
      [10, "Ahmet", "Harvard", "1953-9-8", 90, "f", 112],
      [11, "Cemal", "Oxford", "1956-9-8", 25, "m", 25],
      [12, "Burak", "Harvard", "1950-9-8", 900, "f", 14],
      [13, "Adam", "Oxford", "1959-9-8", 250, "m", 25],
      [14, "Micheal", "Harvard", "1953-9-8", 90, "f", 112],
    ],
    message: "",
  },
  {
    statement: `INSERT IGNORE INTO research_papers(paper_id, paper_title, conference, publish_date) VALUES ?`,
    values: [
      [0, "title 0", "conference 0", "2020-10-10"],
      [1, "title 1", "conference 1", "2020-10-10"],
      [2, "title 0", "conference 0", "2020-10-10"],
      [3, "title 1", "conference 1", "2020-10-10"],
      [4, "title 0", "conference 0", "2020-10-10"],
      [5, "title 1", "conference 1", "2020-10-10"],
      [6, "title 0", "conference 0", "2020-10-10"],
      [7, "title 1", "conference 1", "2020-10-10"],
      [8, "title 0", "conference 0", "2020-10-10"],
      [9, "title 1", "conference 1", "2020-10-10"],
      [10, "title 0", "conference 0", "2020-10-10"],
      [11, "title 0", "conference 0", "2020-10-10"],
      [12, "title 1", "conference 1", "2020-10-10"],
      [13, "title 0", "conference 0", "2020-10-10"],
      [14, "title 1", "conference 1", "2020-10-10"],
      [15, "title 0", "conference 0", "2020-10-10"],
      [16, "title 1", "conference 1", "2020-10-10"],
      [17, "title 0", "conference 0", "2020-10-10"],
      [18, "title 1", "conference 1", "2020-10-10"],
      [19, "title 0", "conference 0", "2020-10-10"],
      [20, "title 1", "conference 1", "2020-10-10"],
      [21, "title 0", "conference 0", "2020-10-10"],
      [22, "title 0", "conference 0", "2020-10-10"],
      [23, "title 1", "conference 1", "2020-10-10"],
      [24, "title 0", "conference 0", "2020-10-10"],
      [25, "title 1", "conference 1", "2020-10-10"],
      [26, "title 0", "conference 0", "2020-10-10"],
      [27, "title 1", "conference 1", "2020-10-10"],
      [28, "title 0", "conference 0", "2020-10-10"],
      [29, "title 1", "conference 1", "2020-10-10"],
    ],
    message: "",
  },
  {
    statement: `INSERT IGNORE INTO authors_papers() VALUES ?`,
    values: [
      [0, 0],
      [1, 1],
      [2, 2],
      [3, 3],
      [4, 4],
      [5, 5],
      [6, 6],
      [7, 7],
      [8, 8],
      [9, 9],
      [10, 10],
      [11, 11],
      [12, 12],
      [13, 13],
      [14, 14],
      [15, 15],
      [0, 16],
      [1, 17],
      [2, 18],
      [3, 19],
      [4, 20],
      [5, 21],
      [6, 22],
      [7, 23],
      [8, 24],
      [9, 25],
      [10, 26],
      [11, 27],
      [12, 28],
      [13, 29],
    ],
    message: "",
  },
];

insertQueries.forEach((query) => insertQuery(query, `Values are inserted`));

insertQueries.map(addMessage);

connection.end();
