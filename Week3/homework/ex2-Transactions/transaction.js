const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'week3',
});
connection.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log('Connected');
  }
});

connection.beginTransaction(function (err) {
  if (err) {
    throw err;
  }
  connection.query(
    `UPDATE account 
    SET balance=balance-1000 
    WHERE account_number=101`,
    function (error, results) {
      if (error) {
        return connection.rollback(function () {
          console.log('UPDATE1 failed');
          throw error;
        });
      }
      const fullDate = new Date();
      const date = `${fullDate.getFullYear()}-${
        fullDate.getMonth() + 1
      }-${fullDate.getDate()} ${fullDate.getHours()}:${fullDate.getMinutes()}:${fullDate.getSeconds()}`;

      console.log(`the reply UPDATE1 is `, results);

      const log1 = `INSERT INTO account_changes 
      SET account_number=101, amount=-1000, changed_date="${date}"`;
      connection.query(log1, function (error, results) {
        if (error) {
          return connection.rollback(function () {
            throw error;
          });
        }

        connection.query(
          `UPDATE account 
          SET balance=balance+1000 
          WHERE account_number=102`,
          function (error, results) {
            if (error) {
              return connection.rollback(function () {
                throw error;
              });
            }
            console.log(`the reply UPDATE2 is `, results);
            const log2 = `INSERT INTO account_changes 
            SET account_number=102, amount=1000, changed_date="${date}"`;
            connection.query(log2, function (error, results) {
              if (error) {
                return connection.rollback(function () {
                  throw error;
                });
              }
              connection.commit(function (err) {
                if (err) {
                  return connection.rollback(function () {
                    throw err;
                  });
                }
                console.log('success!');
                connection.end((error) => {
                  if (error) {
                    console.log('error with ending connection');
                  } else console.log('connection is ended');
                });
              });
            });
          },
        );
      });
    },
  );
});
