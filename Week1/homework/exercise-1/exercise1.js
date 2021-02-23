const mysql = require('mysql');

// Create connection
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'hyfuser',
    password : 'hyfpassword'
});

// Connect
connection.connect(err => {
    if (err) throw err;
    console.log("MySQL connected..");
});

// Delete existing database
connection.query(("DROP DATABASE IF EXISTS meetup"), (error, results, fields) => {
    if (error) throw error;
    console.log("Database deleted.");
});

// Create new database
connection.query(("CREATE DATABASE meetup"), (error, results, fields) => {
    if (error) throw error;
    console.log("Database created.");
});

// Use new database
connection.query(("USE meetup"), (error, results, fields) => {
    if (error) throw error;
});

// Tables list
const tables = [
    {
        tableName : "Invitee",
        tableQuery : "CREATE TABLE Invitee (invitee_no INT PRIMARY KEY NOT NULL AUTO_INCREMENT, invitee_name VARCHAR(75), invited_by VARCHAR(75))"
    },
    {
        tableName : "Room",
        tableQuery : "CREATE TABLE Room (room_no INT PRIMARY KEY NOT NULL AUTO_INCREMENT, room_name VARCHAR(50), floor_number INT)"
    },
    {
        tableName : "Meeting",
        tableQuery : "CREATE TABLE Meeting (meeting_no INT PRIMARY KEY NOT NULL AUTO_INCREMENT, meeting_title VARCHAR(255), starting_time DATETIME, ending_time DATETIME, room_no INT)"
    }
];

// Create tables
tables.forEach(table => {
    connection.query(table.tableQuery, (error, results, fields) => {
        if (error) throw error;
        console.log(`Table of ${table.tableName} created.`);
    });
});

// Details list for inserting values (seperated for each table)
const insertDetails = [
    {
        tableName : "Invitee",
        columnsToInsert : "(invitee_name, invited_by)",
        valuesToInsert : [
            "('mark', 'john')", 
            "('ali', 'sara')", 
            "('karl', 'james')", 
            "('marry', 'hassan')", 
            "('saul', 'pierre')"
        ]
    },
    {
        tableName : "Room",
        columnsToInsert : "(room_name, floor_number)",
        valuesToInsert : [
            "('room1', 1)", 
            "('room2', 3)", 
            "('room3', 6)", 
            "('room4', 7)", 
            "('room5', 11)"
        ]
    },
    {
        tableName : "Meeting",
        columnsToInsert : "(meeting_title, starting_time, ending_time, room_no)",
        valuesToInsert : [
            "('job-meeting', '2021-02-23 11:00:00', '2021-02-23 13:00:00', 1)",
            "('dinner-meeting', '2021-02-23 18:00:00', '2021-02-23 20:00:00', 2)",
            "('house-meeting', '2021-02-24 13:30:00', '2021-02-24 14:30:00', 3)",
            "('business-meeting', '2021-02-25 14:00:00', '2021-02-25 16:00:00', 4)", 
            "('party-meeting', '2021-02-23 17:20:00', '2021-02-23 19:20:00', 5)"
        ]
    }
];

// Insert values
insertDetails.forEach(insertDetail => {
    connection.query(`INSERT INTO ${insertDetail.tableName}${insertDetail.columnsToInsert} VALUES${insertDetail.valuesToInsert}`,
    (error, results, fields) => {
        if (error) throw error;
        console.log(`Table ${insertDetail.tableName} instances inserted.`);
    });
});

connection.end();