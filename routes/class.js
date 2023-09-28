const express = require('express');
const router = express.Router();
const classController = require('../controllers/class');

// Create a new class
router.post('/', classController.createClass);

// Read all classes
router.get('/', classController.getAllClasses);

// Read a single class by ID
router.get('/:id', classController.getClassById);

// Update a class by ID
router.put('/:id', classController.updateClass);

// Delete a class by ID
router.delete('/:id', classController.deleteClass);

module.exports = router;