import { createConnection } from 'mysql';
import { promisify } from 'util';

const connectionConfig = {
  host: `localhost`,
  user: `hyfuser`,
  password: `hyfpassword`,
  database: `hyf_db`,
};

const connection = createConnection(connectionConfig);

const execQuery = promisify(connection.query.bind(connection));

async function seedDatabase() {
  const authorsAndMentors = `
    SELECT
      a.author_name AS author,
      m.author_name AS mentor
    FROM authors AS a
    LEFT JOIN authors AS m
      ON a.author_no = m.mentor
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
}

seedDatabase();
