"use client";

import { useRef } from "react";
import { useViewProgress } from "@/lib/scroll";

const CARDS = [
  ["01", "data center downtime alert", "Zscaler", "/vs/zscaler", "cmp-1.webp"],
  ["02", "complex 15-step configuration", "Netskope", "/vs/netskope", "cmp-2.webp"],
  ["03", "blocking at the DNS level", "Cisco Umbrella", "/vs/cisco-umbrella", "cmp-3.webp"],
  ["04", "Outages Galore", "Forcepoint", "/vs/forcepoint", "cmp-1.webp"],
] as const;

export default function Compare() {
  const ref = useRef<HTMLElement>(null);

  useViewProgress(ref, (p) => {
    ref.current?.style.setProperty("--p", p.toFixed(4));
  });

  return (
    <section className="cmp wrap" id="compare" ref={ref}>
      <img className="cmp__arrow" src="/media/arrow-big.svg" alt="" />
      <h2 className="cmp__head">
        How we compare
        <img className="cmp__glyph" src="/media/compare-glyph.svg" alt="" />
      </h2>

      <div className="cmp__rail">
        <div className="cmp__line" aria-hidden="true" />
        {CARDS.map(([num, label, name, href, img], i) => (
          <a
            className="cmpcard"
            key={num}
            href={href}
            style={
              {
                "--d": i - 1.5,
                backgroundImage: `url(/media/${img})`,
              } as React.CSSProperties
            }
          >
            <span className="cmpcard__label">{label}</span>
            <span className="cmpcard__title">
              <em className="slang">vs.</em> <strong>{name}</strong>
            </span>
            <span className="cmpcard__num">{num}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
