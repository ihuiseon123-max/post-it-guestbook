export const PALETTE = [
  { key: 'yellow', bg: '#ffe14d', label: '노랑' },
  { key: 'pink', bg: '#ffa8c9', label: '분홍' },
  { key: 'mint', bg: '#a0e7cf', label: '민트' },
  { key: 'blue', bg: '#a9d3ff', label: '하늘' },
  { key: 'orange', bg: '#ffbc7a', label: '주황' },
  { key: 'lilac', bg: '#cfbdff', label: '라일락' },
];

export const NICK_MAX = 12;
export const MSG_MAX = 60;

export const bgOf = (key) => (PALETTE.find((c) => c.key === key) || PALETTE[0]).bg;

export const NOTE_SHADOW = '0 1px 1px rgba(34,31,26,.14), 0 10px 18px -10px rgba(34,31,26,.45)';

// Deterministic pseudo-random rotation from a string id, matching the design prototype.
export function rotFor(id, amp) {
  let h = 0;
  const s = String(id);
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 1000;
  return ((h / 1000) * 2 - 1) * amp;
}

export function relativeTime(iso) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diffMs / 60_000);
  if (minutes < 1) return '방금';
  if (minutes < 60) return minutes + '분 전';
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return hours + '시간 전';
  return Math.floor(hours / 24) + '일 전';
}
