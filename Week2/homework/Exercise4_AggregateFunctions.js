import util from 'util';
import mysql from 'mysql';

const CONNECTION_CONFIG = {
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'week2_db',
};

const SELECT_PAPERS_AUTHORS = `SELECT rp.paper_title, COUNT(rp.paper_id) AS count
                  FROM research_papers AS rp LEFT JOIN authors_research_papers AS ap ON rp.paper_id = ap.paper_id
                  GROUP BY ap.paper_id`;

const SUM_FEMALE_PAPERS = `SELECT COUNT(DISTINCT research_papers.paper_id) AS Female_Count
                          FROM authors INNER JOIN
                                  authors_research_papers ON authors.author_no = authors_research_papers.author_no INNER JOIN
                                  research_papers ON authors_research_papers.paper_id = research_papers.paper_id
                                WHERE (authors.gender = 'f')`;

const AVERAGE_H_INDEX = `SELECT AVG(authors.h_index) AS Average, authors.university
                  FROM authors
                  GROUP BY authors.university`;

const SUM_PAPERS_AUTHORS_PER_UNIVERSITY = `SELECT COUNT(DISTINCT research_papers.paper_id) AS Sum_Papers, authors.author_name, authors.university
                                          FROM authors INNER JOIN
                                                authors_research_papers ON authors.author_no = authors_research_papers.author_no INNER JOIN
                                                research_papers ON authors_research_papers.paper_id = research_papers.paper_id
                                          GROUP BY authors.university`;

const MIN_MAX_H_INDEX = `SELECT MIN(authors.h_index) AS Minimum, MAX(authors.h_index) AS Maximum, authors.author_name, authors.university
                  FROM authors INNER JOIN
                         authors_research_papers ON authors.author_no = authors_research_papers.author_no INNER JOIN
                         research_papers ON authors_research_papers.paper_id = research_papers.paper_id
                  GROUP BY authors.author_name, authors.university`;

const databaseQueries = () => {
  const connection = mysql.createConnection(CONNECTION_CONFIG);
  const execQuery = util.promisify(connection.query.bind(connection));

  try {
    execQuery(SELECT_PAPERS_AUTHORS, (err, result) => {
      if (err) throw err;
      console.log('SELECT_1 ====> result: ', result);
    });
    execQuery(SUM_FEMALE_PAPERS, (err, result) => {
      if (err) throw err;
      console.log('SELECT_2 ====> result: ', result);
    });
    execQuery(AVERAGE_H_INDEX, (err, result) => {
      if (err) throw err;
      console.log('SELECT_3 ====> result: ', result);
    });
    execQuery(SUM_PAPERS_AUTHORS_PER_UNIVERSITY, (err, result) => {
      if (err) throw err;
      console.log('SELECT_4 ====> result: ', result);
    });
    execQuery(MIN_MAX_H_INDEX, (err, result) => {
      if (err) throw err;
      console.log('SELECT_5 ====> result: ', result);
    });
  } catch (error) {
    console.log('error: ', error);
  }

  connection.end();
};
databaseQueries();
