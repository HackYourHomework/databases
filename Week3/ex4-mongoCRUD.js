const util = require("util");
const mongoConn = require("./ex4-mongoConn");
const { MongoClient } = require("mongodb");
const url = mongoConn.connectString || "mongodb://localhost:27017/";

async function mongoCRUD() {
  const client = new MongoClient(url);
  try {
    await client.connect();
    const worldDb = client.db("world");

    // CREATE: Insert city Deventer and its current Population
    const insertCity = await worldDb.collection("city").insertOne({
        ID: 4080,
        Name: "Deventer",
        CountryCode: "NLD",
        District: "Overijssel",
        Population: 99957,
    });
    console.log("Created: ", `{ _id: ${insertCity.insertedId} }`);

    // UPDATE: Increase the population of city Deventer
    const updateCityPop = await worldDb.collection("city").updateOne({Name: "Deventer"}, { $set: {Population: 100000} });
    console.log("Updated: ", updateCityPop.modifiedCount);

    // READ: Find the city by name
    const readCityByName = await worldDb.collection("city").find({ Name: "Deventer" }).toArray();
    console.log("Read by Name: ", readCityByName);

    // READ: Find the city by country code and ID
    const readCityByCC = await worldDb.collection("city").find({ CountryCode: "NLD", ID: 4080 }).toArray();
    console.log("Read by Country Code and ID: ", readCityByCC);

    // DELETE: Delete the city by ID
    const deleteCity = await worldDb.collection("city").deleteOne({ Name: "Deventer" });
    console.log("Deleted: ", deleteCity.deletedCount);
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

mongoCRUD();
