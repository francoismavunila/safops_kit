const express = require('express');
const router = express.Router();
const gps = require('../controllers/email');

// Create a report
router.get('/', (req,res)=>{
    const toEmail = 'fmbusiness.com@gmail.com';
    const emailSubject = 'Hello!';
    const emailText = 'This is the body of the email.';
    sendEmail(toEmail, emailSubject, emailText);
});





module.exports = router;


