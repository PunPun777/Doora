import { Router } from 'express';
import { getProfile, updateProfile, rateUser, getUserMetrics } from '../controllers/userController';
import { authenticate } from '../middleware/auth';

const router = Router();

// Current user profile
router.get('/profile', authenticate, getProfile);
router.get('/me', authenticate, getProfile); // 👈 added alias for convenience

// Update profile
router.put('/profile', authenticate, updateProfile);

// Rate another user
router.post('/rating/:id', authenticate, rateUser);

// Get user metrics
router.get('/metrics/:id', authenticate, getUserMetrics);

export default router;
