const util = require('util');
const mysql = require('mysql');


const CONNECTION_CONFIG = {
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'homework_week2',
    port: 3306
};


const SELECT_PAPERS_AUTHORS_NO= `
    SELECT research_papers.paper_title , COUNT(authors.author_name ) 
    FROM research_papers 
    JOIN authors_research_papers ON research_papers.paper_id = authors_research_papers.res_paper_id
    JOIN authors ON authors_research_papers.author_no = authors.author_no
    GROUP BY research_papers.paper_title;
`;

const SUM_FEMALE_PAPERS = `
    SELECT  authors.gender ,count(research_papers.paper_title)
    FROM authors 
    JOIN authors_research_papers ON authors.author_no =authors_research_papers.author_no 
    JOIN research_papers ON research_papers.paper_id = authors_research_papers.res_paper_id
    WHERE authors.gender = "f" 
    GROUP BY authors.gender;
    `;

    const AVG_H_INDEX_UNIVERSITY = `
    SELECT  university,AVG(h_index) AS avarag
    FROM authors
    GROUP BY authors.university
        `;

        const SUM_PAPERS_UNIVERSITY = `
        SELECT authors.university , COUNT( research_papers.paper_title) AS SUM
        FROM research_papers 
        JOIN authors_research_papers ON research_papers.paper_id = authors_research_papers.res_paper_id
        JOIN authors ON authors_research_papers.author_no = authors.author_no
        GROUP BY  authors.university ;
    `;

    const MAX_MIN_H_INDEX = `
    SELECT university, MAX(h_index) AS MAX , MIN(h_index)AS MIN
    FROM authors
    GROUP BY university;
    `;


async function seedDatabase() {

    const connection = mysql.createConnection(CONNECTION_CONFIG);
    const execQuery = util.promisify(connection.query.bind(connection));

    try {
    
        console.log(await execQuery(SELECT_PAPERS_AUTHORS_NO)) ;
        console.log(await execQuery(SUM_FEMALE_PAPERS));
        console.log(await execQuery(AVG_H_INDEX_UNIVERSITY));
        console.log(await execQuery(SUM_PAPERS_UNIVERSITY));
        console.log(await execQuery(MAX_MIN_H_INDEX));

    } catch (error) {

        console.error(error.message);
        connection.end();
    } 
}

seedDatabase();