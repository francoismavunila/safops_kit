const express = require('express');
const router = express.Router();
const tableController = require('../controllers/attendance');
const validateToken = require('../controllers/validate')

// Create a new attendance record
router.get('/filter', tableController.getAttendanceByFilters);
router.post('/',validateToken, tableController.createAttendance);

// Read all attendance records
router.get('/', tableController.getAllAttendance);

// Read a single attendance record by ID
router.get('/:id', tableController.getAttendanceById);

// filter



// Update an attendance record by ID
router.put('/:id', tableController.updateAttendance);

// Delete an attendance record by ID
router.delete('/:id', tableController.deleteAttendance);

module.exports = router;