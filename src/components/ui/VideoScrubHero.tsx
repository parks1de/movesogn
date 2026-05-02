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

    const mob = () => window.innerWidth < 768;

    /* ── VIDEO INIT ───────────────────────────────────────────────
       Desktop: pause immediately so manual scrubbing takes over.
       Mobile: autoPlay + loop attributes handle playback.
    ─────────────────────────────────────────────────────────────── */
    const pauseForScrub = () => {
      video.pause();
      video.currentTime = 0;
      video.style.transform = "scale(1.0)";
    };

    if (!mob()) {
      if (video.readyState >= 1) pauseForScrub();
      else video.addEventListener("loadedmetadata", pauseForScrub, { once: true });
    }

    /* ── DESKTOP: lerp scroll-scrub ───────────────────────────────
       `target`  = scroll progress 0–1, updated every scroll event.
       `current` = lerped progress, drives video.currentTime + scale.
       Lerping here means each RAF frame moves 15% closer to target,
       which smooths out the discrete seek jumps and scroll jitter.
    ─────────────────────────────────────────────────────────────── */
    let target  = 0;
    let current = 0;
    let tickRaf: number | null = null;

    const tick = () => {
      const delta = target - current;
      if (Math.abs(delta) > 0.00005) {
        current += delta * 0.15;
        if (video.duration && video.readyState >= 2) {
          video.currentTime = current * video.duration * 0.5;
        }
        video.style.transform = `scale(${(1.0 + current * 0.9).toFixed(4)})`;
      }
      tickRaf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      if (mob()) return;
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
        target = 0;
        setPhase(0);
        return;
      }
      if (scrollY >= containerTop + scrollRange) {
        sticky.style.position = "absolute";
        sticky.style.top      = "";
        sticky.style.bottom   = "0";
        sticky.style.width    = "";
        sticky.style.opacity  = "0";
        target = 1;
        setPhase(2);
        return;
      }

      sticky.style.position = "fixed";
      sticky.style.top      = "0";
      sticky.style.bottom   = "";
      sticky.style.width    = "100%";

      const clamped = (scrollY - containerTop) / scrollRange;
      target = clamped;

      // Opacity and phase: use clamped directly (immediate feels right for text)
      const fadeStart = 0.78;
      sticky.style.opacity = clamped >= fadeStart
        ? String((1 - (clamped - fadeStart) / (1 - fadeStart)).toFixed(3))
        : "1";

      setPhase(clamped < 0.34 ? 0 : clamped < 0.67 ? 1 : 2);
    };

    /* ── RESIZE: switch between mobile (loop) and desktop (scrub) ─ */
    const onResize = () => {
      if (mob()) {
        if (tickRaf !== null) { cancelAnimationFrame(tickRaf); tickRaf = null; }
        sticky.style.cssText = "";
        video.play().catch(() => {});
      } else {
        video.pause();
        if (tickRaf === null) tickRaf = requestAnimationFrame(tick);
        onScroll();
      }
    };

    onResize();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      if (tickRaf !== null) cancelAnimationFrame(tickRaf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.container}>
      <div ref={stickyRef} className={styles.sticky}>
        {/* autoPlay + loop: plays freely on mobile; paused by JS on desktop */}
        <video
          ref={videoRef}
          src="/videos/summer-fun.mp4"
          preload="auto"
          autoPlay
          loop
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
