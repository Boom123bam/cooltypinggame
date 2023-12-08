import { useGameSettings } from "../hooks/zustand/useGameSettings";
import { useGameState } from "../hooks/zustand/useGameState";
import { setLocalModeSettings } from "../utils/localStorage";
import { ModeOptions } from "../types/types";
import { options } from "../constants";

function ModeSelector() {
  const { isTyping, isFinished } = useGameState();
  const { modeSettings, setModeSettings } = useGameSettings();

  function handleMajorOptionClick(option: keyof ModeOptions) {
    if (modeSettings.mode != option) {
      const optionValues = options[option];
      const newSettings = {
        mode: option,
        value:
          optionValues && optionValues.length > 0
            ? optionValues[0]
            : null,
      };
      setModeSettings(newSettings);
      setLocalModeSettings(newSettings);
    }
  }

  function handleMinorOptionClick(option: number) {
    const newSettings = { ...modeSettings, value: option };
    setModeSettings(newSettings);
    setLocalModeSettings(newSettings);
  }

  return (
    <div
      className={`mode-selector${
        isTyping || isFinished ? " hide" : ""
      }`}
    >
      <div className="major-options">
        {Object.keys(options).map((option, index) => (
          <button
            key={index}
            className="option"
            aria-selected={
              modeSettings.mode === option ? "true" : "false"
            }
            onClick={() =>
              handleMajorOptionClick(option as keyof ModeOptions)
            }
          >
            {option}
          </button>
        ))}
        <span className="selection-indicator gradient glow-shadow"></span>
      </div>
      <div className="minor-options">
        {options[modeSettings.mode]?.map((option, index) => (
          <button
            key={index}
            className="option"
            aria-selected={
              modeSettings.value === option ? "true" : "false"
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

export default ModeSelector;
