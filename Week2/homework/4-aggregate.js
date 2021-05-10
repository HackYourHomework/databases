const mysql = require("mysql");
const util = require("util");

// Create connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "library",
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  const allResearchTables = `
        SELECT r.paper_id, COUNT(author_name)
        FROM research_papers AS r
        INNER JOIN authors_papers AS p
        ON p.paper_id = r.paper_id
        INNER JOIN authors AS a
        ON a.author_no = p.author_no
        GROUP BY paper_id 
        ORDER by paper_id DESC`;
  const sumOfResearchPapersByFemale = `
        SELECT DISTINCT gender, count(paper_title)
        FROM authors AS a
        INNER JOIN authors_papers AS p
        ON a.author_no = p.author_no
        INNER JOIN research_papers AS r
        ON r.paper_id = p.paper_id
        WHERE gender = "f"`;
  const averageOfH_index = `
        SELECT university, AVG(h_index)
        FROM authors
        GROUP BY university
        ORDER BY h_index DESC`;
  const sumOfResearchPapers = `
        SELECT university , COUNT(DISTINCT p.paper_id) AS "Total Papers"
        FROM authors AS a
        LEFT JOIN authors_papers AS p
        ON a.author_no = p.author_no
        GROUP BY university
        ORDER BY COUNT(DISTINCT p.paper_id) DESC`;
  const minAndMaxOfH_index = `
        SELECT university, MIN(h_index), MAX(h_index)
        FROM authors
        GROUP BY university`;

  connection.connect();

  try {
    // call the function that returns promise
    const firstResult = await execQuery(allResearchTables);
    console.table(firstResult);
    const secondResult = await execQuery(sumOfResearchPapersByFemale);
    console.table(secondResult);
    const thirdResult = await execQuery(averageOfH_index);
    console.table(thirdResult);
    const fourthResult = await execQuery(sumOfResearchPapers);
    console.table(fourthResult);
    const fifthResult = await execQuery(minAndMaxOfH_index);
    console.table(fifthResult);
  } catch (error) {
    console.error(error);
    connection.end();
  }
  connection.end();
}

seedDatabase();
