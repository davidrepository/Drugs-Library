import { create } from "zustand";

interface ErrorState {
  errorCode: string | null;
  errorMessage: string | null;
  setError: (code: string | null, message: string | null) => void;
}

export const useErrorStore = create<ErrorState>((set) => ({
  errorCode: null,
  errorMessage: null,
  setError: (code, message) => set({ errorCode: code, errorMessage: message }),
}));
