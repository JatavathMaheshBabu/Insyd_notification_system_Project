import { Notification } from '../models/Notification.js';
import { User } from '../models/User.js';

const eventsQueue = [];

export function enqueueEvent(eventDoc) {
  eventsQueue.push(eventDoc);
}

function buildContent(event) {
  const type = event.type;
  const actor = event.sourceUser?.username || 'Someone';
  if (type === 'like') return `${actor} liked your post`;
  if (type === 'comment') return `${actor} commented: ${(event.data?.text ?? '').toString().slice(0,80)}`;
  if (type === 'follow') return `${actor} started following you`;
  if (type === 'new_post') return `${actor} published a new post`;
  if (type === 'message') return `New message from ${actor}: ${(event.data?.text ?? '').toString().slice(0,80)}`;
  return `${actor} did something`;
}


async function processOne(eventDoc) {
  try {
    const src = await User.findById(eventDoc.sourceUserId).lean();
    eventDoc.sourceUser = src || null;
  } catch {}

  const content = buildContent(eventDoc);
  await Notification.create({
    userId: eventDoc.targetUserId,
    type: eventDoc.type,
    content,
  });
}

const TICK_MS = 250; 
const BURST = 20;    

setInterval(async () => {
  if (eventsQueue.length === 0) return;
  const batch = eventsQueue.splice(0, BURST);
  for (const ev of batch) {
    try {
      await processOne(ev);
    } catch (err) {
      console.error('Processor error:', err?.message);
    }
  }
}, TICK_MS);
