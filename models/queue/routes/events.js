import { Router } from 'express';
import { z } from 'zod';
import { Event } from '../models/Event.js';
import { enqueueEvent } from '../queue/processor.js';

const router = Router();

const EventSchema = z.object({
  type: z.enum(['like','comment','follow','new_post','message']),
  sourceUserId: z.string().min(1),
  targetUserId: z.string().min(1),
  data: z.record(z.any()).optional()
});

router.post('/', async (req, res) => {
  const parsed = EventSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid payload', details: parsed.error.format() });
  }
  const payload = parsed.data;
  try {
    const ev = await Event.create(payload);
    enqueueEvent(ev.toObject());
    return res.status(202).json({ ok: true, eventId: ev._id });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;
