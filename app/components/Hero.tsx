"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { callouts, currency } from "../lib/products";
import { ArrowRight, Nova, Star } from "./icons";
import { Shell } from "./ui";

type Leader = { d: string; nx: number; ny: number; len: number };

export default function Hero() {
  const frameRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [box, setBox] = useState({ w: 0, h: 0 });
  const [leaders, setLeaders] = useState<Leader[]>([]);

  /* Leader lines are measured from the real DOM rather than guessed in
     percentages, so every line lands on its card edge at any width. */
  const measure = useCallback(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const fr = frame.getBoundingClientRect();
    setBox({ w: fr.width, h: fr.height });

    if (window.innerWidth < 1024) {
      setLeaders([]);
      return;
    }

    const next: Leader[] = [];
    callouts.forEach((c, i) => {
      const card = cardRefs.current[i];
      if (!card) return;
      const cr = card.getBoundingClientRect();
      if (!cr.width) return;

      const nx = (c.node.x / 100) * fr.width;
      const ny = (c.node.y / 100) * fr.height;

      const cardLeft = cr.left - fr.left;
      const cardTop = cr.top - fr.top;
      const inset = Math.min(28, cr.width * 0.18);

      /* A leader runs diagonally out of the node, then straight into the
         card edge. Which edge depends on where the card actually sits: side
         entry when the card clears the node horizontally, top or bottom
         entry when it sits directly above or below it. */
      let d: string;
      let len: number;

      if (nx > cardLeft - 8 && nx < cardLeft + cr.width + 8) {
        const below = cardTop > ny;
        const anchorY = below ? cardTop : cardTop + cr.height;
        const anchorX = cardLeft + inset;
        const ey = ny + (below ? 1 : -1) * Math.min(30, Math.abs(anchorY - ny) * 0.34);
        d = `M ${nx} ${ny} L ${anchorX} ${ey} L ${anchorX} ${anchorY}`;
        len = Math.hypot(anchorX - nx, ey - ny) + Math.abs(anchorY - ey);
      } else {
        const anchorY = cardTop + cr.height / 2;
        const attachLeft = cardLeft > nx;
        const anchorX = attachLeft ? cardLeft : cardLeft + cr.width;
        const sign = attachLeft ? 1 : -1;
        const ex = nx + sign * Math.min(30, Math.abs(anchorX - nx) * 0.34);
        d = `M ${nx} ${ny} L ${ex} ${anchorY} L ${anchorX} ${anchorY}`;
        len = Math.hypot(ex - nx, anchorY - ny) + Math.abs(anchorX - ex);
      }

      next.push({ d, nx, ny, len });
    });
    setLeaders(next);
  }, []);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (frameRef.current) ro.observe(frameRef.current);
    window.addEventListener("resize", measure);
    const t = setTimeout(measure, 350); /* re-measure once fonts settle */
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, [measure]);

  return (
    <section id="top" className="relative pt-6 pb-16 lg:pt-10 lg:pb-24">
      <Shell>
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
          {/* ── Type column ──────────────────────────────────────── */}
          <div className="min-w-0 lg:col-span-5">
            <p className="meta text-ink-soft anim-rise flex items-center gap-2">
              <Nova className="text-signal size-2.5" />
              Autumn / Winter 2026
            </p>

            <h1
              className="display anim-rise mt-5 text-[clamp(2.9rem,7.4vw,5.1rem)]"
              style={{ animationDelay: "70ms" }}
            >
              Built for the
              <br />
              <span className="text-signal">long commute</span>
            </h1>

            <p
              className="text-ink-2 anim-rise mt-6 max-w-md text-[16px] leading-relaxed"
              style={{ animationDelay: "150ms" }}
            >
              Six categories, eighty-one products, no seasonal churn. Everything here is
              built to be repaired — and stocked long enough that you can.
            </p>

            <div
              className="anim-rise mt-8 flex flex-wrap gap-3"
              style={{ animationDelay: "220ms" }}
            >
              <a
                href="#new-arrivals"
                className="bg-signal hover:bg-signal-deep group inline-flex h-12 items-center gap-2.5 rounded-full px-6 text-[14.5px] font-medium text-white transition-colors"
              >
                Shop new arrivals
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#best-sellers"
                className="border-line-strong text-ink hover:border-ink inline-flex h-12 items-center rounded-full border px-6 text-[14.5px] font-medium transition-colors"
              >
                See best sellers
              </a>
            </div>

            {/* Social proof */}
            <div
              className="anim-rise mt-9 flex items-center gap-4"
              style={{ animationDelay: "300ms" }}
            >
              <div className="flex -space-x-2.5">
                {[
                  { i: "AK", c: "bg-ink" },
                  { i: "MR", c: "bg-signal" },
                  { i: "JT", c: "bg-ink-2" },
                  { i: "SD", c: "bg-signal-deep" },
                ].map((a) => (
                  <span
                    key={a.i}
                    className={`${a.c} border-paper grid size-8 place-items-center rounded-full border-2 font-mono text-[9.5px] font-medium tracking-tight text-white`}
                  >
                    {a.i}
                  </span>
                ))}
              </div>
              <p className="text-ink-soft text-[13px] leading-tight">
                <span className="text-signal inline-flex translate-y-[1px] items-center gap-1">
                  <Star className="size-3" />
                  <span className="text-ink font-mono font-medium tabular-nums">4.8</span>
                </span>{" "}
                average from{" "}
                <span className="text-ink font-mono font-medium tabular-nums">24,000</span>{" "}
                customers
              </p>
            </div>
          </div>

          {/* ── Annotated photograph ─────────────────────────────── */}
          <div className="min-w-0 lg:col-span-7">
            <div ref={frameRef} className="relative">
              <div className="rounded-tile bg-paper-deep relative aspect-[4/5] overflow-hidden sm:aspect-[5/4] lg:aspect-square">
                <Image
                  src="/img/hero.jpg"
                  alt="A customer on the street in a wool overcoat, sunglasses and leather gloves, carrying shopping bags"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover object-[52%_20%]"
                />
                <span className="meta absolute bottom-4 left-4 rounded-full bg-black/35 px-3 py-1.5 text-[9.5px] text-white/90 backdrop-blur-sm">
                  Fig. 01 — Winter kit, Rotterdam
                </span>
              </div>

              {/* Leader lines, drawn in the frame's own pixel space */}
              {box.w > 0 && leaders.length > 0 && (
                <svg
                  className="pointer-events-none absolute inset-0 hidden lg:block"
                  width={box.w}
                  height={box.h}
                  viewBox={`0 0 ${box.w} ${box.h}`}
                  aria-hidden="true"
                >
                  {leaders.map((l, i) => (
                    <g key={i}>
                      <path
                        d={l.d}
                        fill="none"
                        stroke="var(--color-signal)"
                        strokeWidth="1.25"
                        strokeDasharray={l.len}
                        style={
                          {
                            "--len": l.len,
                            animation: `draw .85s cubic-bezier(.22,1,.36,1) ${420 + i * 130}ms both`,
                          } as CSSProperties
                        }
                      />
                      <circle cx={l.nx} cy={l.ny} r="10" fill="var(--color-signal)" opacity="0.16" />
                      <circle
                        cx={l.nx}
                        cy={l.ny}
                        r="3.5"
                        fill="var(--color-signal)"
                        stroke="#fff"
                        strokeWidth="1.5"
                      />
                    </g>
                  ))}
                </svg>
              )}

              {/* Callout cards — desktop, floating over the frame */}
              {callouts.map((c, i) => (
                <div
                  key={c.id}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  className="anim-pop rounded-card border-line/80 bg-surface/92 absolute z-10 hidden w-[196px] border p-3 shadow-[var(--shadow-float)] backdrop-blur-md transition-transform duration-300 hover:-translate-y-1 lg:block"
                  style={{
                    left: `${c.card.x}%`,
                    top: `${c.card.y}%`,
                    animationDelay: `${520 + i * 130}ms`,
                  }}
                >
                  <p className="meta text-signal text-[9.5px]">{c.category}</p>
                  <p className="text-ink mt-1.5 text-[13.5px] leading-tight font-medium">
                    {c.name}
                  </p>
                  <p className="text-ink mt-1 font-mono text-[13px] tabular-nums">
                    {currency(c.price)}
                  </p>
                </div>
              ))}
            </div>

            {/* Same three products on small screens, without the annotation */}
            <ul className="no-scrollbar mt-4 flex gap-3 overflow-x-auto lg:hidden">
              {callouts.map((c) => (
                <li
                  key={c.id}
                  className="rounded-card border-line bg-surface min-w-[170px] flex-1 border p-3"
                >
                  <p className="meta text-signal text-[9.5px]">{c.category}</p>
                  <p className="text-ink mt-1.5 text-[13.5px] leading-tight font-medium">
                    {c.name}
                  </p>
                  <p className="text-ink mt-1 font-mono text-[13px] tabular-nums">
                    {currency(c.price)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Shell>
    </section>
  );
}
