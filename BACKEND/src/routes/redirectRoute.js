import express from 'express';
import redirectToFullUrl from '../controller/reDirectController.js';
const router = express.Router();

router.get('/:shortCode', redirectToFullUrl);

export default router;