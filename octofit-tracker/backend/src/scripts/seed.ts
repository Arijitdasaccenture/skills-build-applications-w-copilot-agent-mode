import mongoose from 'mongoose';
import { User } from '../models/user';
import { Team } from '../models/team';
import { Activity } from '../models/activity';
import { Leaderboard } from '../models/leaderboard';
import { Workout } from '../models/workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        name: 'Avery Stone',
        email: 'avery.stone@octofit.com',
        role: 'captain',
        fitnessLevel: 'advanced',
        goals: ['increase endurance', 'improve mobility'],
      },
      {
        name: 'Jordan Lee',
        email: 'jordan.lee@octofit.com',
        role: 'member',
        fitnessLevel: 'intermediate',
        goals: ['build strength', 'stay consistent'],
      },
      {
        name: 'Priya Nair',
        email: 'priya.nair@octofit.com',
        role: 'member',
        fitnessLevel: 'beginner',
        goals: ['lose weight', 'increase stamina'],
      },
    ]);

    await Team.insertMany([
      {
        name: 'Velocity Crew',
        description: 'A high-energy training squad focused on speed and endurance.',
        members: users.map((user) => user._id.toString()),
        challengeScore: 942,
      },
      {
        name: 'Core Strength',
        description: 'A power-focused team that likes resistance and recovery work.',
        members: [users[0]._id.toString(), users[2]._id.toString()],
        challengeScore: 883,
      },
    ]);

    await Activity.insertMany([
      {
        userId: users[0]._id.toString(),
        type: 'Run',
        durationMinutes: 45,
        caloriesBurned: 460,
        date: new Date('2026-07-15'),
      },
      {
        userId: users[1]._id.toString(),
        type: 'Strength',
        durationMinutes: 60,
        caloriesBurned: 520,
        date: new Date('2026-07-16'),
      },
      {
        userId: users[2]._id.toString(),
        type: 'Yoga',
        durationMinutes: 35,
        caloriesBurned: 210,
        date: new Date('2026-07-16'),
      },
    ]);

    await Leaderboard.insertMany([
      {
        userId: users[0]._id.toString(),
        score: 920,
        streak: 12,
        badge: 'Trail Blazer',
      },
      {
        userId: users[1]._id.toString(),
        score: 880,
        streak: 8,
        badge: 'Momentum Builder',
      },
      {
        userId: users[2]._id.toString(),
        score: 810,
        streak: 5,
        badge: 'Rising Star',
      },
    ]);

    await Workout.insertMany([
      {
        title: 'Upper Body Blast',
        goal: 'Build arm and shoulder strength',
        durationMinutes: 40,
        difficulty: 'Moderate',
        equipment: ['Dumbbells', 'Resistance band'],
      },
      {
        title: 'HIIT Sprint Circuit',
        goal: 'Improve conditioning and speed',
        durationMinutes: 30,
        difficulty: 'High',
        equipment: ['Timer', 'Cones'],
      },
      {
        title: 'Recovery Flow',
        goal: 'Increase mobility and flexibility',
        durationMinutes: 25,
        difficulty: 'Low',
        equipment: ['Yoga mat'],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
