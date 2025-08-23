import { Router } from 'express';
import { Notification } from '../models/Notification.js';

const router = Router();

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  const { after } = req.query;
  const filter = { userId };
  if (after) {
    const afterDate = new Date(after);
    if (!isNaN(afterDate.getTime())) {
      filter.createdAt = { $gt: afterDate };
    }
  }
  try {
    const items = await Notification.find(filter)
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();
    res.json({ items });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Manual creation (for testing)
router.post('/', async (req, res) => {
  try {
    const doc = await Notification.create(req.body);
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
