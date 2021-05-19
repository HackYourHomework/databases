const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "transaction",
  port: 3306,
});
const execQuery = util.promisify(connection.query.bind(connection));
async function runQuery() {
  try {
    await execQuery("START TRANSACTION");

    await execQuery(
      "UPDATE account SET balance = balance — 1000 WHERE account_number = 101"
    );
    await execQuery(
      "UPDATE account SET balance = balance + 1000 WHERE account_number = 102"
    );

    await execQuery(
      "INSERT INTO account_changes(account_number, amount, changed_date, remark) VALUES(101, 1000, now(), 'withdraw Money')"
    );
    await execQuery(
      "INSERT INTO account_changes(account_number, amount, changed_date, remark) VALUES(102, 1000, now(), 'Received Money')"
    );

    await execQuery("COMMIT");
  } catch (error) {
    console.log(error);
    await execQuery("ROLLBACK");
    connection.end();
  }
  connection.end();
}
runQuery();
