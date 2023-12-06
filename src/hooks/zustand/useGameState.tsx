import { create } from "zustand";
import { GameState, PageState } from "../../types/types";

const useGameState = create<GameState>()((set) => ({
  page: "game",
  setPage: (page: PageState) => set({ page }),
  isTyping: false,
  setIsTyping: (isTyping: boolean) => set({ isTyping }),
}));

export { useGameState };
