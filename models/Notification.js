import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true, required: true },
  type: { type: String, enum: ['like','comment','follow','new_post','message'], required: true },
  content: { type: String, required: true },
  status: { type: String, enum: ['unread','read'], default: 'unread', index: true },
}, { timestamps: { createdAt: true, updatedAt: false } });

NotificationSchema.index({ userId: 1, createdAt: -1 });

export const Notification = mongoose.model('Notification', NotificationSchema);
