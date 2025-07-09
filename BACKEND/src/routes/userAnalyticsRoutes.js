import express from 'express'
import getAnalyticsDashboard from '../controller/useranAlyticsController.js';
import validateDateRange from '../middleware/validateDateRange.js';
const router = express.Router();

router.get('/', validateDateRange, getAnalyticsDashboard);

export default router;