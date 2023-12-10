import { create } from "zustand";
import { getLocalGameModeSettings } from "../../utils/localStorage";
import {
  GameSettings,
  gamemodeSettingsState,
} from "../../types/types";

const useGameSettings = create<GameSettings>()((set) => {
  let gamemodeSettings = getLocalGameModeSettings();
  if (!gamemodeSettings)
    gamemodeSettings = {
      gamemode: "time",
      value: 30,
    };

  return {
    setGameModeSettings: (gamemodeSettings: gamemodeSettingsState) =>
      set({
        gamemodeSettings: gamemodeSettings,
      }),
    gamemodeSettings,
    language: "English_1k",
  };
});

export { useGameSettings };
