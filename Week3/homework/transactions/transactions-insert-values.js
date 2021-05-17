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
    await execQuery('INSERT INTO account (balance) VALUES (500), (430), (1200), (700)');

    await execQuery(`INSERT INTO account_change (account_number, amount, changed_date, remark) VALUES (100, 2000, '2019-01-12', 'tuition')`);
    await execQuery(`INSERT INTO account_change (account_number, amount, changed_date, remark) VALUES (102, 500, '2020-03-13', 'car loan')`);
    await execQuery(`INSERT INTO account_change (account_number, amount, changed_date, remark) VALUES (104, 1500, '2020-09-14', 'rent')`);
    await execQuery(`INSERT INTO account_change (account_number, amount, changed_date, remark) VALUES (106, 700, '2021-01-15', 'gas')`);

  } catch (error) {
    console.error(error);
    connection.end();
  }

  connection.end();
}

seedDatabase();
