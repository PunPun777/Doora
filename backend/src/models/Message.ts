import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
  conversation: mongoose.Types.ObjectId;
  sender: mongoose.Types.ObjectId;
  text?: string;
  media?: string;
  createdAt: Date;
}

const MessageSchema: Schema = new Schema<IMessage>(
  {
    conversation: { type: Schema.Types.ObjectId, ref: 'Conversation', required: true },
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String },
    media: { type: String }
  },
  { timestamps: true }
);

MessageSchema.index({ conversation: 1, createdAt: -1 });

export default mongoose.model<IMessage>('Message', MessageSchema);
