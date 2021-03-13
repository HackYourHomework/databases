
const mysql = require('mysql');
const util = require('util');
const prompt = require('prompt');


const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword',
  database : 'world',
  prot: 3306,
  multipleStatements: true
});

const execQuery = util.promisify(connection.query.bind(connection));
const input = util.promisify(prompt.get.bind(this));

async function getPopulation() {

    let input_table_name = "";
    let input_country_name = "";
    let input_country_code = "";
    prompt.start();
    try {
        const result_table_Name = await input(['Please_Enter_Table_Name']);
        const result_country_Name = await input(['Please_Enter_Country_Name']);
        const result_country_Code = await input(['Please_Enter_Country_Code']);

        input_table_name = result_table_Name.Please_Enter_Table_Name;
        input_country_name = result_country_Name.Please_Enter_Country_Name;
        input_country_code = result_country_Code.Please_Enter_Country_Code;
        
        // 1. Naive way of passing the parameter to the query
        // This query will print all countries populations if I write s' OR '1'='1 as country name or country code or both of them!!!!
        // So the query will be: SELECT Population FROM country WHERE Name ='s' OR '1'='1' AND Code ='s' OR '1'='1';
        // And if I try to run multi statements (as an injection) it will work! the query will be: SELECT Population FROM country WHERE Name ='syria' AND Code ='s' OR '1'='1';show tables;

        // const select_query = `SELECT Population FROM ${input_table_name} WHERE Name ='${input_country_name}' AND Code ='${input_country_code}';`;

        // 2. Escaping the parameter ( replacing the unwanted characters)
        // This query will not print all countries populations, even if I write s' OR '1'='1 as country name or country code or both of them!!!
        // So the query will be: SELECT Population FROM country WHERE Name = 's\' OR \'1\'=\'1' AND Code = 's\' OR \'1\'=\'1';
        // And if I try to run multi statements (as an injection) it won't work! the query will be: SELECT Population FROM country WHERE Name = '\'s OR \'1\'=\'1' AND Code = '\'s OR \'1\'=\'1; show tables;

        // const select_query = `SELECT Population FROM ${connection.escape(input_table_name).replace(/'/g,"")} WHERE Name = ${connection.escape(input_country_name)} AND Code = ${connection.escape(input_country_code)};`;
       
        // 3. Using a question mark syntax to do the escaping 
        // This query will not print all countries populations, even if I write s' OR '1'='1 as country name or country code or both of them!!!
        // So the query will be: SELECT Population FROM country WHERE Name = ? AND Code = ?;
        // And if I try to run multi statements (as an injection) it won't work! the query will be: SELECT Population FROM country WHERE Name = ? AND Code = ?;

        // const select_query = `SELECT Population FROM ${connection.escape(input_table_name).replace(/'/g,"")} WHERE Name = ?? AND Code = ??;`;
        // OR  Alternatively, you can use ?? characters as placeholders for identifiers you would like to have escaped like this:
        const select_query = `SELECT Population FROM ?? WHERE Name = ? AND Code = ?;`;
        connection.connect();
        console.log(select_query);
        const results = await execQuery(select_query,[input_table_name,input_country_name,input_country_code]);
        for (r of results) {
            console.log(r);
        }
    } catch(error) {
        console.error(error);
    }
    
    connection.end();
}

getPopulation();

