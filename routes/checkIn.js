const express = require('express');
const router = express.Router();
const gps = require('../controllers/gpsCheck');
const validateToken = require('../controllers/validate')
const mysql = require('mysql2');
require('dotenv').config()
const connection = mysql.createConnection(process.env.DATABASE_URL)


// Create a new class
router.post('/',validateToken, (req,res)=>{
    var {latitude,longitude} = req.body
    console.log("latitude",latitude)
    console.log("longitude",longitude)
    var distance = gps(latitude, longitude,5.6443121,-0.1514788)
    const user_id = req.userId;
    var status = 1
    console.log("distance is :"+distance)
    if(distance>30){

        res.status(300).send({message:"out of range"})
    }else{
        const dayTime = Date.now();
        console.log(dayTime);
      
        const query = `INSERT INTO attendance (user_id, dayTime, latitude, longitude, status, event_id) VALUES (?, ?, ?, ?, ?, ?)`;
      
        connection.query(query, [user_id, dayTime, latitude, longitude, status, 0], (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to create attendance record' });
          } else {
            console.log('Attendance record created successfully');
            res.status(200).send({message:"success"})
          }
        });
        
    }

});


module.exports = router;