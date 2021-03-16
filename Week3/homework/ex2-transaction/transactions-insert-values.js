const mysql = require('mysql');
const util = require('util');
const fs = require('fs');

const connection_config = {
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'transaction',
  port: 3306
};


async function seedDatabase() {
  
  const connection = mysql.createConnection(connection_config);
  const readFile = util.promisify(fs.readFile);
  const execQuery = util.promisify(connection.query.bind(connection));

  try {
    

    const accountData = await readFile(__dirname + '/account.json', 'utf8');
    const accountChangesData = await readFile(__dirname + '/accountChanges.json', 'utf8');
  
    const account = JSON.parse(accountData);
    const accountChanges = JSON.parse(accountChangesData);
    
   
    const accountPromise = account.map(account => execQuery('INSERT INTO account SET ?', account));
    const accountChangesPromise = accountChanges.map(accountChange => execQuery('INSERT INTO account_changes SET ?', accountChange));
 
    await Promise.all(accountPromise,accountChangesPromise);
    

  } catch (error) {
    console.error(error.message);
   
  } 
  connection.end();
}

seedDatabase();