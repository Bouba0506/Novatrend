"use client";

import { useEffect, useState } from "react";
import { promos } from "../lib/products";
import { Nova } from "./icons";

export default function AnnouncementBar() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const t = setInterval(() => setI((n) => (n + 1) % promos.length), 4600);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="bg-signal text-white">
      <div className="mx-auto flex h-9 max-w-[86rem] items-center justify-center gap-3 overflow-hidden px-5">
        <Nova className="size-2.5 shrink-0 opacity-70" />
        <p
          key={i}
          className="meta anim-rise truncate text-center text-[10.5px] text-white/95 sm:text-[11px]"
          aria-live="polite"
        >
          {promos[i]}
        </p>
        <Nova className="size-2.5 shrink-0 opacity-70" />
      </div>
    </div>
  );
}
