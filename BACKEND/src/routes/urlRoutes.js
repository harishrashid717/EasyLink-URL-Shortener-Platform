import express from 'express';
import {validators ,urlValidatorMiddleware} from '../middleware/urlValidator.js';
import createShortUrl from '../controller/urlController.js';
const urlRoute = express.Router();

urlRoute.post('/shorten',validators, urlValidatorMiddleware, createShortUrl);

export default urlRoute;