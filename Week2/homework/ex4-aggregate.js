const util = require('util');
const mysql = require('mysql');


const CONNECTION_CONFIG = {
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'week2',
  port: 3306
};


const SELECT_NUMBER_AUTHORS_PAPERS = `
    SELECT research_papers.paper_title AS research_papers, COUNT(authors.author_name) AS authors_number
    FROM research_papers
    LEFT JOIN authors_research_papers ON research_paper_no = research_papers.paper_id
    LEFT JOIN authors ON authors_research_papers.author_no = authors.author_no
    GROUP BY paper_title;
    `;

const SUM_PAPERS_FEMALE = `
    SELECT COUNT(research_papers.paper_title) AS females_papers
    FROM research_papers
    LEFT JOIN authors_research_papers ON research_paper_no = research_papers.paper_id
    LEFT JOIN authors ON authors_research_papers.author_no = authors.author_no
    WHERE gender = 'f';
    `;

const AVERAGE_H_INDEX= `
    SELECT university,AVG(h_index) AS average
    FROM authors
    GROUP BY university;
    `;

const SUM_PAPERS_UNIVERSITY = `
    SELECT university,COUNT(research_papers.paper_title) AS research_papers
    FROM research_papers
    LEFT JOIN authors_research_papers ON research_paper_no = research_papers.paper_id
    LEFT JOIN authors on authors_research_papers.author_no = authors.author_no
    GROUP BY university;
    `;

const MIN_MAX_H_INDEX = `
    SELECT university, MAX(h_index), MIN(h_index)
    FROM authors
    GROUP BY university;
    `;
    

async function seedDatabase() {
  const connection = mysql.createConnection(CONNECTION_CONFIG);
  const execQuery = util.promisify(connection.query.bind(connection));
  try {
    // call the function that returns promise

    console.log("All research papers and the number of authors that wrote that paper:");
    console.log(await execQuery(SELECT_NUMBER_AUTHORS_PAPERS));

    console.log("Sum of the research papers published by all female authors:");
    console.log(await execQuery(SUM_PAPERS_FEMALE));

    console.log("Average of the h-index of all authors per university:");
    console.log(await execQuery(AVERAGE_H_INDEX));

    console.log("Sum of the research papers of the authors per university:");
    console.log(await execQuery(SUM_PAPERS_UNIVERSITY));

    console.log("Minimum and maximum of the h-index of all authors per university:");
    console.log(await execQuery(MIN_MAX_H_INDEX));
    
    connection.end();
  } catch (error) {
    console.error(error.message);
    connection.end();
  } 
}

seedDatabase();