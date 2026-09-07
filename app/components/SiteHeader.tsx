"use client";

import { useEffect, useState } from "react";
import { navLinks } from "../lib/products";
import { useStore } from "../lib/store";
import { Bag, Close, Heart, Menu, Nova, Search, User } from "./icons";

const SECTIONS = ["categories", "new-arrivals", "best-sellers"];

export default function SiteHeader() {
  const { cartCount, wishlist } = useStore();
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Scroll-spy so the accent on the nav means something. */
  useEffect(() => {
    const els = SECTIONS.map((id) => document.getElementById(id)).filter(Boolean) as Element[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        stuck
          ? "border-line bg-paper/85 border-b backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="relative mx-auto flex h-16 max-w-[86rem] items-center justify-between gap-4 px-5 sm:px-7 lg:h-[72px] lg:px-10">
        {/* Wordmark */}
        <a href="#top" className="flex shrink-0 items-center gap-2" aria-label="Novatrend, home">
          <Nova className="text-signal size-4" />
          <span className="display text-[17px] tracking-[-0.05em] uppercase sm:text-[19px]">Novatrend</span>
        </a>

        {/* Primary nav */}
        <nav
          className="absolute left-1/2 hidden -translate-x-1/2 lg:block"
          aria-label="Primary"
        >
          <ul className="flex items-center gap-7">
            {navLinks.map((l) => {
              const isActive = !!l.spy && active === l.spy;
              return (
                <li key={l.label}>
                  <a
                    href={l.href}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative py-2 text-[13.5px] font-medium transition-colors ${
                      isActive ? "text-signal" : "text-ink-2 hover:text-ink"
                    }`}
                  >
                    {l.label}
                    <span
                      className={`bg-signal absolute -bottom-0.5 left-0 h-[2px] transition-all duration-300 ${
                        isActive ? "w-full" : "w-0"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Icon cluster */}
        <div className="flex shrink-0 items-center gap-0.5">
          <IconBtn label="Search products">
            <Search className="size-[18px]" />
          </IconBtn>
          <IconBtn label={`Wishlist, ${wishlist.size} saved`} count={wishlist.size} phoneHidden>
            <Heart className="size-[18px]" />
          </IconBtn>
          <IconBtn label="Your account" phoneHidden>
            <User className="size-[18px]" />
          </IconBtn>
          <IconBtn
            label={`Cart, ${cartCount} ${cartCount === 1 ? "item" : "items"}`}
            count={cartCount}
            accent
          >
            <Bag className="size-[18px]" />
          </IconBtn>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="text-ink hover:bg-paper-deep ml-0.5 inline-flex size-9 items-center justify-center rounded-full transition-colors sm:size-10 lg:hidden"
          >
            {open ? <Close className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`border-line bg-paper/95 overflow-hidden border-b backdrop-blur-xl transition-[max-height] duration-400 lg:hidden ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <nav className="px-5 pb-5 sm:px-7" aria-label="Mobile">
          <ul className="divide-line divide-y">
            {navLinks.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-ink flex items-center justify-between py-3.5 text-[15px] font-medium"
                >
                  {l.label}
                  <Nova className="text-line-strong size-2.5" />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

function IconBtn({
  children,
  label,
  count = 0,
  accent = false,
  phoneHidden = false,
}: {
  children: React.ReactNode;
  label: string;
  count?: number;
  accent?: boolean;
  phoneHidden?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className={`text-ink hover:bg-paper-deep relative size-9 items-center justify-center rounded-full transition-colors sm:size-10 ${
        phoneHidden ? "hidden sm:inline-flex" : "inline-flex"
      }`}
    >
      {children}
      {count > 0 && (
        <span
          className={`anim-pop absolute top-1 right-0.5 grid min-w-[17px] place-items-center rounded-full px-1 font-mono text-[10px] leading-[17px] font-medium tabular-nums ${
            accent ? "bg-signal text-white" : "bg-ink text-white"
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
}
