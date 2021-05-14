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
  const allPapersAndAuthorsNumber = `
    SELECT
      rp.paper_title AS title,
      COUNT(r.paper_id) AS authorsNumber
    FROM research_papers AS rp
    JOIN researches AS r
      ON rp.paper_id = r.paper_id
    GROUP BY r.paper_id
    `;

  const sumPapersByFemales = `
    SELECT
      COUNT(DISTINCT rp.paper_id) AS byFemales
    FROM research_papers AS rp
    LEFT JOIN researches as r
      ON r.paper_id = rp.paper_id
    LEFT JOIN authors as a
      ON a.author_no = r.author_no
    WHERE gender = "f"
    `;

  const avgHIndexPerUniversity = `
    SELECT
      university,
      AVG(h_index) AS avgHIndex
    FROM authors
    GROUP BY university
    `;

  const sumPapersByUniversity = `
    SELECT
      COUNT(rp.paper_id) AS PapersNumber,
      a.university
    FROM research_papers AS rp
    JOIN researches as r
      ON r.paper_id = rp.paper_id
    JOIN authors as a ON
      a.author_no = r.author_no
    GROUP BY university
    `;

  const minMaxHIndexPerUniversity = `
    SELECT
      university,
      MAX(h_index) AS maxHIndex,
      MIN(h_index) AS minHIndex
    FROM authors
    GROUP BY university
    `;

  try {
    const allPapers = await execQuery(allPapersAndAuthorsNumber);
    const sumByFemales = await execQuery(sumPapersByFemales);
    const avgHIndex = await execQuery(avgHIndexPerUniversity);
    const sumByUniversity = await execQuery(sumPapersByUniversity);
    const minMaxHIndex = await execQuery(minMaxHIndexPerUniversity);
    console.log(
      allPapers,
      sumByFemales,
      avgHIndex,
      sumByUniversity,
      minMaxHIndex
    );
  } catch (err) {
    console.error(err.message);
  } finally {
    connection.end();
  }
}

seedDatabase();
