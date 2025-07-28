import { fetchFirstAndLastURLDates } from "../models/userUrlsAnalyticsModel.js";

const validateDateRangeFake = async (req, res, next) => {
  try {

    const userId = 9;
    let { startDate, endDate } = req.body || {};

    // Fetch user's first and last URL creation dates
    const { firstUrlDate, lastUrlDate } = await fetchFirstAndLastURLDates(userId);

    if (!firstUrlDate || !lastUrlDate) {
      const error = new Error("No URLs found for this user");
      error.statusCode = 400;
      return next(error);
    }

    const parseDate = (str) => {
    const date = new Date(str);
    if (isNaN(date)) throw new Error("Invalid date format");

    // Strip time portion
    date.setUTCHours(0, 0, 0, 0);
  return date;
};


    const formatDate = (date) => date.toISOString().slice(0, 10);

    const minDate = parseDate(firstUrlDate);
    const maxDate = parseDate(lastUrlDate);

    if (startDate && endDate) {
      const start = parseDate(startDate);
      const end = parseDate(endDate);
      console.log('after the date parse', start , end);
      
      if (start > end) {
        const error = new Error("Start date must not be after end date.");
        error.statusCode = 400;
        return next(error);
      }

      if (start.getTime() < minDate.getTime() || end.getTime() > maxDate.getTime()) {
        const error = new Error(
          `Date range must be within ${formatDate(minDate)} and ${formatDate(maxDate)}.`
        );
        error.statusCode = 400;
        return next(error);
      }

      req.body.startDate = formatDate(start);
      req.body.endDate = formatDate(end);
      console.log("after the date format ",req.body.startDate , req.body.endDate);
      
    } else {
      // Use full available range if not provided
      req.body.startDate = formatDate(minDate);
      req.body.endDate = formatDate(maxDate);
    }

    return next();
  } catch (error) {
    error.statusCode = error.statusCode || 500;
    return next(error);
  }
};

export default validateDateRangeFake;
