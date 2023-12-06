import { create } from "zustand";
import {
  GameState,
  PageState,
  GameSettings,
  modeSettingsState,
  LastKeyStore,
} from "../types/types";
import { getLocalModeSettings } from "../modules/localStorage";

const useGameState = create<GameState>()((set) => ({
  page: "game",
  setPage: (page: PageState) => set({ page }),
  isTyping: false,
  setIsTyping: (isTyping: boolean) => set({ isTyping }),
}));

const useGameSettings = create<GameSettings>()((set) => {
  let modeSettings = getLocalModeSettings();
  if (!modeSettings)
    modeSettings = {
      mode: "time",
      value: 30,
    };

  return {
    setModeSettings: (modeSettings: modeSettingsState) =>
      set({
        modeSettings: modeSettings,
      }),
    modeSettings,
    language: "English_1k",
  };
});

const useLastKey = create<LastKeyStore>()((set) => ({
  lastKeyPressed: "",
  lastKeyUpdateFlag: true,
  setLastKey: (lastKeyPressed: string) => {
    set((state) => ({
      lastKeyPressed,
      lastKeyUpdateFlag: !state.lastKeyUpdateFlag,
    }));
  },
}));

export { useGameState, useGameSettings, useLastKey };
