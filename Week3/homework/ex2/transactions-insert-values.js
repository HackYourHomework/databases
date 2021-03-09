const util = require('util');
const fs = require('fs');
const mysql = require('mysql');

const connection_config = {
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'Week_three',
  port: 3306
};

async function insertData() {
  const connection = mysql.createConnection(connection_config);
  const readFile = util.promisify(fs.readFile);
  const execQuery = util.promisify(connection.query.bind(connection));

  try {

    const data_account= await readFile(__dirname + '/account.json', 'utf8');
    const data_account_changes = await readFile(__dirname + '/account_changes.json', 'utf8');
    

    const account_json = JSON.parse(data_account);
    const account_changes_json = JSON.parse(data_account_changes);
    
    const promises_one = account_json.map(element => execQuery('INSERT INTO account SET ?', element));
    const promises_two = account_changes_json.map(data => execQuery('INSERT INTO account_changes SET ?', data));
    await Promise.all(promises_one, promises_two );

    connection.end();
  } catch (err) {
    console.error(err.message);
    connection.end();
  }
}

insertData();
