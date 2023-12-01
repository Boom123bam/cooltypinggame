import { modeSettingsState } from "./../types/types";

function setLocalModeSettings(modeSettings: modeSettingsState) {
  localStorage.setItem("modeSettings", JSON.stringify(modeSettings));
}

function getLocalModeSettings() {
  const settings = localStorage.getItem("modeSettings");
  return settings ? JSON.parse(settings) : null;
}

export { setLocalModeSettings, getLocalModeSettings };
