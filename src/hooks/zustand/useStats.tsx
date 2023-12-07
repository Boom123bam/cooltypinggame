import { create } from "zustand";
import { StatsStore } from "../../types/types";

const useStats = create<StatsStore>()((set) => ({
  wpm: 0,
  accuracy: 0,
  setStats: (wpm: number, accuracy: number) => set({ wpm, accuracy }),
}));

export { useStats };
