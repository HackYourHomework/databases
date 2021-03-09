const mysql = require("mysql");
const util = require("util");

const connectionConfig = {
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "transfers",
};

const accountData = [
  {
    account_number: 100,
    balance: 501.5,
  },
  {
    balance: 6578.12,
  },
  {
    balance: 78945.87,
  },
  {
    balance: 50.05,
  },
];

const transfers = [
  {
    account_number: 101,
    amount: 48.58,
    changed_date: "2021-03-05",
    remark: "Groceries",
  },
  {
    account_number: 102,
    amount: 147.35,
    changed_date: "2021-03-05",
    remark: "Water bill",
  },
  {
    account_number: 102,
    amount: 185.45,
    changed_date: "2021-03-05",
    remark: "Electricity bill",
  },
];

const insertData = async () => {
  const connection = mysql.createConnection(connectionConfig);
  const execQuery = util.promisify(connection.query.bind(connection));

  try {
    const accountData_ = accountData.map(acc =>
      execQuery("INSERT INTO account SET ?", acc)
    );

    const transfers_ = transfers.map(transfer =>
      execQuery("INSERT INTO account_changes SET ?", transfer)
    );

    await Promise.all(transfers_, accountData_);

    connection.end();
    process.exit(0);
  } catch (err) {
    console.error(err.message);
    connection.end();
    process.exit(1);
  }
};

insertData();
