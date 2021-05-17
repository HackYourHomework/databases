const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'week3_db',
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  connection.connect();

  try {
    await execQuery("START TRANSACTION");

    await execQuery(`UPDATE account SET balance = balance - 1000 WHERE account_number = 100`);
    await execQuery(`UPDATE account SET balance = balance + 1000 WHERE account_number = 102`);

    await execQuery(`INSERT INTO account_change (account_number, amount, changed_date, remark) VALUES (100, 1000, '2021-05-08', 'present for mum')`);
    await execQuery(`INSERT INTO account_change (account_number, amount, changed_date, remark) VALUES (102, 1000, '2021-04-15', 'new bike')`);

    await execQuery("COMMIT");
  } catch (error) {
    console.error(error);
    await execQuery("ROLLBACK");
    connection.end();
  }

  connection.end();
}

seedDatabase();
