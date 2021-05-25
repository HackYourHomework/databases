import { createConnection } from 'mysql';
import { promisify } from 'util';

const connectionConfig = {
  host: `localhost`,
  user: `hyfuser`,
  password: `hyfpassword`,
  database: `hyf_db`,
  multipleStatements: true,
};

const connection = createConnection(connectionConfig);

const execQuery = promisify(connection.query.bind(connection));

const fkCheck = (bool) => {
  if (!bool) {
    execQuery(`SET FOREIGN_KEY_CHECKS = 0`);
    return;
  }
  execQuery(`SET FOREIGN_KEY_CHECKS = 1`);
};

const createAccountTable = `
  DROP TABLE IF EXISTS account;

  CREATE TABLE account (
      account_number INT AUTO_INCREMENT PRIMARY KEY,
      balance FLOAT NOT NULL
  )
  AUTO_INCREMENT = 100
  `;

const createAccountChangesTable = `
  DROP TABLE IF EXISTS account_changes;

  CREATE TABLE account_changes (
      change_number INT AUTO_INCREMENT PRIMARY KEY,
      account_number INT,
      amount FLOAT NOT NULL,
      changed_date DATE NOT NULL,
      remark VARCHAR(100),
      FOREIGN KEY (account_number)
        REFERENCES account(account_number)
  )
  AUTO_INCREMENT = 1000
  `;

async function seedDatabase() {
  try {
    fkCheck(false);

    await execQuery(createAccountTable);
    await execQuery(createAccountChangesTable);

    fkCheck(true);
  } catch (err) {
    console.error(err.message);
  } finally {
    connection.end();
  }
}

seedDatabase();
