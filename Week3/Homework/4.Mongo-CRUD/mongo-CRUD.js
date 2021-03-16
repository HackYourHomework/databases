"use strict";

const MongoClient = require("mongodb").MongoClient;

const url =
  "mongodb+srv://admin:hyfpassword@cluster0.rctpa.mongodb.net/world?retryWrites=true&w=majority";

async function crudTheWorld() {
  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();

    const db = client.db("World");
    const cityCollection = await db.collection("City");

    const newCity = {
      Name: "Cairo",
      CountryCode: "EGY",
      District: "Greater Cairo",
      Population: 30000000,
    };

    // C-  create a new city document
    await cityCollection.insertOne(newCity);

    // U - Update population
    const cityToUpdate = { District: "Greater Cairo" };
    const newPopulation = {
      $set: {
        Population: 28900000,
      },
    };
    await cityCollection.updateOne(cityToUpdate, newPopulation);

    // R-
    // by city name
    const findByCityQuery = { Name: "Cairo" };
    const foundByCity = await cityCollection.find(findByCityQuery).toArray();
    console.log(foundByCity);

    // by country code
    const findByCountryCodeQuery = { CountryCode: "EGY" };
    const foundByCountryCode = await cityCollection
      .find(findByCountryCodeQuery)
      .toArray();
    console.log(foundByCountryCode);

    // D - delete city
    const cityToDelete = { District: "Greater Cairo" };
    await cityCollection.deleteOne(cityToDelete);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

crudTheWorld();
