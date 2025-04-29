import express from 'express';
import { getLocation , getAllLocations} from '../controllers/locationController.js';
import upload from '../middlewares/upload.js';
// import verifyUser from '../middlewares/verifyUser.js'; 
import authMiddleware from '../middleware/authMiddlware.js'


const router = express.Router();

// Apply verifyUser + upload middleware
router.post('/', authMiddleware, upload.single('photo'), getLocation);
// GET route to fetch all locations (for staff or admin)
router.get('/', authMiddleware, getAllLocations);  // <-- Add this route to fetch all locations

export default router;
