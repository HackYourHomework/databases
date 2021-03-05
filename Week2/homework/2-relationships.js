const fs = require("fs");
const mysql = require("mysql");
const util = require("util");

const connectionConfig = {
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "researchers",
};

const createResearchPaperTable = `
  CREATE TABLE IF NOT EXISTS research_papers (
    paper_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    paper_title VARCHAR(250) NOT NULL,
    conference VARCHAR(250) NOT NULL,
    publish_date DATE NOT NULL
  );`;

//as this is many to many relationship - author can write many papers and many papers can have many authors, we can create a third table that will hold that data
const authorResearchTable = `
CREATE TABLE IF NOT EXISTS research (
author_no INT NOT NULL,
paper_id INT NOT NULL,
FOREIGN KEY (author_no) REFERENCES authors(author_no),
FOREIGN KEY (paper_id) REFERENCES research_papers(paper_id)
)`;

//https://stackoverflow.com/questions/21659691/error-1452-cannot-add-or-update-a-child-row-a-foreign-key-constraint-fails#:~:text=Error%20Code%3A%201452.-,Cannot%20add%20or%20update%20a%20child%20row%3A%20a%20foreign%20key,row%20to%20your%20Ordre%20table.
const removeConstraintCheck = `SET FOREIGN_KEY_CHECKS = 0`;
//check has to be put back at the end
const addConstraintCheck = `SET FOREIGN_KEY_CHECKS = 1`;

const seedDatabase = async () => {
  const connection = mysql.createConnection(connectionConfig);
  const readFile = util.promisify(fs.readFile);
  const execQuery = util.promisify(connection.query.bind(connection));

  try {
    //create two tables and remove constrain
    await execQuery(createResearchPaperTable);
    await execQuery(authorResearchTable);
    await execQuery(removeConstraintCheck);

    //turn json data into js object, to populate tables
    const authorsData = await readFile(__dirname + "/authors.json", "utf8");
    const researchData = await readFile(
      __dirname + "/research-papers.json",
      "utf8"
    );
    const researchInfo = await readFile(
      __dirname + "/research-info.json",
      "utf8"
    );
    const authors = JSON.parse(authorsData);
    const researchPapers = JSON.parse(researchData);
    const papersAndAuthors = JSON.parse(researchInfo);

    const authorsPromise = authors.map(author =>
      execQuery("INSERT INTO authors SET ?", author)
    );

    const researchPromise = researchPapers.map(paper =>
      execQuery("INSERT INTO research_papers SET ?", paper)
    );

    const papersAndAuthorsPromise = papersAndAuthors.map(paper =>
      execQuery("INSERT INTO research SET ?", paper)
    );
    await Promise.all(authorsPromise, researchPromise, papersAndAuthorsPromise);
    await execQuery(addConstraintCheck);

    //if all good we must end connection
    connection.end();
    process.exit(0);
  } catch (err) {
    console.error(err.message);
    //if there is error we also must end the connection
    connection.end();
    process.exit(1);
  }
};

seedDatabase();
