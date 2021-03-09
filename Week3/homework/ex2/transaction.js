const util = require('util');
const fs = require('fs');
const mysql = require('mysql');

const connection_config = {
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'Week_three',
  port: 3306
};

async function runQuery() {
  const connection = mysql.createConnection(connection_config);
  const execQuery = util.promisify(connection.query.bind(connection));

  try {
    await execQuery(`START TRANSACTION`);

    await execQuery(`UPDATE account SET balance = balance - 1000 WHERE account_number = 101`);
    await execQuery(`UPDATE account SET balance = balance + 1000 WHERE account_number = 102`);

    await execQuery(`INSERT INTO account_changes(account_number,amount,changed_date,remark) VALUES(101,1000,now(),'withdraw Money')`);
    await execQuery(`INSERT INTO account_changes(account_number,amount,changed_date,remark) VALUES(102,1000,now(),'Recieved Money')`);

    await execQuery('COMMIT');
    connection.end();

  } catch (err) {
    console.error(err.message);
    await execQuery('ROLLBACK');
    connection.end();
  }
}

runQuery();
