"use client";

import { useRef } from "react";
import { useViewProgress } from "@/lib/scroll";

const CARDS = [
  ["pod-michael.webp", "Michael Keithley", "CISO, United Talent Agency"],
  ["pod-royce.webp", "Royce Markose", "CISO, Vistrada"],
  ["pod-david.webp", "David Christensen", "CISO, PlanSource"],
  ["pod-rohit.webp", "Rohit Parchuri", "CISO, Yext"],
] as const;

const MARQUEE = "CISO · DOPE × ".repeat(8);

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);

  useViewProgress(
    ref,
    (p) => {
      ref.current?.style.setProperty("--p", p.toFixed(4));
    },
    "pin",
  );

  return (
    <section className="cisos" id="cisos" ref={ref}>
      <div className="cisos__stage">
        <div className="cisos__bg" />

        <div className="cisos__marquee" aria-hidden="true">
          <span>{MARQUEE}</span>
        </div>

        <div className="cisos__deck">
          {CARDS.map(([img, name, role], i) => (
            <article
              className="ccard"
              key={name}
              style={{ "--d": i - 1.5 } as React.CSSProperties}
              aria-label={`${name} — ${role}`}
            >
              <img src={`/media/${img}`} alt={`${name}, ${role}`} />
            </article>
          ))}
        </div>

        <a className="cisos__watch" href="https://dope.security/podcast">
          Watch
        </a>
      </div>
    </section>
  );
}
