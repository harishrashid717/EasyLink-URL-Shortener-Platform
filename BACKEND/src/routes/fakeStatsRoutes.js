import express from "express";
import getAnalyticsDashboardFake from "../controller/fakeUserAnalyticsController.js";
import validateDateRangeFake from "../middleware/validateDateRangeFake.js";

const router = express.Router();

router.post('/',validateDateRangeFake, getAnalyticsDashboardFake);
export default router;