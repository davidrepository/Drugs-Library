import { create } from "zustand";

interface DebugStore {
  showDebug?: boolean;
  toggleDebug?: () => void;
  setDebug?: any;
}

export const useDebugStore = create<DebugStore>((set, get) => ({
  showDebug: localStorage.getItem("showDebug")
    ? JSON.parse(localStorage.getItem("showDebug")!)
    : true,
  toggleDebug: () => {
    const newShowDebug = !get().showDebug;
    localStorage.setItem("showDebug", JSON.stringify(newShowDebug));
    set({ showDebug: newShowDebug });
  },
  setDebug: (v: boolean) => {
    set({ showDebug: v });
  },
}));
