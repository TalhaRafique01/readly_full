require('dotenv').config(); // Load environment variables at the top

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();
// Middleware
app.use(cors());
app.use(express.json()); // Express has built-in JSON parsing
app.use(bodyParser.urlencoded({ extended: true })); // Support URL-encoded bodies

// Routes
app.use('/api/auth', authRoutes);

// Root Route
app.get('/', (req, res) => {
    res.send('Welcome to the EV Charging Station API!');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
