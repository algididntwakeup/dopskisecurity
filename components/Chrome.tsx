"use client";

import { useEffect, useState } from "react";

const LINKS = [
  ["Products", "#features"],
  ["Pricing", "#trial"],
  ["Resources", "#trilogy"],
  ["Manage AI", "#trilogy"],
  ["About", "#passion"],
  ["Customers", "#cisos"],
] as const;

export default function Chrome() {
  const [scrolled, setScrolled] = useState(false);
  const [coord, setCoord] = useState({ lat: 37.3861, lon: 122.0839 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setCoord((c) => ({
        lat: Math.min(37.6, Math.max(37.2, c.lat + (Math.random() - 0.5) * 0.03)),
        lon: Math.min(122.2, Math.max(122.0, c.lon + (Math.random() - 0.5) * 0.03)),
      }));
    }, 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <nav className="nav" data-scrolled={scrolled}>
        <a className="nav__brand" href="#top">
          DOPE.SECURITY
        </a>
        <span className="nav__rule" />
        <ul className="nav__links">
          {LINKS.map(([label, href]) => (
            <li key={label}>
              <a href={href}>{label}</a>
            </li>
          ))}
        </ul>
        <div className="nav__cta">
          <a className="nav__btn nav__btn--fill" href="#trial">
            Book a Demo
          </a>
          <a className="nav__btn" href="#trial">
            Log In
          </a>
        </div>
      </nav>

      <div className="strip" aria-hidden="true">
        <div className="strip__left">
          <span className="strip__plus">+</span>
          <span>Fly Direct</span>
          <span>Secure Web Gateway</span>
        </div>
        <div className="strip__right">
          <span className="strip__coord">
            {coord.lat.toFixed(4)}° N, {coord.lon.toFixed(4)}° W
          </span>
          <span className="strip__made">
            Made With
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
              <path d="M0 5.629v-.157C0 3.285 1.563 1.41 3.719 1.066 5.125.816 6.594 1.285 7.625 2.316L8 2.66l.344-.344C9.375 1.285 10.844.816 12.25 1.066 14.406 1.41 16 3.285 16 5.472v.157c0 1.312-.563 2.562-1.5 3.437L8.844 14.347A1.09 1.09 0 0 1 8 14.66c-.344 0-.656-.094-.875-.313L1.469 9.066A4.72 4.72 0 0 1 0 5.629Z" />
            </svg>
            in California
          </span>
        </div>
      </div>
    </>
  );
}
