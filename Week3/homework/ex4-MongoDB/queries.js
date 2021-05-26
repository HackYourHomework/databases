const { MongoClient } = require('mongodb');
const url =
  'mongodb+srv://hyf:cYhqu1IT6ASd3xkF@cluster0.phnft.mongodb.net/test?retryWrites=true&w=majority&useUnifiedTopology=true';
const client = new MongoClient(url);
// insert a document
async function run() {
  try {
    await client.connect();
    const database = client.db('world');
    const city = database.collection('city');
    const doc = {
      Name: 'Test1-city',
      CountryCode: 'TTT',
      District: 'Tests',
      Population: 111111,
    };
    const result1 = await city.insertOne(doc);
    console.log(
      `${result1.insertedCount} documents were inserted with the _id: ${result1.insertedId}`,
    );

    //Update that record with a new population
    const filter = { Name: 'Test1-city' };
    const updateDoc = {
      $set: {
        Population: '222222',
      },
    };
    const result = await city.updateOne(filter, updateDoc);
    console.log(
      `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
    );

    //Read the document that you just updated: finding by the city name
    const query = { Name: 'Test1-city' };
    const res_city = await city.findOne(query);
    console.log(res_city);

    // Query for a city that has CountryCode "TTT"
    const query2 = { CountryCode: 'TTT' };
    const res_city2 = await city.findOne(query2);
    console.log(res_city2);

    //Delete the city
    const queryDelete = { Name: 'Test1-city' };
    const resultDelete = await city.deleteOne(queryDelete);
    if (resultDelete.deletedCount === 1) {
      console.dir('Successfully deleted one document.');
    } else {
      console.log('No documents matched the query. Deleted 0 documents.');
    }
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
