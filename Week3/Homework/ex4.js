const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://hyfuser:hyfpassword@cluster0.izlhw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

async function seedDatabase() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();

        //Insert New Document.

        const  myCity = { Name : "EL Shohada", CountryCode : "EG", District : "MONOFIA",Population:"700529"};
        // await client.db("world").collection("city").insertOne(myCity);

        // Update Population
        await client.db("world").collection("city").updateOne({Name : "EL Shohada"},{
            $set:{
                Population: "5000000" 
            }
        });

        // Finding By The City Name
        await client.db("world").collection("city").find({Name : "EL Shohada"});

        // Finding By The Country Code
        await client.db("world").collection("city").find({CountryCode:"EG"});

        // Delete The City
        await client.db("world").collection("city").deleteOne({Name : "EL Shohada"});
        

    } catch(error) {
        console.error(error);
    } finally {
        await client.close();
    }
}

seedDatabase();