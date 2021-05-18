import { createConnection } from 'mysql';

const connectionConfig = {
  host: `localhost`,
  user: `hyfuser`,
  password: `hyfpassword`,
  database: `world`,
};

function getPopulation(Country, name, code, cb) {
  const conn = createConnection(connectionConfig);

  conn.query(
    `SELECT Population FROM ${Country} WHERE Name = '${name}' and code = '${code}'`,
    function (err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error('Not found'));
      cb(null, result[0].name);
    }
  );
}

getPopulation(`country`, `Netherlands`, `NLD OR 1=1`, (err, result) => {
  if (err) throw err;

  console.log(result);
});

const correctGetPopulation = (country, name, code, callback) => {
  const connection = createConnection(connectionConfig);

  connection.query(
    `SELECT Population
    FROM ${country}
    WHERE Name = ? and code = ?`,
    [name, code],
    (err, result) => {
      if (err) callback(err);
      if (!result.length) callback(new Error(`Not found`));

      callback(null, result[0].name);
    }
  );
};
