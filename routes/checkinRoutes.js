import express from 'express';
import { handleCheckIn } from '../controllers/checkinController.js';
import verifyToken from '../middleware/authMiddleware.js';  // Assuming you have a middleware to verify JWT token

const router = express.Router();

router.post('/checkin', verifyToken, handleCheckIn);

export default router;
