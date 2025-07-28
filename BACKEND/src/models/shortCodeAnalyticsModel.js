import {getShortCodeId, CreatedClicksInfo, ClicksPerDay, DeviceBreakdown} from "../dao/shortCodeAnalytics.js";

// Short Code ID
export const fetchShortCodeId = async (shortCode) => {
  return await getShortCodeId(shortCode);
};

// Get Clicks and Created Info (Single URL)
export const getCreatedClicksInfo = async (userId, urlId) => {  
  return await CreatedClicksInfo(userId, urlId);
};

// Clicks Per Day (Always Filtered)
export const getClicksPerDay = async (userId, urlId, startDate, endDate) => {
  return await ClicksPerDay(userId, urlId, startDate, endDate);
};

// Device Breakdown (Always Filtered)
export const getDeviceBreakdown = async (userId, urlId, startDate, endDate) => {
  return await DeviceBreakdown(userId, urlId, startDate, endDate);
};
