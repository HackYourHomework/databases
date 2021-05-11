



/*

1-) Give an example of a value that can be passed as name and code that would take advantage of SQL-injection and (fetch all the records in the database)

    source:w3 school
    SQL Injection Based on 1=1 is Always True

    SELECT Population 
    FROM ${Country} 
    WHERE Name = username' OR 'a'='a and code = 101 OR 1=1;


2-) Rewrite the function so that it is no longer vulnerable to SQL injection. 

*/

function getPopulation(Country, name, code, cb) {
    // assuming that connection to the database is established and stored as conn
    conn.query(
        `SELECT Population FROM ? WHERE Name = ? and code = ?`,
        function (err, result) {
            if (err) cb(err);
            if (result.length == 0) cb(new Error("Not found"));
            cb(null, result[0].name);
        }
    );
}
