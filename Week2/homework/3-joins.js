const mysql = require("mysql");
const util = require("util");

const connectionConfig = {
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "researchers",
};

//Write a query that prints names of all authors and their corresponding mentors.
// To perform a self join(joining two columns in same table), we must use table aliases to not repeat the same table name twice in a single query.
const authorsAndMentors = `
SELECT a.author_name AS author, m.author_name AS mentor
FROM authors a
JOIN authors m
ON m.author_no = a.mentor;
`;

//Write a query that prints all columns of authors and their published paper_title. If there is an author without any research_Papers, print the information of that author too.
//left join allows to print authors who do not have research_paper
const paperAuthors = `
SELECT authors.author_name, research_papers.paper_title
FROM authors
LEFT JOIN research ON authors.author_no = research.author_no
LEFT JOIN research_papers ON research.paper_id = research_papers.paper_id
ORDER BY authors.author_name
`;

const displayQueries = async () => {
  const connection = mysql.createConnection(connectionConfig);
  const execQuery = util.promisify(connection.query.bind(connection));

  try {
    const researchPair = await execQuery(authorsAndMentors);
    console.log(researchPair);
    const papersAndAuthors = await execQuery(paperAuthors);
    console.log(papersAndAuthors);
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

displayQueries();
