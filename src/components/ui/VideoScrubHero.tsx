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

// [videoTimeFraction (0–1 of duration), scale] — 2 slides only, no zoom on mobile
const MOB_SLIDES: [number, number][] = [
  [0.0, 1.0],  // slide 0: boat side view
  [1.0, 1.0],  // slide 1: full rotation to front
];

export default function VideoScrubHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef    = useRef<HTMLDivElement>(null);
  const videoRef     = useRef<HTMLVideoElement>(null);
  const [phase, setPhase]             = useState(0);
  const [mobileSlide, setMobileSlide] = useState(0);

  useEffect(() => {
    const video     = videoRef.current;
    const container = containerRef.current;
    const sticky    = stickyRef.current;
    if (!video || !container || !sticky) return;

    const mob = () => window.innerWidth < 768;

    const initVideo = () => {
      video.pause();
      video.currentTime = 0;
      video.style.transform = "scale(1.0)";
    };
    if (video.readyState >= 1) initVideo();
    else video.addEventListener("loadedmetadata", initVideo, { once: true });

    /* ── DESKTOP: scroll-scrub ──────────────────────────────────── */
    let desktopRaf: number | null = null;

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
        video.style.transform = "scale(1.0)";
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

      if (desktopRaf !== null) cancelAnimationFrame(desktopRaf);
      desktopRaf = requestAnimationFrame(() => {
        if (video.duration && video.readyState >= 2) {
          // Only scrub through first 50% of clip → boat turns slower
          video.currentTime = clamped * video.duration * 0.5;
        }
        // Zoom 1× → 1.9× as scroll progresses
        video.style.transform = `scale(${(1.0 + clamped * 0.9).toFixed(4)})`;
        desktopRaf = null;
      });

      const fadeStart = 0.78;
      sticky.style.opacity = clamped >= fadeStart
        ? String((1 - (clamped - fadeStart) / (1 - fadeStart)).toFixed(3))
        : "1";

      setPhase(clamped < 0.34 ? 0 : clamped < 0.67 ? 1 : 2);
    };

    /* ── MOBILE: horizontal swipe slides ───────────────────────── */
    let mobSlide = 0;
    let mobRaf: number | null = null;
    let tx0 = 0, ty0 = 0;

    const animateTo = (target: number) => {
      if (target < 0 || target >= MOB_SLIDES.length) return;
      const vd = (video.duration && video.duration > 0) ? video.duration : 10;
      const [fromFrac, fromS] = MOB_SLIDES[mobSlide];
      const [toFrac,   toS  ] = MOB_SLIDES[target];
      const fromT = fromFrac * vd;
      const toT   = toFrac   * vd;
      mobSlide = target;
      setMobileSlide(target);
      setPhase(target);

      if (mobRaf !== null) cancelAnimationFrame(mobRaf);
      const animDur = 900, t0 = performance.now();
      const step = (now: number) => {
        const raw  = Math.min((now - t0) / animDur, 1);
        const ease = 1 - (1 - raw) ** 3;
        if (video.readyState >= 2) video.currentTime = fromT + (toT - fromT) * ease;
        video.style.transform = `scale(${(fromS + (toS - fromS) * ease).toFixed(4)})`;
        mobRaf = raw < 1 ? requestAnimationFrame(step) : null;
      };
      mobRaf = requestAnimationFrame(step);
    };

    const onTouchStart = (e: TouchEvent) => {
      if (!mob()) return;
      tx0 = e.touches[0].clientX;
      ty0 = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!mob()) return;
      const dx = e.touches[0].clientX - tx0;
      const dy = e.touches[0].clientY - ty0;
      if (Math.abs(dx) > Math.abs(dy) * 1.2 && Math.abs(dx) > 10) e.preventDefault();
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (!mob()) return;
      const dx = e.changedTouches[0].clientX - tx0;
      const dy = e.changedTouches[0].clientY - ty0;
      if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;
      if (dx < 0) {
        if (mobSlide === MOB_SLIDES.length - 1) {
          // Last slide: scroll past hero into Toyota cards
          window.scrollTo({ top: container.offsetTop + container.offsetHeight, behavior: "smooth" });
        } else {
          animateTo(mobSlide + 1);
        }
      } else {
        animateTo(mobSlide - 1);
      }
    };

    /* ── Resize: reset on breakpoint change ─────────────────────── */
    const onResize = () => {
      if (mob()) {
        if (desktopRaf !== null) { cancelAnimationFrame(desktopRaf); desktopRaf = null; }
        sticky.style.cssText = "";
      } else {
        onScroll();
      }
    };

    onResize();
    window.addEventListener("scroll",     onScroll,      { passive: true  });
    window.addEventListener("resize",     onResize,      { passive: true  });
    sticky.addEventListener("touchstart", onTouchStart,  { passive: true  });
    sticky.addEventListener("touchmove",  onTouchMove,   { passive: false });
    sticky.addEventListener("touchend",   onTouchEnd,    { passive: true  });

    return () => {
      if (desktopRaf !== null) cancelAnimationFrame(desktopRaf);
      if (mobRaf     !== null) cancelAnimationFrame(mobRaf);
      window.removeEventListener("scroll",     onScroll);
      window.removeEventListener("resize",     onResize);
      sticky.removeEventListener("touchstart", onTouchStart);
      sticky.removeEventListener("touchmove",  onTouchMove);
      sticky.removeEventListener("touchend",   onTouchEnd);
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

        {/* Desktop: vertical scroll line */}
        <div className={styles.scrollHint} aria-hidden="true"><span /></div>

        {/* Mobile: swipe dots + label */}
        <div className={styles.swipeHint} aria-label="Sveip til sida for å utforska">
          <div className={styles.swipeDots}>
            {MOB_SLIDES.map((_, i) => (
              <span
                key={i}
                className={`${styles.dot} ${mobileSlide === i ? styles.dotActive : ""}`}
              />
            ))}
          </div>
          <span className={styles.swipeLabel}>
            {mobileSlide < MOB_SLIDES.length - 1 ? "← sveip →" : "scroll ned ↓"}
          </span>
        </div>
      </div>
    </div>
  );
}
