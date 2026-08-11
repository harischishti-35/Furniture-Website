import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '@/types';

interface CompareState {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  toggleItem: (product: Product) => void;
  isInCompare: (productId: string) => boolean;
  clearAll: () => void;
}

export const useCompareStore = create<CompareState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        if (get().items.length < 4 && !get().isInCompare(product.id)) {
          set({ items: [...get().items, product] });
        }
      },

      removeItem: (productId) => {
        set({ items: get().items.filter((p) => p.id !== productId) });
      },

      toggleItem: (product) => {
        if (get().isInCompare(product.id)) {
          get().removeItem(product.id);
        } else {
          get().addItem(product);
        }
      },

      isInCompare: (productId) => {
        return get().items.some((p) => p.id === productId);
      },

      clearAll: () => set({ items: [] }),
    }),
    { name: 'chishti-compare' }
  )
);
