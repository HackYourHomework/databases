import { checkError } from "./initialization.js";
import { default as mongodb } from "mongodb";
let MongoClient = mongodb.MongoClient;

// Create a new record (document) for a new city (your home town, say)
const insertDocuments = async (db) => {
  const cities = await db.collection("cities");
  await cities.insertOne(
    {
      ID: 4081,
      NAME: "Almere-stad",
      CountryCode: "NLD",
      DISTRICT: "Flevoland",
      Population: 142465,
    },
    (err, results) => {
      checkError(err);
      console.log(`inserted`);
    }
  );
};

// Read the document that you just updated in two ways : finding by the city name, and then by the country code
const findDocuments = async (db) => {
  const cities = await db.collection("cities");
  cities.find({ NAME: "Almere-stad" }, (err, results) => {
    checkError(err);
    console.log(`found`);
  });
  cities.find({ CountryCode: "NLD" }, (err, results) => {
    checkError(err);
    console.log(`found`);
  });
};

// Update that record with a new population
const updateDocument = async (db) => {
  const cities = await db.collection("cities");
  cities.updateOne(
    { ID: 4081 },
    { $set: { Population: 170000 } },
    (err, results) => {
      checkError(err);
      console.log(`updated`);
    }
  );
};

// Delete the city
const removeDocument = async (db) => {
  const cities = await db.collection("cities");
  cities.deleteOne({ ID: 4081 }, (err, results) => {
    checkError(err);
    console.log(`remove`);
  });
};

// Connection URL Insert the USER and PASSWORD
const url = "mongodb+srv://<USER:PASSWORD>@cluster0.4iapg.mongodb.net/test";
const client = new MongoClient(url, { useUnifiedTopology: true });

// Use connect method to connect to the server
client.connect((err) => {
  checkError(err);
  console.log("Connected successfully to server");

  const db = client.db("world");
  insertDocuments(db);
  updateDocument(db);
  findDocuments(db);
  removeDocument(db);
  client.close();
});
