import mongoose, { Schema, Document } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  userId: string;
  score: number;
  streak: number;
  badge: string;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>(
  {
    userId: { type: String, required: true, unique: true },
    score: { type: Number, required: true },
    streak: { type: Number, default: 0 },
    badge: { type: String, default: 'Rising Star' },
  },
  { timestamps: true },
);

export const Leaderboard = mongoose.models.Leaderboard || mongoose.model<ILeaderboardEntry>('Leaderboard', leaderboardSchema);
