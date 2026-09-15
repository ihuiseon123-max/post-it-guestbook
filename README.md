# 오리엔테이션 익명 포스트잇 보드

Anonymous digital post-it guestbook for orientation events, implemented from the
`Postit Guestbook` design in `project/`. No sign-up — attendees scan a QR code,
write a short greeting, and it sticks to a shared wall in real time.

- `client/` — React + Vite frontend. Two routes:
  - `/` — mobile-first board: post-it wall, empty state, write sheet, success sheet.
  - `/wall` — PC "wall mode" for projecting during the event (grid layout + QR code).
- `server/` — Express + WebSocket backend. Notes are persisted to a JSON file and
  broadcast to all connected clients over WebSocket so the board and wall mode
  update live across devices.
- `project/`, `chats/` — the original Claude Design handoff bundle this was built from.

## Running locally

```bash
# terminal 1
cd server && npm install && npm run dev   # http://localhost:4000

# terminal 2
cd client && npm install && npm run dev   # http://localhost:5173
```

Open `http://localhost:5173` on a phone (or resize your browser) for the board,
and `http://localhost:5173/wall` on a laptop/projector for wall mode. Posting a
note on one updates the other immediately.

`client/.env.development` sets `VITE_API_URL` to `http://localhost:4000` for
local dev, where client and server run as separate processes on separate
ports. In production there's no such file, so the client defaults to calling
same-origin (`API_URL = ''`) — see "Deploying to Render" below.

## Deploying to Render

In production, one Node process serves everything from a single domain: the
built client (static files), the `/api/*` REST endpoints, and the `/ws`
WebSocket — see `server/src/index.js`. This avoids CORS, avoids baking a
backend URL into the client build, and makes the QR code on `/wall`
(`window.location.origin`) correct automatically, whatever domain Render
gives you.

### One-time setup

1. Push this repo to GitHub (Render deploys from a connected git repo).
2. In the Render dashboard: **New +** → **Blueprint**, point it at the repo.
   Render will read `render.yaml` at the root and configure the service —
   build command `npm run build`, start command `npm start`, a 1GB disk
   mounted at `/var/data`, and `DATA_DIR=/var/data` so `notes.json` survives
   restarts/redeploys instead of living inside the repo checkout.
   - No Blueprint access, or you'd rather click through manually? Create a
     **Web Service** instead, runtime **Node**, build command `npm run build`,
     start command `npm start`. Persistent disks require a paid plan (Starter
     or above) — see the note below if you skip this.
3. Deploy. Render assigns an HTTPS URL like `https://postit-guestbook.onrender.com`.
4. Open that URL → `/wall` on the venue's projector laptop, and scan its QR
   from a phone to confirm the whole flow end-to-end before the event.

### Things worth knowing before the event

- **Single instance only.** Notes live in one JSON file on one server. If the
  service is ever scaled to multiple instances, each instance gets its own
  copy of the data and its own set of WebSocket connections — participants
  would see different boards depending on which instance they land on. Don't
  enable autoscaling (`render.yaml` sets `autoscaling.enabled: false`).
- **Free plan vs. Starter plan.** Render's free web services spin down after
  inactivity and lose local disk contents on the next wake-up, and don't
  support persistent disks at all — a redeploy or an idle spin-down wipes
  `notes.json` back to the seed data. For a live event, the **Starter plan
  with the disk from `render.yaml`** is the safer choice (no spin-down, data
  survives restarts). Free is fine for a quick demo/rehearsal where losing
  the board doesn't matter.
- **HTTPS is required for the QR flow to work cleanly.** Render provides
  HTTPS automatically, and the client already builds a matching `wss://` URL
  for the WebSocket from `window.location`, so nothing else needs to be set
  for this.
