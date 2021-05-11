const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Giresun3428@",
  database: "transactions",
});

// Promisify the bind function of query function of connection object
// Pass connection object (because bind expects "this")
// Afterwards execQuery will work as a function that returns a promise but
// we don't have to call "then" over that promise
const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {


  const accountsValues = [
    {
      balance: 5000.0,
    },
    {
      balance: 425.45,
    },
    {
      balance: 3000.4,
    },
    {
      balance: 75.12,
    },
    {
      balance: 45.14,
    },
  ];
  const accountsChanges = [
    {
      account_number: 101,
      amount: 0,
      changed_date: "2021-04-10",
      remark: `ING Transaction`,
    },
    {
      account_number: 102,
      amount: 0,
      changed_date: "2021-03-10",
      remark: `Rabobank Transaction`,
    },
    {
      account_number: 103,
      amount: 0,
      changed_date: "2021-02-10",
      remark: `ABN  Transaction`,
    },
    {
      account_number: 104,
      amount: 0,
      changed_date: "2021-01-10",
      remark: `Tridos Transaction`,
    },
    {
      account_number: 105,
      amount: 0,
      changed_date: "2021-05-10",
      remark: `De Volksbank Transaction`,
    },
  ];

  connection.connect();

  try {
    // call the function that returns promise
    accountsValues.forEach(async (account) => {
      await execQuery("INSERT INTO account SET ?", account);
    });
    accountsChanges.forEach(async (account) => {
      await execQuery("INSERT INTO account_changes SET ?", account);
    });
   // await execQuery(FK);
  } catch (error) {
    console.error(error);
    connection.end();
  }

  connection.end();
}

seedDatabase();
