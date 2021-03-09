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
        await execQuery("USE week3");
        await execQuery("SET AUTOCOMMIT = 0");
        await execQuery("START TRANSACTION");

        // condition to make sure that there is at least 1000 in account number 101
        // it's not part of homework but you told us about it in the class so i wanted to add it. now it won't transfer money if there is less than 1000 in the
        // account
        const balance = await execQuery("SELECT balance from account where account_number = 101;");
        const parsedBalance = parseInt(JSON.stringify(balance).split(":")[1]);

        if (parsedBalance >= 1000) {
            await execQuery(
                "UPDATE account SET balance = balance - 1000 WHERE account_number = 101"
            );
            await execQuery(
                "UPDATE account SET balance = balance + 1000 WHERE account_number = 102"
            );
            await execQuery(
                "INSERT account_changes(account_number, amount, remark, changed_date) VALUES(101, -1000, 'lening', NOW())"
            );
            await execQuery(
                "INSERT account_changes(account_number, amount, remark, changed_date) VALUES(102, +1000, 'lening', NOW())"
            );
            await execQuery("COMMIT");
        }

        db.end();
    } catch (err) {
        await execQuery("ROLLBACK");
        console.error(err.message);

        db.end();
    }
};

seedDatabase();
