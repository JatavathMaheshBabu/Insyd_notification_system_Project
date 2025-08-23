import mongoose from 'mongoose';

const PreferencesSchema = new mongoose.Schema({
  inApp: { type: Boolean, default: true },
}, { _id: false });

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, index: true },
  email: { type: String, required: true, unique: true },
  preferences: { type: PreferencesSchema, default: () => ({}) }
}, { timestamps: true });

export const User = mongoose.model('User', UserSchema);
