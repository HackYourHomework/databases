const mysql = require("mysql");
const util = require("util");

const connection = mysql.createConnection({
    host: "localhost",
    user: "hyfuser",
    password: "hyfpassword",
    database: "transactions",
});

connection.connect((err) => {
    if (err) throw err;
    console.log("connected");
});

const errFunc = (err) => {if (err) throw err};

connection.query("USE transactions", errFunc);


const accountData  = `INSERT INTO account VALUES
 (100, 1000),
 (101, 2500),
 (102, 3000),
 (103, 4000)`;

const accountChangesData  = `INSERT INTO account_changes VALUES
(10, 100, 2500, "2021-01-10", "Rent"),
(150, 101, 250, "2021-04-20", "Gift"),
(200, 102, 245, "2021-05-13", "Shopping"),
(500, 103, 3000, "2021-04-27", "King's Day")`;

async function seedDatabase() {

const execQuery = util.promisify(connection.query.bind(connection));

try {
        await execQuery(accountChangesData);
        await execQuery(accountData);
    }
        
catch (err) {
        console.log(err);
    }

connection.end();
    
}

seedDatabase();