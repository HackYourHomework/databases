const mysql = require("mysql");
const util = require("util");

// Create connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Giresun3428@",
  database: "library",
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {

  const mentorsOfAuthors = `
        SELECT a.author_name AS "author_name", m.author_name AS "mentor_name"
        FROM authors AS a
        JOIN authors AS m
        ON a.mentor = m.author_no`;
  const papersOfAuthors = `
        SELECT a.*, paper_title
        FROM authors AS a
        LEFT JOIN authors_papers AS p
        ON a.author_no = p.author_no
        LEFT JOIN research_papers AS r
        ON p.paper_id = r.paper_id`;
    
  connection.connect();

  try {
    // call the function that returns promise
    const firstResult = await execQuery(mentorsOfAuthors);
    console.table(firstResult);
    const secondResult = await execQuery(papersOfAuthors);
    console.table(secondResult);
  } catch (error) {
    console.error(error);
    connection.end();
  }
  connection.end();
}

seedDatabase();
