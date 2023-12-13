import { useGameSettings } from "../hooks/zustand/useGameSettings";
import { useGameState } from "../hooks/zustand/useGameState";
import { setLocalGameModeSettings } from "../utils/localStorage";
import { GameModeOptions } from "../types/types";
import { options } from "../constants";

function GameModeSelector() {
  const { isTyping, isFinished } = useGameState();
  const { gamemodeSettings, setGameModeSettings } = useGameSettings();

  function handleMajorOptionClick(option: keyof GameModeOptions) {
    if (gamemodeSettings.gamemode != option) {
      const optionValues = options[option];
      const newSettings = {
        gamemode: option,
        value:
          optionValues && optionValues.length > 0
            ? optionValues[0]
            : null,
      };
      setGameModeSettings(newSettings);
      setLocalGameModeSettings(newSettings);
    }
  }

  function handleMinorOptionClick(option: number) {
    const newSettings = { ...gamemodeSettings, value: option };
    setGameModeSettings(newSettings);
    setLocalGameModeSettings(newSettings);
  }

  return (
    <div
      className={`game-mode-selector${
        isTyping || isFinished ? " hide" : ""
      }`}
    >
      <div className="major-options">
        {Object.keys(options).map((option, index) => (
          <button
            key={index}
            tabIndex={isTyping || isFinished ? -1 : 1}
            className="option"
            aria-selected={
              gamemodeSettings.gamemode === option ? "true" : "false"
            }
            onClick={() =>
              handleMajorOptionClick(option as keyof GameModeOptions)
            }
          >
            {option}
          </button>
        ))}
        <div className="selection-indicator-wrapper">
          <span className="selection-indicator gradient glow-shadow"></span>
        </div>
      </div>
      <div className="minor-options">
        {options[gamemodeSettings.gamemode]?.map((option, index) => (
          <button
            key={index}
            tabIndex={isTyping || isFinished ? -1 : 1}
            className="option"
            aria-selected={
              gamemodeSettings.value === option ? "true" : "false"
            }
            onClick={() => handleMinorOptionClick(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default GameModeSelector;
