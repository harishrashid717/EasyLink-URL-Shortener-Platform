import { validationResult } from "express-validator";

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const extractedErrors = errors.array();

    const error = new Error(extractedErrors[0].msg);
    error.statusCode = 400;
    error.details = extractedErrors;
    return next(error);
  }

  next();
};
export default validateRequest;
