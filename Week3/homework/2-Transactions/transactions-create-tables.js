const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'userdb',
});

const CREATE_ACCOUNT_TABLE = `
CREATE TABLE IF NOT EXISTS account(
    account_number INT AUTO_INCREMENT,
    balance FLOAT NOT NULL,
    PRIMARY KEY (account_number)
);
`;

const CREATE_ACCOUNT_CHANGES_TABLE = `
CREATE TABLE IF NOT EXISTS account_changes(
    change_number INT AUTO_INCREMENT,
    account_number INT NOT NULL,
    amount FLOAT NOT NULL,
    changed_data DATE NOT NULL,
    remark VARCHAR(250),
    PRIMARY KEY (change_number),
    CONSTRAINT fk_account_number FOREIGN KEY (account_number) REFERENCES account(account_number)
);
`;

async function seedDatabase() {
  const execQuery = util.promisify(connection.query.bind(connection));

  try {
    await execQuery(CREATE_ACCOUNT_TABLE);
    await execQuery(CREATE_ACCOUNT_CHANGES_TABLE);
  } catch (err) {
    console.error(err.message);
  }
  connection.end();
}
seedDatabase();
