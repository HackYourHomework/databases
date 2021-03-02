const util = require('util');
const mysql = require('mysql');

const CONNECTION_CONFIG = {
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'week2-db'
};

// Query for all research papers and the number of authors that wrote that paper.
const QUERY_PAPERS_AND_WRITERS_NUM = `
    SELECT research_Papers.*, COUNT(paper_author.author_no) AS wrote_by FROM research_Papers JOIN paper_author ON research_Papers.paper_id = paper_author.paper_id GROUP BY research_Papers.paper_id;
`;

// Query for the sum of the research papers published by all female authors.
const QUERY_TOTAL_PAPERS_BY_FEMALE = `
    SELECT COUNT(*) FROM paper_author JOIN authors ON paper_author.author_no = authors.author_no WHERE authors.gender = 'f';
`;

// Query for the average of the h-index of all authors per university.
const QUERY_AVG_INDEX_PER_UNI = `
    SELECT university, ROUND(AVG(h_index), 2) FROM authors GROUP BY university;
`;

// Query for the sum of the research papers of the authors per university.
const QUERY_TOTAL_PAPERS_PER_UNI = `
    SELECT authors.university, COUNT(*) AS total_paper FROM paper_author JOIN authors ON paper_author.author_no = authors.author_no GROUP BY authors.university;
`;

// Query for the min and the max of the h-index of all authors per university.
const QUERY_MIN_MAX_INDEX_PER_UNI = `
    SELECT university, MIN(h_index) AS min, MAX(h_index) AS max FROM authors GROUP BY university;
`;

// Async function for the database connection
async function seedDatabase() {
  const connection = mysql.createConnection(CONNECTION_CONFIG);
  const execQuery = util.promisify(connection.query.bind(connection));

  try {
    // All research papers and the number of authors that wrote that paper.
    const papersAndWritersNum = await execQuery(QUERY_PAPERS_AND_WRITERS_NUM);
    console.log(papersAndWritersNum);
    
    // Sum of the research papers published by all female authors.
    const totalPapersByFemale = await execQuery(QUERY_TOTAL_PAPERS_BY_FEMALE);
    console.log(totalPapersByFemale);
    
    // Average of the h-index of all authors per university.
    const avgIndexPerUni = await execQuery(QUERY_AVG_INDEX_PER_UNI);
    console.log(avgIndexPerUni);
    
    // Sum of the research papers of the authors per university.
    const totalPapersPerUni = await execQuery(QUERY_TOTAL_PAPERS_PER_UNI);
    console.log(totalPapersPerUni);
    
    // Minimum and maximum of the h-index of all authors per university.
    const minMaxIndexPerUni = await execQuery(QUERY_MIN_MAX_INDEX_PER_UNI);
    console.log(minMaxIndexPerUni);

    connection.end();
  } catch (err) {
    console.log(err);
    connection.end();
  };
};

seedDatabase();