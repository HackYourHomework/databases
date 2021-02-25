const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword',
  port: 3306
});

connection.connect();

//drop DB meetup 
connection.query("DROP DATABASE IF NOT EXISTS meetup", (error, results, fields) => {
    if (error) {
         throw error;
     }
     console.log("DB dropped");
});
//create DB meetup
connection.query("CREATE DATABASE IF NOT EXISTS meetup", (error, results, fields) => {
    if (error) {
         throw error;
     }
     console.log("database meetup created");
});
//connect/use DB
connection.query(("USE meetup"), (error, results, fields) => {
    if (error) throw error;
});
 

const createTableInvitee = "create table Invitee (invitee_no int, invitee_name varchar(20), invited_by varchar(20), PRIMARY kEY(invitee_no))";
const createTableRoom = "create table Room (room_no int, room_name varchar(20), floor_number int, PRIMARY kEY(room_no))";
const createTableMeeting = "create table Meeting (meeting_no int, meeting_title varchar(10), starting_time datetime, ending_time datetime, room_no int, PRIMARY kEY(meeting_no))";

function createTable(createTableQuery){
    connection.query(createTableQuery, function (error, results, fields) {
        if (error) {
            throw error;
        }
        console.log("table is created");
    });
}
createTable(createTableInvitee);
createTable(createTableRoom);
createTable(createTableMeeting);

//insert data
const insertTableInvitee = [
    "INSERT INTO Invitee  values (20, 'mohammed', 'manal')",
    "INSERT INTO Invitee  values (32, 'hashim', 'ziad')",
    "INSERT INTO Invitee  values (12, 'tom', 'david')",
    "INSERT INTO Invitee  values (20, 'khaled', 'manal')",
    "INSERT INTO Invitee  values (40, 'sami', 'ziad')"
    ];
const insertTableRoom = [
    "INSERT INTO Room values (12, 'A', 0)",
    "INSERT INTO Room values (20, 'B', 1)",
    "INSERT INTO Room values (17, 'C', 2)",
    "INSERT INTO Room values (33, 'D', 3)",
    "INSERT INTO Room values (11, 'E', 4)"
    ];
const insertTableMeeting = [
    "INSERT INTO Meeting values (20, 'Finance', '2020-02-20 12:00:00', '2020-02-20 02:00:00', 3)",
    "INSERT INTO Meeting values (10, 'Admin', '2020-01-22 11:00:00', '2020-01-22 01:00:00', 4)",
    "INSERT INTO Meeting values (12, 'HR', '2020-03-22 15:00:00', '2020-03-22 18:00:00', 1)",
    "INSERT INTO Meeting values (13, 'IT', '2020-02-14 11:00:00', '2020-02-14 13:00:00', 5)",
    "INSERT INTO Meeting values (80, 'Logistics', '2020-02-24 13:00:00', '2020-02-24 15:00:00', 1)"
    ];

function insertData(arrayOfQueries){
    arrayOfQueries.forEach(element => {
        connection.query(element, function (error, results, fields) {
            if (error) {
                throw error;
            }
            console.log("Data inserted");
        });
    });
};
insertData(insertTableInvitee);
insertData(insertTableRoom);
insertData(insertTableMeeting);
connection.end();