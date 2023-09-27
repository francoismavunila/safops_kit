const express = require('express');
const router = express.Router();
const eitController = require('../controllers/eitController');
const authenticate = require('../controllers/authentication')

// Define routes for EITs
router.get('/eits', eitController.getAllEITs);
router.post('/eits', eitController.createEIT);

router.post('/signin',(req,res)=>{
    var {email,password} = req.body
    authenticate(email,password,(error, token)=>{
        console.log("called")
        if(error){
            res.status(400).send(error);
        }else{
            res.status(200).send({message:"success",token:token})
        }
    })
})

module.exports = router;