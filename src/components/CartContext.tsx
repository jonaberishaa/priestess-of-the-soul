'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Product } from '@/data/products';
import { salePrice } from '@/data/products';

export type CartItem = {
  product: Product;
  size?: string;
  message?: string;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  add: (product: Product, size?: string, message?: string) => void;
  remove: (productId: string, size?: string) => void;
  updateQuantity: (productId: string, size: string | undefined, quantity: number) => void;
  clear: () => void;
  total: string;
  savings: string;
  count: number;
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
};

const CartContext = createContext<CartContextType>({
  items: [],
  add: () => {},
  remove: () => {},
  updateQuantity: () => {},
  clear: () => {},
  total: '€0',
  savings: '€0',
  count: 0,
  drawerOpen: false,
  openDrawer: () => {},
  closeDrawer: () => {},
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('cart');
      if (saved) setItems(JSON.parse(saved));
    } catch {}
  }, []);

  const save = (next: CartItem[]) => {
    setItems(next);
    localStorage.setItem('cart', JSON.stringify(next));
  };

  const add = (product: Product, size?: string, message?: string) => {
    setItems((prev) => {
      const exists = prev.find(
        (i) => i.product.id === product.id && i.size === size
      );
      let next: CartItem[];
      if (exists) {
        next = prev.map((i) =>
          i.product.id === product.id && i.size === size
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      } else {
        next = [...prev, { product, size, message, quantity: 1 }];
      }
      localStorage.setItem('cart', JSON.stringify(next));
      return next;
    });
  };

  const remove = (productId: string, size?: string) => {
    save(items.filter((i) => !(i.product.id === productId && i.size === size)));
  };

  const updateQuantity = (productId: string, size: string | undefined, quantity: number) => {
    if (quantity <= 0) {
      save(items.filter((i) => !(i.product.id === productId && i.size === size)));
    } else {
      save(items.map((i) =>
        i.product.id === productId && i.size === size ? { ...i, quantity } : i
      ));
    }
  };

  const clear = () => save([]);

  const numericSale = (p: string) => parseFloat(salePrice(p).replace('€', ''));
  const numericOriginal = (p: string) => parseFloat(p.replace('€', ''));

  const totalNum = items.reduce((sum, i) => sum + numericSale(i.product.price) * i.quantity, 0);
  const originalNum = items.reduce((sum, i) => sum + numericOriginal(i.product.price) * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        add,
        remove,
        updateQuantity,
        clear,
        total: `€${totalNum.toFixed(2).replace('.00', '')}`,
        savings: `€${(originalNum - totalNum).toFixed(2).replace('.00', '')}`,
        count: items.reduce((s, i) => s + i.quantity, 0),
        drawerOpen,
        openDrawer: () => setDrawerOpen(true),
        closeDrawer: () => setDrawerOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
