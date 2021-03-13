const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'week3',
  prot: 3306
});

const amountToTransfer = 1000;
const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  connection.connect();

  try {
    // await execQuery('SET AUTOCOMMIT = 0;'); 
    await execQuery('START TRANSACTION');
  
    await execQuery(`UPDATE account SET balance = balance - ? WHERE account_number = 101;`,amountToTransfer);
    await execQuery(`UPDATE account SET balance = balance + ? WHERE account_number = 102;`,amountToTransfer);

    await execQuery(`INSERT INTO account_changes(account_number,amount,changed_date,remark) VALUES(101,?,now(),'Withdraw Money For Gift');`,amountToTransfer);
    await execQuery(`INSERT INTO account_changes(account_number,amount,changed_date,remark) VALUES(102,?,now(),'Received Money As Gift');`,amountToTransfer);

    await execQuery("COMMIT");
  } catch (error) {
    console.error(error);
    await execQuery("ROLLBACK");
    connection.end();
  }
  connection.end();
}

seedDatabase();






