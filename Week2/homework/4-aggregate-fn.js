const mysql = require("mysql");
const util = require("util");

const connectionConfig = {
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "researchers",
};

//All research papers and the number of authors that wrote that paper.
const researchPapersAndAuthors = `
SELECT rp.paper_title AS title, COUNT(r.paper_id) number_of_authors
FROM research_papers AS rp
JOIN research AS r ON rp.paper_id = r.paper_id
GROUP BY r.paper_id;
`;

//Sum of the research papers published by all female authors.
//distinct is needed, because same paper can be written by few female authors
const paperByFemales = `
SELECT COUNT(DISTINCT rp.paper_id) AS written_by_females
FROM research_papers AS rp
LEFT JOIN research as r ON r.paper_id = rp.paper_id
LEFT JOIN authors as a ON a.author_no = r.author_no
WHERE gender = "f"
;`;

//Average of the h-index of all authors per university.
const averageIndex = `
SELECT university, AVG(h_index) AS average_hIndex
FROM authors
GROUP BY university
;`;

//Sum of the research papers of the authors per university.
//returns total of 43 research papers, as same paper could be written by people from different universities, so all included universities get credit
const sumOfpapers = `
SELECT COUNT(rp.paper_id) AS number_of_papers, a.university
FROM research_papers AS rp
JOIN research as r ON r.paper_id = rp.paper_id
JOIN authors as a ON a.author_no = r.author_no
GROUP BY university
;`;

//Minimum and maximum of the h-index of all authors per university.
const minMaxIndexes = `
SELECT university, MAX(h_index) AS max_hIndex, MIN(h_index) AS min_hIndex
FROM authors
GROUP BY university
;`;

const aggregateFunctions = async () => {
  const connection = mysql.createConnection(connectionConfig);
  const execQuery = util.promisify(connection.query.bind(connection));

  try {
    const paperByFemales_ = await execQuery(paperByFemales);
    console.log(paperByFemales_);

    const researchPapersAndAuthors_ = await execQuery(researchPapersAndAuthors);
    console.log(researchPapersAndAuthors_);

    const avgIndex = await execQuery(averageIndex);
    console.log(avgIndex);

    const sumOfpapers_ = await execQuery(sumOfpapers);
    console.log(sumOfpapers_);

    const minMaxIndexes_ = await execQuery(minMaxIndexes);
    console.log(minMaxIndexes_);

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

aggregateFunctions();
