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
  const SELECT_PAPERS_NO_AUTHORS = `SELECT  paper_title , count(authors.author_name) from research_papers JOIN author_research  ON research_papers.paper_id=author_research.paper_id  JOIN authors ON authors.author_no=author_research.author_number  GROUP BY research_papers.paper_id`;
  const SELECT_ALL_PAPERS_FEMALE = `SELECT count(research_papers.paper_title)  from research_papers JOIN author_research  ON research_papers.paper_id=author_research.paper_id  JOIN authors ON authors.author_no=author_research.author_number GROUP BY authors. gender HAVING authors.gender="F"`;
  const AVG_H_INDEX_PER_UNIVERSITY = `SELECT DISTINCT university,AVG(h_index) from authors GROUP BY university`;
  const SUM_RESEARCH_PAPERS_PER_UNIVERSITY = `SELECT DISTINCT university , count(paper_title) from research_papers JOIN author_research  ON research_papers.paper_id=author_research.paper_id  JOIN authors ON authors.author_no=author_research.author_number GROUP BY authors.university`;
  const MIN_MAX_H_INDEX_UNI = `SELECT DISTINCT university , min(h_index),max(h_index) from research_papers JOIN author_research  ON research_papers.paper_id=author_research.paper_id  JOIN authors ON authors.author_no=author_research.author_number GROUP BY authors.university`;
  connection.connect();
  try {
    // call the function that returns promise
    await execQuery(SELECT_PAPERS_NO_AUTHORS);
    await execQuery(SELECT_ALL_PAPERS_FEMALE);
    await execQuery(AVG_H_INDEX_PER_UNIVERSITY);
    await execQuery(SUM_RESEARCH_PAPERS_PER_UNIVERSITY);
    await execQuery(MIN_MAX_H_INDEX_UNI);
  } catch (error) {
    console.error(error);
    connection.end();
  }
  connection.end();
}
seedDatabase();
