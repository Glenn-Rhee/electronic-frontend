import { create } from "zustand";

export interface RevenueStore {
  valueOrder: "today" | "lastWeek" | "lastMonth" | "lastYear";
  setValueorder: (val: RevenueStore["valueOrder"]) => void;
}

export const useRevenue = create<RevenueStore>((set) => ({
  valueOrder: "lastYear",
  setValueorder(val) {
    set({ valueOrder: val });
  },
}));
