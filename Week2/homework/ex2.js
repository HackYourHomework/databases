const util = require('util');
const fs = require('fs');
const mysql = require('mysql');

const connection_config = {
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'Week_two',
  port: 3306
};


const create_research_papers = `
CREATE TABLE IF NOT EXISTS research_papers(
  paper_id INT PRIMARY KEY,
  paper_title VARCHAR(150),
  conference VARCHAR(100),
  publish_date DATE
);`;

//The relation ship between the authors and the research_papers is many to many. Because more than one author can participate in more than one research paper and the vice versa.

const create_authors_researchs = `
CREATE TABLE IF NOT EXISTS author_research_papers(
  author_no INT NOT NULL,
  paper_id INT NOT NULL,
  constraint fk_author FOREIGN KEY(author_no) references authors(author_no),
  constraint fk_Paper FOREIGN KEY(paper_id) references research_papers(paper_id),
  primary key (author_no, paper_id)
);`;


async function insertData() {
  const connection = mysql.createConnection(connection_config);
  const readFile = util.promisify(fs.readFile);
  const execQuery = util.promisify(connection.query.bind(connection));

  try {
    await execQuery(create_research_papers);
    await execQuery(create_authors_researchs );

    const data_authors = await readFile(__dirname + '/Authors.json', 'utf8');
    const data_research = await readFile(__dirname + '/Research_Papers.json', 'utf8');
    const data_author_paper = await readFile(__dirname + '/Author_research.json', 'utf8');

    const authors_json = JSON.parse(data_authors);
    const research_papers_json = JSON.parse(data_research);
    const author_research_papers_json = JSON.parse(data_author_paper);

    execQuery('SET FOREIGN_KEY_CHECKS=0');
    const promises_one = authors_json.map(author => execQuery('INSERT INTO authors SET ?', author));
    execQuery('SET FOREIGN_KEY_CHECKS=1');
    const promises_two = research_papers_json.map(paper => execQuery('INSERT INTO research_papers SET ?', paper));
    const promises_three = author_research_papers_json.map(element => execQuery('INSERT INTO author_research_papers SET ?', element));
    await Promise.all(promises_one, promises_two, promises_three );

    connection.end();
  } catch (err) {
    console.error(err.message);
    connection.end();
  }
}

insertData();
