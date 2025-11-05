import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
  title: string;
  description: string;
  provider: mongoose.Types.ObjectId;
  hashtags: string[];
  location: {
    type: 'Point';
    coordinates: [number, number]; // [lng, lat]
  };
  category?: string;
  rate?: number;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema: Schema = new Schema<IService>(
  {
    title: { type: String, required: true },
    description: { type: String },
    provider: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    hashtags: [{ type: String, index: true }],
    location: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], required: true }
    },
    category: { type: String },
    rate: { type: Number },
    available: { type: Boolean, default: true }
  },
  { timestamps: true }
);

ServiceSchema.index({ location: '2dsphere' });

export default mongoose.model<IService>('Service', ServiceSchema);
