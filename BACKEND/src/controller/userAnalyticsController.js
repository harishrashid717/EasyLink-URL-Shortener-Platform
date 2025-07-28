import {
  fetchFirstAndLastURLDates,
  totalSummaryCards,
  getFilterSummaryCards,
  getTopURLsByClicks,
  getClicksPerDay,
  getDeviceBreakdown,
  getURLCreationTrend,
  getDetailedVisitLogs,
} from "../models/userUrlsAnalyticsModel.js";
import { findFullNameByUserId } from "../models/userModel.js";

const getUserAnalyticsDashboard = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { startDate, endDate } = req.body;
    const [
      userFullname,
      firstLastDates,
      totalSummary,
      filteredSummary,
      topUrls,
      clicksPerDay,
      deviceBreakdown,
      urlCreationTrend,
      detailedLogs,
    ] = await Promise.all([
      findFullNameByUserId(userId),
      fetchFirstAndLastURLDates(userId),
      totalSummaryCards(userId),
      getFilterSummaryCards(userId, startDate, endDate),
      getTopURLsByClicks(userId, startDate, endDate),
      getClicksPerDay(userId, startDate, endDate),
      getDeviceBreakdown(userId, startDate, endDate),
      getURLCreationTrend(userId, startDate, endDate),
      getDetailedVisitLogs(userId, startDate, endDate),
    ]);

    res.status(200).json({
      isAuthenticated: req.isAuthenticated || false,
      userFullname,
      firstLastDates,
      totalSummary,
      filteredSummary,
      topUrls,
      clicksPerDay,
      deviceBreakdown,
      urlCreationTrend,
      detailedLogs,
    });
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
};

export default getUserAnalyticsDashboard;
