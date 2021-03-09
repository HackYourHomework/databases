const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'homework_w3',
});

const dropDatabase = `DROP DATABASE IF EXISTS homework_w3`;
const createDatabase = `CREATE DATABASE homework_w3`;
const useDatabase = `USE homework_w3`;

const execQuery = util.promisify(connection.query.bind(connection));
const CREATE_ACCOUNT_TABLE = `
CREATE TABLE IF NOT EXISTS account (
    account_number  INT  AUTO_INCREMENT PRIMARY KEY ,
    balance         DECIMAL CHECK (balance > 0)
) AUTO_INCREMENT = 100;`;
const CREATE_ACCOUNT_CHANGES_TABLE = `
CREATE TABLE IF NOT EXISTS account_changes (
    change_number   INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    account_number  INT NOT NULL,
    amount          DECIMAL ,
    changed_date    DATETIME ,
    remark          TEXT,
    FOREIGN KEY (account_number)
    REFERENCES account(account_number)
);`;

async function seedDatabase() {

    connection.connect();

    try {
        // call the function that returns promise
        await execQuery(dropDatabase);
        await execQuery(createDatabase);
        await execQuery(useDatabase);
        await execQuery(CREATE_ACCOUNT_TABLE);
        await execQuery(CREATE_ACCOUNT_CHANGES_TABLE);
    } catch (error) {
        console.error(error);
        connection.end();
    }

    connection.end();
}

seedDatabase();