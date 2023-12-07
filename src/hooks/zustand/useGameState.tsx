import { create } from "zustand";
import { GameState } from "../../types/types";

const useGameState = create<GameState>()((set) => ({
  isFinished: false,
  setIsFinished: (isFinished: boolean) => set({ isFinished }),
  isTyping: false,
  setIsTyping: (isTyping: boolean) => set({ isTyping }),
}));

export { useGameState };
