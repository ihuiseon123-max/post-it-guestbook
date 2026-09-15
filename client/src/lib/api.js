const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
const WS_URL = API_URL.replace(/^http/, 'ws') + '/ws';

export { API_URL, WS_URL };

export async function fetchNotes() {
  const res = await fetch(`${API_URL}/api/notes`);
  if (!res.ok) throw new Error('failed to load notes');
  const data = await res.json();
  return data.notes;
}

export async function postNote({ name, msg, color }) {
  const res = await fetch(`${API_URL}/api/notes`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ name, msg, color }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || '전송에 실패했어요.');
  }
  const data = await res.json();
  return data.note;
}
