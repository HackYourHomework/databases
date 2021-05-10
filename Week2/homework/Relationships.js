const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'week2',
});
connection.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log('Connected');
  }
});

function sendQuery(query) {
  connection.query(query, (error, results) => {
    if (error) {
      throw error;
    }
    console.log(`the reply ${query} is `, results);
  });
}

const queryTableResearchPapers =
  'CREATE TABLE IF NOT EXISTS research_Papers (paper_id int NOT NULL, paper_title varchar(50), conference varchar(50), publish_date datetime, PRIMARY KEY(paper_id))';
sendQuery(queryTableResearchPapers);

const queryTableAuthorPaper =
  'CREATE TABLE IF NOT EXISTS author_paper (auth_no int NOT NULL, paper_no int NOT NULL, CONSTRAINT fk_auth FOREIGN KEY(auth_no) REFERENCES authors(author_no) ON DELETE CASCADE, CONSTRAINT fk_paper FOREIGN KEY(paper_no) REFERENCES research_Papers(paper_id) ON DELETE CASCADE, PRIMARY KEY(auth_no, paper_no))';
sendQuery(queryTableAuthorPaper);

const rowsForAuthors = [
  {
    author_no: 1,
    author_name: 'Author1',
    university: 'University1',
    date_of_birth: '1981-05-10',
    h_index: 24,
    gender: 'm',
  },
  {
    author_no: 2,
    author_name: 'Author2',
    university: 'University2',
    date_of_birth: '1971-05-10',
    h_index: 30,
    gender: 'f',
    mentor: 1,
  },
  {
    author_no: 3,
    author_name: 'Author3',
    university: 'University3',
    date_of_birth: '1982-05-10',
    h_index: 243,
    gender: 'm',
    mentor: 2,
  },
  {
    author_no: 4,
    author_name: 'Author4',
    university: 'University1',
    date_of_birth: '1981-03-10',
    h_index: 214,
    gender: 'f',
    mentor: 1,
  },
  {
    author_no: 5,
    author_name: 'Author5',
    university: 'University2',
    date_of_birth: '1991-05-10',
    h_index: 14,
    gender: 'm',
    mentor: 3,
  },
  {
    author_no: 6,
    author_name: 'Author6',
    university: 'University4',
    date_of_birth: '1982-05-10',
    h_index: 90,
    gender: 'f',
    mentor: 1,
  },
  {
    author_no: 7,
    author_name: 'Author7',
    university: 'University2',
    date_of_birth: '1971-05-10',
    h_index: 300,
    gender: 'f',
    mentor: 1,
  },
  {
    author_no: 8,
    author_name: 'Author8',
    university: 'University3',
    date_of_birth: '1982-05-10',
    h_index: 26,
    gender: 'm',
    mentor: 7,
  },
  {
    author_no: 9,
    author_name: 'Author9',
    university: 'University4',
    date_of_birth: '1981-03-10',
    h_index: 214,
    gender: 'f',
    mentor: 1,
  },
  {
    author_no: 10,
    author_name: 'Author10',
    university: 'University5',
    date_of_birth: '1991-05-10',
    h_index: 140,
    gender: 'm',
    mentor: 3,
  },
  {
    author_no: 11,
    author_name: 'Author11',
    university: 'University1',
    date_of_birth: '1981-05-10',
    h_index: 457,
    gender: 'f',
  },
  {
    author_no: 12,
    author_name: 'Author12',
    university: 'University4',
    date_of_birth: '1971-05-10',
    h_index: 300,
    gender: 'f',
    mentor: 1,
  },
  {
    author_no: 13,
    author_name: 'Author13',
    university: 'University3',
    date_of_birth: '1982-05-10',
    h_index: 28,
    gender: 'm',
    mentor: 2,
  },
  {
    author_no: 14,
    author_name: 'Author14',
    university: 'University5',
    date_of_birth: '1981-03-10',
    h_index: 214,
    gender: 'f',
    mentor: 12,
  },
  {
    author_no: 15,
    author_name: 'Author15',
    university: 'University2',
    date_of_birth: '1991-05-10',
    h_index: 141,
    gender: 'm',
    mentor: 3,
  },
];

const rowsForPapers = [
  {
    paper_id: 101,
    paper_title: 'Paper1',
    conference: 'conference1',
    publish_date: '2011-05-10',
  },
  {
    paper_id: 102,
    paper_title: 'Paper2',
    conference: 'conference1',
    publish_date: '2012-05-10',
  },
  {
    paper_id: 103,
    paper_title: 'Paper3',
    conference: 'conference2',
    publish_date: '2020-05-10',
  },
  {
    paper_id: 104,
    paper_title: 'Paper4',
    conference: 'conference1',
    publish_date: '2018-05-10',
  },
  {
    paper_id: 105,
    paper_title: 'Paper5',
    conference: 'conference3',
    publish_date: '2017-05-10',
  },
  {
    paper_id: 106,
    paper_title: 'Paper6',
    conference: 'conference1',
    publish_date: '2011-05-10',
  },
  {
    paper_id: 107,
    paper_title: 'Paper7',
    conference: 'conference1',
    publish_date: '2012-05-10',
  },
  {
    paper_id: 108,
    paper_title: 'Paper8',
    conference: 'conference2',
    publish_date: '2020-05-10',
  },
  {
    paper_id: 109,
    paper_title: 'Paper9',
    conference: 'conference1',
    publish_date: '2018-05-10',
  },
  {
    paper_id: 110,
    paper_title: 'Paper10',
    conference: 'conference3',
    publish_date: '2017-05-10',
  },
  {
    paper_id: 111,
    paper_title: 'Paper11',
    conference: 'conference1',
    publish_date: '2011-05-10',
  },
  {
    paper_id: 112,
    paper_title: 'Paper12',
    conference: 'conference1',
    publish_date: '2012-05-10',
  },
  {
    paper_id: 113,
    paper_title: 'Paper13',
    conference: 'conference2',
    publish_date: '2020-05-10',
  },
  {
    paper_id: 114,
    paper_title: 'Paper14',
    conference: 'conference1',
    publish_date: '2018-05-10',
  },
  {
    paper_id: 115,
    paper_title: 'Paper15',
    conference: 'conference3',
    publish_date: '2017-05-10',
  },
  {
    paper_id: 116,
    paper_title: 'Paper16',
    conference: 'conference1',
    publish_date: '2011-05-10',
  },
  {
    paper_id: 117,
    paper_title: 'Paper17',
    conference: 'conference1',
    publish_date: '2012-05-10',
  },
  {
    paper_id: 118,
    paper_title: 'Paper18',
    conference: 'conference2',
    publish_date: '2020-05-10',
  },
  {
    paper_id: 119,
    paper_title: 'Paper19',
    conference: 'conference1',
    publish_date: '2018-05-10',
  },
  {
    paper_id: 120,
    paper_title: 'Paper20',
    conference: 'conference3',
    publish_date: '2017-05-10',
  },
  {
    paper_id: 121,
    paper_title: 'Paper21',
    conference: 'conference1',
    publish_date: '2011-05-10',
  },
  {
    paper_id: 122,
    paper_title: 'Paper22',
    conference: 'conference1',
    publish_date: '2012-05-10',
  },
  {
    paper_id: 123,
    paper_title: 'Paper23',
    conference: 'conference2',
    publish_date: '2020-05-10',
  },
  {
    paper_id: 124,
    paper_title: 'Paper24',
    conference: 'conference1',
    publish_date: '2018-05-10',
  },
  {
    paper_id: 125,
    paper_title: 'Paper25',
    conference: 'conference3',
    publish_date: '2017-05-10',
  },
  {
    paper_id: 126,
    paper_title: 'Paper26',
    conference: 'conference1',
    publish_date: '2011-05-10',
  },
  {
    paper_id: 127,
    paper_title: 'Paper27',
    conference: 'conference1',
    publish_date: '2012-05-10',
  },
  {
    paper_id: 128,
    paper_title: 'Paper28',
    conference: 'conference2',
    publish_date: '2020-05-10',
  },
  {
    paper_id: 129,
    paper_title: 'Paper29',
    conference: 'conference1',
    publish_date: '2018-05-10',
  },
  {
    paper_id: 130,
    paper_title: 'Paper30',
    conference: 'conference3',
    publish_date: '2017-05-10',
  },
];

const rowsForAuthorPaper = [
  {
    auth_no: 1,
    paper_no: 105,
  },
  {
    auth_no: 2,
    paper_no: 105,
  },
  {
    auth_no: 1,
    paper_no: 104,
  },
  {
    auth_no: 3,
    paper_no: 103,
  },
  {
    auth_no: 3,
    paper_no: 105,
  },
  {
    auth_no: 6,
    paper_no: 107,
  },
  {
    auth_no: 7,
    paper_no: 106,
  },
  {
    auth_no: 7,
    paper_no: 107,
  },
  {
    auth_no: 8,
    paper_no: 109,
  },
  {
    auth_no: 11,
    paper_no: 110,
  },
  {
    auth_no: 11,
    paper_no: 108,
  },
  {
    auth_no: 12,
    paper_no: 111,
  },
  {
    auth_no: 13,
    paper_no: 112,
  },
  {
    auth_no: 14,
    paper_no: 113,
  },
  {
    auth_no: 15,
    paper_no: 114,
  },
  {
    auth_no: 15,
    paper_no: 115,
  },
  {
    auth_no: 11,
    paper_no: 116,
  },
  {
    auth_no: 11,
    paper_no: 117,
  },
  {
    auth_no: 11,
    paper_no: 118,
  },
  {
    auth_no: 11,
    paper_no: 119,
  },
  {
    auth_no: 11,
    paper_no: 120,
  },
  {
    auth_no: 14,
    paper_no: 121,
  },
  {
    auth_no: 14,
    paper_no: 122,
  },
  {
    auth_no: 14,
    paper_no: 123,
  },
  {
    auth_no: 14,
    paper_no: 124,
  },
  {
    auth_no: 14,
    paper_no: 125,
  },
  {
    auth_no: 14,
    paper_no: 126,
  },
  {
    auth_no: 14,
    paper_no: 127,
  },
  {
    auth_no: 14,
    paper_no: 128,
  },
  {
    auth_no: 14,
    paper_no: 129,
  },
  {
    auth_no: 14,
    paper_no: 130,
  },
];
function addRows(arr, table) {
  arr.forEach((row) => {
    const objToArr = Object.entries(row);
    let arrToString = '';
    for (i = 0; i < objToArr.length; i++) {
      let value = objToArr[i][1];
      const key = objToArr[i][0];
      if (typeof value === 'string') {
        value = `"${value}"`;
      }
      if (i === objToArr.length - 1) {
        arrToString = arrToString + `${key}=${value}`;
      } else arrToString = arrToString + `${key}=${value}, `;
    }
    const query = `INSERT INTO ${table} SET ${arrToString}`;
    sendQuery(query);
  });
}
addRows(rowsForAuthors, 'Authors');
addRows(rowsForPapers, 'research_Papers');
addRows(rowsForAuthorPaper, 'author_paper');

connection.end((error) => {
  if (error) {
    console.log('error with ending connection');
  } else console.log('connection is ended');
});
