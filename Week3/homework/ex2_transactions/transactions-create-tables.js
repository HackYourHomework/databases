const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword'
});

const createDb = `CREATE DATABASE IF NOT EXISTS week3_db`;
const useDb = "USE week3_db";

const accountTable = `
  CREATE TABLE IF NOT EXISTS account (
  account_number INT,
  balance FLOAT,
  CONSTRAINT  pk_account PRIMARY KEY (account_number)
);`;

const accountChangeTable = `
CREATE TABLE IF NOT EXISTS account_change (
  change_number INT AUTO_INCREMENT,
  account_number INT,
  amount FLOAT,
  changed_date DATE,
  remark VARCHAR(150),
  CONSTRAINT pk_change PRIMARY KEY (change_number),
  CONSTRAINT FK_account_number FOREIGN KEY (account_number)
  REFERENCES account(account_number)
);`;

async function seedDatabase() {
  const execQuery = util.promisify(connection.query.bind(connection));

  try {
    await execQuery(createDb);
    await execQuery(useDb);
    await execQuery(accountTable);
    await execQuery(accountChangeTable);
  } catch (error) {
    console.error(error);
    connection.end();
  }
  connection.end();
}
seedDatabase();
