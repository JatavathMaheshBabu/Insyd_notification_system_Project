
import mongoose from 'mongoose';
import app from './app.js';
import { config } from './config.js';
import { User } from './models/User.js';

async function seedIfEmpty() {
  const count = await User.countDocuments();
  if (count === 0) {
    await User.create([
      { username: 'alice', email: 'alice@example.com' },
      { username: 'bob',   email: 'bob@example.com' }
    ]);
    console.log('Seeded demo users: alice, bob');
  }
}

async function main() {
  try {
    await mongoose.connect(config.mongoUri);
    console.log('MongoDB connected:', config.mongoUri);
    await seedIfEmpty();
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }

  app.listen(config.port, () => {
    console.log(`Backend listening on http://localhost:${config.port}`);
  });
}

main();
