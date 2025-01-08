import { create } from "zustand";

interface SortingStore {
  productName: boolean;
  category: boolean;
  brand: boolean;
  price: boolean;
  stock: boolean;
  setProductName: (v: boolean) => void;
  setCategory: (v: boolean) => void;
  setBrand: (v: boolean) => void;
  setPrice: (v: boolean) => void;
  setStock: (v: boolean) => void;
}

export const useSorting = create<SortingStore>((set) => ({
  brand: false,
  category: false,
  price: false,
  productName: false,
  stock: false,
  setProductName: (v: boolean) => set({ productName: v }),
  setCategory: (v: boolean) => set({ category: v }),
  setBrand: (v: boolean) => set({ brand: v }),
  setPrice: (v: boolean) => set({ price: v }),
  setStock: (v: boolean) => set({ stock: v }),
}));
