import { useEffect, useState } from 'react';
import { PALETTE, bgOf, rotFor, NICK_MAX, MSG_MAX } from '../lib/palette';

export default function WriteSheet({ open, initialColor = 'yellow', onClose, onSubmit, submitting, error }) {
  const [nick, setNick] = useState('');
  const [msg, setMsg] = useState('');
  const [color, setColor] = useState(initialColor);

  useEffect(() => {
    if (open) {
      setNick('');
      setMsg('');
      setColor(initialColor);
    }
  }, [open, initialColor]);

  if (!open) return null;

  const trimmedNick = nick.trim();
  const trimmedMsg = msg.trim();
  const canSubmit = trimmedNick.length > 0 && trimmedMsg.length > 0 && !submitting;

  const handleSubmit = () => {
    if (!canSubmit) return;
    onSubmit({ name: trimmedNick, msg: trimmedMsg, color });
  };

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 50,
          background: 'rgba(28,25,20,.5)',
          animation: 'fadeIn .22s ease both',
        }}
      />
      <div
        style={{
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: 0,
          margin: '0 auto',
          width: '100%',
          maxWidth: 480,
          zIndex: 60,
          background: '#fffdf7',
          borderRadius: '26px 26px 0 0',
          padding: '14px 20px calc(26px + env(safe-area-inset-bottom, 0px))',
          boxShadow: '0 -18px 40px -14px rgba(28,25,20,.4)',
          animation: 'sheetUp .3s cubic-bezier(.22,1,.36,1) both',
          maxHeight: '92vh',
          overflowY: 'auto',
        }}
      >
        <div
          style={{
            width: 40,
            height: 4,
            borderRadius: 2,
            background: 'rgba(34,31,26,.16)',
            margin: '0 auto 16px',
          }}
        />
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            marginBottom: 18,
          }}
        >
          <h3 style={{ font: "900 19px/1.3 'Noto Sans KR'", color: '#221f1a', margin: 0 }}>
            인삿말 남기기
          </h3>
          <button
            onClick={onClose}
            style={{
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              font: "500 12px/1 'Noto Sans KR'",
              color: '#a09889',
              padding: 4,
            }}
          >
            닫기
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 9 }}>
          <span style={{ font: "700 11px/1 'Noto Sans KR'", letterSpacing: '.06em', color: '#a09889' }}>
            닉네임
          </span>
          <span style={{ font: "700 11px/1 'Noto Sans KR'", color: '#d9534a' }}>필수</span>
        </div>
        <div style={{ display: 'flex', marginBottom: 8 }}>
          <input
            value={nick}
            onChange={(e) => setNick(e.target.value.slice(0, NICK_MAX))}
            placeholder="닉네임을 입력해주세요"
            style={{
              flex: 1,
              minWidth: 0,
              height: 48,
              padding: '0 15px',
              borderRadius: 12,
              border: `1.5px solid ${trimmedNick ? '#221f1a' : 'rgba(34,31,26,.14)'}`,
              background: '#fff',
              font: "500 14px/1 'Noto Sans KR'",
              color: '#221f1a',
              outline: 'none',
            }}
          />
        </div>
        <div style={{ font: "400 11.5px/1.5 'Noto Sans KR'", color: '#a09889', marginBottom: 20 }}>
          {trimmedNick ? '이 이름으로 포스트잇에 표시돼요.' : '최대 12자. 본명이 아니어도 괜찮아요.'}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            marginBottom: 9,
          }}
        >
          <span style={{ font: "700 11px/1 'Noto Sans KR'", letterSpacing: '.06em', color: '#a09889' }}>
            인삿말
          </span>
          <span
            style={{
              font: "700 11px/1 'Noto Sans KR'",
              color: msg.length >= MSG_MAX ? '#d9534a' : '#a09889',
            }}
          >
            {msg.length} / {MSG_MAX}
          </span>
        </div>
        <div
          style={{
            position: 'relative',
            borderRadius: 3,
            background: bgOf(color),
            padding: '15px 15px 13px',
            boxShadow: '0 10px 22px -14px rgba(34,31,26,.6)',
            transform: 'rotate(-.6deg)',
            marginBottom: 22,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: -9,
              left: '50%',
              marginLeft: -24,
              width: 48,
              height: 17,
              background: 'rgba(255,255,255,.55)',
              transform: 'rotate(-2deg)',
              boxShadow: '0 1px 2px rgba(0,0,0,.07)',
            }}
          />
          <textarea
            value={msg}
            onChange={(e) => setMsg(e.target.value.slice(0, MSG_MAX))}
            rows={3}
            maxLength={MSG_MAX}
            placeholder="오늘 처음 뵙네요, 잘 부탁드립니다!"
            style={{
              width: '100%',
              border: 'none',
              background: 'transparent',
              outline: 'none',
              font: "400 23px/1.4 'Nanum Pen Script', cursive",
              color: '#2b2720',
              minHeight: 84,
            }}
          />
          <div
            style={{
              font: "700 10.5px/1 'Noto Sans KR'",
              color: '#2b2720',
              opacity: 0.6,
              textAlign: 'right',
              borderTop: '1px dashed rgba(43,39,32,.22)',
              paddingTop: 9,
            }}
          >
            {trimmedNick || '닉네임'}
          </div>
        </div>

        <div style={{ font: "700 11px/1 'Noto Sans KR'", letterSpacing: '.06em', color: '#a09889', marginBottom: 11 }}>
          색 고르기
        </div>
        <div style={{ display: 'flex', gap: 11, marginBottom: 24, flexWrap: 'wrap' }}>
          {PALETTE.map((c) => {
            const selected = c.key === color;
            return (
              <button
                key={c.key}
                onClick={() => setColor(c.key)}
                title={c.label}
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 3,
                  cursor: 'pointer',
                  background: c.bg,
                  border: `2px solid ${selected ? '#221f1a' : 'rgba(0,0,0,.06)'}`,
                  boxShadow: selected
                    ? '0 8px 16px -8px rgba(34,31,26,.6)'
                    : '0 3px 8px -5px rgba(34,31,26,.5)',
                  transform: `rotate(${(selected ? -4 : rotFor(c.key, 3)).toFixed(1)}deg)`,
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-end',
                  padding: 4,
                }}
              >
                <span
                  style={{
                    font: "900 12px/1 'Noto Sans KR'",
                    color: '#2b2720',
                    opacity: selected ? 1 : 0,
                  }}
                >
                  ✓
                </span>
              </button>
            );
          })}
        </div>

        {error && (
          <div style={{ font: "500 12px/1.5 'Noto Sans KR'", color: '#d9534a', marginBottom: 12 }}>
            {error}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          style={{
            width: '100%',
            height: 56,
            border: 'none',
            borderRadius: 16,
            cursor: canSubmit ? 'pointer' : 'not-allowed',
            font: "700 15px/1 'Noto Sans KR'",
            color: canSubmit ? '#fff' : 'rgba(34,31,26,.35)',
            background: canSubmit ? '#221f1a' : 'rgba(34,31,26,.1)',
            boxShadow: canSubmit ? '0 14px 26px -14px rgba(34,31,26,.9)' : 'none',
          }}
        >
          {submitting ? '붙이는 중…' : '벽에 붙이기'}
        </button>
      </div>
    </>
  );
}
