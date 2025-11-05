import User from '../models/User';
import mongoose from 'mongoose';

/**
 * Recalculate skillScore and impactMeter based on provided heuristics.
 * This is a simple example - real systems use more sophisticated weighting.
 */
export const recalcMetrics = async (userId: mongoose.Types.ObjectId | string) => {
  const user = await User.findById(userId);
  if (!user) return;
  const { skillsShared, jobsCompleted, positiveRatings, communityContributionScore } = user.metrics;

  const skillScore = Math.min(100, skillsShared * 2 + jobsCompleted * 3 + positiveRatings * 5);
  const impactMeter = Math.min(100, communityContributionScore * 4 + jobsCompleted * 2);

  user.metrics.skillScore = skillScore;
  user.metrics.impactMeter = impactMeter;
  await user.save();
  return { skillScore, impactMeter };
};
