const mysql = require("mysql");
const util = require("util");

const connectionConfig = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "tarek123321",
    database: "week3",
};

const accountDetails = [
    [100, 500],
    [101, 1300],
    [102, 2500],
    [103, 1900],
];

const seedDatabase = async () => {
    const db = mysql.createConnection(connectionConfig);
    const execQuery = util.promisify(db.query.bind(db));
    db.connect();

    try {
        await execQuery("INSERT INTO account VALUES ?", [accountDetails]);

        db.end();
    } catch (err) {
        console.error(err.message);

        db.end();
    }
};

seedDatabase();
