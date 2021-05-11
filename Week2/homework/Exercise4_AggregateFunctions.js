import util from 'util';
import mysql from 'mysql';

const CONNECTION_CONFIG = {
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'week2_db',
};

const SELECT_1 = `SELECT research_papers.paper_title, COUNT(research_papers.paper_id) AS count
                  FROM research_papers LEFT JOIN authors_research_papers ON research_papers.paper_id = authors_research_papers.paper_id
                  GROUP BY authors_research_papers.paper_id;`;

const SELECT_2 = `SELECT SUM(research_papers.paper_id) AS Female_Count, authors.gender
                  FROM authors INNER JOIN
                          authors_research_papers ON authors.author_no = authors_research_papers.author_no INNER JOIN
                          research_papers ON authors_research_papers.paper_id = research_papers.paper_id
                          WHERE (authors.gender = 'f')
                    GROUP BY authors.gender;`;

const SELECT_3 = `SELECT AVG(authors.h_index) AS Average, authors.university
                  FROM authors INNER JOIN
                         authors_research_papers ON authors.author_no = authors_research_papers.author_no INNER JOIN
                         research_papers ON authors_research_papers.paper_id = research_papers.paper_id
                  GROUP BY authors.university;`;

const SELECT_4 = `SELECT SUM(research_papers.paper_id) AS Sum_Papers, authors.author_name, authors.university
                  FROM authors INNER JOIN
                         authors_research_papers ON authors.author_no = authors_research_papers.author_no INNER JOIN
                         research_papers ON authors_research_papers.paper_id = research_papers.paper_id
                  GROUP BY authors.author_name, authors.university;`;

const SELECT_5 = `SELECT MIN(authors.h_index) AS Minimum, MAX(authors.h_index) AS Maximum, authors.author_name, authors.university
                  FROM authors INNER JOIN
                         authors_research_papers ON authors.author_no = authors_research_papers.author_no INNER JOIN
                         research_papers ON authors_research_papers.paper_id = research_papers.paper_id
                  GROUP BY authors.author_name, authors.university;`;

const databaseQueries = () => {
  const connection = mysql.createConnection(CONNECTION_CONFIG);
  const execQuery = util.promisify(connection.query.bind(connection));

  try {
    execQuery(SELECT_1, (err, result) => {
      if (err) throw err;
      console.log('SELECT_1 ====> result: ', result);
    });
    execQuery(SELECT_2, (err, result) => {
      if (err) throw err;
      console.log('SELECT_2 ====> result: ', result);
    });
    execQuery(SELECT_3, (err, result) => {
      if (err) throw err;
      console.log('SELECT_3 ====> result: ', result);
    });
    execQuery(SELECT_4, (err, result) => {
      if (err) throw err;
      console.log('SELECT_4 ====> result: ', result);
    });
    execQuery(SELECT_5, (err, result) => {
      if (err) throw err;
      console.log('SELECT_5 ====> result: ', result);
    });
  } catch (error) {
    console.log('error: ', error);
  }

  connection.end();
};
databaseQueries();
