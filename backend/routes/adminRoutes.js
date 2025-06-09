const express = require('express');
const db = require('../db');
const router = express.Router();

// Get dashboard counts (categories, items, students, staff, orders, revenue)
router.get('/admin/counts', (req, res) => {
    const queries = {
        categories: 'SELECT COUNT(*) as count FROM category ',
        items: 'SELECT COUNT(*) as count FROM items ',
        students: 'SELECT COUNT(*) as count FROM student ',
        staff: 'SELECT COUNT(*) as count FROM staff ',
        totalOrders: 'SELECT COUNT(*) as count FROM booking',
        pendingOrders: 'SELECT COUNT(*) as count FROM booking WHERE booking_status = "Order Placed"',
    };

    // Initialize result object
    const result = {
        categories: 0,
        items: 0,
        students: 0,
        staff: 0,
        totalOrders: 0,
        pendingOrders: 0,
        revenue: 0
    };

    // Execute queries in parallel using Promise.all
    const promises = Object.keys(queries).map(key => {
        return new Promise((resolve, reject) => {
            db.query(queries[key], (err, results) => {
                if (err) {
                    console.error(`Error fetching ${key}:`, err);
                    reject(err);
                } else {
                    // Extract value based on query type
                    if (key === 'revenue') {
                        result[key] = results[0].total || 0;
                    } else {
                        result[key] = results[0].count || 0;
                    }
                    resolve();
                }
            });
        });
    });

    // Process all queries and return compiled result
    Promise.all(promises)
        .then(() => {
            res.json(result);
        })
        .catch(err => {
            console.error('Error fetching dashboard counts:', err);
            res.status(500).json({ error: 'Failed to fetch dashboard data', details: err.message });
        });
});

// Get recent orders
router.get('/admin/recent-orders', (req, res) => {
    const sql = `
        SELECT 
            b.booking_id, 
            b.barcode_number, 
            b.serving_time, 
            b.booking_status, 
            b.booking_date,
            s.student_name, 
            s.student_register_number,
            (SELECT COUNT(*) FROM booking WHERE booking_id = b.booking_id) as item_count
        FROM booking b
        LEFT JOIN login_master l ON b.student_id = l.login_id
        LEFT JOIN student s ON l.user_name = s.student_register_number
        ORDER BY b.booking_date DESC
        LIMIT 10
    `;
    
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Failed to fetch recent orders', details: err.message });
        }
        res.json(results);
    });
});

// Get popular items
router.get('/admin/popular-items', (req, res) => {
    const sql = `
        SELECT 
            i.item_name,
            COUNT(t.item_id) as order_count
        FROM 
            temp t
        JOIN 
            items i ON t.item_id = i.item_id
        GROUP BY 
            i.item_id
        ORDER BY 
            order_count DESC
        LIMIT 5
    `;
    
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Failed to fetch popular items', details: err.message });
        }
        res.json(results);
    });
});

// Get order trends by day of week
router.get('/admin/order-trends', (req, res) => {
    const sql = `
        SELECT 
            DAYNAME(booking_date) as day_name,
            COUNT(*) as order_count
        FROM 
            booking
        WHERE 
            booking_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY)
        GROUP BY 
            day_name
        ORDER BY 
            FIELD(day_name, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')
    `;
    
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Failed to fetch order trends', details: err.message });
        }
        res.json(results);
    });
});

module.exports = router;