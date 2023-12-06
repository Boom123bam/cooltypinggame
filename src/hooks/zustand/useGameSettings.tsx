import { create } from "zustand";
import { getLocalModeSettings } from "../../utils/localStorage";
import { GameSettings, modeSettingsState } from "../../types/types";

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

export { useGameSettings };
