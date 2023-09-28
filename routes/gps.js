const express = require('express');
const router = express.Router();
const gps = require('../controllers/gpsCheck');

// Create a report
router.get('/', (req,res)=>{
    var distance = gps(5.6444793, -0.1514301,5.6443121,-0.1514788)
    console.log("the distance is "+distance)
});



module.exports = router;