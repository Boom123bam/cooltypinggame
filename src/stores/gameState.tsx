import { create } from "zustand";
import {
  GameState,
  PageState,
  GameSettings,
  modeSettingsState,
} from "../types/types";

const useGameState = create<GameState>()((set) => ({
  page: "game",
  setPage: (page: PageState) => set({ page }),
  isTyping: false,
  setIsTyping: (isTyping: boolean) => set({ isTyping }),
}));

const useGameSettings = create<GameSettings>()((set) => ({
  setModeSettings: (modeSettings: modeSettingsState) => {
    set({
      modeSettings: modeSettings,
    });
  },
  modeSettings: {
    mode: "time",
    value: 30,
  },
  language: "English_1k",
}));

export { useGameState, useGameSettings };
