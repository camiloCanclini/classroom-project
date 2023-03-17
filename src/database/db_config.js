const dotenv = require('dotenv');
const { Pool } = require('pg');
dotenv.config();
const enviroment = process.env.NODE_ENV;

const config = {
  user: process.env.NODE_ENV === 'production' ? process.env.DB_USER_DEP : process.env.DB_USER_DEV,
  host: process.env.NODE_ENV === 'production' ? process.env.DB_HOST_DEP : process.env.DB_HOST_DEV,
  database: process.env.NODE_ENV === 'production' ? process.env.DB_DATABASE_DEP : process.env.DB_DATABASE_DEV,
  password: process.env.NODE_ENV === 'production' ? process.env.DB_PASS_DEP : process.env.DB_PASS_DEV,
  port: process.env.NODE_ENV === 'production' ? process.env.DB_PORT_DEP : process.env.DB_PORT_DEV
}

try {
  const pool = new Pool(config);
  console.log('Connection established successfully');
  module.exports = pool;
} catch (err) {
  console.log('Error while establishing connection to database');
}

