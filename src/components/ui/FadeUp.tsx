"use client";

import { useEffect, useRef, useState } from "react";

type FadeUpProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export default function FadeUp({ children, className, style }: FadeUpProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={style}
      data-visible={visible}
    >
      {children}
    </div>
  );
}
