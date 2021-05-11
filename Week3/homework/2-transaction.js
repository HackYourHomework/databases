const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Giresun3428@",
  database: "transactions",
});

const execQuery = util.promisify(connection.query.bind(connection));

async function transaction() {
  connection.connect();

  try {
    await execQuery(`START TRANSACTION`);

    await execQuery(`UPDATE account         SET balance = 250  WHERE account_number = 101`);
    await execQuery(`UPDATE account         SET balance = 1250 WHERE account_number = 102`);
    await execQuery(`UPDATE account_changes SET amount  = 1000, changed_date = '2021-05-10', remark = 'Send Money Transfer'     WHERE change_number  = 201`);
    await execQuery(`UPDATE account_changes SET amount  = 1000, changed_date = '2021-05-10', remark = 'Received Money Transfer' WHERE change_number  = 202`);

    await execQuery(`COMMIT`);
  } catch (error) {
    console.error(error);
    await execQuery(`ROLLBACK`);
    connection.end();
  }

  connection.end();
}

transaction();
