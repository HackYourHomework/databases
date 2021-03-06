// I use this method of coding  to solve the home work from here  https://github.com/unmeshvrije/database_examples/blob/master/4-db-await.js.

const util = require('util');
const fs = require('fs');
const mysql = require('mysql');

const CONNECTION_CONFIG = {
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'homework_week2',
    port: 3306
};
//create research_papers query
const CREATE_RES_PAPERS_TABLE = `
    CREATE TABLE IF NOT EXISTS research_papers(
        paper_id        INT auto_increment PRIMARY KEY,
        paper_title     VARCHAR(255) NOT NULL,
        conference      VARCHAR(255) NOT NULL,
        publish_date    DATE
    );`;

    //create authors_research_papers query

const CREATE_AUTHORS_RES_PAPERS_TABLE = `
    CREATE TABLE authors_research_papers(
        author_no           INT NOT NULL,
        res_paper_id   INT NOT NULL ,

        CONSTRAINT fk_author FOREIGN KEY (author_no) REFERENCES authors(author_no),
        CONSTRAINT fk_paper FOREIGN KEY (res_paper_id) REFERENCES research_papers(paper_id),
        PRIMARY KEY (author_no, res_paper_id)
    );`;


/*The relation between authors table and res_papers table is many to many  because author may has more than one res_paper and vise versa */

async function seedDatabase() {
    //connect to mysql and make promises

    const connection = mysql.createConnection(CONNECTION_CONFIG);
    const readFile = util.promisify(fs.readFile);
    const execQuery = util.promisify(connection.query.bind(connection));

    try {
        //create tables 
        await execQuery(CREATE_RES_PAPERS_TABLE);
        await execQuery(CREATE_AUTHORS_RES_PAPERS_TABLE);

        
        //I useD faker package to generate the data 
        //reade data file from external json file
        
        const author_data = await readFile(__dirname + '/authors.json', 'utf8');
        const res_papers_data = await readFile(__dirname + '/res_papers.json', 'utf8');
        const author_paper_data = await readFile(__dirname + '/authors_papers.json', 'utf8');
        
        //parse data as json 
        const authors_array = JSON.parse(author_data);
        const res_papers_array= JSON.parse(res_papers_data);
        const author_res_paper_array = JSON.parse(author_paper_data);

        //this step according to teacher tomas advise and i also find ALTER TABLE table_name DISABLE KEYS;TO THE SAME THING .
        // to disable the foreign keys until fill data .
        await execQuery("SET FOREIGN_KEY_CHECKS=0");
        const author_promise = authors_array.map(author => execQuery('INSERT INTO authors SET ?', author));
        // enable the foreign keys
        await execQuery("SET FOREIGN_KEY_CHECKS=1");
        
        const res_paper_promise = res_papers_array.map(res_paper => execQuery('INSERT INTO research_papers SET ?', res_paper));
        const author_res_paper_promise = author_res_paper_array.map(author_paper => execQuery('INSERT INTO authors_research_papers SET ?', author_paper));

        await Promise.all(author_promise,res_paper_promise,author_res_paper_promise);
        connection.end();

    } catch (error) {
        console.error(error.message);
        connection.end();
    } 

}

seedDatabase();