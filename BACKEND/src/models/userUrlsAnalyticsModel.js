import {
  getFirstAndLastURLDates,
  SummaryCards,
  TopURLsByClicks,
  ClicksPerDay,
  DeviceBreakdown,
  URLCreationTrend,
  DetailedVisitLogs
} from '../dao/userUrlsAnalyticsDao.js';

// First and last URL date of user
export const fetchFirstAndLastURLDates = async (userId) => {
  return await getFirstAndLastURLDates(userId);
};

// All time summary cards
export const totalSummaryCards = async (userId) => {
  return await SummaryCards(userId); // No date range passed = total summary
};

// Filtered summary cards
export const getFilterSummaryCards = async (userId, startDate, endDate) => {
  return await SummaryCards(userId, startDate, endDate);
};

// Top URLs by Clicks
export const getTopURLsByClicks = async (userId, startDate, endDate) => {
  return await TopURLsByClicks(userId, startDate, endDate);
};

// Clicks Per Day (Click Trend)
export const getClicksPerDay = async (userId, startDate, endDate) => {
  return await ClicksPerDay(userId, startDate, endDate);
};

// Device Breakdown
export const getDeviceBreakdown = async (userId, startDate, endDate) => {
  return await DeviceBreakdown(userId, startDate, endDate);
};

// URL Creation Trend
export const getURLCreationTrend = async (userId, startDate, endDate) => {
  return await URLCreationTrend(userId, startDate, endDate);
};

// Detailed Visit Logs
export const getDetailedVisitLogs = async (userId, startDate, endDate) => {
  return await DetailedVisitLogs(userId, startDate, endDate);
};
