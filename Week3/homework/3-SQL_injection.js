// 1- Give an example of a value that can be passed as name and code that would take advantage of SQL-injection and (fetch all the records in the database)
/*
 the value that  can be passed and take advantage of SQL-injection is the following for example :
getPopulation(`country`, `India`, `"IND" OR 1=1;show tables;`);

code example : 
```
function getPopulation(country, name, code) {
  // assuming that connection to the database is established and stored as conn
  connection.query(
    `SELECT Population FROM ${country} WHERE Name = '${name}' AND code = '${code}' `,
    function (err, result) {
      if (err) throw err;
      console.log('The requested data are ', result);
    }
  );
}
getPopulation(`country`, `India`, `"IND" OR 1=1;show tables;`);
```
*/

// 2- Rewrite the function so that it is no longer vulnerable to SQL injection
/* 
I can Rewrite the function again using prepared statements that will prevent sql-injections attacks like the following example :
```
function getPopulation(country, name, code) {
  // assuming that connection to the database is established and stored as conn
  connection.query(
    `SELECT Population FROM ${country} WHERE Name = ? AND code = ?`,
    [name, code],
    function (err, result) {
      if (err) throw err;
      console.log('The requested data are ', result);
    }
  );
}
getPopulation('country', 'India', 'IND');
```
*/
