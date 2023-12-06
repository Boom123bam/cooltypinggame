import { setLocalModeSettings } from "../modules/localStorage";
import {
  useGameSettings,
  useGameState,
} from "../hooks/zustand/gameState";
import { ModeOptions } from "../types/types";

const options: ModeOptions = {
  time: [15, 30, 60],
  words: [10, 25, 50],
  infinite: null,
};

function ModeSelector() {
  const { isTyping } = useGameState();
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
    <div className={`mode-selector${isTyping ? " hide" : ""}`}>
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
