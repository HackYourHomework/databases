const util = require('util');
const mysql = require('mysql');


const CONNECTION_CONFIG = {
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'homework_week2',
    port: 3306
};


const SELECT_AUTHORS_MENTOR = `
    SELECT first.author_name , second.author_name as mentor 
    FROM authors first 
    JOIN authors second 
    ON first.author_no = second.mentor;
`;

const SELECT_AUTHORS_RES_PAPERS = `
    SELECT authors.*, research_papers.paper_title
    FROM authors
    JOIN authors_research_papers ON authors.author_no = authors_research_papers.author_no
    JOIN research_papers ON authors_research_papers.res_paper_id = research_papers.paper_id;
    `;



async function seedDatabase() {

    const connection = mysql.createConnection(CONNECTION_CONFIG);
    const execQuery = util.promisify(connection.query.bind(connection));

    try {
    
    console.log(await execQuery(SELECT_AUTHORS_MENTOR)) ;
    console.log(await execQuery(SELECT_AUTHORS_RES_PAPERS)) ;
    
    } catch (error) {

        console.error(error.message);
        connection.end();
    } 
}

seedDatabase();