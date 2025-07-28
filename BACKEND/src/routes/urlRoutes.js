import express from "express";
import urlValidator from "../validators/urlValidator.js";
import validateRequest from "../middleware/validateRequest.js";
import shortenUrlHandler from "../handler/shortenUrlHandler.js";
import deleteShortCodeController from "../controller/deleteShortCode.js";
const urlRoute = express.Router();

urlRoute.post("/", urlValidator, validateRequest, shortenUrlHandler);
urlRoute.delete("/:id", deleteShortCodeController)
export default urlRoute;
