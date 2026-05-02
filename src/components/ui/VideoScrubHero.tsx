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
  const stickyRef    = useRef<HTMLDivElement>(null);
  const videoRef     = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const video     = videoRef.current;
    const container = containerRef.current;
    const sticky    = stickyRef.current;
    if (!video || !container || !sticky) return;

    video.style.transform = "translate(-50%, -50%) scale(0.80)";

    const update = () => {
      const scrollY      = window.scrollY;
      const rect         = container.getBoundingClientRect();
      const containerTop = scrollY + rect.top;
      const scrollRange  = container.offsetHeight - window.innerHeight;

      if (scrollY <= containerTop) {
        sticky.style.position = "absolute";
        sticky.style.top      = "0";
        sticky.style.bottom   = "";
        sticky.style.width    = "";
        sticky.style.opacity  = "1";
        setPhase(0);
        return;
      }

      if (scrollY >= containerTop + scrollRange) {
        sticky.style.position = "absolute";
        sticky.style.top      = "";
        sticky.style.bottom   = "0";
        sticky.style.width    = "";
        sticky.style.opacity  = "0";
        setPhase(2);
        return;
      }

      sticky.style.position = "fixed";
      sticky.style.top      = "0";
      sticky.style.bottom   = "";
      sticky.style.width    = "100%";

      const clamped = (scrollY - containerTop) / scrollRange;

      // video scrub + zoom
      if (video.duration) {
        video.currentTime     = clamped * video.duration;
        const scale           = 0.80 + clamped * 0.28;
        video.style.transform = `translate(-50%, -50%) scale(${scale.toFixed(4)})`;
      }

      // fade out the whole panel in the last 20% of scroll
      const fadeStart = 0.78;
      sticky.style.opacity = clamped >= fadeStart
        ? String((1 - (clamped - fadeStart) / (1 - fadeStart)).toFixed(3))
        : "1";

      setPhase(clamped < 0.34 ? 0 : clamped < 0.67 ? 1 : 2);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.container}>
      <div ref={stickyRef} className={styles.sticky}>
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
                  <Link href={p.cta.href} className="btn btn--primary btn--sm">
                    {p.cta.label}
                    <Icon name="arrow-right" size={14} />
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
