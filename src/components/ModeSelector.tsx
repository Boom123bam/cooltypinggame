import { useState } from "react";
import { useIsTypingStore } from "../stores/gameState";

interface ModeOptions {
  time: number[];
  words: number[];
  infinite: null;
}

interface SelectedState {
  mode: keyof ModeOptions;
  value: number | null;
}

const options: ModeOptions = {
  time: [15, 30, 60],
  words: [10, 25, 50],
  infinite: null,
};

function ModeSelector() {
  const { isTyping } = useIsTypingStore();
  const [selected, setSelected] = useState<SelectedState>({
    mode: "time",
    value: 15,
  });

  function handleMajorOptionClick(option: keyof ModeOptions) {
    if (selected.mode != option) {
      const optionValues = options[option];
      setSelected({
        mode: option,
        value:
          optionValues && optionValues.length > 0
            ? optionValues[0]
            : null,
      });
    }
  }

  function handleMinorOptionClick(option: number) {
    setSelected({ ...selected, value: option });
  }

  return (
    <div className={`mode-selector${isTyping ? " hide" : ""}`}>
      <div className="major-options">
        {Object.keys(options).map((option) => (
          <button
            className="option"
            aria-selected={
              selected.mode === option ? "true" : "false"
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
        {options[selected.mode]?.map((option) => (
          <button
            className="option"
            aria-selected={
              selected.value === option ? "true" : "false"
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
