import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import PostitNote from '../components/PostitNote.jsx';
import { useLiveNotes } from '../lib/useLiveNotes.js';

export default function Wall() {
  const { notes, loaded } = useLiveNotes();
  const boardUrl = `${window.location.origin}/`;
  const [qrOpen, setQrOpen] = useState(false);

  return (
    <div
      style={{
        minHeight: '100%',
        background: 'var(--board-bg)',
        backgroundImage: 'radial-gradient(rgba(34,31,26,.05) 1px, transparent 1px)',
        backgroundSize: '18px 18px',
        padding: '32px 40px 60px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          marginBottom: 30,
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <div style={{ font: "900 30px/1.2 'Noto Sans KR'", color: '#221f1a', letterSpacing: '-.02em' }}>
          Welcome to BEGINLAB
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#3ec98b',
                boxShadow: '0 0 0 3px rgba(62,201,139,.22)',
              }}
            />
            <span style={{ font: "700 12px/1 'Noto Sans KR'", color: '#5d564b' }}>실시간</span>
          </div>
          <div
            onClick={() => setQrOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              background: '#fff',
              border: '1px solid rgba(0,0,0,.08)',
              padding: '9px 14px',
              borderRadius: 10,
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                background: '#fff',
                borderRadius: 4,
                padding: 3,
                display: 'flex',
              }}
            >
              <QRCodeSVG value={boardUrl} size={34} bgColor="#ffffff" fgColor="#221f1a" />
            </div>
            <span style={{ font: "700 11px/1.4 'Noto Sans KR'", color: '#5d564b' }}>
              QR 스캔 후
              <br />
              바로 작성
            </span>
          </div>
        </div>
      </div>

      {qrOpen && (
        <div
          onClick={() => setQrOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 90,
            background: 'rgba(28,25,20,.72)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            animation: 'fadeIn .2s ease both',
          }}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: 24,
              padding: 32,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 18,
              boxShadow: '0 24px 60px -16px rgba(28,25,20,.6)',
              animation: 'riseIn .25s cubic-bezier(.22,1,.36,1) both',
            }}
          >
            <QRCodeSVG value={boardUrl} size={280} bgColor="#ffffff" fgColor="#221f1a" />
            <span style={{ font: "700 13px/1.4 'Noto Sans KR'", color: '#5d564b' }}>
              QR을 스캔해서 인삿말을 남겨보세요
            </span>
          </div>
        </div>
      )}

      {loaded && notes.length === 0 ? (
        <div
          style={{
            font: "500 15px/1.6 'Noto Sans KR'",
            color: '#8a8378',
            textAlign: 'center',
            padding: '80px 0',
          }}
        >
          아직 아무도 붙이지 않았어요. QR을 스캔해서 첫 포스트잇을 붙여보세요.
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: '22px 18px',
          }}
        >
          {notes.map((n) => (
            <PostitNote key={n.id} note={n} variant="wall" />
          ))}
        </div>
      )}
    </div>
  );
}
