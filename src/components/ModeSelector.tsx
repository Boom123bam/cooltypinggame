import { useGameSettings, useGameState } from "../stores/gameState";
import { ModeOptions } from "../types/types";

const options: ModeOptions = {
  time: [15, 30, 60],
  words: [10, 25, 50],
  infinite: null,
};

function ModeSelector() {
  const { isTyping } = useGameState();
  const { selectedMode, setSelectedMode } = useGameSettings();

  function handleMajorOptionClick(option: keyof ModeOptions) {
    if (selectedMode.mode != option) {
      const optionValues = options[option];
      setSelectedMode({
        mode: option,
        value:
          optionValues && optionValues.length > 0
            ? optionValues[0]
            : null,
      });
    }
  }

  function handleMinorOptionClick(option: number) {
    setSelectedMode({ ...selectedMode, value: option });
  }

  return (
    <div className={`mode-selector${isTyping ? " hide" : ""}`}>
      <div className="major-options">
        {Object.keys(options).map((option, index) => (
          <button
            key={index}
            className="option"
            aria-selected={
              selectedMode.mode === option ? "true" : "false"
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
        {options[selectedMode.mode]?.map((option, index) => (
          <button
            key={index}
            className="option"
            aria-selected={
              selectedMode.value === option ? "true" : "false"
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
