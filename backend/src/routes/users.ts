import { Router } from 'express';
import { getProfile, updateProfile, rateUser, getUserMetrics } from '../controllers/userController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, updateProfile);
router.post('/rating/:id', authenticate, rateUser);
router.get('/metrics/:id', authenticate, getUserMetrics);

export default router;
