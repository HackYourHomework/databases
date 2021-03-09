const util = require('util');
const mysql = require('mysql');


const connection_config = {
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'Week_three',
};


const create_table_account = 
  `CREATE TABLE IF NOT EXISTS account (
    account_number INT AUTO_INCREMENT PRIMARY KEY,
    balance DECIMAL CHECK (balance >= 0)
  )AUTO_INCREMENT=100;`;

const create_table_account_changes =
  `CREATE TABLE IF NOT EXISTS account_changes (
    change_number INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    account_number INT,
    amount INT,
    changed_date DATE,
    remark VARCHAR(250),
    CONSTRAINT FK_account FOREIGN KEY (account_number) REFERENCES account(account_number)
    );`;


async function createTable() {
  const connection = mysql.createConnection(connection_config);
  const execQuery = util.promisify(connection.query.bind(connection));

  try {
    await execQuery(create_table_account);
    await execQuery(create_table_account_changes);

    connection.end();
  } catch (err) {
    console.error(err.message);
    connection.end();
  }
}

createTable();