import { increaseClicksCountByShortCode , updateUrlVisitLog } from "../models/urlModel.js";
export const handleAnonymousUrlTasks = async (shortCode) => {
  await increaseClicksCountByShortCode(shortCode);
};

export const handleUserUrlTasks = async (shortCode, urlId, device) => {
  await increaseClicksCountByShortCode(shortCode);
  await updateUrlVisitLog(urlId, device);
};
