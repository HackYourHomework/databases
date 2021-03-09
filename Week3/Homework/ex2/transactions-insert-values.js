const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'homework_w3',
});

const execQuery = util.promisify(connection.query.bind(connection));

const account_data = [
    {
        balance :3700
    },
    {
        balance :5700
    },
    {
        balance :2800
    }
    
];

const changes_data = [

    {
    account_number :100,
    amount  :100,
    changed_date :'2006-12-30 00:38:54.840',
    remark   :       'change by 100',
    },
    {
    account_number :101,
    amount  :100,
    changed_date :'2015-12-01 00:38:54.840',
    remark   :   'change by 100',
    },
    {
    account_number :102,
    amount  :100,
    changed_date :'2011-01-30 00:38:54.840',
    remark   :   'change by 100',
    }
];

async function seedDatabase() {

    connection.connect();

    try {
        // call the function that returns promise
        
        const account_data_promise = account_data.map(data => execQuery('INSERT INTO account SET ?', data));
        const changes_data_promise = changes_data.map(data => execQuery('INSERT INTO account_changes SET ?', data));
        
        await Promise.all(account_data_promise,changes_data_promise);

    } catch (error) {
        console.error(error);
        connection.end();
    }

    connection.end();
};

seedDatabase();