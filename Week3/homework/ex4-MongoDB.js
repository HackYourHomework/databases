const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017";

async function seedDatabase() {
  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();

    const myCity = {
      Name: "Damascus",
      CountryCode: "SYR",
      District: "Damascus",
      Population: 2000000,
    };

    await client.db("world").collection("city").insertOne(myCity);

    await client
      .db("world")
      .collection("city")
      .updateOne(
        { Name: "Damascus" },
        {
          $set: {
            Population: 600000,
          },
        }
      );

    await client.db("world").collection("city").find({ Name: "Damascus" });

    await client.db("world").collection("city").find({ CountryCode: "SYR" });

    await client.db("world").collection("city").deleteOne({ Name: "Damascus" });
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

seedDatabase();
