const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://hyfuser:hyfpassword@world.5ptmm.mongodb.net/world?retryWrites=true&w=majority';

async function worldQueries() {
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
      await client.connect();
      
      const newCity = {
          Name: "Duckstad",
          CountryCode: "DUK",
          District: "Quackamore",
          Population: 40000 
      }

      // Insert New Document
      await client.db("world").collection("city").insertOne(newCity);
      

      // Update Population
      await client.db("world").collection("city").updateOne({Name: "Duckstad"},{
        $set:{
            Population: 50000 
          }
      });

      // Finding By The City Name
      await client.db("world").collection("city").find({Name:"Duckstad"});
      
      // Finding By The Country Code
      await client.db("world").collection("city").find({CountryCode:"DUK"});

      // Delete The City
      await client.db("world").collection("city").deleteOne({Name:"Duckstad"});
      
      } catch(error) {
          console.error(error);
      } finally {
          await client.close();
  }
}

worldQueries();