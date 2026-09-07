"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowRight, Nova } from "./icons";
import Reveal from "./Reveal";
import { Shell } from "./ui";

/** The sale closes at 23:59 on the coming Sunday, and rolls to the next
 *  week once it does — so the clock is always telling the truth. */
function nextSunday() {
  const d = new Date();
  const daysAhead = (7 - d.getDay()) % 7;
  d.setDate(d.getDate() + daysAhead);
  d.setHours(23, 59, 59, 999);
  if (d.getTime() <= Date.now()) d.setDate(d.getDate() + 7);
  return d.getTime();
}

type Parts = { d: number; h: number; m: number; s: number };

function split(ms: number): Parts {
  const t = Math.max(0, Math.floor(ms / 1000));
  return {
    d: Math.floor(t / 86400),
    h: Math.floor((t % 86400) / 3600),
    m: Math.floor((t % 3600) / 60),
    s: t % 60,
  };
}

export default function PromoDuo() {
  /* null until mounted, so the server and client markup agree. */
  const [parts, setParts] = useState<Parts | null>(null);

  useEffect(() => {
    const target = nextSunday();
    const tick = () => setParts(split(target - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const units: [string, number | null][] = [
    ["Days", parts?.d ?? null],
    ["Hrs", parts?.h ?? null],
    ["Min", parts?.m ?? null],
    ["Sec", parts?.s ?? null],
  ];

  return (
    <section className="pb-16 lg:pb-24">
      <Shell>
        <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
          {/* ── Flash sale ─────────────────────────────────────── */}
          <Reveal className="h-full">
            <div className="rounded-tile bg-signal relative flex h-full flex-col overflow-hidden p-7 text-white sm:p-9">
              <Nova className="absolute -top-10 -right-10 size-48 text-white/[0.07]" />

              <p className="meta flex items-center gap-2 text-white/75">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-white" />
                </span>
                Live now
              </p>

              <h2 className="display mt-4 text-[clamp(2rem,4vw,2.9rem)]">Winter Field Sale</h2>
              <p className="mt-3 max-w-sm text-[14.5px] leading-relaxed text-white/80">
                Up to 30% off shells, fleece and carry. No code needed — the price on the
                card is the price you pay.
              </p>

              <div className="mt-7 flex gap-2.5" role="timer" aria-label="Time left in the sale">
                {units.map(([label, value]) => (
                  <div
                    key={label}
                    className="min-w-[62px] flex-1 rounded-xl bg-white/12 px-2 py-3 text-center backdrop-blur-sm"
                  >
                    <p className="font-mono text-[26px] leading-none font-medium tabular-nums">
                      {value === null ? "--" : String(value).padStart(2, "0")}
                    </p>
                    <p className="meta mt-1.5 text-[9px] text-white/65">{label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-7">
                <a
                  href="#new-arrivals"
                  className="text-signal group inline-flex h-12 items-center gap-2.5 rounded-full bg-white px-6 text-[14.5px] font-medium transition-colors hover:bg-white/90"
                >
                  Shop the sale
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </Reveal>

          {/* ── Seasonal collection ────────────────────────────── */}
          <Reveal delay={90} className="h-full">
            <div className="rounded-tile bg-ink relative flex h-full min-h-[380px] flex-col justify-end overflow-hidden p-7 text-white sm:p-9">
              <Image
                src="/img/banner-season.jpg"
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="object-cover object-center opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" />

              <div className="relative">
                <p className="meta text-white/70">New collection</p>
                <h2 className="display mt-3 text-[clamp(2rem,4vw,2.9rem)]">
                  The Overcast
                  <br />
                  Collection
                </h2>
                <p className="mt-3 max-w-sm text-[14.5px] leading-relaxed text-white/80">
                  Twelve pieces in a single weight of fabric, cut to layer with each other
                  and nothing else.
                </p>
                <a
                  href="#categories"
                  className="group mt-7 inline-flex h-12 items-center gap-2.5 rounded-full border border-white/35 px-6 text-[14.5px] font-medium text-white transition-colors hover:border-white hover:bg-white hover:text-ink"
                >
                  See the collection
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </Shell>
    </section>
  );
}
