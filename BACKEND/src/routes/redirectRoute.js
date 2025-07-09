import express from 'express';
import findDeviceName from '../middleware/findDeviceNameMiddleware.js';
import redirectHandler from '../handler/redirectHandler.js';
const router = express.Router();

router.get('/:shortCode', findDeviceName, redirectHandler);

export default router;