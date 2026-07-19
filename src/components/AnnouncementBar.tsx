'use client';

import { useEffect, useState } from 'react';

const DEADLINE = new Date('2026-08-25T23:59:59');

function getTimeLeft(deadline: Date) {
  const diff = deadline.getTime() - Date.now();
  if (diff <= 0) return null;
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);
  return { days, hours, mins, secs };
}

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<ReturnType<typeof getTimeLeft>>(null);

  useEffect(() => {
    setTimeLeft(getTimeLeft(DEADLINE));
    const id = setInterval(() => setTimeLeft(getTimeLeft(DEADLINE)), 1000);
    return () => clearInterval(id);
  }, []);

  if (!timeLeft) return <span>25 Gusht</span>;

  return (
    <span className="font-mono">
      {timeLeft.days}d {String(timeLeft.hours).padStart(2, '0')}h {String(timeLeft.mins).padStart(2, '0')}m {String(timeLeft.secs).padStart(2, '0')}s
    </span>
  );
}

export default function AnnouncementBar() {
  return (
    <div className="bg-[#b31b1b] text-[#fffef2] text-center py-2.5 px-4 text-xs tracking-widest uppercase flex items-center justify-center gap-3 flex-wrap">
      <span className="inline-block bg-[#fffef2] text-[#b31b1b] font-bold px-2 py-0.5 text-xs tracking-widest rounded-sm">
        −33%
      </span>
      <span>Koleksioni tani me 33% zbritje · Dërgesa Falas</span>
      <span className="text-[#fffef2]/90 normal-case tracking-normal">
        · Skadon: <CountdownTimer />
      </span>
      <span className="inline-block bg-[#fffef2] text-[#b31b1b] font-bold px-2 py-0.5 text-xs tracking-widest rounded-sm">
        −33%
      </span>
    </div>
  );
}
