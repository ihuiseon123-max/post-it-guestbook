import express from 'express';
import cors from 'cors';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { WebSocketServer } from 'ws';
import { listNotes, addNote, COLORS, NICK_MAX, MSG_MAX } from './store.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 4000;
// In production this server also serves the built client so the whole app
// is one deployable (one domain, no CORS, one WS origin). In local dev the
// client runs on its own Vite dev server instead, and this folder won't
// exist, so the static/catch-all routes below are skipped entirely.
const CLIENT_DIST = path.join(__dirname, '..', '..', 'client', 'dist');
const CLIENT_BUILT = fs.existsSync(path.join(CLIENT_DIST, 'index.html'));

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/notes', (req, res) => {
  res.json({ notes: listNotes() });
});

app.post('/api/notes', (req, res) => {
  const name = String(req.body?.name ?? '').trim().slice(0, NICK_MAX);
  const msg = String(req.body?.msg ?? '').trim().slice(0, MSG_MAX);
  const color = COLORS.includes(req.body?.color) ? req.body.color : COLORS[0];

  if (!name || !msg) {
    return res.status(400).json({ error: '닉네임과 인삿말을 모두 입력해주세요.' });
  }

  const note = addNote({ name, msg, color });
  broadcast({ type: 'note:new', note });
  res.status(201).json({ note });
});

if (CLIENT_BUILT) {
  app.use(express.static(CLIENT_DIST));
  // SPA fallback: any non-API GET (e.g. /wall) resolves to index.html so
  // client-side routing works on a hard refresh or direct link.
  app.get('*', (req, res) => {
    res.sendFile(path.join(CLIENT_DIST, 'index.html'));
  });
}

const server = http.createServer(app);
const wss = new WebSocketServer({ server, path: '/ws' });

function broadcast(payload) {
  const data = JSON.stringify(payload);
  for (const client of wss.clients) {
    if (client.readyState === client.OPEN) client.send(data);
  }
}

server.listen(PORT, () => {
  console.log(
    `postit-guestbook server listening on :${PORT}` +
      (CLIENT_BUILT ? ' (serving client/dist)' : ' (API/WS only — client/dist not built)')
  );
});
