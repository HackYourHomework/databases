const mysql = require("mysql");
const util = require("util");

const CREATE_TABLE_ACCOUNT = `
CREATE TABLE IF NOT EXISTS account(
account_number INT NOT NULL,
balance INT,
PRIMARY KEY(account_number)
)`;

const CREATE_TABLE_ACCOUNT_CHANGES = `
CREATE TABLE IF NOT EXISTS account_changes(
change_number INT,
account_number INT,
amount INT,
changed_date DATETIME,
remark VARCHAR(55),
PRIMARY KEY(change_number),
CONSTRAINT FK_accountNumber FOREIGN KEY (account_number) REFERENCES account(account_number)
)`;

async function seedDatabase() {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "hyfuser",
    password: "hyfpassword",
  });
  const execQuery = util.promisify(connection.query.bind(connection));
  connection.connect();

  try {
    await execQuery(`CREATE DATABASE IF NOT EXISTS week3`);
    await execQuery(`USE week3`);
    await execQuery(CREATE_TABLE_ACCOUNT);
    await execQuery(CREATE_TABLE_ACCOUNT_CHANGES);
    connection.end();
  } catch (err) {
    console.error(err.message);
    connection.end();
  }
}
seedDatabase();
