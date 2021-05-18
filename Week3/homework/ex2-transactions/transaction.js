import { createConnection } from 'mysql';
import { promisify } from 'util';

const connectionConfig = {
  host: `localhost`,
  user: `hyfuser`,
  password: ``,
  database: `hyf_db`,
};

const connection = createConnection(connectionConfig);

const execQuery = promisify(connection.query.bind(connection));

const transfer = async (operation, id) => {
  execQuery(`
  UPDATE account
  SET balance = ${operation}
  WHERE account_number = ${id}
  `);
};

const changesData = [
  {
    account_number: 100,
    amount: -1000,
    changed_date: `2020-08-20`,
    remark: 'Car Service',
  },
  {
    account_number: 101,
    amount: 1000,
    changed_date: `2020-08-20`,
    remark: 'Car Service',
  },
];

async function seedDatabase() {
  try {
    await execQuery(`START TRANSACTION`);

    await transfer(`balance - 1000`, 100);
    await transfer(`balance + 1000`, 101);

    const changes = changesData.map((change) =>
      execQuery(`INSERT INTO account_changes SET ?`, change)
    );
    Promise.all(changes);
    await execQuery(`COMMIT`);
  } catch (err) {
    console.error(err.message);
    await execQuery(`ROLLBACK`);
  } finally {
    connection.end();
  }
}

seedDatabase();
