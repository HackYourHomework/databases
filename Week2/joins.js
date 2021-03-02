const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "userdb",
});

const execQuery = util.promisify(connection.query.bind(connection));

async function usingJoins() {
  const SELECT_AUTHORS_MENTORS = `
    SELECT
    a.author_no, a.author_name AS "author", m.author_name AS "mentor"
    FROM authors AS a
    JOIN authors AS m
    ON a.mentor = m.author_no;
  `;
  const SELECT_AUTHORS_PAPERS = `
    SELECT
    a.author_no, a.author_name, a.university, a.date_of_birth, a.h_index, a.gender, p.paper_title
    FROM authors AS a
    LEFT JOIN authors_papers AS ap ON a.author_no = ap.author
    LEFT JOIN research_papers AS p ON ap.paper = p.paper_id;
  `;

  connection.connect();

  try {
    const authors_mentors = await execQuery(SELECT_AUTHORS_MENTORS);
    console.table(authors_mentors);
    const authors_papers = await execQuery(SELECT_AUTHORS_PAPERS);
    console.table(authors_papers);
  } catch (error) {
    console.error(error);
    connection.end();
  }

  connection.end();
}

usingJoins();
