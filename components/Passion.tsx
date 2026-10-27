"use client";

import { useRef } from "react";
import { useViewProgress } from "@/lib/scroll";

export default function Passion() {
  const ref = useRef<HTMLElement>(null);

  useViewProgress(ref, (p) => {
    ref.current?.style.setProperty("--p", p.toFixed(4));
  });

  return (
    <section className="passion wrap" id="passion" ref={ref}>
      <p className="passion__display" aria-label="Dope is passion">
        <span
          className="passion__w slang"
          style={{ "--d": -1 } as React.CSSProperties}
        >
          Dope
        </span>
        <span
          className="passion__w slang dim"
          style={{ "--d": 0 } as React.CSSProperties}
        >
          is
        </span>
        <span
          className="passion__w"
          style={{ "--d": 1 } as React.CSSProperties}
        >
          pass<span className="passion__i">I</span>on
        </span>
        <i className="passion__caret" aria-hidden="true" />
      </p>

      <div className="passion__foot">
        <h2 className="passion__h">
          Whether your company is <em className="slang">small</em> or{" "}
          <em className="slang">large</em>, we provide a first-class experience.
        </h2>
        <div className="passion__labels">
          <a href="https://dope.security/legal/dpa" target="_blank" rel="noopener">
            GDPR Compliant
          </a>
          <a
            href="https://dope.security/legal/soc-2"
            target="_blank"
            rel="noopener"
          >
            SOC 2 Type 2
          </a>
        </div>
      </div>
    </section>
  );
}
