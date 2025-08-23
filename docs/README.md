
# Insyd Notifications POC (Monorepo)

A proof-of-concept notification system for a social web platform (**Insyd**).  
Tech stack: **React (Vite)** frontend, **Node.js + Express + MongoDB (Mongoose)** backend.  
Includes a ready-to-use **GitHub Codespaces** setup via Dev Containers (with MongoDB service).

## What you get

- `/frontend` — React app (Vite) with a simple UI to:
  - Pick a demo user
  - Trigger events (like/comment/follow/new_post/message)
  - Poll notifications for the selected user
- `/backend` — Express API with Mongoose models, simple in-memory event queue, notification processor, and REST endpoints:
  - `POST /api/events`
  - `GET /api/notifications/:userId`
  - `GET /api/users`, `POST /api/users/bootstrap`
- `/.devcontainer` — One-click Codespaces setup with Node 20 and a MongoDB sidecar.
- `/docs/system-design.md` — System design document with a mermaid architecture diagram.

---

## Quick Start (Local)

> Requires Node 18+ (Node 20 recommended) and a running MongoDB.  
> For local dev without Docker, set `MONGODB_URI` to your local/Atlas connection string in `backend/.env`.

```bash
# 1) Install workspace deps
npm install

# 2) Copy env example
cp backend/.env.example backend/.env

# 3) Update backend/.env -> MONGODB_URI=...
# If you have local MongoDB on default port:
# MONGODB_URI=mongodb://127.0.0.1:27017/insyd

# 4) Run both frontend & backend
npm run dev
```

- Frontend (Vite): http://localhost:5173  
- Backend (API): http://localhost:4000

On first run, the backend seeds two demo users if none exist (`alice`, `bob`).  
If not, hit **POST** `/api/users/bootstrap` manually to seed.

---

## Run in GitHub Codespaces (Recommended)

1. Create a **new GitHub repo** and push this project.
2. Click **Code → Create codespace on main**.
3. The dev container will build and start a **MongoDB** sidecar automatically.
4. After setup finishes, run:
   ```bash
   npm install
   npm run dev
   ```
5. Codespaces will forward ports:
   - `4000` (backend API)
   - `5173` (frontend Vite dev server)

> If users are not created automatically, run:
> ```bash
> curl -X POST http://localhost:4000/api/users/bootstrap
> ```

---

## Deploy (Optional, simple)

- **Backend**: Render/Heroku/Vercel (Node server), set `MONGODB_URI` env var (prefer MongoDB Atlas).
- **Frontend**: Vercel/Netlify. Set `VITE_API_URL` env to your backend HTTPS URL.

---

## Project Structure

```
insyd-notifications-poc
├─ backend/
├─ frontend/
├─ docs/
└─ .devcontainer/
```

---

## System Design Doc

See [`/docs/system-design.md`](docs/system-design.md) for details, including scalability, polling vs. WebSockets, and trade-offs.

---

## Useful Commands

```bash
# Only backend
npm --workspace backend run dev

# Only frontend
npm --workspace frontend run dev

# Build both
npm run build

# Start both in prod-like mode (backend start + vite preview)
npm run start
```

---

## Notes

- POC intentionally skips authentication and heavy caching per requirements.
- Uses polling by default (simpler). You can extend with WebSockets (Socket.IO or native WS) later.
