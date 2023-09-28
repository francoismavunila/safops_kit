const mysql = require('mysql2');
require('dotenv').config()

// Create a MySQL connection pool
const pool = mysql.createPool(process.env.DATABASE_URL);

// Export the pool to be used in the controller
module.exports = pool;