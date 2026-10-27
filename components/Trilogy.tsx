"use client";

import { useRef, useState } from "react";
import { useViewProgress } from "@/lib/scroll";

const TABS = [
  {
    label: "dope.swg",
    heading: "The On-Device Proxy for Mac & Windows, with AI Powered Endpoint DLP",
    body: "Easy to deploy, consistently secures remote workers, and won't re-route your traffic to a data center. Up to 4x performance over legacy SWGs.",
    cta: "Learn More",
    href: "/dope-swg",
    shot: "/media/trilogy-swg.webp",
  },
  {
    label: "+ casb_neural",
    heading: "Cloud DLP Powered by AI",
    body: "One-click activation to start scanning your Google & Microsoft 365 drive for an LLM-powered categorization of sensitive, publicly-exposed files.",
    cta: "Learn More",
    href: "/casb-neural",
    shot: "/media/trilogy-casb.webp",
  },
  {
    label: "+ dope.vpn",
    heading: "On-Device Proxy and LLM-Powered CASB meets Fly Direct VPN",
    body: "Create point-to-point connections to your behind-the-firewall applications. Coming soon—inquire to learn more",
    cta: "Inquire",
    href: "mailto:sales@dope.security?subject=I'm interested in Private_Access",
    shot: "/media/trilogy-swg.webp",
  },
];

const CHIPS: [string, React.CSSProperties, number][] = [
  ["chip-google.webp", { top: "12%", left: "-4%", width: 170 }, -2.4],
  ["chip-progress.webp", { top: "34%", left: "-7%", width: 150 }, -1.2],
  ["chip-m365.webp", { top: "58%", left: "-5%", width: 190 }, 2.2],
  ["chip-slack.webp", { top: "16%", right: "-5%", width: 150 }, 1.6],
  ["chip-chatgpt.webp", { top: "44%", right: "-6%", width: 160 }, -1.8],
  ["chip-analytics.webp", { bottom: "-4%", right: "6%", width: 210 }, 2.8],
];

export default function Trilogy() {
  const ref = useRef<HTMLElement>(null);
  const [tab, setTab] = useState(0);

  useViewProgress(ref, (p) => {
    ref.current?.style.setProperty("--p", p.toFixed(4));
  });

  const current = TABS[tab];

  return (
    <section className="trilogy wrap" id="trilogy" ref={ref}>
      <h2 className="trilogy__head">
        <span>Experience</span> <span className="dim">the</span>{" "}
        <span className="slang">Trilogy</span>
      </h2>
      <p className="trilogy__sub">
        and the <span className="slang">power</span> of dope.security
      </p>

      <div className="trilogy__ui">
        <div className="trilogy__bar">
          <span className="trilogy__dot" />
          <span className="trilogy__dot" />
          <span className="trilogy__dot" />
          <span className="trilogy__url">dope.security / {current.label}</span>
        </div>
        <div className="trilogy__media">
          <img className="trilogy__shot" src={current.shot} alt="" />
          {tab === 0 && (
            <img
              className="trilogy__overlay"
              src="/media/trilogy-dlp.png"
              alt=""
            />
          )}
        </div>
        {CHIPS.map(([img, pos, d]) => (
          <span
            className="chip"
            key={img}
            style={{ ...pos, "--d": d } as React.CSSProperties}
          >
            <img src={`/media/${img}`} alt="" />
          </span>
        ))}
      </div>

      <div className="trilogy__menu" role="tablist">
        {TABS.map((t, i) => (
          <button
            key={t.label}
            type="button"
            role="tab"
            aria-selected={tab === i}
            data-active={tab === i}
            className={`trilogy__tab${i === 2 ? " trilogy__tab--soon" : ""}`}
            onClick={() => setTab(i)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="trilogy__panel" role="tabpanel">
        <h3>{current.heading}</h3>
        <div>
          <p>{current.body}</p>
          <a
            className="trilogy__more"
            href={current.href}
            {...(current.href.startsWith("http")
              ? { target: "_blank", rel: "noopener" }
              : {})}
          >
            {current.cta} →
          </a>
        </div>
      </div>
    </section>
  );
}
