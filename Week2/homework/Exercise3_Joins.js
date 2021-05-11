import util from 'util';
import mysql from 'mysql';

const CONNECTION_CONFIG = {
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'week2_db',
};

const SELECT_AUTHORS_MENTORS = `SELECT  T1.author_name author,T2.author_name mentor
                                FROM week2_db.authors T1
                                INNER JOIN week2_db.authors T2
                                ON T1.mentor = T2.author_no;`;

const SELECT_AUTHORS_PAPERS = `SELECT authors.author_name, research_papers.paper_title
                                FROM authors INNER JOIN
                                    research_papers ON authors.author_no = research_papers.paper_id LEFT JOIN
                                    authors_research_papers ON authors.author_no = authors_research_papers.author_no;`;

const databaseQueries = () => {
  const connection = mysql.createConnection(CONNECTION_CONFIG);
  const execQuery = util.promisify(connection.query.bind(connection));

  try {
    execQuery(SELECT_AUTHORS_MENTORS, (err, result) => {
      if (err) throw err;
      console.log('SELECT_AUTHORS_MENTORS ====> result: ', result);
    });
    execQuery(SELECT_AUTHORS_PAPERS, (err, result) => {
      if (err) throw err;
      console.log('SELECT_AUTHORS_PAPERS ====> result: ', result);
    });
  } catch (error) {
    console.log('error: ', error);
  }

  connection.end();
};
databaseQueries();
