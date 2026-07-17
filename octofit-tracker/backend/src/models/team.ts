import mongoose, { Schema, Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  description: string;
  members: string[];
  challengeScore: number;
}

const teamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    members: { type: [String], default: [] },
    challengeScore: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const Team = mongoose.models.Team || mongoose.model<ITeam>('Team', teamSchema);
