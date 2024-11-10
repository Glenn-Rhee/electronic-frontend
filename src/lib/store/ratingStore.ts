import { create } from "zustand";

export interface RatingStore {
  valueRating: "latest" | "highest" | "lowest";
  setValueRating: (val: RatingStore["valueRating"]) => void;
}

export const useRating = create<RatingStore>((set) => ({
  valueRating: "latest",
  setValueRating(val) {
    set({ valueRating: val });
  },
}));
