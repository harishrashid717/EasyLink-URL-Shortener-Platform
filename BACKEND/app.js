import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import pool from './src/db/connections.js';
import urlRoute from './src/routes/urlRoutes.js';
import redirectRoute from './src/routes/redirectRoute.js';
import errorHandler from './src/middleware/errorHandler.js';
import registerRoute from './src/routes/authRoutes.js';
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Home Route
app.get('/', (req, res) => {
  res.send('Home Page');
});

// APIs Routes
app.use('/api/short-urls', urlRoute);
app.use('/api/auth', registerRoute);

//  Redirect Route
app.use('/', redirectRoute);

// DB Check Route (for testing)
app.get('/dbCheck', async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM short_url_table WHERE id = ?',
      [1]
    );
    return res.json({ data: rows[0] });
  } catch (error) {
    next(error);
  }
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route Not Found',
  });
});

// Global Error Handler
app.use(errorHandler);

// 🚀 Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server started on port ${PORT}`);
});
