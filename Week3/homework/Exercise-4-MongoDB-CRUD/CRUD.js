const { MongoClient } = require('mongodb');

const url =
  'mongodb+srv://db_user_1:asdfg12345@cluster0.mcdzi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function mongoQuery() {
  try {
    await client.connect();
    const db = client.db('world');
    const collection = db.collection('city');
    const addTehran = {
      Name: 'Tehran',
      CountryCode: 'IRN',
      District: 'Tehran',
      Population: 16000000,
    };

    await collection.insertOne(addTehran);
    await collection.updateOne(
      { Name: 'Tehran' },
      {
        $set: {
          Population: 16000378,
        },
      },
    );
    collection.find({ Name: 'Tehran' });
    collection.find({ CountryCode: 'IRN' });
    //await collection.remove({ Name: 'Tehran' });
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}

mongoQuery();
