import { create } from "zustand";
import { Alignment } from "../pages/Home/Home.type";

interface AlignmentStore {
  alignment?: any;
  setAlignment?: any;
}

export const useAlignmentStore = create<AlignmentStore>((set, get) => ({
  alignment: localStorage.getItem("alignment")
    ? localStorage.getItem("alignment")
    : "list",
  setAlignment: (v: Alignment) => {
    localStorage.setItem("alignment", v);
    set({ alignment: v });
  },
}));
