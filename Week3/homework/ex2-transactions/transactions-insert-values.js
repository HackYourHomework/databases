import { createConnection } from 'mysql';
import { promisify } from 'util';

const connectionConfig = {
  host: `localhost`,
  user: `hyfuser`,
  password: `hyfpassword`,
  database: `hyf_db`,
};

const connection = createConnection(connectionConfig);

const execQuery = promisify(connection.query.bind(connection));

const balanceData = [
  {
    balance: 1987.66,
  },
  {
    balance: 2654.33,
  },
];

const transferData = [
  {
    account_number: 100,
    amount: 50.25,
    changed_date: `2020-07-15`,
    remark: `Internet bill`,
  },
  {
    account_number: 101,
    amount: 90.45,
    changed_date: `2020-08-20`,
    remark: `Electricity bill`,
  },
];

async function seedDatabase() {
  try {
    const insertBalance = balanceData.map((balance) =>
      execQuery(`INSERT INTO account SET ?`, balance)
    );

    const insertTransfer = transferData.map((transfer) =>
      execQuery(`INSERT INTO account_changes SET ?`, transfer)
    );

    await Promise.all(insertBalance, insertTransfer);
  } catch (err) {
    console.error(err.message);
  } finally {
    connection.end();
  }
}

seedDatabase();
