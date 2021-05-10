import { createConnection } from 'mysql';
import { promisify } from 'util';

const connectionConfig = {
  host: `localhost`,
  user: `hyfuser`,
  password: ``,
  database: `hyf_db`,
  multipleStatements: true,
};

const connection = createConnection(connectionConfig);

const execQuery = promisify(connection.query.bind(connection));

const authorsAndMentors = `
  SELECT
    author_name,
    mentor
  FROM authors
  `;

const researchPapers = `
  SELECT
    authors.*,
    research_Papers.paper_title
  FROM authors
  LEFT JOIN researches
    ON authors.author_no = researches.author_no
  LEFT JOIN research_papers
    ON researches.paper_id = research_papers.paper_id
  `;

try {
  const researchTeams = await execQuery(authorsAndMentors);
  console.log(researchTeams);

  const papersInfo = await execQuery(researchPapers);
  console.log(papersInfo);
} catch (err) {
  console.error(err.message);
} finally {
  connection.end();
}
