const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reports');

// Create a report
router.post('/reports', reportController.createReport);

// Get all reports
router.get('/reports', reportController.getAllReports);

// Get a specific report
router.get('/reports/:id', reportController.getReportById);

// Update a report
router.put('/reports/:id', reportController.updateReport);

// Delete a report
router.delete('/reports/:id', reportController.deleteReport);

module.exports = router;