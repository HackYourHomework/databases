const util = require('util');
const fs = require('fs');
const mysql = require('mysql');

const CONNECTION_CONFIG = {
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'week2-db'
};

// Create the table called research papers and set the attributes.
const CREATE_RESEARCH_PAPERS_TABLE = `
    CREATE TABLE IF NOT EXISTS research_Papers (
        paper_id INT AUTO_INCREMENT,
        paper_title VARCHAR(50),
        conference VARCHAR(50),
        publish_date DATE,
        PRIMARY KEY(paper_id)
    );
`;

// There is a many-to-many relationship between authors and research_Papers tables.
// Create the third table for dividing the many-to-many relationship into 2 different 
// one-to-many relationships.
const CREATE_PAPER_AUTHOR_TABLE = `
    CREATE TABLE IF NOT EXISTS paper_author (
        id INT AUTO_INCREMENT,
        paper_id INT,
        author_no INT,
        PRIMARY KEY(id),
        FOREIGN KEY(paper_id) REFERENCES research_Papers(paper_id),
        FOREIGN KEY(author_no) REFERENCES authors(author_no)
    );
`;

// Async function for the database connection
async function seedDatabase() {
    const connection = mysql.createConnection(CONNECTION_CONFIG);
    const readFile = util.promisify(fs.readFile);
    const execQuery = util.promisify(connection.query.bind(connection));

    try {
        await execQuery(CREATE_RESEARCH_PAPERS_TABLE);
        await execQuery(CREATE_PAPER_AUTHOR_TABLE);

        // Preventing foreign key check before inserting data
        await execQuery("SET FOREIGN_KEY_CHECKS = 0");

        // Read + Insert data for the authors table
        const authorsData = await readFile(__dirname + '/authors.json', 'utf8');
        const authors = JSON.parse(authorsData);
        const authorsPromises = authors.map(author => execQuery('INSERT INTO authors SET ?', author));

        // Read + Insert data for the research_Papers table
        const researchPapersData = await readFile(__dirname + '/researchPapers.json', 'utf8');
        const researchPapers = JSON.parse(researchPapersData);
        const researchPapersPromises = researchPapers.map(researchPaper => execQuery('INSERT INTO research_Papers SET ?', researchPaper));

        // Read + Insert data for the paper_author table
        const paperAuthorMatchesData = await readFile(__dirname + '/paperAuthorMatches.json', 'utf8');
        const paperAuthorMatches = JSON.parse(paperAuthorMatchesData);
        const paperAuthorPromises = paperAuthorMatches.map(paperAuthor => execQuery('INSERT INTO paper_author SET ?', paperAuthor));

        await Promise.all(authorsPromises, researchPapersPromises, paperAuthorPromises);

        // Setting foreign key check after inserting data
        await execQuery("SET FOREIGN_KEY_CHECKS = 1");

        connection.end();
    } catch (err) {
        console.log(err);
        connection.end();
    };
};

seedDatabase();