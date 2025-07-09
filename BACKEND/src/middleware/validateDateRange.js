import { fetchFirstAndLastURLDates } from "../models/userUrlsAnalyticsModel.js";

const validateDateRange = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).send("You have to login first");
    }

    const userId = req.user.id;
    let { startDate, endDate } = req.body;

    // Get user's first & last URL creation dates
    const { firstUrlDate, lastUrlDate } = await fetchFirstAndLastURLDates(
      userId
    );

    if (!firstUrlDate || !lastUrlDate) {
      const error = new Error("No URLs found for this user");
      error.statusCode = 400;
      return next(error);
    }

    // Parse helper (makes sure time zone doesn't mess with date logic)
    const parseDate = (str) => new Date(str + "T00:00:00Z");
    const formatDate = (date) => date.toISOString().slice(0, 10);

    const minDate = parseDate(firstUrlDate);
    const maxDate = parseDate(lastUrlDate);

    if (startDate && endDate) {
      const start = parseDate(startDate);
      const end = parseDate(endDate);

      if (start > end) {
        const error = new Error("Start date must not be after end date.");
        error.statusCode = 400;
        return next(error);
      }

      if (start < minDate || end > maxDate) {
        const error = new Error(
          `Date range must be within ${firstUrlDate} and ${lastUrlDate}.`
        );
        error.statusCode = 400;
        return next(error);
      }

      req.body.startDate = formatDate(start);
      req.body.endDate = formatDate(end);
    } else {
      // If custom dates not provided, set to full range
      req.body.startDate = formatDate(minDate);
      req.body.endDate = formatDate(maxDate);
    }

    return next();
  } catch (error) {
    error.statusCode = 500;
    return next(error);
  }
};

export default validateDateRange;
