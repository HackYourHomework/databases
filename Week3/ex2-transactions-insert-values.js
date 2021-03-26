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

    await execQuery(`INSERT INTO account VALUES (101, 35355.9392)`);
    await execQuery(`INSERT INTO account VALUES (102, 10329.22)`);
    await execQuery(`INSERT INTO account VALUES (103, 61.45)`);
    await execQuery(`INSERT INTO account VALUES (104, 213.3729)`);

    await execQuery(`
        INSERT INTO account_changes (account_number, amount, changed_date, remark)
        VALUES (101, -1599.32, "2021-03-09 20:07:22", "Salary")
    `);
    await execQuery(`
        INSERT INTO account_changes (account_number, amount, changed_date, remark)
        VALUES (102, 1599.32, "2021-03-09 20:17:22", "Salary")
    `);
    await execQuery(`
        INSERT INTO account_changes (account_number, amount, changed_date, remark)
        VALUES (104, -5, "2021-03-09 20:33:02", "Food")
    `);
    await execQuery(`
        INSERT INTO account_changes (account_number, amount, changed_date, remark)
        VALUES (103, 5, "2021-03-09 20:35:29", "Food")
    `);

    await execQuery("COMMIT");
  } catch (error) {
    console.error(error);
    await execQuery("ROLLBACK");
  }

  connection.end();
}

seedDatabase();
