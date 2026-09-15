export default function SuccessSheet({ open, line, onViewBoard, onWriteAnother }) {
  if (!open) return null;

  return (
    <>
      <div
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
          padding: '34px 26px calc(30px + env(safe-area-inset-bottom, 0px))',
          textAlign: 'center',
          boxShadow: '0 -18px 40px -14px rgba(28,25,20,.4)',
          animation: 'sheetUp .3s cubic-bezier(.22,1,.36,1) both',
        }}
      >
        <div
          style={{
            width: 62,
            height: 62,
            margin: '0 auto 20px',
            borderRadius: '50%',
            background: '#3ec98b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            font: "900 26px/1 'Noto Sans KR'",
            color: '#fff',
            animation: 'tick .45s cubic-bezier(.22,1,.36,1) both',
            boxShadow: '0 12px 24px -10px rgba(62,201,139,.9)',
          }}
        >
          ✓
        </div>
        <h3 style={{ font: "900 20px/1.4 'Noto Sans KR'", color: '#221f1a', margin: '0 0 9px' }}>
          벽에 붙였어요!
        </h3>
        <p style={{ font: "400 13.5px/1.7 'Noto Sans KR'", color: '#7a7367', margin: '0 0 24px' }}>
          {line}
        </p>
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={onViewBoard}
            style={{
              flex: 1,
              height: 52,
              border: '1.5px solid rgba(34,31,26,.15)',
              background: '#fff',
              borderRadius: 14,
              cursor: 'pointer',
              font: "700 14px/1 'Noto Sans KR'",
              color: '#221f1a',
            }}
          >
            보드 보기
          </button>
          <button
            onClick={onWriteAnother}
            style={{
              flex: 1,
              height: 52,
              border: 'none',
              background: '#d9534a',
              borderRadius: 14,
              cursor: 'pointer',
              font: "700 14px/1 'Noto Sans KR'",
              color: '#fff',
            }}
          >
            한 장 더
          </button>
        </div>
      </div>
    </>
  );
}
