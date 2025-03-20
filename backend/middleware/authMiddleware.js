const jwt = require('jsonwebtoken');
const User = require('../model/user');

const authenticateUser = async (req, res, next) => {
    try {
        const token = req.header('Authorization');

        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password'); // Exclude password for security

        if (!user) {
            return res.status(401).json({ message: 'User not found. Authentication failed.' });
        }

        req.user = user; // Attach user object to request
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token.' });
    }
};

module.exports = authenticateUser;
