const util = require('util');
const mysql = require('mysql');

const CONNECTION_CONFIG = {
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'transactions'
};

// Data for inserting to the account table
const accountsData = [
    {
        balance: 10000
    },
    {
        balance: 7000
    },
    {
        balance: 5000
    }
];

// Data for inserting to the account_changes table
const accountChangesData = [
    {
        account_number: 101,
        amount: 300,
        changed_date: "2020-09-03",
        remark: "Shopping"
    },
    {
        account_number: 102,
        amount: 640,
        changed_date: "2021-01-13",
        remark: "Rent fee"
    },
    {
        account_number: 103,
        amount: 2000,
        changed_date: "2020-12-01",
        remark: "Salary"
    }
];

// Async function for inserting data to the tables
async function seedDatabase() {
    const connection = mysql.createConnection(CONNECTION_CONFIG);
    const execQuery = util.promisify(connection.query.bind(connection));

    try {
        const accountsPromises = accountsData.map(account => execQuery("INSERT INTO account SET ?", account));
        const accountChangesPromises = accountChangesData.map(accountChange => execQuery("INSERT INTO account_changes SET ?", accountChange));

        await Promise.all(accountsPromises, accountChangesPromises);
    } catch (err) {
        console.error(err);
    };

    connection.end();
};

seedDatabase();