import express from 'express';
import cors from 'cors';
import http from 'node:http';
import { WebSocketServer } from 'ws';
import { listNotes, addNote, COLORS, NICK_MAX, MSG_MAX } from './store.js';

const PORT = process.env.PORT || 4000;

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

const server = http.createServer(app);
const wss = new WebSocketServer({ server, path: '/ws' });

function broadcast(payload) {
  const data = JSON.stringify(payload);
  for (const client of wss.clients) {
    if (client.readyState === client.OPEN) client.send(data);
  }
}

server.listen(PORT, () => {
  console.log(`postit-guestbook server listening on :${PORT}`);
});
