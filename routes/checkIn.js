const express = require('express');
const router = express.Router();
const gps = require('../controllers/gpsCheck');


// Create a new class
router.post('/', (req,res)=>{
    var {latitude,longitude} = req.body
    var distance = gps(latitude, longitude,5.6443121,-0.1514788)
    if(distance>10){
        res.status(300).send("out of range")
    }else{
        res.status(200).send("sucess")
    }

});


module.exports = router;