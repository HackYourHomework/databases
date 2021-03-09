const util = require('util');
const mysql = require('mysql');

const CONNECTION_CONFIG = {
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'transactions'
};

// Query for inserting a new account change
const ADD_ACCOUNT_CHANGES_TABLE = `
    INSERT INTO account_changes(account_number, amount, changed_date, remark)
    VALUES(102, 1000, "2021-01-01", "new money transfer");
`;

// Async function for transaction
async function makeTransaction() {
    const connection = mysql.createConnection(CONNECTION_CONFIG);
    const execQuery = util.promisify(connection.query.bind(connection));

    try {
        // Start transaction
        await execQuery("START TRANSACTION;");
        await execQuery("UPDATE account SET balance = ? WHERE account_number = 101;", 9000);
        await execQuery("UPDATE account SET balance = ? WHERE account_number = 102;", 8000);
        await execQuery(ADD_ACCOUNT_CHANGES_TABLE);
        // End transaction
        await execQuery("COMMIT;");
    } catch (err) {
        // If error, roll back the transaction
        await execQuery("ROLLBACK;");
        console.error(err);
    };

    connection.end();
};

makeTransaction();