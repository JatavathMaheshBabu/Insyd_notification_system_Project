
import { Router } from 'express';
import { User } from '../models/User.js';

const router = Router();

router.get('/', async (_req, res) => {
  const users = await User.find().sort({ username: 1 }).lean();
  res.json({ users });
});

router.post('/bootstrap', async (_req, res) => {
  const desired = [
    { username: 'alice', email: 'alice@example.com' },
    { username: 'bob',   email: 'bob@example.com' }
  ];
  const created = [];
  for (const u of desired) {
    const found = await User.findOne({ username: u.username });
    if (!found) {
      created.push(await User.create(u));
    }
  }
  const users = await User.find().sort({ username: 1 }).lean();
  res.json({ created: created.map(x => x.username), users });
});

export default router;
