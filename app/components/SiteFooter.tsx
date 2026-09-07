"use client";

import { useState } from "react";
import { footerNav, reassurance } from "../lib/products";
import { ArrowRight, Nova } from "./icons";
import { Shell } from "./ui";

export default function SiteFooter() {
  const [signedUp, setSignedUp] = useState(false);

  return (
    <footer id="contact" className="bg-ink scroll-mt-24 text-white">
      {/* Reassurance strip — the last thing read before the small print */}
      <div id="about" className="scroll-mt-24" />
      <Shell>
        <ul className="grid gap-x-8 gap-y-7 border-b border-white/12 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:py-12">
          {reassurance.map((r) => (
            <li key={r.title} className="flex gap-3">
              <Nova className="text-signal mt-1 size-3 shrink-0" />
              <div>
                <p className="text-[14px] leading-tight font-medium">{r.title}</p>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-white/55">{r.note}</p>
              </div>
            </li>
          ))}
        </ul>
      </Shell>

      <Shell>
        <div className="grid gap-10 py-12 lg:grid-cols-12 lg:gap-8 lg:py-16">
          {/* Brand + newsletter */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2">
              <Nova className="text-signal size-4" />
              <span className="display text-[19px] tracking-[-0.05em] uppercase">Novatrend</span>
            </div>
            <p className="mt-4 max-w-sm text-[13.5px] leading-relaxed text-white/60">
              Considered everyday equipment, made in Portugal and Japan. Stocked long
              enough to repair, and priced the same all year.
            </p>

            <form
              className="mt-7 max-w-sm"
              onSubmit={(e) => {
                e.preventDefault();
                setSignedUp(true);
              }}
            >
              <label htmlFor="email" className="meta text-white/50">
                Restock and new-arrival emails
              </label>
              {signedUp ? (
                <p
                  className="text-signal mt-3 flex items-center gap-2 text-[14px]"
                  role="status"
                >
                  <Nova className="size-3" />
                  <span className="text-white">You are on the list.</span>
                </p>
              ) : (
                <div className="mt-3 flex gap-2">
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="h-11 min-w-0 flex-1 rounded-full border border-white/20 bg-white/[0.06] px-4 text-[14px] text-white placeholder:text-white/35 focus:border-white/50 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-signal hover:bg-signal-deep inline-flex h-11 shrink-0 items-center gap-2 rounded-full px-5 text-[14px] font-medium transition-colors"
                  >
                    Sign up
                    <ArrowRight className="size-4" />
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Nav columns */}
          <div className="grid gap-8 sm:grid-cols-3 lg:col-span-6 lg:col-start-7">
            {footerNav.map((col) => (
              <nav key={col.heading} aria-label={col.heading}>
                <h2 className="meta text-white/45">{col.heading}</h2>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#top"
                        className="text-[13.5px] text-white/75 transition-colors hover:text-white"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
      </Shell>

      <Shell>
        <div className="flex flex-col gap-4 border-t border-white/12 py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11.5px] text-white/40">
            © 2026 Novatrend BV, Rotterdam · Demo storefront
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {["Privacy", "Terms", "Cookies", "Accessibility"].map((l) => (
              <a
                key={l}
                href="#top"
                className="text-[12.5px] text-white/50 transition-colors hover:text-white"
              >
                {l}
              </a>
            ))}
          </div>
        </div>
        <p className="pb-8 font-mono text-[10.5px] leading-relaxed text-white/25">
          Placeholder content. Products, prices and reviews are invented; photography is
          licensed stock from Unsplash, standing in for the real catalogue.
        </p>
      </Shell>
    </footer>
  );
}
