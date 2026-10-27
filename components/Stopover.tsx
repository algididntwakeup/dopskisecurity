"use client";

import { useRef } from "react";
import { useViewProgress } from "@/lib/scroll";

export default function Stopover() {
  const ref = useRef<HTMLElement>(null);

  useViewProgress(
    ref,
    (p) => {
      ref.current?.style.setProperty("--p", p.toFixed(4));
    },
    "pin",
  );

  return (
    <section className="stop" ref={ref}>
      <div className="stop__stage">
        <img className="stop__img" src="/media/cabin.webp" alt="" />
        <div className="stop__bloom" />
        <div className="stop__copy">
          <p className="stop__a">
            Why would you fly stopover when you could&hellip;
          </p>
          <p className="stop__b">
            Fly <span className="slang">Direct.</span>
          </p>
        </div>
        <img className="stop__plane" src="/media/airplane.svg" alt="" />
      </div>
    </section>
  );
}
