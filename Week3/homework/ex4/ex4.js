const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://M_mailk:hash@testcluster1.cuuzy.mongodb.net/world?retryWrites=true&w=majority";

async function seedDatabase() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        const myCity = {Name:"ABC", CountryCode:"YMN", District:"ABC", Population:2000000 };
//insert
        // await client.db("world").collection("city").insertOne(myCity);
//Update
        // await client.db("world").collection("city").updateOne({Name:"ABC"},
        // {
        //     $set:{
        //         Population: 5000000
        //     }
        // }
        // );
 //find
        // await client.db("world").collection("city").findOne({Name:"ABC"});

//delete
        await client.db("world").collection("city").deleteOne({Name:"ABC"});

    } catch(error) {
        console.error(error);
    } finally {
        await client.close();
    }
}
seedDatabase();
