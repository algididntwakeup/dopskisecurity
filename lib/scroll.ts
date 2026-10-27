"use client";

import { useEffect, useRef, type RefObject } from "react";

export type Mode = "view" | "pin";

type Entry = {
  el: HTMLElement;
  cb: (p: number) => void;
  mode: Mode;
  last: number;
};

const entries = new Set<Entry>();
let frame = 0;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

function tick() {
  frame = 0;
  const vh = window.innerHeight;
  for (const entry of entries) {
    if (!entry.el.isConnected) {
      entries.delete(entry);
      continue;
    }
    const r = entry.el.getBoundingClientRect();
    const p =
      entry.mode === "pin"
        ? clamp01(-r.top / Math.max(1, entry.el.offsetHeight - vh))
        : clamp01((vh - r.top) / (vh + r.height));
    if (Math.abs(p - entry.last) > 0.0005) {
      entry.last = p;
      entry.cb(p);
    }
  }
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(tick);
}

export function useViewProgress(
  ref: RefObject<HTMLElement | null>,
  cb: (p: number) => void,
  mode: Mode = "view",
) {
  const cbRef = useRef(cb);
  useEffect(() => {
    cbRef.current = cb;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      cbRef.current(0.5);
      return;
    }

    const entry: Entry = {
      el,
      cb: (p) => cbRef.current(p),
      mode,
      last: -1,
    };
    entries.add(entry);
    if (entries.size === 1) {
      addEventListener("scroll", schedule, { passive: true });
      addEventListener("resize", schedule);
    }
    schedule();

    return () => {
      entries.delete(entry);
    };
  }, [ref, mode]);
}
