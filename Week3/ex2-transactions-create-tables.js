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

    await execQuery(`CREATE TABLE IF NOT EXISTS account (
        account_number INT PRIMARY KEY,
        balance DECIMAL(10,4) NOT NULL 
    )`);
    await execQuery(`CREATE TABLE IF NOT EXISTS account_changes (
        change_number INT AUTO_INCREMENT PRIMARY KEY,
        account_number INT NOT NULL,
        amount DECIMAL(10,4) NOT NULL,
        changed_date DATETIME NOT NULL,
        remark VARCHAR(250),
        CONSTRAINT FK_TrnxAcc FOREIGN KEY (account_number) REFERENCES account(account_number)
    )`);

    await execQuery("COMMIT");
  } catch (error) {
    console.error(error);
    await execQuery("ROLLBACK");
  }

  connection.end();
}

seedDatabase();
