import {
  SingleURLSummaryCard,
  SingleURLClicksOverTime,
  SingleURLDeviceBreakdown
} from '../dao/singleUrlAnalyticsDao.js';

// Summary Card for Single Short URL (No Date Filter)
export const fetchSingleURLSummaryCard = async (shortCode) => {
  return await SingleURLSummaryCard(shortCode);
};

// Clicks Over Time (Click Trend) for Single Short URL
export const fetchSingleURLClicksOverTime = async (shortCode, startDate, endDate) => {
  return await SingleURLClicksOverTime(shortCode, startDate, endDate);
};

// Device Breakdown for Single Short URL
export const fetchSingleURLDeviceBreakdown = async (shortCode, startDate, endDate) => {
  return await SingleURLDeviceBreakdown(shortCode, startDate, endDate);
};
