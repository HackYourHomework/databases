const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Alphagama6',
    database:"meetup"
  });
  con.connect(function(err) {
    if (err) throw err;
    con.query("CREATE DATABASE meetup", function (err, result) {
        if (err) throw err;
      });

    const sql = "CREATE TABLE Invitee (invitee_no INT(11), invitee_name VARCHAR(255),invited_by VARCHAR(255))";

  con.query(sql,(err,result)=>{
      if(err) throw err
  })
  const sql2 = "CREATE TABLE Room (room_no INT(11) PRIMARY KEY, room_name VARCHAR(255),floor_number INT(11))";

  con.query(sql2,(err,result)=>{
      if(err) throw err

  })
  const sql4 ="ALTER TABLE Room ADD PRIMARY KEY(room_no);"
  con.query(sql4,(err,result)=>{
    if(err) throw err
    console.log(result)
})
  const sql3 = "CREATE TABLE Meeting (meeting_no INT(11), meeting_title VARCHAR(255),starting_time TIME ,"
   "ending_time TIME, room_no INT(11),  FOREIGN KEY (room_no) REFERENCES Room(room_no))";

  con.query(sql3,(err,result)=>{
      if(err) throw err
      console.log(result)
  })
       
   const sqlInsertTableInvitee = "INSERT INTO Invitee (invitee_no,invitee_name,invited_by)"+
   " VALUES (1,'osama','Eman'), (2,'mohamed','Rob'),(3,'mahmoud','olga'),(4,'ismael','jack'),(5,'ahmed','john') " 
   con.query(sqlInsertTableInvitee, function (err, result) {
    if (err) throw err;
  });

  const sqlInsertTableRoom = "INSERT INTO Room (room_no,room_name,floor_number)"+
  "VALUES (1,'osama',1), (2,'mohamed',2),(3,'mahmoud',3),(4,'ismael',4),(5,'ahmed',5) " 
  con.query(sqlInsertTableRoom, function (err, result) {
   if (err) throw err;
 });

 const sqlInsertTableMeeting = "INSERT INTO Meeting (meeting_no,meeting_title,starting_time,ending_time,room_no)"+
 "VALUES (1,'chat','05:02','06:00',1), (2,'eating','06:02','07:00',2),(3,'drink','07:02','08:00',3),"+
 "(4,'standup','09:02','10:00',4),(5,'business','11:15','12:00',5) " ;
  con.query(sqlInsertTableMeeting, function (err, result) {
   if (err) throw err;
 });

  });

  
    

  