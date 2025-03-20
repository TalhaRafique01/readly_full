require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session'); 
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const authenticateUser = require('./middleware/authMiddleware');
const passport = require('passport');


connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Working APIIIIII!');
});

app.get('/protected-route', authenticateUser, (req, res) => {
    res.json({ message: 'Access granted!', user: req.user });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
