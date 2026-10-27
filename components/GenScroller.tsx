"use client";

import { useEffect, useRef, useState } from "react";
import { useViewProgress } from "@/lib/scroll";

const RAIL = ["Gen 1", "Gen 2", "Gen 3"];
const SEEK = [1, 2, 4];
const PANELS = 5;
const HOLD = 0.34;
const TRAVEL = 0.32;

export default function GenScroller() {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  const [active, setActive] = useState(0);

  const panelRef = useRef(0);

  useEffect(() => {
    return () => {
      for (const v of videos.current) v?.pause();
    };
  }, []);

  useViewProgress(
    ref,
    (p) => {
      const track = trackRef.current;
      if (!track) return;
      const raw = p * (PANELS - 1);
      const i = Math.floor(raw);
      const f = raw - i;
      const travel = Math.min(1, Math.max(0, (f - HOLD) / TRAVEL));
      const eased = travel * travel * (3 - 2 * travel);
      const index = i + eased;
      track.style.transform = `translate3d(${-index * window.innerWidth}px,0,0)`;
      ref.current?.style.setProperty("--p", p.toFixed(4));
      const rail = Math.round(index);
      const idx = rail < 1.5 ? 0 : rail < 3.5 ? 1 : 2;
      setActive((prev) => (prev === idx ? prev : idx));

      const panel = Math.round(index);
      if (panel !== panelRef.current) {
        panelRef.current = panel;
        videos.current.forEach((v, vi) => {
          if (!v) return;
          const want = vi === 0 ? panel === 1 : panel === 2;
          if (want && v.paused) void v.play().catch(() => {});
          if (!want && !v.paused) v.pause();
        });
      }
    },
    "pin",
  );

  const seek = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const pinRange = el.offsetHeight - window.innerHeight;
    const target = (SEEK[i] + HOLD * 0.5) / (PANELS - 1);
    window.scrollTo({ top: top + pinRange * target, behavior: "smooth" });
  };

  return (
    <section className="gens" ref={ref}>
      <div className="gens__stage">
        <div className="gens__track" ref={trackRef}>
          <article className="gpanel gpanel--intro">
            <p className="eyebrow eyebrow--violet">Gen 1 / Gen 2 / Gen 3</p>
            <h2>There&rsquo;s a problem with swgs today.</h2>
          </article>

          <article className="gpanel gpanel--split">
            <div className="gpanel__copy">
              <p className="eyebrow">Gen 1 &middot; 20 years ago</p>
              <h3>A proxy &ldquo;box&rdquo; was installed in-office.</h3>
              <p>
                SSL-Inspection proxy appliance performed URL filtering for
                organizations. It needed to be installed at every office. And, it
                only worked when you were on-the-network.
              </p>
            </div>
            <div className="gpanel__media">
              <video
                ref={(el) => {
                  videos.current[0] = el;
                }}
                src="/media/gen1.mp4"
                poster="/media/gen1-box.png"
                preload="none"
                muted
                playsInline
                loop
              />
            </div>
          </article>

          <article className="gpanel gpanel--split">
            <div className="gpanel__copy">
              <p className="eyebrow">Gen 2 &middot; 10 years ago</p>
              <h3>Internet is re-routed to a data center.</h3>
              <p>
                Hosted SSL-Inspection proxy performs filtering-as-a-service in
                multiple &ldquo;Points of Presence&rdquo; using a traffic-steering
                agent. Downgrades to HTTP/1.1, much slower, unreliable.
              </p>
              <div className="gpanel__badges">
                <span className="badge">Slow &amp; Expensive</span>
                <span className="badge">Unreliable</span>
              </div>
            </div>
            <div className="gpanel__media">
              <video
                ref={(el) => {
                  videos.current[1] = el;
                }}
                src="/media/gen2.mp4"
                preload="metadata"
                muted
                playsInline
                loop
              />
            </div>
          </article>

          <article className="gpanel gpanel--stopover">
            <div>
              <img src="/media/airplane.svg" alt="" />
              <h3>It&rsquo;s like taking a stopover flight.</h3>
              <div className="gpanel__badges">
                <span className="badge">Not End-To-End Encrypted</span>
              </div>
            </div>
          </article>

          <article className="gpanel gpanel--gen3">
            <div className="gpanel__copy">
              <p className="eyebrow eyebrow--violet">
                Gen 3 SWG &middot; dope.security
              </p>
              <h3>The proxy is on your device.</h3>
              <p>
                <b>No</b> stopovers. From SSL Inspection to URL filtering to Cloud
                App Controls, everything is processed <i>on your</i> device.
                Works in <i>any country</i>, any network, fast &amp; reliable.
              </p>
            </div>
            <div className="gpanel__stage">
              <img className="gpanel__globe" src="/media/globe.svg" alt="" />
              <img className="gpanel__ring" src="/media/spin-ring.svg" alt="" />
              <img className="gpanel__laptop" src="/media/laptop.webp" alt="" />
              <img className="gpanel__box" src="/media/swg-box.svg" alt="" />
            </div>
          </article>
        </div>

        <div className="gens__route" aria-hidden="true">
          <span className="gens__plane" />
        </div>

        <nav className="gens__rail" aria-label="Generations">
          {RAIL.map((label, i) => (
            <button
              key={label}
              type="button"
              data-active={active === i}
              onClick={() => seek(i)}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>
    </section>
  );
}
