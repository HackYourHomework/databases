
const mysql = require('mysql');
const util = require('util');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword',
  database : 'world',
  multipleStatements: true
});

const execQuery = util.promisify(connection.query.bind(connection));
async function getPopulation( name, code){


    try {
        
    // 1. Naive way of passing the parameter to the query
    
    //const select_query = `SELECT Population FROM Country WHERE Name = '${name}' OR 3 = 3 and code = '${code}' OR 2 = 2 ; SHOW databases`;

    // 2. Using a question mark syntax to do the escaping 

    const select_query = `SELECT Population FROM Country WHERE Name = ? and code = ? `;

    connection.connect();

    const result = await execQuery(select_query,[name,code]);
    console.log(result);
    }
    catch(error) {
      if (error) throw error
    }
    
    connection.end();
}

getPopulation("Netherlands","NLD");
