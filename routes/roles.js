const express = require('express');
const router = express.Router();
const eitController = require('../controllers/eitController');

// Define routes for EITs
router.get('/eits', eitController.getAllEITs);
router.post('/eits', eitController.createEIT);

module.exports = router;