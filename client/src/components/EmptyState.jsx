export default function EmptyState({ onWrite }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '64px 26px 0',
        animation: 'fadeIn .5s ease both',
      }}
    >
      <div style={{ position: 'relative', width: 132, height: 132, marginBottom: 34 }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 3,
            border: '2px dashed rgba(34,31,26,.2)',
            transform: 'rotate(-6deg)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 3,
            border: '2px dashed rgba(34,31,26,.14)',
            transform: 'rotate(5deg)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: 64,
            height: 64,
            margin: '-32px 0 0 -32px',
            borderRadius: 3,
            background: '#ffe14d',
            transform: 'rotate(-3deg)',
            boxShadow: '0 8px 16px -6px rgba(34,31,26,.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            font: "400 26px/1 'Nanum Pen Script', cursive",
            color: '#8a6a00',
          }}
        >
          ?
        </div>
      </div>
      <h2 style={{ font: "900 20px/1.4 'Noto Sans KR'", color: '#221f1a', margin: '0 0 10px' }}>
        벽이 아직 비어 있어요
      </h2>
      <p
        style={{
          font: "400 13.5px/1.75 'Noto Sans KR'",
          color: '#7a7367',
          margin: '0 0 26px',
          maxWidth: 250,
        }}
      >
        첫 포스트잇을 붙이는 사람이 되어보세요. 이름은 안 밝혀도 괜찮아요.
      </p>
      <button
        onClick={onWrite}
        style={{
          font: "700 14px/1 'Noto Sans KR'",
          color: '#fff',
          background: '#221f1a',
          border: 'none',
          padding: '16px 26px',
          borderRadius: 999,
          cursor: 'pointer',
          boxShadow: '0 10px 22px -10px rgba(34,31,26,.7)',
        }}
      >
        첫 인삿말 남기기
      </button>
    </div>
  );
}
