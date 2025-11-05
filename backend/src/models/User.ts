import mongoose, { Document, Schema } from "mongoose";

export interface IRating {
  rater: mongoose.Types.ObjectId;
  score: number;
  comment?: string;
}

export interface IMetrics {
  skillsShared: number;
  jobsCompleted: number;
  positiveRatings: number;
  communityContributionScore: number;
  communityScore: number;
  skillScore: number;
  impactMeter: number;
}

export interface IBadges {
  peerVerified: boolean;
  collegeVerified: boolean;
  neighborhoodVerified: boolean;
}

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: "provider" | "seeker" | "user";
  ratings: IRating[];
  metrics: IMetrics;
  badges: IBadges;
}

const RatingSchema = new Schema<IRating>({
  rater: { type: Schema.Types.ObjectId, ref: "User", required: true },
  score: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
});

const MetricsSchema = new Schema<IMetrics>({
  skillsShared: { type: Number, default: 0 },
  jobsCompleted: { type: Number, default: 0 },
  positiveRatings: { type: Number, default: 0 },
  communityContributionScore: { type: Number, default: 0 },
  communityScore: { type: Number, default: 0 },
  skillScore: { type: Number, default: 0 },
  impactMeter: { type: Number, default: 0 },
});

const BadgesSchema = new Schema<IBadges>({
  peerVerified: { type: Boolean, default: false },
  collegeVerified: { type: Boolean, default: false },
  neighborhoodVerified: { type: Boolean, default: false },
});

const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["provider", "seeker", "user"],
      default: "user",
    },
    ratings: [RatingSchema],
    metrics: { type: MetricsSchema, default: () => ({}) },
    badges: { type: BadgesSchema, default: () => ({}) },
  },
  { timestamps: true }
);

// ✅ Proper default export
const User = mongoose.model<IUser>("User", UserSchema);
export default User;
