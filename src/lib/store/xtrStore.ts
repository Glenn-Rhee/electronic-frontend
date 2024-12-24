import { create } from "zustand";

export interface XtrStore {
  xtr: string | undefined;
  setXtr: (xtr: string | undefined) => void;
}

export const useXtr = create<XtrStore>((set) => ({
  xtr: undefined,
  setXtr(xtr) {
    set({ xtr });
  },
}));
