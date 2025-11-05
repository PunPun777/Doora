import { Router } from 'express';
import { createService, getServices, getNearbyServices, searchServices } from '../controllers/serviceController';
import { authenticate } from '../middleware/auth';
import multer from 'multer';
const upload = multer({ dest: '/tmp/uploads' });

const router = Router();

router.post('/', authenticate, upload.single('image'), createService);
router.get('/', getServices);
router.get('/nearby', getNearbyServices);
router.get('/search', searchServices);

export default router;
