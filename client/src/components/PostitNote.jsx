import { bgOf, rotFor, NOTE_SHADOW, relativeTime } from '../lib/palette';

const VARIANTS = {
  board: {
    padding: '16px 14px 14px',
    minHeight: 148,
    msgFont: "400 20px/1.35 'Nanum Pen Script', cursive",
    tapeW: 44,
    tapeH: 17,
    rotAmp: 3,
    showTime: true,
  },
  wall: {
    padding: '14px 12px 11px',
    minHeight: 132,
    msgFont: "400 18px/1.35 'Nanum Pen Script', cursive",
    tapeW: 38,
    tapeH: 15,
    rotAmp: 2.6,
    showTime: false,
  },
};

export default function PostitNote({ note, variant = 'board', isNew = false }) {
  const v = VARIANTS[variant];
  const rot = rotFor(note.id, v.rotAmp).toFixed(2) + 'deg';
  const tapeRot = rotFor(note.id + 't', 6).toFixed(2) + 'deg';

  return (
    <div
      style={{
        position: 'relative',
        padding: v.padding,
        minHeight: v.minHeight,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        background: bgOf(note.color),
        boxShadow: NOTE_SHADOW,
        transform: `rotate(${rot})`,
        '--r': rot,
        animation: isNew
          ? 'pop .5s cubic-bezier(.22,1,.36,1) both'
          : 'riseIn .4s ease both',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: -(v.tapeH / 2),
          left: '50%',
          marginLeft: -(v.tapeW / 2),
          width: v.tapeW,
          height: v.tapeH,
          background: 'rgba(255,255,255,.55)',
          borderLeft: '1px solid rgba(255,255,255,.7)',
          borderRight: '1px solid rgba(0,0,0,.05)',
          transform: `rotate(${tapeRot})`,
          boxShadow: '0 1px 2px rgba(0,0,0,.07)',
        }}
      />
      <p
        style={{
          font: v.msgFont,
          color: '#2b2720',
          margin: '6px 0 0',
          flex: 1,
          wordBreak: 'break-word',
          whiteSpace: 'pre-wrap',
        }}
      >
        {note.msg}
      </p>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 12,
          borderTop: '1px dashed rgba(43,39,32,.22)',
          paddingTop: 8,
        }}
      >
        <span
          style={{
            font: "700 10.5px/1 'Noto Sans KR'",
            color: '#2b2720',
            opacity: 0.72,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            maxWidth: 120,
          }}
        >
          {note.name}
        </span>
        {v.showTime && (
          <span style={{ font: "500 9.5px/1 'Noto Sans KR'", color: '#2b2720', opacity: 0.45 }}>
            {relativeTime(note.createdAt)}
          </span>
        )}
      </div>
    </div>
  );
}
