const mysql = require('mysql2');
const jwt = require('jsonwebtoken');

require('dotenv').config()
const connection = mysql.createConnection(process.env.DATABASE_URL)
// Function to authenticate user and generate JWT token
const authenticateUser = (email, password, callback) => {
  // Prepare the SQL query
  const query = 'SELECT * FROM users WHERE user_email = ?';

  // Execute the query
  connection.query(query, [email], (error, results) => {
    if (error) {
      callback(error);
    } else {
      if (results.length === 0) {
        // User not found
        const authenticationError = {
            statusCode: 401,
            message: 'Invalid email or password',
          };
        console.log("user not found")
        callback(authenticationError, null);
      } else {
        const user = results[0];
        if (user.user_password !== password) {
          // Incorrect password
          console.log("wrong password")
          const authenticationError = {
            statusCode: 401,
            message: 'Invalid email or password',
          };
          console.log("the error is"+authenticationError)
          callback(authenticationError,null);
        } else {
          // User authenticated successfully
          const token = jwt.sign({ user_id: user.user_id }, 'your_secret_key', { expiresIn: '24h' });
          console.log("user found");
          var response ={
            "token":token,
            "userName": user.user_name,
            "userSurname":user.user_surname,
            "userRole":user.user_role_id,
            "userEmail":user.user_email,
            "message":"success"
          }
          callback(null, response);
        }
      }
    }
  });
};

module.exports = authenticateUser;