const pool = require('./db_config')
//console.log(pool);

pool.query('SELECT * FROM users', (err, res) => {
  res.rows.forEach(e=>console.log(e))
  pool.end();
});
