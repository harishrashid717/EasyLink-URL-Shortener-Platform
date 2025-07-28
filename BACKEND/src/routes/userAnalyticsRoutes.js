import express from 'express'
import getUserAnalyticsDashboard from '../controller/userAnalyticsController.js'
import getShortCodeAnalyticsDashboard from '../controller/userShortCodeAnalyticsController.js';
import validateDateRange from '../middleware/validateDateRange.js';
const router = express.Router();

router.post('/', validateDateRange, getUserAnalyticsDashboard);
router.post('/:shortCode', validateDateRange, getShortCodeAnalyticsDashboard);

export default router;