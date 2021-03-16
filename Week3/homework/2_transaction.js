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
    INSERT INTO account_changes(receiving_account_number, amount, sending_account_number, changed_date, remark)
    VALUES(102, 1000, 101, CURRENT_TIMESTAMP(), "new money transfer");
`;

// Async function for transaction
async function makeTransaction() {
    const connection = mysql.createConnection(CONNECTION_CONFIG);
    const execQuery = util.promisify(connection.query.bind(connection));

    try {
        // Start transaction
        await execQuery("START TRANSACTION;");
        await execQuery("UPDATE account SET balance = balance - ? WHERE account_number = 101;", 1000);
        await execQuery("UPDATE account SET balance = balance + ? WHERE account_number = 102;", 1000);
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