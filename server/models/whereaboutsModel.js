const { Pool } = require('pg');

const pool = new Pool(); //pg library will retrieve the variables from the .env file

module.exports = {
  query: (text, params) => pool.query(text, params)
}