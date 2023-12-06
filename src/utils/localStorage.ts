import { modeSettingsState } from "../types/types";

function setLocalModeSettings(modeSettings: modeSettingsState) {
  localStorage.setItem("modeSettings", JSON.stringify(modeSettings));
}

function getLocalModeSettings() {
  const settings = localStorage.getItem("modeSettings");
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
  setLocalModeSettings,
  getLocalModeSettings,
  setLocalLanguageData,
  getLocalLanguageData,
};
