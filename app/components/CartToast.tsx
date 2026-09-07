"use client";

import { useEffect, useState } from "react";
import { currency } from "../lib/products";
import { useStore } from "../lib/store";
import { Bag } from "./icons";

export default function CartToast() {
  const { cartCount, cartTotal, lastAdded } = useStore();
  const [dismissed, setDismissed] = useState(0);

  /* Derived from the cart rather than set in an effect: the toast is showing
     whenever the latest add has not been dismissed yet. Keying on cartCount
     means adding the same product twice re-announces it. */
  const open = cartCount > 0 && dismissed !== cartCount;

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => setDismissed(cartCount), 2800);
    return () => clearTimeout(t);
  }, [open, cartCount]);

  return (
    <div
      aria-live="polite"
      className={`fixed inset-x-4 bottom-5 z-[60] flex justify-center transition-all duration-300 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:justify-end ${
        open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      {cartCount > 0 && (
        <div className="bg-ink flex items-center gap-3 rounded-full py-2.5 pr-5 pl-3 text-white shadow-[var(--shadow-float)]">
          <span className="bg-signal grid size-8 shrink-0 place-items-center rounded-full">
            <Bag className="size-4" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-[13.5px] leading-tight font-medium">
              Added — {lastAdded}
            </p>
            <p className="font-mono text-[11px] text-white/55 tabular-nums">
              {cartCount} {cartCount === 1 ? "item" : "items"} · {currency(cartTotal)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
