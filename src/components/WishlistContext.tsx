'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type WishlistContextType = {
  items: string[];
  toggle: (id: string) => void;
  has: (id: string) => boolean;
};

const WishlistContext = createContext<WishlistContextType>({ items: [], toggle: () => {}, has: () => false });

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('wishlist');
      if (saved) setItems(JSON.parse(saved));
    } catch {}
  }, []);

  const toggle = (id: string) => {
    setItems((prev) => {
      const next = prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id];
      localStorage.setItem('wishlist', JSON.stringify(next));
      return next;
    });
  };

  const has = (id: string) => items.includes(id);

  return <WishlistContext.Provider value={{ items, toggle, has }}>{children}</WishlistContext.Provider>;
}

export const useWishlist = () => useContext(WishlistContext);
