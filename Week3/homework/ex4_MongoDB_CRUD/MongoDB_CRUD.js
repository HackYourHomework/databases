const { MongoClient } = require("mongodb");
const url = "mongodb+srv://MongoDB:902777@rana.ln9lz.mongodb.net/test";
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function getNewCity() {
  try {
    await client.connect();
    const db = client.db("world");
    const collection = db.collection("city");
    const newCity = {
      Name: "Tijara",
      CountryCode: "SYR",
      District: "Damascus",
      Population: 5183,
    };

    await collection.insertOne(newCity);

    await collection.updateOne(
      { Name: "Tijara" },
      {
        $set: {
          Population: 6296,
        },
      }
    );

    await collection.find({ Name: "Tijara" });

    await collection.find({ CountryCode: "SYR" });

    //await collection.deleteOne({ Name: "Tijara" });
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}

getNewCity();
