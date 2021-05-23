const MongoClient = require('mongodb').MongoClient;

const url = "mongodb://localhost:27017/";

const client = new MongoClient(url, {useNewUrlParser: true,useUnifiedTopology: true});

client.connect((err) => {
    if (err) throw err;
    console.log("connected");
});

const homeCity = {
 Name: "Nazareth",
 CountryCode: "PSE",
 District: "Nazareth",
 Population: 77445,
 };

async function seedDatabase() {
 try {
    const db = client.db("world").collection("city");

    await db.insertOne(homeCity);

    await db.updateOne({Name: "Nazareth"},{
     $set:{
            Population: 80000, 
        }
    });

    await db.find({Name:"Nazareth"});

    await db.find({CountryCode:"PSE"});

    await db.deleteOne({Name:"Nazareth"});

   }

 catch(err) {
    console.log(err);
   }
    
    client.close(); 
}

seedDatabase()