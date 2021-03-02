const util = require('util');
const fs = require('fs');
const mysql = require('mysql');

const CONNECTION_CONFIG = {
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'Week_two',
  port: 3306
};


const create_research_papers = `
CREATE TABLE IF NOT EXISTS research_Papers(
  paper_id INT PRIMARY KEY,
  paper_title VARCHAR(150),
  conference VARCHAR(100),
  publish_date DATE
);`;

//The relation ship between the authors and the research_papers is many to many. Because more than one author can participate in more than one research paper and the vice versa.

const create_AuthorsAndResearchs = `
CREATE TABLE IF NOT EXISTS author_researchPapers(
  authorNumber INT NOT NULL,
  paperNumber INT NOT NULL,
  constraint fk_author FOREIGN KEY(authorNumber) references authors(author_no),
  constraint fk_Paper FOREIGN KEY(paperNumber) references research_Papers(paper_id),
  primary key (authorNumber, paperNumber)
);`;


async function seedDatabase() {
  const connection = mysql.createConnection(CONNECTION_CONFIG);
  const readFile = util.promisify(fs.readFile);
  const execQuery = util.promisify(connection.query.bind(connection));

  try {
    await execQuery(create_research_papers);
    await execQuery(create_AuthorsAndResearchs);

    const data_authors = await readFile(__dirname + '/Authors.json', 'utf8');
    const data_research = await readFile(__dirname + '/Research_Papers.json', 'utf8');
    const data_author_paper = await readFile(__dirname + '/Author_research.json', 'utf8');

    const AuthorsJson = JSON.parse(data_authors);
    const Research_papersJson = JSON.parse(data_research);
    const author_researchPapersJson = JSON.parse(data_author_paper);

    execQuery('SET FOREIGN_KEY_CHECKS=0');
    const promises_one = AuthorsJson.map(author => execQuery('INSERT INTO authors SET ?', author));
    execQuery('SET FOREIGN_KEY_CHECKS=1');
    const promises_two = Research_papersJson.map(paper => execQuery('INSERT INTO research_Papers SET ?', paper));
    const promises_three = author_researchPapersJson.map(element => execQuery('INSERT INTO author_researchPapers SET ?', element));
    await Promise.all(promises_one, promises_two, promises_three );

    connection.end();
  } catch (err) {
    console.error(err.message);
    connection.end();
  }
}

seedDatabase();
