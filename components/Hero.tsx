"use client";

import { useRef } from "react";
import { useViewProgress } from "@/lib/scroll";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useViewProgress(
    ref,
    (p) => {
      const el = ref.current;
      if (!el) return;
      el.style.setProperty("--hv", String(1 + Math.max(0, p - 0.5) * 0.12));
      el.style.setProperty("--hy", `${(p - 0.5) * 160}px`);
      el.style.setProperty("--cy", `${(0.5 - p) * 80}px`);
      el.style.setProperty("--ty", `${(0.5 - p) * 170}px`);
    },
    "view",
  );

  return (
    <section className="hero" id="top" ref={ref}>
      <video
        className="hero__video"
        src="/media/hero.mp4"
        poster="/media/hero-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="hero__veil" />

      <div className="hero__inner wrap">
        <div className="hero__copy">
          <h1 className="hero__title">
            <span className="hero__line">
              <span className="dim">Your </span>
              <span className="slang">new</span>
            </span>
            <span className="hero__line">Secure web gateway</span>
            <span className="hero__line">
              <span className="slang-dim">with AI DLP</span>
            </span>
          </h1>

          <a
            className="announce"
            href="https://dope.security/post/meet-dopamine-dlp"
            target="_blank"
            rel="noopener"
          >
            Announcing <b>DopamineAI</b> for DLP
          </a>

          <p className="hero__sub">
            Never re-route the
            <br />
            Internet again.
          </p>

          <a className="hero__watch" href="#features">
            <span>See how in 140s</span>
            <i aria-hidden="true" />
          </a>
        </div>

        <aside className="ticket">
          <img className="ticket__icon" src="/media/ticket-icon.svg" alt="" />
          <div>
            <p className="ticket__kicker">Free Instant Trial</p>
            <p className="ticket__head">
              Deploys on device
              <br />
              in minutes
            </p>
            <div className="ticket__cta">
              <a
                className="pill"
                href="https://api.jetbridge.dope.security/v2/construct-auth-uri?authType=google"
                target="_blank"
                rel="noopener"
              >
                <img src="/media/btn-google.webp" alt="" />
                <span>Try now with Google</span>
              </a>
              <a
                className="pill"
                href="https://api.jetbridge.dope.security/v2/construct-auth-uri?authType=microsoft"
                target="_blank"
                rel="noopener"
              >
                <img src="/media/btn-microsoft.webp" alt="" />
                <span>Try now with Microsoft</span>
              </a>
            </div>
          </div>
          <img className="ticket__barcode" src="/media/barcode.svg" alt="" />
          <span className="ticket__stamp">F* Marketing</span>
        </aside>
      </div>
    </section>
  );
}
