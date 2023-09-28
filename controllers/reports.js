const pool = require('../connection/connect');

// Create a report
exports.createReport = (req, res) => {
  const { title, content, author } = req.body;

  const sql = 'INSERT INTO reports (title, content, author) VALUES (?, ?, ?)';
  const values = [title, content, author];

  pool.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to create report' });
    }

    res.status(201).json({ message: 'Report created successfully' });
  });
};

// Get all reports
exports.getAllReports = (req, res) => {
  const sql = 'SELECT * FROM reports';

  pool.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to fetch reports' });
    }

    res.status(200).json(results);
  });
};

// Get a specific report by ID
exports.getReportById = (req, res) => {
  const reportId = req.params.id;
  const sql = 'SELECT * FROM reports WHERE id = ?';
  const values = [reportId];

  pool.query(sql, values, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to fetch report' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Report not found' });
    }

    res.status(200).json(results[0]);
  });
};

// Update a report
exports.updateReport = (req, res) => {
  const reportId = req.params.id;
  const { title, content } = req.body;

  const sql = 'UPDATE reports SET title = ?, content = ? WHERE id = ?';
  const values = [title, content, reportId];

  pool.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to update report' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Report not found' });
    }

    res.status(200).json({ message: 'Report updated successfully' });
  });
};

// Delete a report
exports.deleteReport = (req, res) => {
  const reportId = req.params.id;

  const sql = 'DELETE FROM reports WHERE id = ?';
  const values = [reportId];

  pool.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to delete report' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Report not found' });
    }

    res.status(200).json({ message: 'Report deleted successfully' });
  });
};