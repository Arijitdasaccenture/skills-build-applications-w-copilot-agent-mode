import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  title: string;
  goal: string;
  durationMinutes: number;
  difficulty: string;
  equipment: string[];
}

const workoutSchema = new Schema<IWorkout>(
  {
    title: { type: String, required: true },
    goal: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    difficulty: { type: String, required: true },
    equipment: { type: [String], default: [] },
  },
  { timestamps: true },
);

export const Workout = mongoose.models.Workout || mongoose.model<IWorkout>('Workout', workoutSchema);
