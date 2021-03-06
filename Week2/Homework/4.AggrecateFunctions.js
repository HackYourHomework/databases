//NPM pacjages
const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "academy",
  port: 3306,
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  connection.connect();

  const researchPapersNumberOfAuthors = `
  SELECT research_papers.paper_title AS research_papers, COUNT(DISTINCT authors.author_name) AS authors_number
    FROM research_papers
    INNER JOIN author_research_papers ON paperID = research_papers.paper_id
    INNER JOIN authors ON author_research_papers.author_no = authors.author_no
    GROUP BY paper_title;
  `;

  const sumOfPapersWrittenByFemale = `
    SELECT COUNT(DISTINCT research_papers.paper_title) AS papers_by_female_authors
    FROM research_papers
    INNER JOIN author_research_papers ON paperID = research_papers.paper_id
    INNER JOIN authors ON author_research_papers.author_no = authors.author_no
    WHERE gender = 'f';
    `;

  const hIndexPerUniversity = `
    SELECT university, AVG (h_index) AS average_h_index
    FROM authors
    GROUP BY university;
    `;

  const paperSumPerUniversity = `
    SELECT university, COUNT (DISTINCT research_papers.paper_title) AS research_papers
    FROM research_papers
    INNER JOIN author_research_papers ON paperID = research_papers.paper_id
    INNER JOIN authors on author_research_papers.author_no = authors.author_no
    GROUP BY university;
    `;

  const hIndexMinMaxPerUniversity = `
    SELECT university, MIN(h_index) AS minimum_h_index,
    MAX(h_index) AS maximum_h_index
    FROM authors
    GROUP BY university;
    `;

  try {
    //paper names and number of authors
    console.log(
      `Paper names and the number of authors:`,
      await execQuery(researchPapersNumberOfAuthors)
    );

    //sum of research papers written by female authors
    console.log(await execQuery(sumOfPapersWrittenByFemale));

    //Average of the h-index of all authors per university.
    console.log(await execQuery(hIndexPerUniversity));

    //Sum of the research papers of the authors per university.
    console.log(await execQuery(paperSumPerUniversity));

    //Minimum and maximum of the h-index of all authors per university.
    console.log(await execQuery(hIndexMinMaxPerUniversity));
  } catch (err) {
    console.error(err);
  }

  connection.end();
}

seedDatabase();
