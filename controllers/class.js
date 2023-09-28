const mysql = require('mysql2');
require('dotenv').config()
const connection = mysql.createConnection(process.env.DATABASE_URL)

// Create a new class
exports.createClass = (req, res) => {
  const { eventName, startDateTime, endDateTime, location_id, instructor_id } = req.body;

  const query = `INSERT INTO classes (eventName, startDateTime, endDateTime, location_id, instructor_id) VALUES (?, ?, ?, ?, ?)`;

  connection.query(query, [eventName, startDateTime, endDateTime, location_id, instructor_id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to create class' });
    } else {
      res.status(201).json({ message: 'Class created successfully' });
    }
  });
};

// Read all classes
exports.getAllClasses = (req, res) => {
  const query = `SELECT * FROM classes`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch classes' });
    } else {
      res.status(200).json({message:"done",data:results});
    }
  });
};

// Read a single class by ID
exports.getClassById = (req, res) => {
  const { id } = req.params;

  const query = `SELECT * FROM classes WHERE event_id = ?`;

  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch class' });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Class not found' });
    } else {
      res.status(200).json(results[0]);
    }
  });
};

// Update a class by ID
exports.updateClass = (req, res) => {
  const { id } = req.params;
  const { eventName, startDateTime, endDateTime, location_id, instructor_id } = req.body;

  const query = `UPDATE classes SET eventName = ?, startDateTime = ?, endDateTime = ?, location_id = ?, instructor_id = ? WHERE event_id = ?`;

  connection.query(query, [eventName, startDateTime, endDateTime, location_id, instructor_id, id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to update class' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Class not found' });
    } else {
      res.status(200).json({ message: 'Class updated successfully' });
    }
  });
};

// Delete a class by ID
exports.deleteClass = (req, res) => {
  const { id } = req.params;

  const query = `DELETE FROM classes WHERE event_id = ?`;

  connection.query(query, [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete class' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Class not found' });
    } else {
      res.status(200).json({ message: 'Class deleted successfully' });
    }
  });
};