"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Icon from "./Icon";
import styles from "./VideoScrubHero.module.css";

export default function VideoScrubHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const onScroll = () => {
      if (!video.duration) return;
      const rect = container.getBoundingClientRect();
      const progress = -rect.top / (rect.height - window.innerHeight);
      video.currentTime = Math.max(0, Math.min(1, progress)) * video.duration;
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
        <div className={`container ${styles.content}`}>
          <span className={styles.eyebrow}>MOVE Sogn</span>
          <h1 className={styles.h1}>
            Me flyttar deg.<br />Gjennom livet.
          </h1>
          <p className={styles.sub}>
            Bil, båt, sykkel og heim — alt du treng for å leva godt i Sogn.
          </p>
          <Link href="/bil" className="btn btn--primary">
            Utforsk MOVE
            <Icon name="arrow-right" size={16} />
          </Link>
        </div>
        <div className={styles.scrollHint} aria-hidden="true"><span /></div>
      </div>
    </div>
  );
}
