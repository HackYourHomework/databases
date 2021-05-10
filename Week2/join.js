const mysql = require("mysql");
const util = require("util");
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "userdb",
});
const execQuery = util.promisify(connection.query.bind(connection));
async function seedDatabase() {
  const SELECT_AUTHORS_MENTOR = `
        SELECT a2.author_name AS author, a1.author_name AS mentor FROM authors AS a2 LEFT JOIN authors AS a1 ON a1.author_no=a2.mentor`;
  const SELECT_AUTHORS_PAPER_TITLE = `
        SELECT authors.author_no,authors.author_name,authors.university,authors.date_of_birth,authors.h_index,authors.gender ,research_papers.paper_title FROM research_papers  LEFT JOIN authors  ON authors.author_no=research_papers.paper_author_id`;
  connection.connect();
  try {
    // call the function that returns promise
    await execQuery(SELECT_AUTHORS_MENTOR);
    await execQuery(SELECT_AUTHORS_PAPER_TITLE);
  } catch (error) {
    console.error(error);
    connection.end();
  }
  connection.end();
}
seedDatabase();
