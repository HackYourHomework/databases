const MongoClient = require("mongodb").MongoClient;

// Connection URL
const url =
    "mongodb+srv://Tarek-Aljabr:tarek123321@cluster0.y3k9l.mongodb.net/world?retryWrites=true&w=majority";

// Use connect method to connect to the Server
MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
    const db = client.db("world");

    // add to the database
    db.collection("City")
        .insertOne({
            Name: "rukn elden",
            CountryCode: "Ruk",
            District: "New District",
            Population: 4000000,
        })
        .then(function (result) {
            console.log(result);
        });

    // update the document

    db.collection("City")
        .updateOne(
            { Name: "rukn elden" },
            {
                $set: { Population: 120000 },
                $currentDate: { lastModified: true },
            }
        )
        .then(function (result) {
            console.log(result);
        });

    // read the document

    let cityByName = db
        .collection("City")
        .findOne({ Name: "rukn elden" })
        .then((res) => console.log(res));
    let cityByCode = db
        .collection("City")
        .findOne({ CountryCode: "Ruk" })
        .then((res) => console.log(res));

    // delete the document

    db.collection("City")
        .deleteOne({
            ID: 556644,
        })
        .then(function (result) {
            // process result
            console.log(result);
        });
});


