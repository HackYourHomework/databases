import { createConnection } from 'mysql';
import { execSync } from 'child_process';

const newDB = `world`;

const dumpFile = `../world.sql`;

const queriesList = [
  `SELECT name FROM country WHERE population > 8000000`,
  `SELECT name FROM country WHERE name LIKE '%land%'`,
  `SELECT name FROM city WHERE population BETWEEN 500000 AND 1000000`,
  `SELECT name FROM country WHERE continent = 'Europe'`,
  `SELECT name, surfaceArea FROM country ORDER BY surfaceArea DESC`,
  `SELECT name FROM city WHERE countryCode = 'NLD'`,
  `SELECT population FROM city WHERE name = 'Rotterdam'`,
  `SELECT name, surfaceArea FROM country ORDER BY surfaceArea DESC LIMIT 10`,
  `SELECT name, population FROM city ORDER BY population DESC LIMIT 10`,
  `SELECT SUM(population) FROM country`,
];

const connectionInfo = {
  host: `localhost`,
  user: `hyfuser`,
  password: `hyfpassword`,
};

const connection = createConnection(connectionInfo);

const cmd = `mysql -u${connectionInfo.user} -p'${connectionInfo.password}'`;

const returnErr = (err) => {
  console.error(err);
  return;
};

connection.connect((err) => {
  if (err) returnErr(err);
  console.log(`Connection is established.`);
});

const importDB = (cmd, dumpFile) => {
  execSync(`${cmd} < '${dumpFile}'`, (err) => {
    if (err) returnErr(err);
    console.log(`${dumpFile} is imported.`);
  });
};
const addQuery = (query) => {
  connection.query(query, (err) => {
    if (err) returnErr(err);
  });
};

const useDB = (dbName) =>
  addQuery(`USE ${dbName}`, `Database ${dbName} connected.`);

try {
  importDB(cmd, dumpFile);

  useDB(newDB);

  queriesList.forEach((query) => addQuery(query));
} catch (err) {
  console.error(err.message);
} finally {
  connection.end((err) => {
    if (err) returnErr(err);
    console.log(`Connection is terminated.`);
  });
}
