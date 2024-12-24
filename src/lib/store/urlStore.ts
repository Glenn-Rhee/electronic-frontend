import { create } from "zustand";

export interface UrlStore {
  urlImage: string;
  setUrlImage: (urlImage: string) => void;
}

export const useUrlStore = create<UrlStore>((set) => ({
  urlImage: "",
  setUrlImage(urlImage) {
    set({ urlImage });
  },
}));
