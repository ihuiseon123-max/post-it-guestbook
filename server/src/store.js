import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// DATA_DIR lets a deploy point this at a mounted persistent disk
// (e.g. Render's disk mount path) instead of the repo's local folder,
// which is wiped on every redeploy.
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, '..', 'data');
const DATA_FILE = path.join(DATA_DIR, 'notes.json');

export const COLORS = ['yellow', 'pink', 'mint', 'blue', 'orange', 'lilac'];
export const NICK_MAX = 12;
export const MSG_MAX = 60;

function load() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
  } catch {
    // no file yet, or unreadable — start empty
  }
  return [];
}

function save(notes) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(notes, null, 2));
}

let notes = load();

export function listNotes() {
  return [...notes].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export function addNote({ name, msg, color }) {
  const note = {
    id: 'n' + Date.now() + Math.random().toString(36).slice(2, 7),
    name,
    msg,
    color,
    createdAt: new Date().toISOString(),
  };
  notes.push(note);
  save(notes);
  return note;
}
