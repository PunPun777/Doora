import mongoose, { Schema, Document } from 'mongoose';

export interface ISOS extends Document {
  seeker: mongoose.Types.ObjectId;
  description: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
  expiresAt: Date;
  active: boolean;
  createdAt: Date;
}

const SOSScheme: Schema = new Schema<ISOS>(
  {
    seeker: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String },
    urgency: { type: String, enum: ['low', 'medium', 'high', 'critical'], default: 'medium' },
    location: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], required: true }
    },
    expiresAt: { type: Date, required: true },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

// TTL index: automatically remove documents after expiresAt
SOSScheme.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
SOSScheme.index({ location: '2dsphere' });

export default mongoose.model<ISOS>('SOS', SOSScheme);
