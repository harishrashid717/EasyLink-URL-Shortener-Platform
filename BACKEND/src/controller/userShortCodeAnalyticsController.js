import {
  fetchShortCodeId,
  getCreatedClicksInfo,
  getClicksPerDay,
  getDeviceBreakdown,
} from "../models/shortCodeAnalyticsModel.js";
import { findFullNameByUserId } from "../models/userModel.js";
const getShortCodeAnalyticsDashboard = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const shortCode = req.params.shortCode;
    const { startDate, endDate } = req.body;

    // Get the short URL's internal ID
    const urlId = await fetchShortCodeId(shortCode);
  
    if (!urlId) {
      return res.status(404).json({
        isAuthenticated: req.isAuthenticated || false,
        success: false,
        message: "Short code not found",
      });
    }

    // Parallel fetching of analytics
    const [fullName, clicksInfo, clicksPerDay, deviceBreakdown] = await Promise.all([
      findFullNameByUserId(userId),
      getCreatedClicksInfo(userId, urlId),
      getClicksPerDay(userId, urlId, startDate, endDate),
      getDeviceBreakdown(userId, urlId, startDate, endDate),
    ]);

    res.status(200).json({
      isAuthenticated: req.isAuthenticated || false,
      shortCode,
      fullName,
      clicksInfo,
      clicksPerDay,
      deviceBreakdown,
    });
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
};

export default getShortCodeAnalyticsDashboard;
