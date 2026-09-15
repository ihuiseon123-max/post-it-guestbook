import { useState } from 'react';

export default function ResetDialog({ open, onClose, onConfirm, submitting, error }) {
  const [code, setCode] = useState('');

  if (!open) return null;

  const canSubmit = code.length > 0 && !submitting;

  const handleConfirm = () => {
    if (!canSubmit) return;
    onConfirm(code);
  };

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 70,
          background: 'rgba(28,25,20,.5)',
          animation: 'fadeIn .2s ease both',
        }}
      />
      <div
        style={{
          position: 'fixed',
          left: '50%',
          top: '50%',
          zIndex: 80,
          width: '88%',
          maxWidth: 300,
          background: '#fffdf7',
          borderRadius: 20,
          padding: '24px 20px 20px',
          boxShadow: '0 24px 48px -16px rgba(28,25,20,.5)',
          animation: 'dialogIn .22s cubic-bezier(.22,1,.36,1) both',
          textAlign: 'center',
        }}
      >
        <h3 style={{ font: "900 16px/1.3 'Noto Sans KR'", color: '#221f1a', margin: '0 0 8px' }}>
          보드 초기화
        </h3>
        <p style={{ font: "400 12px/1.6 'Noto Sans KR'", color: '#7a7367', margin: '0 0 16px' }}>
          모든 포스트잇이 삭제돼요.
          <br />
          리셋 코드를 입력하세요.
        </p>
        <input
          type="password"
          inputMode="numeric"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleConfirm();
          }}
          placeholder="코드 입력"
          autoFocus
          style={{
            width: '100%',
            height: 46,
            padding: '0 14px',
            borderRadius: 12,
            border: `1.5px solid ${error ? '#d9534a' : 'rgba(34,31,26,.14)'}`,
            background: '#fff',
            font: "600 15px/1 'Noto Sans KR'",
            color: '#221f1a',
            textAlign: 'center',
            letterSpacing: '.15em',
            outline: 'none',
            marginBottom: 12,
          }}
        />
        {error && (
          <div style={{ font: "500 11.5px/1.5 'Noto Sans KR'", color: '#d9534a', marginBottom: 10 }}>
            {error}
          </div>
        )}
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              height: 44,
              border: '1.5px solid rgba(34,31,26,.15)',
              background: '#fff',
              borderRadius: 12,
              cursor: 'pointer',
              font: "700 13px/1 'Noto Sans KR'",
              color: '#221f1a',
            }}
          >
            취소
          </button>
          <button
            onClick={handleConfirm}
            disabled={!canSubmit}
            style={{
              flex: 1,
              height: 44,
              border: 'none',
              borderRadius: 12,
              cursor: canSubmit ? 'pointer' : 'not-allowed',
              font: "700 13px/1 'Noto Sans KR'",
              color: '#fff',
              background: canSubmit ? '#d9534a' : 'rgba(217,83,74,.4)',
            }}
          >
            {submitting ? '초기화 중…' : '초기화'}
          </button>
        </div>
      </div>
    </>
  );
}
