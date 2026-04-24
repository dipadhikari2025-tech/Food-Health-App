const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-Memory Data Store (Mocking MongoDB for prototyping)
// In a real app, this would be replaced with Mongoose models
global.mockDB = {
  user: null, // Will hold user onboarding info
  foodLogs: [], // Array of food logs
  habits: {
    consistency: 80, // %
    junkFoodFrequency: 2, // per week
  }
};

// Routes
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.send('Nutrition Assistant API is running');
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
