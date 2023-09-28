const mysql = require('mysql2');
require('dotenv').config()
const connection = mysql.createConnection(process.env.DATABASE_URL)
// Create a MySQL connection


// Create a new attendance record
exports.createAttendance = (req, res) => {
  const { user_id, latitude, longitude, status, event_id } = req.body;
  const dayTime = Date.now();
  console.log(dayTime);

  const query = `INSERT INTO attendance (user_id, dayTime, latitude, longitude, status, event_id) VALUES (?, ?, ?, ?, ?, ?)`;

  connection.query(query, [user_id, dayTime, latitude, longitude, status, event_id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to create attendance record' });
    } else {
      res.status(201).json({ message: 'Attendance record created successfully' });
    }
  });
};

// Read all attendance records
exports.getAllAttendance = (req, res) => {
  const query = `SELECT * FROM attendance`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch attendance records' });
    } else {
      res.status(200).json(results);
    }
  });
};

// Read a single attendance record by ID
exports.getAttendanceById = (req, res) => {
  const { id } = req.params;

  const query = `SELECT * FROM attendance WHERE attendance_id = ?`;

  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch attendance record' });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Attendance record not found' });
    } else {
      res.status(200).json(results[0]);
    }
  });
};

// Update an attendance record by ID
exports.updateAttendance = (req, res) => {
  const { id } = req.params;
  const { user_id, dayTime, latitude, longitude, status, event_id } = req.body;

  const query = `UPDATE attendance SET user_id = ?, dayTime = ?, latitude = ?, longitude = ?, status = ?, event_id = ? WHERE attendance_id = ?`;

  connection.query(query, [user_id, dayTime, latitude, longitude, status, event_id, id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to update attendance record' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Attendance record not found' });
    } else {
      res.status(200).json({ message: 'Attendance record updated successfully' });
    }
  });
};

// Delete an attendance record by ID
exports.deleteAttendance = (req, res) => {
  const { id } = req.params;

  const query = `DELETE FROM attendance WHERE attendance_id = ?`;

  connection.query(query, [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete attendance record' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Attendance record not found' });
    } else {
      res.status(200).json({ message: 'Attendance record deleted successfully' });
    }
  });
};