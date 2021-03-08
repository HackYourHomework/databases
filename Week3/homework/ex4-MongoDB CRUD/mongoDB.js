
const MongoClient = require('mongodb').MongoClient;

const url = "mongodb+srv://KholiO-Atlas:1411991007@cluster0.vylqe.mongodb.net/world?retryWrites=true&w=majority";

async function worldCRUD() {
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        
        const newCity = {
            Name: "New City",
            CountryCode: "New Country Code",
            District: "New District",
            Population: 4000000 
        }

        // Insert New Document
        await client.db("world").collection("city").insertOne(newCity);
        

        // Update Population
        // await client.db("world").collection("city").updateOne({Name: "New City"},{
        //   $set:{
        //       Population: 5000000 
        //     }
        // });

        // Finding By The City Name
        // await client.db("world").collection("city").find({Name:"New City"});
        
        // Finding By The Country Code
        // await client.db("world").collection("city").find({CountryCode:"New Country Code"});

        // Delete The City
        // await client.db("world").collection("city").deleteOne({Name:"New City"});
        
        } catch(error) {
            console.error(error);
        } finally {
            await client.close();
    }
}

worldCRUD();

