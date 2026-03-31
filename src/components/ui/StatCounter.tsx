'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './StatCounter.module.css';

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function useCountUp(target: number, duration: number, active: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      setValue(Math.round(easeOutExpo(progress) * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);
  return value;
}

interface StatItem {
  value: number;
  suffix?: string;
  label: string;
  duration?: number;
}

function Counter({ item, active }: { item: StatItem; active: boolean }) {
  const count = useCountUp(item.value, item.duration ?? 1600, active);
  return (
    <div className={styles.stat}>
      <span className={styles.num}>
        {active ? count : 0}{item.suffix ?? ''}
      </span>
      <span className={styles.label}>{item.label}</span>
    </div>
  );
}

export default function StatCounter({ items }: { items: StatItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={styles.wrap}>
      {items.map((item, i) => (
        <Counter key={i} item={item} active={active} />
      ))}
    </div>
  );
}
