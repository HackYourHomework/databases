import { MongoClient } from 'mongodb';

const uri = `mongodb+srv://wael:HY938455@newcluster.jdsfg.mongodb.net/world`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = client.db(`world`);

const collection = db.collection(`city`);

const myCity = {
  Name: `Sepphoris`,
  CountryCode: `PSE`,
  District: `Nazareth`,
  Population: 972,
};

const getNewCity = async () => {
  try {
    await client.connect();

    await collection.insertOne(myCity);

    await collection.updateOne(
      { Name: `Sepphoris` },
      {
        $set: {
          Population: 972,
        },
      }
    );

    collection.find({ Name: `Sepphoris` });

    collection.find({ CountryCode: `PSE` });

    await collection.deleteOne({ Name: `Sepphoris` });
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
};

getNewCity();
