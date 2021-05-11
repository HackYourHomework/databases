import { createConnection } from 'mysql';
import { promisify } from 'util';
import { readFile } from 'fs';

const connectionConfig = {
  host: `localhost`,
  user: `hyfuser`,
  password: `hyfpassword`,
  database: `hyf_db`,
  multipleStatements: true,
};

const readFilePromise = promisify(readFile);

const connection = createConnection(connectionConfig);

const execQuery = promisify(connection.query.bind(connection));

const fkCheck = (bool) => {
  if (!bool) {
    execQuery(`SET FOREIGN_KEY_CHECKS = 0`);
    return;
  }
  execQuery(`SET FOREIGN_KEY_CHECKS = 1`);
};

const createResearchPapersTable = `
  DROP TABLE IF EXISTS research_papers;

  CREATE TABLE research_papers (
    paper_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    paper_title VARCHAR(250) NOT NULL,
    conference VARCHAR(250) NOT NULL,
    publish_date DATE NOT NULL
  )
    AUTO_INCREMENT = 100
  `;

const createAuthorResearchesTable = `
  DROP TABLE IF EXISTS researches;

  CREATE TABLE researches (
    author_no INT NOT NULL,
    paper_id INT NOT NULL,
    FOREIGN KEY (author_no)
      REFERENCES authors(author_no),
    FOREIGN KEY (paper_id)
      REFERENCES researches_papers(paper_id)
  )`;

try {
  fkCheck(false);

  await execQuery(createResearchPapersTable);
  await execQuery(createAuthorResearchesTable);

  const authorsData = await readFilePromise(`./authors-data.json`, `utf8`);
  const papersData = await readFilePromise(`./papers-data.json`, `utf8`);
  const researchesData = await readFilePromise(
    `./researches-data.json`,
    `utf8`
  );

  const authors = JSON.parse(authorsData);
  const researchPapers = JSON.parse(papersData);
  const researchesInfo = JSON.parse(researchesData);

  const authorsPromise = authors.map((author) =>
    execQuery('INSERT INTO authors SET ?', author)
  );
  const researchPapersPromise = researchPapers.map((paper) =>
    execQuery('INSERT INTO research_papers SET ?', paper)
  );
  const researchesInfoPromise = researchesInfo.map((info) =>
    execQuery('INSERT INTO researches SET ?', info)
  );

  await Promise.all(
    authorsPromise,
    researchPapersPromise,
    researchesInfoPromise
  );

  fkCheck(true);
} catch (err) {
  console.error(err.message);
} finally {
  connection.end();
}
