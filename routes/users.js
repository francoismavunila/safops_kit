const express = require('express');
const router = express.Router();
const eitController = require('../controllers/eitController');
const authenticate = require('../controllers/authentication')
const validateToken = require('../controllers/validate')

function checkEmailDomain(email) {
    const domain = "@meltwater.org";
  
    // Check if the email ends with the specified domain
    const isDomainMatch = email.endsWith(domain);
    console.log("domain match says "+isDomainMatch)
  
    return isDomainMatch;
  }
// Define routes for EITs
router.get('/eits', eitController.getAllEITs);
router.post('/eits', eitController.createEIT);

router.post('/signin',(req,res)=>{
    
    var {email,password} = req.body
    if(checkEmailDomain(email)){
        authenticate(email,password,(error, response)=>{
            console.log("called")
            if(error){
                res.status(400).send({"error":error});
            }else{
                console.log(response)
                res.status(200).send(response)
            }
        })
    }else{
        res.status(401).send({message:"email not from our domain"})
    }

})

router.get('/protected', validateToken, (req, res) => {
    const userId = req.userId;
    console.log("user id found")
    console.log(userId) 
    res.status(200).send("done");   
  });

module.exports = router;