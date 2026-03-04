import { create } from "zustand";
import type { Call } from "../types";

type UIState = {
  selectedCallId: Call["id"] | null;
  setSelectedCallId: (id: Call["id"]) => void;
};

export const useUIStore = create<UIState>((set) => ({
  selectedCallId: null,

  setSelectedCallId: (id) => set({ selectedCallId: id }),
}));
