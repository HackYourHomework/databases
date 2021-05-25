getPopulation(`country`, `Netherlands`, `NLD OR 1=1`, (err, result) => {
  if (err) throw err;
  console.log(result);
});

const correctGetPopulation = (name, code) => {
  connection.query(
    `
    SELECT Population
    FROM country
    WHERE Name = ? AND code = ?`,
    [name, code],
    function (err, result) {
      if (err) throw err;
      console.log(`Data: `, result);
    }
  );
};
