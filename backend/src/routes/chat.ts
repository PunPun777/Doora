import { Router } from 'express';
import { getConversations, getMessages, sendMessage } from '../controllers/chatController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/conversations', authenticate, getConversations);
router.get('/messages/:id', authenticate, getMessages);
router.post('/message', authenticate, sendMessage);

export default router;
