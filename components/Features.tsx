"use client";

import { useEffect, useRef } from "react";
import { useViewProgress } from "@/lib/scroll";

const ROWS = [
  ["SSL Inspection", "https://dope.security/post/instantly-bypass-ssl-errors-7c5496449d42"],
  ["URL Filtering", "https://dope.security/post/what-is-url-filtering-bf8452ace722"],
  ["Block Personal Email", "https://dope.security/post/blocking-personal-uploads-with-cloud-app-controls"],
  ["Detect Shadow IT/AI", "https://dope.security/post/one-click-ai-blocking-and-shadow-ai-detection"],
  ["Instant Policy Push", "https://dope.security/post/real-time-policy-updates-for-secure-web-gateway-fd91011c9f61"],
  ["AI Endpoint DLP", "https://dope.security/post/meet-dopamine-dlp"],
  ["AI Cloud DLP", "https://dope.security/post/what-is-casb-neural"],
  ["Beautiful UX", "https://dope.security/post/cybersecurity-can-be-design-first-too-73468472fcae"],
] as const;

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/*#+_";
const FRAMES = 26;

export default function Features() {
  const ref = useRef<HTMLElement>(null);
  const spans = useRef<(HTMLSpanElement | null)[]>([]);

  useViewProgress(ref, (p) => {
    ref.current?.style.setProperty("--p", p.toFixed(4));
  });

  useEffect(() => {
    const list = ref.current;
    if (!list) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let start = 0;

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        start = performance.now();

        const step = (now: number) => {
          const t = (now - start) / FRAMES;
          ROWS.forEach((row, i) => {
            const span = spans.current[i];
            if (!span) return;
            const local = t - i * 1.6;
            const [label] = row;
            if (local <= 0) {
              span.textContent = "";
              return;
            }
            span.textContent = [...label]
              .map((ch, idx) => {
                const settle = (idx / label.length) * 20;
                if (ch === " ") return " ";
                if (local > settle) return ch;
                return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
              })
              .join("");
          });

          if (t < FRAMES) {
            raf = requestAnimationFrame(step);
          } else {
            ROWS.forEach(([label], i) => {
              const span = spans.current[i];
              if (span) span.textContent = label;
            });
          }
        };

        raf = requestAnimationFrame(step);
      },
      { threshold: 0.35, rootMargin: "0px 0px -10% 0px" },
    );

    io.observe(list);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="features" id="features" ref={ref}>
      <div className="wrap">
        <h2 className="stamp features__stamp">Features</h2>
      </div>
      <ul className="features__list wrap">
        {ROWS.map(([label, href], i) => (
          <li key={label}>
            <a
              className="frow"
              href={href}
              target="_blank"
              rel="noopener"
              style={
                {
                  "--i": i,
                  "--dir": i % 2 ? 1 : -1,
                } as React.CSSProperties
              }
            >
              <span
                className="frow__text"
                ref={(el) => {
                  spans.current[i] = el;
                }}
              >
                {label}
              </span>
              <svg
                className="frow__arrow"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M21.866 44.7588L16.7953 39.7626L23.1337 33.8717C26.9367 30.2923 29.8449 30.9635 32.9768 30.5906V27.4587H3V20.3001H32.9768V17.1682C29.8449 16.7953 26.9367 17.3919 23.432 14.1854L16.7953 7.99614L21.866 3L44.2368 23.8794L21.866 44.7588Z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
