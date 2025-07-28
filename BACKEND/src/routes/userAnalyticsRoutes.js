import express from 'express'
import getAnalyticsDashboard from '../controller/useranAlyticsController.js';
import getShortCodeAnalyticsDashboard from '../controller/userShortCodeAnalyticsController.js';
import validateDateRange from '../middleware/validateDateRange.js';
const router = express.Router();

router.post('/', validateDateRange, getAnalyticsDashboard);
router.post('/:shortCode', validateDateRange, getShortCodeAnalyticsDashboard);

export default router;