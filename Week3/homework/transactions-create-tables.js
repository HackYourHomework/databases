const mysql = require("mysql");
const util = require("util");

// Create connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Giresun3428@",
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  const deleteDb = "DROP DATABASE IF EXISTS transactions";
  const createDb = "CREATE DATABASE transactions";
  const useDb = "USE transactions";
  const accountTable = `CREATE TABLE IF NOT EXISTS account(account_number INT AUTO_INCREMENT PRIMARY KEY, balance FLOAT)`;
  const changeTable = `CREATE TABLE IF NOT EXISTS account_changes(
                                                change_number INT AUTO_INCREMENT PRIMARY KEY,
                                                account_number INT, amount FLOAT,
                                                changed_date DATE, remark VARCHAR(200),
                                                FOREIGN KEY (account_number) REFERENCES account (account_number))`;
  const specificAccountNumber = `ALTER TABLE account AUTO_INCREMENT = 101`;
  const specificChangedNumber = `ALTER TABLE account_changes AUTO_INCREMENT = 201`;
  connection.connect();

  try {
    // call the function that returns promise
    await execQuery(deleteDb);
    await execQuery(createDb);
    await execQuery(useDb);
    await execQuery(accountTable);
    await execQuery(changeTable);
    await execQuery(specificAccountNumber);
    await execQuery(specificChangedNumber);

    // authors.forEach(async (author) => {
    //   await execQuery("INSERT INTO authors SET ?", author);
    // });
  } catch (error) {
    console.error(error);
    connection.end();
  }

  connection.end();
}

seedDatabase();
