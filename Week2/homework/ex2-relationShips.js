const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'week2',
  port: 3306
});

// Promisify the bind function of query function of connection object
// Pass connection object (because bind expects "this")
// Afterwards execQuery will work as a function that returns a promise but
// we don't have to call "then" over that promise
const execQuery = util.promisify(connection.query.bind(connection));
//paper_id, paper_title, conference, publish_date, ...)
async function seedDatabase() {
    // The relation between authors table and research table is Many To Many, because every author may have many papers 
    // and every research paper may have many authors 
  const CREATE_RESEARCH_PAPERS_TABLE = `
    CREATE TABLE IF NOT EXISTS research_Papers(
        paper_id INT auto_increment PRIMARY KEY,
        paper_title VARCHAR(50),
        conference VARCHAR(50),
        publish_date DATE
    );`;
    const CREATE_AUTHORS_RESEARCH_TABLE = `
        CREATE TABLE author_Research_Papers(
            author_no int not null,
            research_paper_no int not null,
            constraint fk_auth foreign key(author_no) references authors(author_no),
            constraint fk_paper foreign key(research_paper_no) references research_papers(paper_id),
            primary key(author_no,research_paper_no)
        );`;
      const authors = [
        {author_name: 'author1',university : 'Amsterdam',date_of_birth: '1995-04-26',h_index : 10,gender: 'm',mentor:'1'},
        {author_name: 'author2',university : 'Amsterdam',date_of_birth: '1995-04-26',h_index : 10,gender: 'm',mentor:'1'},
        {author_name: 'author3',university : 'Amsterdam',date_of_birth: '1995-04-26',h_index : 10,gender: 'm',mentor:'1'},
        {author_name: 'author4',university : 'Amsterdam',date_of_birth: '1995-04-26',h_index : 10,gender: 'm',mentor:'1'},
        {author_name: 'author5',university : 'Amsterdam',date_of_birth: '1995-04-26',h_index : 10,gender: 'm',mentor:'2'},
        {author_name: 'author6',university : 'Amsterdam',date_of_birth: '1995-04-26',h_index : 10,gender: 'm',mentor:'2'},
        {author_name: 'author7',university : 'Amsterdam',date_of_birth: '1995-04-26',h_index : 10,gender: 'm',mentor:'3'},
        {author_name: 'author8',university : 'Amsterdam',date_of_birth: '1995-04-26',h_index : 10,gender: 'm',mentor:'3'},
        {author_name: 'author9',university : 'Amsterdam',date_of_birth: '1995-04-26',h_index : 10,gender: 'm',mentor:'4'},
        {author_name: 'author1',university : 'Amsterdam',date_of_birth: '1995-04-26',h_index : 10,gender: 'm',mentor:'4'}
      ];
      const research_papers = [
        {paper_title:'Ms',conference: 'Benno',publish_date: '1995-04-26'},
        {paper_title:'Ms',conference: 'Benno',publish_date: '1995-04-26'},
        {paper_title:'Ms',conference: 'Benno',publish_date: '1995-04-26'},
        {paper_title:'Ms',conference: 'Benno',publish_date: '1995-04-26'},
        {paper_title:'Ms',conference: 'Benno',publish_date: '1995-04-26'},
        {paper_title:'Ms',conference: 'Benno',publish_date: '1995-04-26'},
        {paper_title:'Ms',conference: 'Benno',publish_date: '1995-04-26'},
        {paper_title:'Ms',conference: 'Benno',publish_date: '1995-04-26'},
        {paper_title:'Ms',conference: 'Benno',publish_date: '1995-04-26'},
        {paper_title:'Ms',conference: 'Benno',publish_date: '1995-04-26'},
        {paper_title:'Ms',conference: 'Benno',publish_date: '1995-04-26'},
        {paper_title:'Ms',conference: 'Benno',publish_date: '1995-04-26'},
        {paper_title:'Ms',conference: 'Benno',publish_date: '1995-04-26'},
        {paper_title:'Ms',conference: 'Benno',publish_date: '1995-04-26'},
        {paper_title:'Ms',conference: 'Benno',publish_date: '1995-04-26'},
      ];
    //   const author_research_papers = [
    //     {author_no:1,research_paper_no:4},
    //   ];

  
  connection.connect();

  try {
    // call the function that returns promise
    await execQuery(CREATE_RESEARCH_PAPERS_TABLE);
    await execQuery(CREATE_AUTHORS_RESEARCH_TABLE);
    authors.forEach(async author => {
        await execQuery('INSERT INTO authors SET ?', author);
      });
    research_papers.forEach(async researchPaper => {
        await execQuery('INSERT INTO research_papers SET ?', researchPaper);
    });
    
  } catch (error) {
    console.error(error);
    connection.end();
  }

  connection.end();
}

seedDatabase();
