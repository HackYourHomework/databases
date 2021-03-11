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
    const city = await db.collection("City").find({}).toArray();
    console.log(city);

    //insert new city
    // const newCity = {
    //   Name: "Name",
    //   CountryCode: "Country Code",
    //   District: "District",
    //   Population: 4350000,
    // };

    // create document
    // await client.db("world").collection("city").insertOne(newCity);

    // Update Population
    // await client.db("world").collection("city").updateOne({Name: "city"},{
    //   $set:{
    //       Population: 13456889
    //     }
    // });

    // find city name
    // await client.db("world").collection("city").find({Name:"city"});

    // find by country code
    // await client.db("world").collection("city").find({CountryCode:"Country Code"});

    // delete city
    // await client.db("world").collection("city").deleteOne({Name:"City"});
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

crudTheWorld();
