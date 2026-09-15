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

`client/.env` has `VITE_API_URL` pointing at the server; update it if you deploy
the API somewhere other than `localhost:4000`.
