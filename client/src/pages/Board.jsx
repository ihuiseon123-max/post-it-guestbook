import { useState } from 'react';
import { Link } from 'react-router-dom';
import PostitNote from '../components/PostitNote.jsx';
import EmptyState from '../components/EmptyState.jsx';
import WriteSheet from '../components/WriteSheet.jsx';
import SuccessSheet from '../components/SuccessSheet.jsx';
import { useLiveNotes } from '../lib/useLiveNotes.js';
import { postNote } from '../lib/api.js';

export default function Board() {
  const { notes, loaded, addLocalNote, newestId } = useLiveNotes();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [lastColor, setLastColor] = useState('yellow');

  const openSheet = () => {
    setSuccess(false);
    setError(null);
    setSheetOpen(true);
  };
  const closeAll = () => {
    setSheetOpen(false);
    setSuccess(false);
  };

  const handleSubmit = async ({ name, msg, color }) => {
    setSubmitting(true);
    setError(null);
    try {
      const note = await postNote({ name, msg, color });
      addLocalNote(note);
      setLastColor(color);
      setSuccess(true);
    } catch (e) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  const hasNotes = notes.length > 0;

  return (
    <div
      style={{
        minHeight: '100%',
        background: 'var(--board-bg)',
        backgroundImage: 'radial-gradient(rgba(34,31,26,.05) 1px, transparent 1px)',
        backgroundSize: '15px 15px',
      }}
    >
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 30,
          padding: '20px 20px 14px',
          background:
            'linear-gradient(var(--board-bg) 70%, rgba(244,241,232,0))',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <div>
            <div style={{ font: "900 21px/1.25 'Noto Sans KR'", color: '#221f1a', letterSpacing: '-.02em' }}>
              Welcome to BEGINLAB
            </div>
            <div style={{ font: "500 11.5px/1.4 'Noto Sans KR'", color: '#8a8378', marginTop: 3 }}>
              {hasNotes ? `${notes.length}개의 인삿말이 붙어 있어요` : '아직 아무도 붙이지 않았어요'}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: '#fff',
              border: '1px solid rgba(0,0,0,.07)',
              padding: '7px 11px',
              borderRadius: 999,
              boxShadow: '0 1px 2px rgba(0,0,0,.04)',
              flexShrink: 0,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#3ec98b',
                boxShadow: '0 0 0 3px rgba(62,201,139,.22)',
              }}
            />
            <span style={{ font: "700 10.5px/1 'Noto Sans KR'", color: '#5d564b', letterSpacing: '.02em' }}>
              LIVE
            </span>
          </div>
        </div>
      </header>

      <main style={{ padding: '8px 16px 130px', maxWidth: 720, margin: '0 auto' }}>
        {!loaded ? null : hasNotes ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
              gap: '16px 14px',
              padding: '8px 6px 0',
            }}
          >
            {notes.map((n) => (
              <PostitNote key={n.id} note={n} variant="board" isNew={n.id === newestId} />
            ))}
          </div>
        ) : (
          <EmptyState onWrite={openSheet} />
        )}
      </main>

      <div
        style={{
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 35,
          padding: '0 20px calc(26px + env(safe-area-inset-bottom, 0px))',
          display: 'flex',
          justifyContent: 'center',
          background: 'linear-gradient(rgba(244,241,232,0), var(--board-bg) 52%)',
        }}
      >
        <button
          onClick={openSheet}
          style={{
            width: '100%',
            maxWidth: 440,
            height: 56,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 9,
            font: "700 15px/1 'Noto Sans KR'",
            color: '#fff',
            border: 'none',
            borderRadius: 16,
            cursor: 'pointer',
            boxShadow: '0px 14px 26px -12px rgba(0,0,0,.35)',
            backgroundColor: '#0062FF',
          }}
        >
          <span style={{ fontSize: 19, lineHeight: 1, marginTop: -2 }}>＋</span> 포스트잇 붙이기
        </button>
      </div>

      <WriteSheet
        open={sheetOpen && !success}
        initialColor={lastColor}
        onClose={closeAll}
        onSubmit={handleSubmit}
        submitting={submitting}
        error={error}
      />
      <SuccessSheet
        open={sheetOpen && success}
        line={notes.length > 1 ? `이제 ${notes.length}장이 벽에 붙어 있어요.` : '첫 포스트잇이에요. 벽을 열었습니다!'}
        onViewBoard={closeAll}
        onWriteAnother={openSheet}
      />

      <Link
        to="/wall"
        style={{
          position: 'fixed',
          top: 14,
          right: 14,
          zIndex: 20,
          font: "700 10px/1 'Noto Sans KR'",
          color: '#a09889',
          background: '#fff',
          border: '1px solid rgba(0,0,0,.08)',
          padding: '6px 10px',
          borderRadius: 999,
        }}
      >
        벽 모드 →
      </Link>
    </div>
  );
}
