import { Request, Response } from 'express';
import User from '../models/User';
import { recalcMetrics } from '../utils/metricsUpdate';
import { evaluateBadges } from '../utils/badgeSystem';
import mongoose from 'mongoose';

// GET /api/users/profile
export const getProfile = async (req: Request, res: Response) => {
  try {
    const id = req.user?.id || req.params.id;
    if (!id) return res.status(401).json({ message: 'Unauthorized' });
    const user = await User.findById(id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// PUT /api/users/profile
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const updates = req.body;
    // Prevent password updates via this endpoint
    delete updates.password;

    const user = await User.findByIdAndUpdate(userId, updates, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/users/rating/:id
export const rateUser = async (req: Request, res: Response) => {
  try {
    const raterId = req.user?.id;
    const targetId = req.params.id;
    const { score, comment } = req.body;
    if (!raterId) return res.status(401).json({ message: 'Unauthorized' });

    const target = await User.findById(targetId);
    if (!target) return res.status(404).json({ message: 'User not found' });

    target.ratings.push({ rater: raterId as any, score, comment });
    if (score >= 4) target.metrics.positiveRatings += 1;
    target.metrics.jobsCompleted += 1;
    target.metrics.communityContributionScore += 1;
    await target.save();

    await recalcMetrics(target._id);
    await evaluateBadges(target._id);

    res.json({ message: 'Rated successfully', target: { id: target._id } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/users/metrics/:id
export const getUserMetrics = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id).select('metrics badges name email');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
