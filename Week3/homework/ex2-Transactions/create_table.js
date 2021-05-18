const mysql = require("mysql");
const util = require("util");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "transaction",
  port: 3306,
});
const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  const CREATE_ACCOUNT_TABLE = `
    CREATE TABLE IF NOT EXISTS account (
        account_number INT NOT NULL PRIMARY KEY,
        balance INT
    )AUTO_INCREMENT=100;`;

  const CREATE_ACCOUNT_CHANGES_TABLE = `
    CREATE TABLE IF NOT EXISTS account_changes (
        change_number INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        account_number INT,
        amount INT ,
        changed_date DATE,
        remark VARCHAR(250),
        CONSTRAINT FK_accountNumber FOREIGN KEY (account_number)
        REFERENCES account(account_number)
    );`;

  connection.connect();

  try {
    await execQuery(CREATE_ACCOUNT_TABLE);
    await execQuery(CREATE_ACCOUNT_CHANGES_TABLE);
  } catch (error) {
    console.error(error);
    connection.end();
  }

  connection.end();
}

seedDatabase();
