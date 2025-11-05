import mongoose, { Schema, Document } from 'mongoose';

export interface IConversation extends Document {
  participants: mongoose.Types.ObjectId[]; // user ids
  lastMessage?: string;
  updatedAt: Date;
  createdAt: Date;
}

const ConversationSchema: Schema = new Schema<IConversation>(
  {
    participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    lastMessage: { type: String }
  },
  { timestamps: true }
);

ConversationSchema.index({ participants: 1 });

export default mongoose.model<IConversation>('Conversation', ConversationSchema);
