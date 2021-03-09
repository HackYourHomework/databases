const mysql = require("mysql");
const util = require("util");

const connectionConfig = {
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "transfers",
};

const transfers = (tableName, action, id) => {
  const transfer = `
UPDATE ${tableName}
SET balance = ${action}
WHERE account_number = ${id}
`;
  return transfer;
};

const updateChanges = [
  {
    account_number: 101,
    amount: -1000,
    changed_date: "2021-03-05",
    remark: "Rent",
  },
  {
    account_number: 102,
    amount: 1000,
    changed_date: "2021-03-05",
    remark: "Rent",
  },
];

const getBalance = id => {
  const accBalance = `
SELECT balance
FROM account
WHERE account_number = ${id}
`;
  return accBalance;
};

const logTransfer = async () => {
  const connection = mysql.createConnection(connectionConfig);
  const execQuery = util.promisify(connection.query.bind(connection));

  try {
    await execQuery("SET AUTOCOMMIT = 0");

    await execQuery("START TRANSACTION");

    const checkBalance = await execQuery(getBalance(101));
    const { balance } = checkBalance[0];

    //only do transfers if there is enough money in the bank account
    if (balance > 1000) {
      await execQuery(transfers("account", "balance - 1000", 101));
      await execQuery(transfers("account", "balance + 1000", 102));
      const changes = updateChanges.map(change =>
        execQuery("INSERT INTO account_changes SET ?", change)
      );
      Promise.all(changes);
      await execQuery("COMMIT");
      connection.end();
      process.exit(0);
    }
  } catch (err) {
    console.error(err.message);
    await execQuery("ROLLBACK");
    connection.end();
    process.exit(1);
  }
};

logTransfer();
