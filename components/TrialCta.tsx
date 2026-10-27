"use client";

import { useRef } from "react";

const AUTH = "https://api.jetbridge.dope.security/v2/construct-auth-uri?authType=";

export default function TrialCta() {
  const ref = useRef<HTMLElement>(null);

  return (
    <section className="trial" id="trial" ref={ref}>
      <div className="trial__inner">
        <img className="trial__plane" src="/media/airplane.svg" alt="" />
        <h2 className="trial__h">
          <em className="slang">dope</em> offers an instant{" "}
          <span className="mono-chip">production</span> trial. Free for as long
          as you need to test.
        </h2>
        <p className="trial__sub">Try now, on desktop.</p>
        <div className="trial__ctas">
          <a
            className="trial__btn"
            href={`${AUTH}google`}
            target="_blank"
            rel="noopener"
          >
            Try now with Google
          </a>
          <a
            className="trial__btn"
            href={`${AUTH}microsoft`}
            target="_blank"
            rel="noopener"
          >
            Try now with Microsoft
          </a>
        </div>
      </div>
    </section>
  );
}
