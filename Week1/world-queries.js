const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "world",
  // port: xxxx,
});

const execQuery = util.promisify(connection.query.bind(connection));

async function worldDb() {
  connection.connect();

  try {
    // What are the names of countries with population greater than 8 million?
    const qryPopulation = `SELECT Name FROM country WHERE Population > 8000000`;
    const qryPopulationPromise = await Promise.all([execQuery(qryPopulation)]);
    const qryPopulationCountries = qryPopulationPromise[0]
      .map((country) => country.Name)
      .join(", ");
    console.log(
      `Countries with population greater than 8 million: ${qryPopulationCountries} \n`
    );

    // What are the names of countries that have “land” in their names?
    const qryLand = `SELECT Name FROM country WHERE Name LIKE "%land%"`;
    const qryLandPromise = await Promise.all([execQuery(qryLand)]);
    const qryLandCountries = qryLandPromise[0]
      .map((country) => country.Name)
      .join(", ");
    console.log(`Countries with "land" in their names: ${qryLandCountries} \n`);

    // What are the names of the cities with population in between 500,000 and 1 million?
    const qryCityPopulation = `SELECT Name FROM city WHERE POPULATION BETWEEN 500000 AND 1000000`;
    const qryCityPopulationPromise = await Promise.all([
      execQuery(qryCityPopulation),
    ]);
    const qryCityPopulationCities = qryCityPopulationPromise[0]
      .map((city) => city.Name)
      .join(", ");
    console.log(
      `Names of the cities with population between 500,000 and 1 million: ${qryCityPopulationCities} \n`
    );

    // What's the name of all the countries on the continent ‘Europe’?
    const qryContEurope = `SELECT Name FROM country WHERE Continent = "Europe"`;
    const qryContEuropePromise = await Promise.all([execQuery(qryContEurope)]);
    const qryContEuropeCountries = qryContEuropePromise[0]
      .map((city) => city.Name)
      .join(", ");
    console.log(
      `Names of all the countries on the continent 'Europe': ${qryContEuropeCountries} \n`
    );

    // List all the countries in the descending order of their surface areas.
    const qryArea = `SELECT Name FROM country ORDER BY SurfaceArea DESC`;
    const qryAreaPromise = await Promise.all([execQuery(qryArea)]);
    const qryAreaCountries = qryAreaPromise[0]
      .map((country) => country.Name)
      .join(", ");
    console.log(
      `All countries in the descending order of their surface areas: ${qryAreaCountries} \n`
    );

    // What are the names of all the cities in the Netherlands?
    const qryNdrlnd = `SELECT Name FROM city WHERE CountryCode = "NLD"`;
    const qryNdrlndPromise = await Promise.all([execQuery(qryNdrlnd)]);
    const qryNdrlndCities = qryNdrlndPromise[0]
      .map((city) => city.Name)
      .join(", ");
    console.log(`All cities in the Netherlands: ${qryNdrlndCities} \n`);

    // What is the population of Rotterdam?
    const qryRotterdam = `SELECT Population FROM city WHERE Name = "Rotterdam"`;
    const qryRotterdamPromise = await Promise.all([execQuery(qryRotterdam)]);
    const qryRotterdamPopulation = qryRotterdamPromise[0][0].Population;
    console.log(`Population of Rotterdam: ${qryRotterdamPopulation} \n`);

    // What's the top 10 countries by Surface Area?
    const qryTopArea = `SELECT Name FROM country ORDER BY SurfaceArea DESC LIMIT 10`;
    const qryTopAreaPromise = await Promise.all([execQuery(qryTopArea)]);
    const qryTopAreaCountries = qryTopAreaPromise[0]
      .map((country) => country.Name)
      .join(", ");
    console.log(`Top 10 countries by surface areas: ${qryTopAreaCountries} \n`);

    // What's the top 10 most populated cities?
    const qryTopPopulation = `SELECT Name FROM city ORDER BY Population DESC LIMIT 10`;
    const qryTopPopulationPromise = await Promise.all([
      execQuery(qryTopPopulation),
    ]);
    const qryTopPopulationCities = qryTopPopulationPromise[0]
      .map((city) => city.Name)
      .join(", ");
    console.log(`Top 10 most populated cities: ${qryTopPopulationCities} \n`);

    // What is the population number of the world?
    const qryTotalPop = `SELECT SUM(Population) AS TotalPopulation FROM country`;
    const qryTotalPopPromise = await Promise.all([execQuery(qryTotalPop)]);
    const qryTotalPopWorld = qryTotalPopPromise[0][0].TotalPopulation;
    console.log(`Total population of the world: ${qryTotalPopWorld} \n`);
  } catch (error) {
    console.error(error);
  }

  connection.end();
}

worldDb();
