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
    await execQuery(
      'INSERT INTO account (balance) VALUES (20000),(3000),(12000),(10000)'
    );
    await execQuery(
      `INSERT INTO account_changes (account_number,amount, changed_data, remark) VALUES (1,10000,'2021-02-02','New Account' )`
    );
    await execQuery(
      `INSERT INTO account_changes (account_number,amount, changed_data, remark) VALUES (1,10000,'2021-02-06','Deposit Money' )`
    );
    await execQuery(
      `INSERT INTO account_changes (account_number,amount, changed_data, remark) VALUES (2,3000,'2021-02-06','New Account')`
    );
    await execQuery(
      `INSERT INTO account_changes (account_number,amount, changed_data, remark) VALUES (3,12000,'2021-02-06','New Account' )`
    );
    await execQuery(
      `INSERT INTO account_changes (account_number,amount, changed_data,remark) VALUES (4,5000,'2021-02-10','New Account')`
    );
    await execQuery(
      `INSERT INTO account_changes (account_number,amount, changed_data,remark) VALUES (4,+5000,'2021-02-11','Deposit Money')`
    );
  } catch (err) {
    console.error(err.message);
  }
  connection.end();
}
seedDatabase();
