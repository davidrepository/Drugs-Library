import { create } from "zustand";

interface SearchState {
  searchValue: string;
  setSearchValue: (val: string) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  searchValue: "",
  setSearchValue: (val: string) => set({ searchValue: val }),
}));
