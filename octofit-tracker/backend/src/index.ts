import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

const app = express();
const port = 8000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

app.use(express.json());

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'octofit-backend' });
});

async function startServer() {
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB at localhost:27017/octofit_db');

    app.listen(port, () => {
      console.log(`Octofit backend listening on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to start Octofit backend:', error);
    process.exit(1);
  }
}

startServer();
