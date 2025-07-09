import { findFullUrlByShortCode } from "../models/urlModel.js";
import { handleAnonymousUrlTasks, handleUserUrlTasks } from "../services/redirectUrlsTask.js";

export const anonymousRedirectController = async (shortCode) => {
  const fullUrl = await findFullUrlByShortCode(shortCode);
  if (!fullUrl) {
    const error = new Error("Short URL not found");
    error.statusCode = 404;
    throw error;
  }

  await handleAnonymousUrlTasks(shortCode);
  return fullUrl;
};

export const userRedirectController = async (shortCode, urlId, device) => {
  const fullUrl = await findFullUrlByShortCode(shortCode);
  if (!fullUrl) {
    const error = new Error("Short URL not found");
    error.statusCode = 404;
    throw error;
  }

  await handleUserUrlTasks(shortCode, urlId, device);
  return fullUrl;
};
