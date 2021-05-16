const mysql = require("mysql");
const util = require("util");

async function seedDatabase() {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "hyfuser",
    password: "hyfpassword",
  });

  const execQuery = util.promisify(connection.query.bind(connection));
  connection.connect();

  try {
    await execQuery(`USE week3`);
    await execQuery(`SET AUTOCOMMIT = 0`);
    await execQuery(`START TRANSACTION`);
    await execQuery(
      `UPDATE account SET balance = balance -1000 WHERE account_number = 101`
    );
    await execQuery(
      `UPDATE account SET balance = balance +1000 WHERE account_number = 102`
    );
    await execQuery(
      `INSERT INTO account_changes VALUES(35, 101, -1000, now(), "loan")`
    );
    await execQuery(
      `INSERT INTO account_changes VALUES(36, 102, +1000, now(), "loan")`
    );
    await execQuery(`COMMIT`);
    connection.end();
  } catch (err) {
    console.error(err.message);
    await execQuery(`ROLLBACK`);
    connection.end();
  }
}
seedDatabase();
