const mysql = require('mysql2');
require('dotenv').config()
const gps = require('../controllers/gpsCheck');
const connection = mysql.createConnection(process.env.DATABASE_URL)
// Create a MySQL connection
// Function to get the location ID by event ID
const getLocationIdByEventId = (eventId) => {
    const locationQuery = 'SELECT location_id FROM classes WHERE event_id = ?';
  
    console.log("event id is " + eventId);
  
    return new Promise((resolve, reject) => {
      connection.query(locationQuery, eventId, (err, results) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          console.log("res is " + results[0].location_id);
          resolve(results[0].location_id);
        }
      });
    });
  };

// Create a new attendance record
exports.createAttendance = (req, res) => {
  const { user_id, latitude, longitude, status, event_id } = req.body;


  getLocationIdByEventId(event_id)
  .then((locationId) => {
    console.log('Location ID:', locationId);

    console.log("the loca id is :"+locationId)

    if(locationId == -1){
      res.status(500).send("server error")
    }
    
  // SQL query to retrieve latitude and longitude by location_id
  const sqlQuery = `
  SELECT latitude, longitude
  FROM location
  WHERE location_id = ?
  `;
  
  // Execute the query with the location ID as a parameter
  connection.query(sqlQuery, [locationId], (error, results) => {
  if (error) {
    console.error('Error executing query:', error);
  } else {
    if (results.length > 0) {
      const location_latitude = results[0].latitude;
      const location_longitude = results[0].longitude;
      console.log('Latitude:', location_latitude);
      console.log('Longitude:', location_longitude);
      // Process latitude and longitude as needed
      var within = gps(latitude, longitude,location_latitude,location_longitude)
      console.log("the distance is : ",within)
  
      if(within>20){
        
        res.status(300).json({message:"you are out of bound"})
      }else{
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
      }

    } else {
      console.log('Location not found for the given location ID');
      res.status(500).send("server error")
    }
  }
  });
  

    // Process the location ID as needed
  })
  .catch((error) => {
    console.error('Error:', error);
    res.status(500).send("server error")
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


exports.getAttendanceByFilters = (req, res) => {
    const { user_id, instructure_id, event_id, date, status } = req.query;
  
    let query = `SELECT attendance.*, users.user_name AS user_name FROM attendance INNER JOIN users ON attendance.user_id = users.user_id WHERE 1`;
  
    // Add filters based on provided parameters
    const params = [];
  
    if (user_id) {
      query += ` AND attendance.user_id = ?`;
      params.push(user_id);
    }
  
    if (instructure_id) {
      query += ` AND attendance.instructure_id = ?`;
      params.push(instructure_id);
    }
  
    if (event_id) {
      query += ` AND attendance.event_id = ?`;
      params.push(event_id);
    }
  
    if (date) {
      // Assuming date is stored as UNIX timestamp in the database
      const startOfDay = new Date(date).setHours(0, 0, 0, 0) / 1000;
      const endOfDay = new Date(date).setHours(23, 59, 59, 999) / 1000;
  
      query += ` AND attendance.dayTime >= ? AND attendance.dayTime <= ?`;
      params.push(startOfDay, endOfDay);
    }
  
    if (status) {
      query += ` AND attendance.status = ?`;
      params.push(status);
    }
  
    connection.query(query, params, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch attendance records' });
      } else {
        res.status(200).json(results);
      }
    });
  };