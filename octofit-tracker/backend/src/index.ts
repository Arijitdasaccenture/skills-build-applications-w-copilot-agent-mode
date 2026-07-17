import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { User } from './models/user';
import { Team } from './models/team';
import { Activity } from './models/activity';
import { Leaderboard } from './models/leaderboard';
import { Workout } from './models/workout';

const app = express();
const port = 8000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'octofit-backend',
    apiBaseUrl: baseUrl,
  });
});

app.get('/api/users/', async (_req: Request, res: Response) => {
  try {
    const users = await User.find({}).lean();
    res.json({ apiBaseUrl: baseUrl, data: users });
  } catch (error) {
    res.status(500).json({ message: 'Unable to retrieve users', error });
  }
});

app.get('/api/teams/', async (_req: Request, res: Response) => {
  try {
    const teams = await Team.find({}).lean();
    res.json({ apiBaseUrl: baseUrl, data: teams });
  } catch (error) {
    res.status(500).json({ message: 'Unable to retrieve teams', error });
  }
});

app.get('/api/activities/', async (_req: Request, res: Response) => {
  try {
    const activities = await Activity.find({}).lean();
    res.json({ apiBaseUrl: baseUrl, data: activities });
  } catch (error) {
    res.status(500).json({ message: 'Unable to retrieve activities', error });
  }
});

app.get('/api/leaderboard/', async (_req: Request, res: Response) => {
  try {
    const leaderboard = await Leaderboard.find({}).populate('userId').lean();
    res.json({ apiBaseUrl: baseUrl, data: leaderboard });
  } catch (error) {
    res.status(500).json({ message: 'Unable to retrieve leaderboard', error });
  }
});

app.get('/api/workouts/', async (_req: Request, res: Response) => {
  try {
    const workouts = await Workout.find({}).lean();
    res.json({ apiBaseUrl: baseUrl, data: workouts });
  } catch (error) {
    res.status(500).json({ message: 'Unable to retrieve workouts', error });
  }
});

async function startServer() {
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB at localhost:27017/octofit_db');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
  }

  app.listen(port, () => {
    console.log(`Octofit backend listening on ${baseUrl}`);
  });
}

startServer();
