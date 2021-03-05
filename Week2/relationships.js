const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "userdb",
});

const execQuery = util.promisify(connection.query.bind(connection));

async function defineRelationships() {
  const CREATE_TABLE_RESEARCH_PAPERS = `
    CREATE TABLE IF NOT EXISTS research_Papers (
      paper_id INT AUTO_INCREMENT PRIMARY KEY,
      paper_title VARCHAR(100) NOT NULL,
      conference VARCHAR(100),
      publish_date DATE
    );
  `;
  const CREATE_TABLE_AUTHORS_PAPERS = `
    CREATE TABLE IF NOT EXISTS authors_Papers (
      apid INT AUTO_INCREMENT PRIMARY KEY,
      author INT,
      paper INT,
      FOREIGN KEY (author) REFERENCES authors(author_no),
      FOREIGN KEY (paper) REFERENCES research_Papers(paper_id)
    );
  `;

  // Authors data
  const authors = [
    {
      author_name: "Matt Andrews",
      university: "Eindhoven University of Technology",
      date_of_birth: "1978-03-22",
      h_index: 42,
      gender: "m",
    },
    {
      author_name: "Anila Rahman",
      university: "Delft University of Technology",
      date_of_birth: "1983-11-05",
      h_index: 18,
      gender: "f",
      mentor: 1,
    },
    {
      author_name: "Tanja Visser",
      university: "University of Twente",
      date_of_birth: "1986-12-07",
      h_index: 25,
      gender: "f",
      mentor: 1,
    },
    {
      author_name: "Jennifer Smith",
      university: "Delft University of Technology",
      date_of_birth: "1989-02-01",
      gender: "f",
      mentor: 2,
    },
    {
      author_name: "Karl Cruzman",
      university: "Vrije Universiteit Amsterdam",
      date_of_birth: "1979-09-15",
      h_index: 33,
      gender: "m",
      mentor: 2,
    },
    {
      author_name: "Marion T. Kgwame",
      university: "Eindhoven University of Technology",
      date_of_birth: "1987-07-19",
      h_index: 16,
      gender: "f",
      mentor: 2,
    },
    {
      author_name: "Dinesh Subramaniam",
      university: "Eindhoven University of Technology",
      date_of_birth: "1983-05-29",
      h_index: 27,
      gender: "m",
      mentor: 3,
    },
    {
      author_name: "Sandra Verhaegan",
      university: "Vrije Universiteit Amsterdam",
      date_of_birth: "1985-10-17",
      h_index: 20,
      gender: "f",
      mentor: 4,
    },
    {
      author_name: "Abdullah Al-Hadi",
      university: "Vrije Universiteit Amsterdam",
      date_of_birth: "1988-08-06",
      h_index: 14,
      gender: "m",
      mentor: 5,
    },
    {
      author_name: "Vaishaka Agarwal",
      university: "Vrije Universiteit Amsterdam",
      date_of_birth: "1991-03-27",
      gender: "f",
      mentor: 6,
    },
    {
      author_name: "Ivana Nilsson",
      university: "Utrecht University",
      date_of_birth: "1984-06-12",
      h_index: 35,
      gender: "f",
      mentor: 5,
    },
    {
      author_name: "Juliana Schrijver",
      university: "Utrecht University",
      date_of_birth: "1987-12-03",
      h_index: 13,
      gender: "f",
      mentor: 7,
    },
    {
      author_name: "Gertrude Koosman",
      university: "Delft University of Technology",
      date_of_birth: "1987-07-13",
      h_index: 12,
      gender: "f",
      mentor: 3,
    },
    {
      author_name: "Henry Meijer",
      university: "Delft University of Technology",
      date_of_birth: "1987-12-22",
      h_index: 15,
      gender: "m",
      mentor: 3,
    },
    {
      author_name: "Sualeha Cevahir",
      university: "University of Twente",
      date_of_birth: "1990-02-16",
      h_index: 10,
      gender: "f",
      mentor: 1,
    },
  ];

  // Papers data
  const research_papers = [
    {
      paper_title: "Priming Psychology in HCI",
      conference: "HCI 9th Annual Symposium",
      publish_date: "2000-10-15",
    },
    {
      paper_title: "Extracting Analytical Data From Digital Behaviors",
      publish_date: "2003-03-01",
    },
    {
      paper_title: "Globally Unified Voice Interface Platform",
      conference: "A.I. Conference for NLP Pioneers 2017",
      publish_date: "2015-11-16",
    },
    {
      paper_title: "Genetic Coding With A.I. Facial Recognition",
      conference: "A.I. Conference for NLP Pioneers 2020",
      publish_date: "2018-07-22",
    },
    {
      paper_title: "Mainstreaming A.I. in Education",
      conference: "A.I. for Educators Conference",
      publish_date: "2013-12-29",
    },
    {
      paper_title: "Community Ecommerce Catalysts for Growing Markets",
      conference: "Global Ecommerce Forum Berlin",
      publish_date: "2016-02-02",
    },
    {
      paper_title: "Healthcare Forecast Formations with Big Data",
      conference: "Internation Healthcare Tech Chicago Chapter",
      publish_date: "2015-01-20",
    },
  ];

  // Authors/Papers junction data
  const authors_papers = [
    {
      author: 1,
      paper: 3,
    },
    {
      author: 2,
      paper: 1,
    },
    {
      author: 1,
      paper: 1,
    },
    {
      author: 11,
      paper: 1,
    },
    {
      author: 5,
      paper: 3,
    },
    {
      author: 3,
      paper: 2,
    },
    {
      author: 15,
      paper: 4,
    },
    {
      author: 6,
      paper: 5,
    },
    {
      author: 8,
      paper: 5,
    },
    {
      author: 8,
      paper: 6,
    },
    {
      author: 14,
      paper: 6,
    },
    {
      author: 12,
      paper: 6,
    },
    {
      author: 7,
      paper: 7,
    },
    {
      author: 2,
      paper: 7,
    },
  ];

  connection.connect();

  try {
    await execQuery(CREATE_TABLE_RESEARCH_PAPERS);
    await execQuery(CREATE_TABLE_AUTHORS_PAPERS);
    authors.forEach(async author => {
      await execQuery('INSERT INTO authors SET ?', author);
    });
    research_papers.forEach(async paper => {
      await execQuery('INSERT INTO research_papers SET ?', paper);
    });
    authors_papers.forEach(async athrPpr => {
      await execQuery('INSERT INTO authors_papers SET ?', athrPpr);
    });
  } catch (error) {
    console.error(error);
    connection.end();
  }

  connection.end();
}

defineRelationships();
