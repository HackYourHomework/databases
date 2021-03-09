const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'userdb',
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  connection.connect();

  try {
    await execQuery("START TRANSACTION");

    await execQuery(`
        UPDATE account
        SET balance = balance - 1000
        WHERE account_number = 101;
    `);
    await execQuery(`
        INSERT INTO account_changes (account_number, amount, changed_date, remark)
        VALUES (101, -1000, "2021-03-09 20:45:05", "Business Trip")
    `);
    await execQuery(`
        UPDATE account
        SET balance = balance + 1000
        WHERE account_number = 102;
    `);
    await execQuery(`
        INSERT INTO account_changes (account_number, amount, changed_date, remark)
        VALUES (102, 1000, "2021-03-09 20:45:22", "Business Trip")
    `);

    await execQuery("COMMIT");
  } catch (error) {
    console.error(error);
    await execQuery("ROLLBACK");
    connection.end();
  }

  connection.end();
}

seedDatabase();
