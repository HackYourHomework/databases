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

const tablePapers = `CREATE TABLE IF NOT EXISTS research_papers(paper_id INT AUTO_INCREMENT PRIMARY KEY, paper_title  VARCHAR(50), conference  VARCHAR(50), publish_date DATETIME)`;
const tableAuthorsPapers = `CREATE TABLE IF NOT EXISTS authors_papers(author_no INT, paper_id INT, PRIMARY KEY(author_no, paper_id), CONSTRAINT FK_AUTH FOREIGN KEY (author_no) REFERENCES authors(author_no), CONSTRAINT FK_PAPER FOREIGN KEY(paper_id) REFERENCES research_papers(paper_id))`;
addQuery(tablePapers, `Research_Papers is created.`);
addQuery(tableAuthorsPapers, `AuthorsPapers is created.`);

const FK = `SET GLOBAL FOREIGN_KEY_CHECKS=0`;
addQuery(FK, `FK`);

const insertQueries = [
  {
    statement: `INSERT IGNORE INTO authors(author_no, author_name, university, date_of_birth, h_index, gender, mentor) VALUES ?`,
    values: [
      [0, "Carl Sagan", "Harvard", "1950-9-8", 900, "f", 5],
      [1, "Smol JP", "Columbia", "1959-10-8", 250, "m", 7],
      [2, "Xie P", "London", "1953-9-8", 260, "f", 7],
      [3, "Effler SW", "California", "1956-10-8", 21, "m", 4],
      [4, "Hecky RE", "Zurich", "1953-9-10", 52, "f", 11],
      [5, "Lotter AF", "California", "1956-9-8", 75, "m", 10],
      [6, "Wuest A", "Harvard", "1950-9-8", 30, "f", 14],
      [7, "Jones ML", "Columbia", "1959-12-8", 86, "m", 9],
      [8, "Imberger J", "Harvard", "1953-9-12", 78, "f", 3],
      [9, "Cole JJ", "London", "1956-9-25", 45, "m", 4],
      [10, "Kong FX", "Harvard", "1953-10-24", 65, "f", 7],
      [11, "Jeppesen E", "Yale", "1956-10-21", 72, "m", 14],
      [12, "Cirpka OA", "Zurich", "1950-4-10", 10, "f", 2],
      [13, "Rinaldo A", "Yale", "1959-12-4", 140, "m", 6],
      [14, "Middelburg JJ", "Zurich", "1953-2-8", 47, "f", 7],
    ],
    message: "",
  },
  {
    statement: `INSERT IGNORE INTO research_papers(paper_id, paper_title, conference, publish_date) VALUES ?`,
    values: [
      [0, "title 0", "conference 0", "2018-1-1"],
      [1, "title 1", "conference 1", "2019-2-2"],
      [2, "title 2", "conference 2", "2018-3-3"],
      [3, "title 3", "conference 3", "2020-4-4"],
      [4, "title 4", "conference 4", "2018-5-5"],
      [5, "title 5", "conference 5", "2019-6-1"],
      [6, "title 6", "conference 6", "2018-7-11"],
      [7, "title 7", "conference 7", "2020-8-25"],
      [8, "title 8", "conference 8", "2018-9-17"],
      [9, "title 9", "conference 9", "2019-10-27"],
      [10, "title 10", "conference 10", "2018-12-14"],
      [11, "title 11", "conference 11", "2019-11-25"],
      [12, "title 12", "conference 12", "2018-10-12"],
      [13, "title 13", "conference 13", "2018-8-7"],
      [14, "title 14", "conference 14", "2019-7-12"],
      [15, "title 15", "conference 15", "2020-5-15"],
      [16, "title 16", "conference 16", "2020-4-14"],
      [17, "title 17", "conference 17", "2018-1-13"],
      [18, "title 18", "conference 18", "2019-9-19"],
      [19, "title 19", "conference 19", "2018-8-14"],
      [20, "title 20", "conference 20", "2019-11-10"],
      [21, "title 21", "conference 21", "2018-11-12"],
      [22, "title 22", "conference 22", "2018-7-21"],
      [23, "title 23", "conference 23", "2020-6-23"],
      [24, "title 24", "conference 24", "2018-11-26"],
      [25, "title 25", "conference 25", "2019-12-10"],
      [26, "title 26", "conference 26", "2020-4-29"],
      [27, "title 27", "conference 27", "2019-3-24"],
      [28, "title 28", "conference 28", "2018-1-17"],
      [29, "title 29", "conference 29", "2018-10-1"],
    ],
    message: "",
  },
  {
    statement: `INSERT IGNORE INTO authors_papers() VALUES ?`,
    values: [
      [0, 27],
      [1, 18],
      [2, 2],
      [3, 18],
      [4, 22],
      [5, 5],
      [6, 6],
      [7, 0],
      [8, 18],
      [9, 27],
      [10, 10],
      [11, 11],
      [12, 27],
      [13, 13],
      [14, 27],
      [15, 0],
      [0, 10],
      [1, 17],
      [2, 18],
      [3, 10],
      [4, 1],
      [5, 21],
      [6, 10],
      [7, 11],
      [8, 24],
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
