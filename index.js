const express = require('express');
const routes = require('./routes/users');
const report = require('./routes/report');
const classRoute = require('./routes/class')
const attendance = require('./routes/attendance')
const gps = require('./routes/gps')
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config()


const app = express();
const port = process.env.PORT || 3000;

const connection = mysql.createConnection(process.env.DATABASE_URL)
console.log('Connected to PlanetScale!')

// Middleware for parsing JSON requests
app.use(express.json());

// Routes
app.use(cors());
app.use('/user', routes); // Mount the routes
app.use('/report', report);
app.use('/class', classRoute);
app.use('/attendance', attendance);
app.use('/gps', gps);

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
  
module.exports = app;
