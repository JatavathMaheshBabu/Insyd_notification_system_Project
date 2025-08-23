# Backend — Insyd Notifications POC

Express + Mongoose API with a simple in-memory event queue and processor.

## Env

Copy `.env.example` to `.env` and edit as needed.

```env
PORT=4000
MONGODB_URI=mongodb://127.0.0.1:27017/insyd
# In Codespaces devcontainer, this points to the sidecar Mongo:
# MONGODB_URI=mongodb://mongo:27017/insyd
```

## Scripts

```bash
npm run dev     # start with nodemon
npm start       # start in prod mode
```

## Routes

- `POST /api/events` — enqueue an event (like/comment/follow/new_post/message)
- `GET /api/notifications/:userId?after=<ISO>` — fetch notifications (optionally after timestamp)
- `GET /api/users` — list users
- `POST /api/users/bootstrap` — seed demo users
- `GET /api/health` — health check


