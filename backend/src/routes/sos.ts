import { Router } from 'express';
import { createSOS, getActiveSOS, completeSOS } from '../controllers/sosController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/', authenticate, createSOS);
router.get('/active', getActiveSOS);
router.put('/:id/complete', authenticate, completeSOS);

export default router;
