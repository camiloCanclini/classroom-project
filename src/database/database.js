const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'classroom',
  password: 'admin',
  port: 5432,
});

pool.query('SELECT * FROM users', (err, res) => {
  //console.log(err, res);
  res.rows.forEach(e=>console.log(e))
  pool.end();
});
