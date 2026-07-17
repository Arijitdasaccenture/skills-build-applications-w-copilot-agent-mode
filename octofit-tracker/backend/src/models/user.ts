import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  role: string;
  fitnessLevel: string;
  goals: string[];
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, default: 'member' },
    fitnessLevel: { type: String, default: 'intermediate' },
    goals: { type: [String], default: [] },
  },
  { timestamps: true },
);

export const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);
