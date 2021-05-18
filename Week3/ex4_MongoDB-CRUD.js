//const uri = "mongodb+srv://CmlSph:PPll1122@testcluster1.reakx.mongodb.net/world"
const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://CmlSph:PPll1122@testcluster1.reakx.mongodb.net/world";

async function seedDatabase() {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    const myBeautifulCity = {
      Name: "Istanbul",
      CountryCode: "TUR",
      District: "Fatih",
      Population: 17000000,
    };
    //Insert a new city to MongoDB
    // await client.db("world").collection("city").insertOne(myBeautifulCity);
    //Update a city
    await client
      .db("world")
      .collection("city")
      .updateOne(
        { District: "Fatih" },
        {
          $set: {
            Population: 17000002 + " Including us",
          },
        }
      );
    //find a city in MongoDB
    // await client.db("world").collection("city").findOne({Name:"Istanbul"});

    //delete a city from the database
    // await client
    //   .db("world")
    //   .collection("city")
    //   .deleteOne({ District: "Fatih" });
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}
seedDatabase();
