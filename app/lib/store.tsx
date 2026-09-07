"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type StoreValue = {
  cartCount: number;
  cartTotal: number;
  lastAdded: string | null;
  addToCart: (id: string, name: string, price: number) => void;
  wishlist: Set<string>;
  toggleWish: (id: string) => void;
};

const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<Record<string, { qty: number; price: number }>>({});
  const [lastAdded, setLastAdded] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());

  const addToCart = useCallback((id: string, name: string, price: number) => {
    setLines((prev) => ({
      ...prev,
      [id]: { qty: (prev[id]?.qty ?? 0) + 1, price },
    }));
    setLastAdded(name);
  }, []);

  const toggleWish = useCallback((id: string) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const value = useMemo<StoreValue>(() => {
    const entries = Object.values(lines);
    return {
      cartCount: entries.reduce((n, l) => n + l.qty, 0),
      cartTotal: entries.reduce((n, l) => n + l.qty * l.price, 0),
      lastAdded,
      addToCart,
      wishlist,
      toggleWish,
    };
  }, [lines, lastAdded, wishlist, addToCart, toggleWish]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
