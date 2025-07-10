// Load Environment Variables
import dotenv from 'dotenv';
dotenv.config();

// Core Packages
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

//  Database Connection
import pool from './src/db/connections.js';

//  Routes
import urlRoute from './src/routes/urlRoutes.js';
import redirectRoute from './src/routes/redirectRoute.js';
import registerRoute from './src/routes/authRoutes.js';
import statsRoutes from './src/routes/userAnalyticsRoutes.js'

// Middleware
import authOptionalMiddleware from './src/middleware/authOptionalMiddleware.js';
import errorHandler from './src/middleware/errorHandler.js';

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
app.use('/api/stats', statsRoutes);        // For URL statics
// Redirect Route (Should remain at the bottom before 404)
app.use('/', redirectRoute);

// DB Connection Check Route (For testing only)
app.get('/dbCheck', async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM short_url_table WHERE id = ?',
      [1]
    );
    res.json({ data: rows[0] });
  } catch (error) {
    next(error);
  }
});

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
