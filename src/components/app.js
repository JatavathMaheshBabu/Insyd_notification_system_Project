
import axios from 'axios';

// Try to infer backend URL automatically in GitHub Codespaces:
// If running on something like https://user-5173.app.github.dev,
// replace "5173" with "4000" to talk to the backend.
const inferredFromOrigin = (typeof window !== 'undefined')
  ? window.location.origin.replace('5173', '4000')
  : undefined;

const API_URL = import.meta.env.VITE_API_URL || inferredFromOrigin || 'http://localhost:4000';

export const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: { 'Content-Type': 'application/json' }
});

export async function listUsers() {
  const { data } = await api.get('/users');
  return data.users;
}

export async function bootstrapUsers() {
  const { data } = await api.post('/users/bootstrap', {});
  return data.users;
}

export async function getNotifications(userId, after) {
  const params = after ? { after } : {};
  const { data } = await api.get(`/notifications/${userId}`, { params });
  return data.items;
}

export async function postEvent(payload) {
  const { data } = await api.post('/events', payload);
  return data;
}
