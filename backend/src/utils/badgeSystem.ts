import User, { IUser } from '../models/User';
import mongoose from 'mongoose';

/**
 * Award badges based on thresholds (simple rules)
 * - peerVerified: positiveRatings >= 10
 * - collegeVerified: (external verification step would be needed) here we stub as false
 * - neighborhoodVerified: communityContributionScore >= 20
 */
export const evaluateBadges = async (userId: mongoose.Types.ObjectId | string) => {
  const user = await User.findById(userId);
  if (!user) return;

  const updates: Partial<IUser['badges']> = {};
  if (user.metrics.positiveRatings >= 10) updates.peerVerified = true;
  if (user.metrics.communityContributionScore >= 20) updates.neighborhoodVerified = true;

  // collegeVerified would require extra verification workflow; leave as-is

  user.badges = { ...user.badges, ...updates } as any;
  await user.save();
  return user.badges;
};
