const mysql = require("mysql");
const util = require("util");

const connectionConfig = {
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "transfers",
};

const accountTable = `
  CREATE TABLE IF NOT EXISTS account (
      account_number INT AUTO_INCREMENT PRIMARY KEY,
      balance FLOAT NOT NULL
  );`;

const accountChangesTable = `
  CREATE TABLE IF NOT EXISTS account_changes (
      change_number INT AUTO_INCREMENT PRIMARY KEY,
      account_number INT,
      amount FLOAT NOT NULL,
      changed_date DATE NOT NULL,
      remark VARCHAR(255),
      CONSTRAINT fk_acc_no
      FOREIGN KEY (account_number) REFERENCES account(account_number)
  )
  `;

const createTables = async () => {
  const connection = mysql.createConnection(connectionConfig);
  const execQuery = util.promisify(connection.query.bind(connection));

  try {
    await execQuery(accountTable);
    await execQuery(accountChangesTable);
    connection.end();
    process.exit(0);
  } catch (err) {
    console.error(err.message);
    connection.end();
    process.exit(1);
  }
};

createTables();
