const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'userdb',
});

async function seedDatabase() {
  const execQuery = util.promisify(connection.query.bind(connection));

  try {
    await execQuery(`START TRANSACTION`);
    await execQuery(
      `UPDATE account SET balance = balance - 1000 WHERE account_number = 1;`
    );
    await execQuery(
      `UPDATE account SET balance = balance + 1000 WHERE account_number = 2;`
    );
    await execQuery(
      `INSERT INTO account_changes (account_number,amount, changed_data,remark) VALUES (1,-1000,'2021-02-08','Transferred to Account 2')`
    );
    await execQuery(
      `INSERT INTO account_changes (account_number,amount, changed_data,remark) VALUES (2,+1000,'2021-02-08','Transferred from Account 1')`
    );
    await execQuery(
      `UPDATE account SET balance = balance - 4000 WHERE account_number = 3;`
    );
    await execQuery(
      `UPDATE account SET balance = balance + 4000 WHERE account_number = 2;`
    );
    await execQuery(
      `INSERT INTO account_changes (account_number,amount, changed_data,remark) VALUES (3,-4000,'2021-02-09','Transferred to Account 2')`
    );
    await execQuery(
      `INSERT INTO account_changes (account_number,amount, changed_data,remark) VALUES (2,+4000,'2021-02-09','Transferred from Account 3')`
    );
    await execQuery(`COMMIT`);
  } catch (err) {
    console.error(err.message);
    await execQuery('ROLLBACK');
  }
  connection.end();
}
seedDatabase();
