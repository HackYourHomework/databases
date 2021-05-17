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

function sendQuery(query) {
  connection.query(query, (error, results) => {
    if (error) {
      throw error;
    }
    console.log(`the reply ${query} is `, results);
  });
}

const rowsForAccount = [
  {
    account_number: 101,
    balance: 10000.0,
  },
  {
    account_number: 102,
    balance: 1500.0,
  },
  {
    account_number: 103,
    balance: 200.0,
  },
  {
    account_number: 104,
    balance: 55000.0,
  },
  {
    account_number: 105,
    balance: 3000.0,
  },
];

const rowsForAccountChanges = [
  {
    account_number: 103,
    amount: 50,
    changed_date: '2020-12-12',
    remark: '',
  },
  {
    account_number: 104,
    amount: -50,
    changed_date: '2020-12-12',
    remark: '',
  },
  {
    account_number: 105,
    amount: 90,
    changed_date: '2020-12-13',
    remark: '',
  },
  {
    account_number: 101,
    amount: -90,
    changed_date: '2020-12-13',
    remark: '',
  },
];

function addRows(arr, table) {
  arr.forEach((row) => {
    const objToArr = Object.entries(row);
    let arrToString = '';
    for (i = 0; i < objToArr.length; i++) {
      let value = objToArr[i][1];
      const key = objToArr[i][0];
      if (typeof value === 'string') {
        value = `"${value}"`;
      }
      if (i === objToArr.length - 1) {
        arrToString = arrToString + `${key}=${value}`;
      } else arrToString = arrToString + `${key}=${value}, `;
    }
    const query = `INSERT INTO ${table} SET ${arrToString}`;
    sendQuery(query);
  });
}

const queryForeignKeyOff = 'SET FOREIGN_KEY_CHECKS=0';
sendQuery(queryForeignKeyOff);
const queryDeleteFromTableAccount = 'DELETE FROM account';
sendQuery(queryDeleteFromTableAccount);
const queryDeleteFromTableAccountChanges = 'DELETE FROM account_changes';
sendQuery(queryDeleteFromTableAccountChanges);
const queryForeignKeyOn = 'SET FOREIGN_KEY_CHECKS=1';
sendQuery(queryForeignKeyOn);

addRows(rowsForAccount, 'account');
addRows(rowsForAccountChanges, 'account_changes');

connection.end((error) => {
  if (error) {
    console.log('error with ending connection');
  } else console.log('connection is ended');
});
