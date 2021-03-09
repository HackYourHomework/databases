const util = require('util');
const mysql = require('mysql');

const CONNECTION_CONFIG = {
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'transactions'
};

// Create the table called account and set the attributes.
const CREATE_ACCOUNT_TABLE = `
    CREATE TABLE IF NOT EXISTS account (
        account_number INT AUTO_INCREMENT,
        balance INT,
        PRIMARY KEY(account_number)
    );
`;

const ACCOUNT_TABLE_AUTO_INCREMENT = `
    ALTER TABLE account AUTO_INCREMENT = 101;
`;

// Create the table called account_changes and set the attributes.
const CREATE_ACCOUNT_CHANGES_TABLE = `
    CREATE TABLE IF NOT EXISTS account_changes (
        change_number INT AUTO_INCREMENT,
        account_number INT,
        amount INT,
        changed_date DATE,
        remark VARCHAR(100),
        PRIMARY KEY(change_number)
    );
`;

const ACCOUNT_CHANGES_TABLE_FK = `
    ALTER TABLE account_changes ADD CONSTRAINT FK_ACCOUNT FOREIGN KEY(account_number) REFERENCES account(account_number);
`;

// Async function for the database connection
async function initializeDatabase() {
    const connection = mysql.createConnection(CONNECTION_CONFIG);
    const execQuery = util.promisify(connection.query.bind(connection));

    try {
        await execQuery(CREATE_ACCOUNT_TABLE);
        await execQuery(ACCOUNT_TABLE_AUTO_INCREMENT);
        await execQuery(CREATE_ACCOUNT_CHANGES_TABLE);
        await execQuery(ACCOUNT_CHANGES_TABLE_FK);
    } catch (err) {
        console.log(err);
    };
    
    connection.end();
};

initializeDatabase();