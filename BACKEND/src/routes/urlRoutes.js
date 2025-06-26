import express from "express";
import urlValidator from "../validators/urlValidator.js";
import validateRequest from "../middleware/validateRequest.js";
import createShortUrl from "../controller/urlController.js";

const urlRoute = express.Router();

urlRoute.post("/", urlValidator, validateRequest, createShortUrl);

export default urlRoute;
