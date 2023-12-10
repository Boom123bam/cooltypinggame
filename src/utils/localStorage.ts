import { gamemodeSettingsState } from "../types/types";

function setLocalGameModeSettings(
  gamemodeSettings: gamemodeSettingsState
) {
  localStorage.setItem(
    "gamemodeSettings",
    JSON.stringify(gamemodeSettings)
  );
}

function getLocalGameModeSettings() {
  const settings = localStorage.getItem("gamemodeSettings");
  return settings ? JSON.parse(settings) : null;
}

function setLocalLanguageData(language: string, data: object) {
  localStorage.setItem(language, JSON.stringify(data));
}

function getLocalLanguageData(language: string) {
  const data = localStorage.getItem(language);
  return data ? JSON.parse(data) : null;
}

export {
  setLocalGameModeSettings,
  getLocalGameModeSettings,
  setLocalLanguageData,
  getLocalLanguageData,
};
