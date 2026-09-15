// Unset (e.g. production build) means "same origin as the page" — the
// server serves both the API and the built client from one domain, so no
// URL needs to be baked in at build time. .env.development sets this to
// http://localhost:4000 for local dev, where client and server run as
// separate processes on separate ports.
const configured = import.meta.env.VITE_API_URL;
const API_URL = configured || '';

// WebSocket URLs must be absolute with an explicit ws/wss scheme — browsers
// don't infer it from a relative path — so this is built by hand rather
// than reused from a relative API_URL.
const WS_URL = configured
  ? configured.replace(/^http/, 'ws') + '/ws'
  : `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.host}/ws`;

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
