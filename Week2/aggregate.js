const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "userdb",
});

const execQuery = util.promisify(connection.query.bind(connection));

async function aggregateData() {
  const ALL_PAPERS_COUNT_AUTHORS = `
    SELECT p.paper_title, COUNT(DISTINCT ap.author) AS num_of_authors
    FROM authors_papers AS ap
    JOIN research_papers AS p
    WHERE p.paper_id = ap.paper
    GROUP BY ap.paper
    ORDER BY num_of_authors DESC;
  `;
  const ALL_FEMALE_PAPERS_COUNT = `
    SELECT COUNT(DISTINCT p.paper_id, p.paper_title) AS total_female_papers
    FROM research_papers AS p
    LEFT JOIN authors_papers AS ap
    ON p.paper_id = ap.paper
    LEFT JOIN authors AS a
    ON ap.author = a.author_no
    WHERE a.gender = "f"
    ;
  `;
  const AVRG_HINDX_PER_UNIVERSITY = `
    SELECT university, AVG(h_index) AS average_h_index
    FROM authors
    GROUP BY university
    ORDER BY average_h_index DESC;
  `;
  const COUNT_PAPERS_PER_UNIVERSITY = `
    SELECT a.university, COUNT(DISTINCT p.paper_id, p.paper_title) AS sum_papers
    FROM research_papers AS p
    JOIN authors_papers AS ap ON p.paper_id = ap.paper
    JOIN authors AS a ON ap.author = a.author_no
    GROUP BY a.university;
  `;
  const MIN_MAX_HINDX_PER_UNIVERSITY = `
    SELECT university, MIN(h_index) AS minimum_h_index, MAX(h_index) AS maximum_h_index
    FROM authors
    GROUP BY university;
  `;

  connection.connect();

  try {
    // All research papers and the number of authors that wrote that paper.
    const papers_count_authors = await execQuery(ALL_PAPERS_COUNT_AUTHORS);
    console.table(papers_count_authors);

    // Sum of the research papers published by all female authors.
    const female_papers_count = await execQuery(ALL_FEMALE_PAPERS_COUNT);
    console.table(female_papers_count);

    // Average of the h-index of all authors per university.
    const avrg_hindx_university = await execQuery(AVRG_HINDX_PER_UNIVERSITY);
    console.table(avrg_hindx_university);

    // Sum of the research papers of the authors per university.
    const papers_per_university = await execQuery(COUNT_PAPERS_PER_UNIVERSITY);
    console.table(papers_per_university);

    // Minimum and maximum of the h-index of all authors per university.
    const min_max_hindx_university = await execQuery(MIN_MAX_HINDX_PER_UNIVERSITY);
    console.table(min_max_hindx_university);
  } catch (error) {
    console.error(error);
    connection.end();
  }

  connection.end();
}

aggregateData();
