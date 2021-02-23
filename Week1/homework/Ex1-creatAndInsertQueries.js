// First I Created The Database (meetup) Using Mysql Command Line Client! Ex1 - 1.Create a database called meetup
// This Is The SQL Query : CREATE DATABASE meetup;


const mysql = require('mysql');

// Make Connection To meetup DB Using MySQL And hyfuser Login Credentials!
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword',
  database : 'meetup',
  port : 3306
});

connection.connect();

// Drop Database meetup! 
// we don't have to check if the db is exists,
// because I know it is exists since I create it using CLI client or workbench
// And I didn't drop the tables(It will dropped for sure ), cause I drop the DB (the container of the tables)
const drop_db_meetup = "DROP DATABASE IF EXISTS meetup ";
connection.query(drop_db_meetup , function (error, results, fields) {
    if (error) {
        throw error;
    }
    console.log(`Database meetup Dropped!`);
});


// Create Database meetup!
//since we drop the db, I don't have to check if it's exists! 
const create_db_meetup = "CREATE DATABASE meetup";
connection.query(create_db_meetup, function (error, results, fields) {
    if (error) {
        throw error;
    }
    console.log(`Database meetup Created!`);
});

// Use meetup DB
connection.query(("USE meetup"), (error, results, fields) => {
    if (error) throw error;
});


// Write Query To Create Each Table With Table Name, Entity Names And Entity Data Type!
const create_query_invitee = "create table Invitee (invitee_no int, invitee_name varchar(50), invited_by varchar(50))";
const create_query_room = "create table Room (room_no int, room_name varchar(25), floor_number int)";
const create_query_meeting = "create table Meeting (meeting_no int, meeting_title varchar(25), starting_time datetime, ending_time datetime, room_no int)";



// Write One Function To Create The Tables Depends on Create Query! 
function createTable(create_query_table,tableName){
    connection.query(create_query_table, function (error, results, fields) {
        if (error) {
            throw error;
        }
        console.log(`Table ${tableName} Created!`);
    });
}


// Create Tables 
createTable(create_query_invitee,"Invitee");
createTable(create_query_room,"Room");
createTable(create_query_meeting,"Meeting");

// Write Query To Insert 5 Records To Each Table With Table Name And Values For Each Cell!
// There Are Many Way To Write A Insert Query, I Choose The Readable One!
const insert_query_invitee = [
    "insert into Invitee values (10, 'Mayar', 'Khaled')",
    "insert into Invitee values (11, 'Rami', 'Khaled')",
    "insert into Invitee values (12, 'Lola', 'Khaled')",
    "insert into Invitee values (13, 'Lylas', 'Khaled')",
    "insert into Invitee values (14, 'Roula', 'Khaled')"
    ];
const insert_query_room = [
    "insert into Room values (33, 'Room1', 1)",
    "insert into Room values (36, 'Room2', 1)",
    "insert into Room values (11, 'Room4', 2)",
    "insert into Room values (73, 'Room5', 2)",
    "insert into Room values (25, 'Room25', 25)"
    ];
const insert_query_meeting = [
    "insert into Meeting values (50, 'Title1', '2019-01-01 15:00:00', '2019-01-01 17:00:00', 1)",
    "insert into Meeting values (60, 'Title1', '2020-01-05 09:00:00', '2020-01-05 11:00:00', 2)",
    "insert into Meeting values (70, 'Title1', '2020-11-04 13:00:00', '2020-11-04 14:30:00', 3)",
    "insert into Meeting values (80, 'Title1', '2018-04-07 16:45:00', '2018-04-07 18:20:00', 4)",
    "insert into Meeting values (90, 'Title1', '2017-08-22 17:10:00', '2019-08-22 19:20:00', 5)"
    ];



// Write One Function To Insert The Values Depends on Insert Query!  
function insertRecords(insert_query_table,tableName){
    insert_query_table.forEach(row => {
        connection.query(row, function (error, results, fields) {
            if (error) {
                throw error;
            }
            console.log(`A New Records Add To ${tableName}!`);
        });  
    });
}

// Insert Values 
insertRecords(insert_query_invitee,"Invitee");
insertRecords(insert_query_room,"Room");
insertRecords(insert_query_meeting,"Meeting");


connection.end();







