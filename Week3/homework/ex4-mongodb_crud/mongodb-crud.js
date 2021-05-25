import mongodb from 'mongodb';

const MongoClient = mongodb.MongoClient;

const uri = `mongodb+srv://hyfuser:hyfpassword@cluster0.0d6nm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const myCity = {
  Name: `Sepphoris`,
  CountryCode: `PSE`,
  District: `Nazareth`,
  Population: 972,
};

const manipulateCity = async () => {
  try {
    await client.connect();

    const db = client.db(`world`);

    const collection = db.collection(`city`);

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

manipulateCity();
