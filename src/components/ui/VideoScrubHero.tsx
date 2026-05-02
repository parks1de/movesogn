"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Icon from "./Icon";
import styles from "./VideoScrubHero.module.css";

const phases = [
  {
    words: ["SKAP", "MOBILITET"],
    sub: "Bil, båt, sykkel og heim — alt du treng for kvardagen og eventyret i Sogn.",
    cta: null,
  },
  {
    words: ["Hasle", "Summer-Fun."],
    sub: "Vår bestseljar. Sporty og tøff ungdomsbåt, CE-godkjent for norske farvatn. Kampanjepris frå kr 71.900,- inkl. Suzuki 9,9 hk.",
    cta: { href: "/marine/summerfun", label: "Sjå pakkar og pris" },
  },
  {
    words: ["Born", "to move."],
    sub: "For deg som syklar til jobben, tek båten i helga og aldri vel sofaen over fjellet. Fire avdelingar. Ein ambisjon.",
    cta: { href: "/om-oss", label: "Les historia vår" },
  },
];

export default function VideoScrubHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    video.style.transform = "scale(0.68)";

    const onScroll = () => {
      if (!video.duration) return;
      const rect = container.getBoundingClientRect();
      const progress = -rect.top / (rect.height - window.innerHeight);
      const clamped = Math.max(0, Math.min(1, progress));
      video.currentTime = clamped * video.duration;
      video.style.transform = `scale(${(0.68 + clamped * 0.42).toFixed(4)})`;
      setPhase(clamped < 0.34 ? 0 : clamped < 0.67 ? 1 : 2);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={containerRef} className={styles.container}>
      <div className={styles.sticky}>
        <video
          ref={videoRef}
          src="/videos/summer-fun.mp4"
          preload="auto"
          muted
          playsInline
          className={styles.video}
        />
        <div className={styles.overlay} />
        <div className={styles.tint} aria-hidden="true" />
        <div className={styles.ghost} aria-hidden="true">MOVE</div>

        <div className={`container ${styles.contentWrap}`}>
          <div className={styles.phasesContainer}>
            {phases.map((p, i) => (
              <div
                key={i}
                className={`${styles.phase} ${phase === i ? styles.phaseVisible : ""}`}
              >
                <h1 className={styles.h1}>
                  {p.words.map((w, wi) => (
                    <span key={wi} className={styles.h1Word}>{w}</span>
                  ))}
                </h1>
                <p className={styles.sub}>{p.sub}</p>
                {p.cta && (
                  <Link href={p.cta.href} className="btn btn--primary">
                    {p.cta.label}
                    <Icon name="arrow-right" size={16} />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.scrollHint} aria-hidden="true"><span /></div>
      </div>
    </div>
  );
}
