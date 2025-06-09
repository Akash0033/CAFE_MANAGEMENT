// const express = require('express');
// const db = require('../db');
// const router = express.Router();



// // View all bookings
// router.get('/bookings', (req, res) => {
//     const sql = `
//      SELECT b.booking_id, b.barcode_number, b.serving_time, b.booking_status, b.booking_date, 
//        s.student_name, s.student_register_number 
// FROM booking b
// LEFT JOIN student s ON b.student_id = s.student_id
// ORDER BY b.booking_date DESC
//         `;
//     db.query(sql, (err, results) => {
//         if (err) {
//             console.error('Database error:', err);
//             return res.status(500).json({ error: 'Failed to fetch bookings', details: err.message });
//         }
//         res.json(results);
//     });
// });

// // View a single booking by ID
// router.get('/bookings/:id', (req, res) => {
//     const { id } = req.params;
//     const sql = `
//         SELECT b.booking_id, b.barcode_number, b.serving_time, b.booking_status, b.booking_date, 
//                s.student_name, s.student_register_number 
//         FROM booking b
//         LEFT JOIN student s ON b.student_id = s.student_id
//         WHERE b.booking_id = ?
//     `;
//     db.query(sql, [id], (err, results) => {
//         if (err) {
//             console.error('Database error:', err);
//             return res.status(500).json({ error: 'Failed to fetch booking', details: err.message });
//         }
//         if (results.length === 0) {
//             return res.status(404).json({ error: 'Booking not found' });
//         }
//         res.json(results[0]);
//     });
// });

// // Change booking status
// router.put('/bookings/:id/status', (req, res) => {
//     const { id } = req.params;
//     const { status } = req.body;

//     // Validate input
//     if (!status || !['Pending', 'Completed', 'Cancelled'].includes(status)) {
//         return res.status(400).json({ error: 'Invalid status. Allowed values: Pending, Completed, Cancelled' });
//     }

//     const sql = 'UPDATE booking SET booking_status = ? WHERE booking_id = ?';
//     db.query(sql, [status, id], (err, result) => {
//         if (err) {
//             console.error('Database error:', err);
//             return res.status(500).json({ error: 'Failed to update booking status', details: err.message });
//         }
//         if (result.affectedRows === 0) {
//             return res.status(404).json({ error: 'Booking not found' });
//         }
//         res.json({ message: 'Booking status updated successfully', bookingId: id, status });
//     });
// });

// module.exports = router;
const express = require('express');
const db = require('../db');
const router = express.Router();

// View all bookings
router.get('/bookings', (req, res) => {
    const sql = `
      SELECT 
    b.booking_id, 
    b.barcode_number, 
    b.serving_time, 
    b.booking_status, 
    b.booking_date, 
    s.student_name, 
    s.student_register_number
FROM booking b
LEFT JOIN login_master l ON b.student_id = l.login_id
LEFT JOIN student s ON l.user_name = student_register_number
ORDER BY b.booking_date DESC
    `;
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Failed to fetch bookings', details: err.message });
        }
        res.json(results);
    });
});

// View a single booking by ID
router.get('/bookings/:id', (req, res) => {
    const { id } = req.params;
    const sql = `
        SELECT 
            b.booking_id, 
            b.barcode_number, 
            b.serving_time, 
            b.booking_status, 
            b.booking_date, 
            s.student_name, 
            s.student_register_number 
        FROM booking b
        LEFT JOIN student s ON b.student_id = s.student_id
        WHERE b.booking_id = ?
    `;
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Failed to fetch booking', details: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        res.json(results[0]);
    });
});

// Change booking status
router.put('/bookings/:id/status', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    // Validate input
    if (!status || !['Pending', 'Completed', 'Cancelled'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status. Allowed values: Pending, Completed, Cancelled' });
    }

    const sql = 'UPDATE booking SET booking_status = ? WHERE booking_id = ?';
    db.query(sql, [status, id], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Failed to update booking status', details: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        res.json({ message: 'Booking status updated successfully', bookingId: id, status });
    });
});

module.exports = router;