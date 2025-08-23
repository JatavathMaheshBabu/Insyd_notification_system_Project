import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  type: { type: String, enum: ['like','comment','follow','new_post','message'], required: true },
  sourceUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  targetUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  data: { type: mongoose.Schema.Types.Mixed },
}, { timestamps: { createdAt: true, updatedAt: false } });

EventSchema.index({ createdAt: -1 });

export const Event = mongoose.model('Event', EventSchema);
