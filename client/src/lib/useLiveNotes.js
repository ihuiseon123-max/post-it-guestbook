import { useCallback, useEffect, useState } from 'react';
import { fetchNotes, WS_URL } from './api';

export function useLiveNotes() {
  const [notes, setNotes] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [newestId, setNewestId] = useState(null);

  const upsert = useCallback((note, { markNewest = false } = {}) => {
    setNotes((prev) => {
      if (prev.some((n) => n.id === note.id)) return prev;
      return [note, ...prev];
    });
    if (markNewest) setNewestId(note.id);
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetchNotes()
      .then((list) => {
        if (cancelled) return;
        // Merge in anything that arrived over the socket before this resolved.
        setNotes((prev) => {
          const seen = new Set(list.map((n) => n.id));
          const extra = prev.filter((n) => !seen.has(n.id));
          return [...extra, ...list].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
        });
        setLoaded(true);
      })
      .catch(() => {
        if (!cancelled) setLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let ws;
    let retryTimer;
    let closedByEffect = false;

    function connect() {
      ws = new WebSocket(WS_URL);
      ws.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);
          if (payload.type === 'note:new' && payload.note) {
            upsert(payload.note);
          }
        } catch {
          // ignore malformed frames
        }
      };
      ws.onclose = () => {
        if (!closedByEffect) retryTimer = setTimeout(connect, 2000);
      };
      ws.onerror = () => ws.close();
    }
    connect();

    return () => {
      closedByEffect = true;
      clearTimeout(retryTimer);
      ws?.close();
    };
  }, [upsert]);

  const addLocalNote = useCallback(
    (note) => {
      upsert(note, { markNewest: true });
    },
    [upsert]
  );

  return { notes, loaded, addLocalNote, newestId };
}
