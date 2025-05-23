const express = require('express');
const router = express.Router();
const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const passport = require('../config/passport');


// Signup
router.post('/signup', async (req, res) => {
    console.log("Raw Request Body:", req.body); // Check what data is actually received

    const { name, email, password, permanentAddress, phone_no } = req.body;
    console.log("Parsed Values:", name, email, password, permanentAddress, phone_no);

    if (!name || !email || !password || !permanentAddress || !phone_no) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: password,
            permanent_address: permanentAddress,
            phone_no,
        });

        res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Server error", error });
    }
});


// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        if (user.isOAuth) {
            return res.status(400).json({ message: 'Please log in using Google OAuth' });
        }        

        const isMatch = await bcrypt.compare(password.trim(), user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Forgot Password
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    console.log(email)
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.SMTP_HOST,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        const mailOptions = {
            to: user.email,
            from: process.env.EMAIL,
            subject: 'Password Reset Request',
            html: `
                <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; background-color: #f9f9f9; border-radius: 10px;">
                    <h2 style="color: #d63031;">Password Reset Request</h2>
                    <p>Hello,</p>
                    <p>We received a request to reset your password. Click the button below to proceed:</p>
                    <a href="${process.env.CLIENT_URL}/reset-password/${resetToken}" 
                       style="display: inline-block; padding: 10px 20px; margin: 10px 0; background-color: #0984e3; color: #fff; text-decoration: none; border-radius: 5px;">
                       Reset Password
                    </a>
                    <p>If you did not request this, please ignore this email. This link will expire in 1 hour.</p>
                    <p>Thank you</p>
                </div>
            `,
        };
        

        await transporter.sendMail(mailOptions);
        res.json({ message: 'Password reset email sent' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Reset Password
router.post('/reset-password/:token', async (req, res) => {
    try {
        console.log("Reset Password Token:", req.params.token);
        const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.json({ message: 'Password reset successful' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth Callback Route
router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        // Redirect to frontend with token and user info
        res.redirect(`${process.env.CLIENT_URL}/auth-success?token=${token}&name=${req.user.name}&email=${req.user.email}`);
    }
);


module.exports = router;
