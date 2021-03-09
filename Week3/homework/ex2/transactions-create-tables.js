/*Create two tables account and account_changes (write transactions-create-tables.js file)
account table should have following fields : account_number, balance.
account_changes table should have the following fields : change_number, account_number, amount, changed_date, remark.
Choose the appropriate data types and keys for these tables.
Insert some sample data in these tables. (write transactions-insert-values.js file)
Transfer the amount of 1000 from account number 101 to account number 102 and log the changes in the table account_changes. Do this in a single transaction (Write transaction.js file)
Submit all three files (transactions-create-tables.js, transactions-insert-values.js and transaction.js).*/

const mysql = require("mysql");
const util = require("util");

const connectionConfig = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "tarek123321",
    database: "week3",
};

const seedDatabase = async () => {
    const db = mysql.createConnection(connectionConfig);
    const execQuery = util.promisify(db.query.bind(db));
    db.connect();

    try {
        await execQuery("CREATE DATABASE IF NOT EXISTS week3");
        await execQuery("USE week3");
        await execQuery(
            "CREATE TABLE IF NOT EXISTS account (account_number INT PRIMARY KEY, balance INT)"
        );
        await execQuery(
            "CREATE TABLE IF NOT EXISTS account_changes(change_number INT AUTO_INCREMENT PRIMARY KEY , account_number INT NOT NULL, amount INT NOT NULL, changed_date DATE, remark TEXT)"
        );

        db.end();
    } catch (err) {
        console.error(err.message);

        db.end();
    }
};

seedDatabase();
