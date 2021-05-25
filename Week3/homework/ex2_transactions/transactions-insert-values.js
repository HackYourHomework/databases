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
    await execQuery('INSERT INTO account VALUES (100, 500), (102, 430), (104, 1200), (106, 700)');

    await execQuery(`INSERT INTO account_change VALUES (1, 100, 2000, '2019-01-12', 'tuition')`);
    await execQuery(`INSERT INTO account_change VALUES (2, 102, 500, '2020-03-13', 'car loan')`);
    await execQuery(`INSERT INTO account_change VALUES (3, 104, 1500, '2020-09-14', 'rent')`);
    await execQuery(`INSERT INTO account_change VALUES (4, 106, 700, '2021-01-15', 'gas')`);

  } catch (error) {
    console.error(error);
    connection.end();
  }

  connection.end();
}

seedDatabase();
