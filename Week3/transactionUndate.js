const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "userdb",
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  connection.connect();

  try {
    const amount = 1000;
    await execQuery("START TRANSACTION");

    await execQuery(
      `UPDATE account SET balance = balance-${amount} WHERE account_number = 101`
    );
    await execQuery(
      `UPDATE account SET balance = balance+${amount} WHERE account_number = 102`
    );

    await execQuery(
      `UPDATE account_changes INNER JOIN account ON account.account_number=account_changes.account_number SET account_changes.amount='-${amount}'` +
        `,account_changes.remark=CONCAT('your balance is ',account.balance) WHERE account.account_number=101 `
    );
    await execQuery(
      `UPDATE account_changes INNER JOIN account ON account.account_number=account_changes.account_number SET account_changes.amount='+${amount}'` +
        `,account_changes.remark=CONCAT('your balance is ',account.balance) WHERE account.account_number=102 `
    );

    await execQuery("COMMIT");
  } catch (error) {
    console.error(error);
    await execQuery("ROLLBACK");
    connection.end();
  }

  connection.end();
}

seedDatabase();
