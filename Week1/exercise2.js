const fs = require('fs');
const mysql = require('mysql')

// Read the SQL file
const dataSql = fs.readFileSync('./world.sql').toString();

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Alphagama6",
    database: "world",
    multipleStatements: true
  });


con.connect(function(err) {
    if (err) throw err;
    con.query(dataSql, (err, result) =>{
      if (err) throw err;
      console.log(result);
    });
    con.query("SELECT Name FROM country WHERE Population > 8000000",(err,result)=>{
        if(err) throw err
        console.log(result)
    })
    con.query("SELECT Name FROM country WHERE Name LIKE '%land%'",(err,result)=>{
        if(err) throw err
        console.log(result)
    })
    con.query("SELECT Name FROM city WHERE Population BETWEEN '500,000' AND '1000000' ",(err,result)=>{
        if(err) throw err
        console.log(result)
    })
    con.query("SELECT Name FROM country WHERE continent= 'Europe'",(err,result)=>{
        if(err) throw err
        console.log(result)
    })
    con.query("SELECT Name FROM country ORDER BY SurfaceArea DESC ",(err,result)=>{
        if(err) throw err 
        console.log(result)
    })
    con.query("SELECt city.Name FROM city INNER JOIN country on city.CountryCode=country.Code "+
    "AND country.Name='Netherlands'",(err,result)=>{
        if(err) throw err
        console.log(result)
    })
    con.query("SELECT Population FROM city WHERE Name='Rotterdam'",(err,result)=>{
        if(err) throw err
        console.log(result)
    })
    con.query("SELECT Name FROM country ORDER BY SurfaceArea DESC LIMIT 10 ",(err,result)=>{
        if(err) throw err 
        console.log(result)
    })
    con.query("SELECT Name FROM city ORDER BY Population DESC LIMIT 10 ",(err,result)=>{
        if(err) throw err 
        console.log(result)
    })
    con.query("SELECT SUM(Population) FROM Country",(err,result)=>{
        if(err) throw err
        console.log(result)
    })

  });


