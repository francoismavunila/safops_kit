const mysql = require('mysql2');
require('dotenv').config()
console.log(process.env.DATABASE_URL)
const connection = mysql.createConnection(process.env.DATABASE_URL)

// DAO functions
const getAllEITs = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM users', (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

const createEIT = (firstName, lastName, email,password) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO users (user_name, user_surname, user_email,user_role_id,user_password) VALUES (?,?,?,?,?)';
    const values = [firstName, lastName, email,1,password];

    connection.query(sql, values, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = {
  getAllEITs,
  createEIT,
};