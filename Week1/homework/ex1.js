import { createConnection } from 'mysql';

const connection = createConnection({
  host: `localhost`,
  user: `hyfuser`,
  password: `hyfpassword`,
});

connection.connect((err) => {
  if (err) throw err;
  console.log(`Mysql server is connected.`);
});

const addQuery = (query, msg) => {
  connection.query(query, (err) => {
    if (err) throw err;
    console.log(msg);
  });
};

const createAndUseDB = (dbName) => {
  const deleteDB = `DROP DATABASE IF EXISTS ${dbName}`;
  const createDB = `CREATE DATABASE ${dbName}`;
  const useDB = `USE ${dbName}`;
  const msg = `Database ${dbName} is`;

  addQuery(deleteDB, `${msg} deleted.`);
  addQuery(createDB, `${msg} created.`);
  addQuery(useDB, `${msg} connected.`);
};

const addDataType = (columnsList) => {
  const query = [];

  columnsList.forEach((column) => {
    const isID = column.includes(`no`);
    const isNumber = column.includes(`number`);
    const isDate = column.includes(`time`);

    if (isID) query.push(`${column} INT AUTO_INCREMENT PRIMARY KEY`);
    else if (isNumber) query.push(`${column} INT`);
    else if (isDate) query.push(`${column} DATETIME`);
    else query.push(`${column} VARCHAR(50)`);
  });

  return query.toString();
};

const createTable = (table) => {
  const { name, columnsList } = table;
  let query = addDataType(columnsList);
  query = `CREATE TABLE ${name} (${query})`;

  addQuery(query, `\nTable ${name} is created.`);
};

const insertRow = (table) => {
  const { name, columnsList, valuesList } = table;
  columnsList.shift();

  valuesList.forEach((value) => {
    const query = `INSERT INTO ${name} (${columnsList}) VALUES (${value})`;
    addQuery(query, `Row with values (${value}) is inserted.`);
  });
};

const addTablesToDB = (...tables) => {
  tables.forEach((table) => {
    createTable(table);
    insertRow(table);
  });
};

const inviteeTable = {
  name: `Invitee`,
  columnsList: [`invitee_no`, `invitee_name`, `invited_by`],
  valuesList: [
    [`'John'`, `'Mary'`],
    [`'Bob'`, `'Sofia'`],
    [`'Johnny'`, `'Will'`],
    [`'Sara'`, `'George'`],
    [`'Lisa'`, `'Kyle'`],
  ],
};

const roomTable = {
  name: `Room`,
  columnsList: [`room_no`, `room_name`, `floor_number`],
  valuesList: [
    [`'Conference'`, 5],
    [`'Monitor'`, 4],
    [`'Projector'`, 3],
    [`'Boardroom'`, 2],
    [`'Hall'`, 1],
  ],
};

const meetingTable = {
  name: `Meeting`,
  columnsList: [
    `meeting_no `,
    `meeting_title`,
    `starting_time`,
    `ending_time`,
    `room_number`,
  ],
  valuesList: [
    [
      `'Wasabi Eating Contest'`,
      `'2020-10-01 10:00:00'`,
      `'2020-10-01 10:30:00'`,
      5,
    ],
    [
      `'Water Rodeo Rodeo'`,
      `'2020-10-02 10:00:00'`,
      `'2020-10-02 10:30:00'`,
      4,
    ],
    [`'Watts Happening'`, `'2020-10-03 10:00:00'`, `'2020-10-03 10:30:00'`, 3],
    [
      `'Weepers for Progress'`,
      `'2020-10-04 10:00:00'`,
      `'2020-10-04 10:30:00'`,
      2,
    ],
    [
      `'Welcome Young Yankees'`,
      `'2020-10-05 10:00:00'`,
      `'2020-10-05 10:30:00'`,
      1,
    ],
  ],
};

createAndUseDB(`meetup`);

addTablesToDB(inviteeTable, roomTable, meetingTable);

connection.end();
