const express = require('express'); 
const nodemailer = require('nodemailer'); 
const db = require('../db'); 
const router = express.Router();


// Generate OTP and send email 
router.post('/forgot-password', (req, res) => { 
    const { email } = req.body; 
    const otp = Math.floor(100000 + Math.random() * 900000); // Generate OTP 


    const transporter = nodemailer.createTransport({ 
        service: 'gmail', 
        auth: { 
            user: process.env.EMAIL, 
            pass: process.env.EMAIL_PASSWORD, 
        }, 
    });


    const mailOptions = { 
        from: process.env.EMAIL, 
        to: email, 
        subject: 'Reset Password OTP', 
        text: `Your OTP is ${otp}`, 
    }; 


    transporter.sendMail(mailOptions, (err, info) => { 
        if (err) return res.status(500).send(err); 

        db.query('UPDATE users SET otp = ? WHERE email = ?', [otp, email], (err) => { 
            if (err) return res.status(500).send(err); 
            res.send('OTP sent'); 
        }); 
    }); 
});


// Reset password 
router.post('/reset-password', (req, res) => { 
    const { email, otp, newPassword } = req.body; 
    const sql = 'SELECT * FROM users WHERE email = ? AND otp = ?'; 

    db.query(sql, [email, otp], (err, result) => { 
        if (err) return res.status(500).send(err); 

        if (result.length > 0) { 
            db.query('UPDATE users SET password = ? WHERE email = ?', [newPassword, email], (err) => { 
                if (err) return res.status(500).send(err); 
                res.send('Password reset successful'); 
            }); 
        } else { 
            res.status(401).send('Invalid OTP'); 
        } 
    }); 
}); 

module.exports = router;