'use client';

import { useEffect, useRef, useState } from 'react';

interface FadeUpProps {
  children: React.ReactNode;
  delay?: number;         // ms
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export default function FadeUp({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
}: FadeUpProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const style: React.CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
  };

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} style={style} className={className}>
      {children}
    </Tag>
  );
}
