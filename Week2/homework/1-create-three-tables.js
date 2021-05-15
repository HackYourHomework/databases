import {
  connection,
  checkError,
  createDatabase,
  useDatabase,
  createTable,
  alterTable,
} from "./initialization.js";

//create table called authors with fields:
const authorsTableFields = `
      author_no INT AUTO_INCREMENT,
      author_name VARCHAR(50),
      university VARCHAR(50),
      date_of_birth DATETIME,
      h_index INT,
      gender ENUM('Male', 'Female', 'X'),
      PRIMARY KEY(author_no)`;

//alter table author to add a column called mentor, with foreign key
const alterTableAuthors = `ADD COLUMN mentor INT,
ADD CONSTRAINT FK_author FOREIGN KEY (mentor) REFERENCES authors(author_no)`;
//create table called research_Papers with fields:
const researchPapersTableFields = `
      paper_id INT AUTO_INCREMENT,
      paper_title VARCHAR(50),
      conference VARCHAR(50),
      publish_date DATETIME,
      PRIMARY KEY(paper_id)`;

//create table called matching_projects with fields, include author and papers:
const authorPaperTableFields = `
      author_no INT,
      paper_id INT,
      PRIMARY KEY(author_no, paper_id),
      FOREIGN KEY(author_no) REFERENCES authors(author_no),
      FOREIGN KEY(paper_id) REFERENCES research_papers(paper_id)`;

//connection
connection.connect((err) => {
  checkError(err);
  console.log(`Mysql connected ..`);
});

createDatabase(`week2_homework`);
useDatabase(`week2_homework`);
createTable(`authors`, authorsTableFields);
alterTable(`authors`, alterTableAuthors);
createTable(`research_papers`, researchPapersTableFields);
createTable(`author_paper`, authorPaperTableFields);

connection.end((err) => {
  checkError(err);
  console.log(`Mysql disconnected ..`);
});
