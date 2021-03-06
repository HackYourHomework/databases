const util = require('util');
const fs = require('fs');
const mysql = require('mysql');

const CONNECTION_CONFIG = {
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'week3',
  port: 3306
};



async function seedDatabase() {

  const connection = mysql.createConnection(CONNECTION_CONFIG);
  const readFile = util.promisify(fs.readFile);
  const execQuery = util.promisify(connection.query.bind(connection));

  try {

    const accountsData = await readFile(__dirname + '/account.json', 'utf8');
    const accountChangesData = await readFile(__dirname + '/accountChanges.json', 'utf8');


    const accounts = JSON.parse(accountsData);
    const accountChanges = JSON.parse(accountChangesData);
   
    
    const accountPromise = accounts.map(account => execQuery('INSERT INTO account SET ?', account));
    execQuery('SET FOREIGN_KEY_CHECKS=0');
    const accountChangesPromise = accountChanges.map(accountChange => execQuery('INSERT INTO account_changes SET ?', accountChange));
    execQuery('SET FOREIGN_KEY_CHECKS=1');

    await Promise.all(accountPromise,accountChangesPromise);
    connection.end();

  } catch (error) {
    console.error(error.message);
    connection.end();
  } 

}

seedDatabase();
