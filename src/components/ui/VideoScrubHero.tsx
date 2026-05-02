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

const MOB_PHASE_COUNT = phases.length;

export default function VideoScrubHero() {
  const containerRef  = useRef<HTMLDivElement>(null);
  const stickyRef     = useRef<HTMLDivElement>(null);
  const videoRef      = useRef<HTMLVideoElement>(null);
  const [phase, setPhase]             = useState(0);
  const [mobileSlide, setMobileSlide] = useState(0);

  useEffect(() => {
    const video     = videoRef.current;
    const container = containerRef.current;
    const sticky    = stickyRef.current;
    if (!video || !container || !sticky) return;

    const mob = () => window.innerWidth < 768;

    /* ── VIDEO INIT ──────────────────────────────────────────────────
       Desktop: pause immediately so scroll-scrub takes over.
       Mobile:  autoPlay handles initial start; reverse loop manages
                subsequent cycles — no `loop` attribute needed.
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

    /* ── MOBILE: forward → reverse → forward loop ───────────────────
       When the clip ends, play it backward at real-time speed using
       delta-time RAF. When it reaches 0, call play() again.
    ─────────────────────────────────────────────────────────────── */
    let revRaf: number | null = null;

    const startReverse = () => {
      video.pause();
      if (revRaf !== null) cancelAnimationFrame(revRaf);
      let prev = performance.now();
      const rev = (now: number) => {
        const dt = (now - prev) / 1000;
        prev = now;
        video.currentTime = Math.max(0, video.currentTime - dt);
        if (video.currentTime <= 0.02) {
          revRaf = null;
          video.play().catch(() => {});
        } else {
          revRaf = requestAnimationFrame(rev);
        }
      };
      revRaf = requestAnimationFrame(rev);
    };

    const onVideoEnded = () => { if (mob()) startReverse(); };
    video.addEventListener("ended", onVideoEnded);

    /* ── MOBILE: swipe to advance text phase ────────────────────────
       Video plays its loop independently; swipe only changes the
       text overlay. Last slide → left-swipe scrolls to next section.
    ─────────────────────────────────────────────────────────────── */
    let mobPhase = 0;
    let tx0 = 0, ty0 = 0;

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
        if (mobPhase >= MOB_PHASE_COUNT - 1) {
          window.scrollTo({ top: container.offsetTop + container.offsetHeight, behavior: "smooth" });
        } else {
          mobPhase++;
          setPhase(mobPhase);
          setMobileSlide(mobPhase);
        }
      } else if (mobPhase > 0) {
        mobPhase--;
        setPhase(mobPhase);
        setMobileSlide(mobPhase);
      }
    };

    sticky.addEventListener("touchstart", onTouchStart, { passive: true  });
    sticky.addEventListener("touchmove",  onTouchMove,  { passive: false });
    sticky.addEventListener("touchend",   onTouchEnd,   { passive: true  });

    /* ── DESKTOP: lerp scroll-scrub ─────────────────────────────────
       `target`  = raw scroll progress 0–1, updated on every scroll.
       `current` = lerped toward target at 15% per frame — eliminates
                   seek jitter caused by discrete scroll-event timing.
       Opacity and phase use `target` directly for instant text response.
    ─────────────────────────────────────────────────────────────── */
    let target  = 0;
    let current = 0;
    let tickRaf: number | null = null;

    const tick = () => {
      const delta = target - current;
      if (Math.abs(delta) > 0.00005) {
        current += delta * 0.15;
        if (video.duration && video.readyState >= 2) {
          // Map 0→FREEZE_AT of `current` to the full first-half of the clip
          // so rotation completes exactly when phase 2 kicks in
          const progress = Math.min(current / 0.585, 1);
          video.currentTime = progress * video.duration * 0.5;
        }
        video.style.transform = `scale(${(1.0 + current * 0.9).toFixed(4)})`;
      }
      tickRaf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      const scrollY      = window.scrollY;
      const rect         = container.getBoundingClientRect();
      const containerTop = scrollY + rect.top;
      const scrollRange  = container.offsetHeight - window.innerHeight;

      /* ── Mobile: no fade — hero scrolls away as a normal section ── */
      if (mob()) return;

      /* ── Desktop: full scroll-scrub ──────────────────────────── */
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

      // Freeze video scrub once rotation is done — boat holds still for phase 2
      // 510vh container → 410vh scroll range; 120/120/120/50vh
      const FREEZE_AT = 0.585; // 240/410
      target = Math.min(clamped, FREEZE_AT);

      const fadeStart = 0.878; // 360/410
      sticky.style.opacity = clamped >= fadeStart
        ? String((1 - (clamped - fadeStart) / (1 - fadeStart)).toFixed(3))
        : "1";

      setPhase(clamped < 0.293 ? 0 : clamped < FREEZE_AT ? 1 : 2);
    };

    /* ── RESIZE: switch between mobile loop and desktop scrub ─────── */
    const onResize = () => {
      if (mob()) {
        if (tickRaf !== null) { cancelAnimationFrame(tickRaf); tickRaf = null; }
        // Clear only positioning — scroll handler manages opacity
        sticky.style.position = "";
        sticky.style.top      = "";
        sticky.style.bottom   = "";
        sticky.style.width    = "";
        if (video.paused && revRaf === null) video.play().catch(() => {});
        onScroll();
      } else {
        if (revRaf !== null) { cancelAnimationFrame(revRaf); revRaf = null; }
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
      if (revRaf  !== null) cancelAnimationFrame(revRaf);
      video.removeEventListener("ended",      onVideoEnded);
      window.removeEventListener("scroll",    onScroll);
      window.removeEventListener("resize",    onResize);
      sticky.removeEventListener("touchstart", onTouchStart);
      sticky.removeEventListener("touchmove",  onTouchMove);
      sticky.removeEventListener("touchend",   onTouchEnd);
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.container}>
      <div ref={stickyRef} className={styles.sticky}>
        {/* No `loop` — mobile forward/reverse cycle managed in JS */}
        <video
          ref={videoRef}
          src="/videos/summer-fun.mp4"
          preload="auto"
          autoPlay
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
            {phases.map((_, i) => (
              <span key={i} className={`${styles.dot} ${mobileSlide === i ? styles.dotActive : ""}`} />
            ))}
          </div>
          <span className={styles.swipeLabel}>
            {mobileSlide < MOB_PHASE_COUNT - 1 ? "← sveip →" : "scroll ned ↓"}
          </span>
        </div>
      </div>
    </div>
  );
}
