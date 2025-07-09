import express from "express";
import urlValidator from "../validators/urlValidator.js";
import validateRequest from "../middleware/validateRequest.js";
import shortenUrlHandler from "../handler/shortenUrlHandler.js";
const urlRoute = express.Router();

urlRoute.post("/", urlValidator, validateRequest, shortenUrlHandler);

export default urlRoute;
