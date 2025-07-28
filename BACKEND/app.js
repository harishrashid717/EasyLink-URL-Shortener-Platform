// Load Environment Variables
import dotenv from 'dotenv';
dotenv.config();

// Core Packages
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

//  Routes
import urlRoute from './src/routes/urlRoutes.js';
import redirectRoute from './src/routes/redirectRoute.js';
import registerRoute from './src/routes/authRoutes.js';
import statsRoutes from './src/routes/userAnalyticsRoutes.js'
import fakeStatsRoutes from './src/routes/fakeStatsRoutes.js'
// Middleware
import authOptionalMiddleware from './src/middleware/authOptionalMiddleware.js';
import errorHandler from './src/middleware/errorHandler.js';
// import fakeDataAdd from './src/middleware/fakeDataAdd.js';

const app = express();

// Built-in Middleware
app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true 
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Auth Middleware 
app.use(authOptionalMiddleware);

// Home Route
app.get('/', (req, res) => {
  res.send('Home Page');
});

// API Routes
app.use('/api/short-urls', urlRoute);     // For URL shortening logic
app.use('/api/auth', registerRoute);      // For registration & login
app.use('/api/stats', statsRoutes);       // For URL statics
app.use('/api/demostats', statsRoutes);       // For URL statics
app.use('/api/fakedata', fakeStatsRoutes);    // For Fake data add
// Redirect Route (Should remain at the bottom before 404)
app.use('/', redirectRoute);

// 404 Route Handler (Fallback)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route Not Found',
  });
});

// Global Error Handler
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
