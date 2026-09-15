import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '..', 'data');
const DATA_FILE = path.join(DATA_DIR, 'notes.json');

export const COLORS = ['yellow', 'pink', 'mint', 'blue', 'orange', 'lilac'];
export const NICK_MAX = 12;
export const MSG_MAX = 60;

const SEED = [
  { name: '익명', msg: '다들 긴장 풀고 재밌게 보내요 🙂', color: 'yellow', minutesAgo: 0 },
  { name: '복학생김', msg: '2년 만에 학교 옴… 잘 부탁드립니다', color: 'blue', minutesAgo: 1 },
  { name: '익명', msg: '취업스터디 같이 하실 분 조용히 손', color: 'mint', minutesAgo: 2 },
  { name: '라면조교', msg: '점심 뭐 먹을지부터 정하자', color: 'orange', minutesAgo: 3 },
  { name: '익명', msg: '앞자리 앉은 분 필기 잘하시네요', color: 'pink', minutesAgo: 4 },
  { name: '해린', msg: '올해는 진짜 다르게 살아보려고요', color: 'lilac', minutesAgo: 5 },
  { name: '익명', msg: '조 배정 같은 조 되신 분 반가워요!', color: 'yellow', minutesAgo: 6 },
  { name: '전공바꿈', msg: '문과에서 왔습니다 살살 부탁', color: 'mint', minutesAgo: 7 },
  { name: '익명', msg: '끝나고 커피 쏘는 사람 있다던데', color: 'blue', minutesAgo: 8 },
  { name: '준희', msg: '모두 원하는 곳에 합격하시길', color: 'pink', minutesAgo: 9 },
];

function seedNotes() {
  const now = Date.now();
  return SEED.map((n, i) => ({
    id: 'seed' + i,
    name: n.name,
    msg: n.msg,
    color: n.color,
    createdAt: new Date(now - n.minutesAgo * 60_000).toISOString(),
  }));
}

function load() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
  } catch {
    // no file yet, or unreadable — fall through to seed
  }
  const seeded = seedNotes();
  save(seeded);
  return seeded;
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
