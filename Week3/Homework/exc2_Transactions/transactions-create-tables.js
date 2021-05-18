const mysql = require("mysql");
const util = require("util");

const connection = mysql.createConnection({
    host: "localhost",
    user: "hyfuser",
    password: "hyfpassword",
});

connection.connect((err) => {
    if (err) throw err;
    console.log("connected");
});

const errFunc = (err) => {if (err) throw err};

connection.query("DROP DATABASE IF EXISTS transactions", errFunc);

connection.query("CREATE DATABASE transactions", errFunc);

connection.query("USE transactions", errFunc);

const accountTable = `CREATE TABLE IF NOT EXISTS account(
  account_number INT AUTO_INCREMENT,
  balance INT,
  PRIMARY KEY(account_number)
  )`;

const accountChangesTable = `CREATE TABLE IF NOT EXISTS account_changes(
   change_number INT,
   account_number INT,
   amount INT,
   changed_date DATETIME,
   remark VARCHAR(75),
   PRIMARY KEY(change_number))`;

async function seedDatabase(){
    
const execQuery = util.promisify(connection.query.bind(connection));

try {
      await execQuery(accountTable);
      await execQuery(accountChangesTable);
    } 
    
catch (err) {
        console.log(err);
  }

connection.end();
}

seedDatabase();
