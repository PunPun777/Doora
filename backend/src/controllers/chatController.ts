import { Request, Response } from 'express';
import Conversation from '../models/Conversation';
import Message from '../models/Message';
import mongoose from 'mongoose';

// GET /api/chat/conversations
export const getConversations = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const convos = await Conversation.find({ participants: userId }).sort({ updatedAt: -1 }).limit(100);
    res.json(convos);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/chat/messages/:id
export const getMessages = async (req: Request, res: Response) => {
  try {
    const convoId = req.params.id;
    const messages = await Message.find({ conversation: convoId }).sort({ createdAt: 1 }).limit(1000);
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/chat/message
export const sendMessage = async (req: Request, res: Response) => {
  try {
    const sender = req.user?.id;
    const { conversationId, text, media } = req.body;
    if (!sender) return res.status(401).json({ message: 'Unauthorized' });
    if (!conversationId) return res.status(400).json({ message: 'conversationId required' });

    const message = new Message({
      conversation: conversationId,
      sender,
      text,
      media
    });
    await message.save();

    // update conversation lastMessage
    await Conversation.findByIdAndUpdate(conversationId, { lastMessage: text, updatedAt: new Date() });

    // Emit via socket.io in server.ts (we'll wire)
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
