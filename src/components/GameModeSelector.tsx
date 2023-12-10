import { useGameSettings } from "../hooks/zustand/useGameSettings";
import { useGameState } from "../hooks/zustand/useGameState";
import { setLocalGameModeSettings } from "../utils/localStorage";
import { GameModeOptions } from "../types/types";
import { options } from "../constants";
import { useRef } from "react";
import gsap from "gsap";

function GameModeSelector() {
  const { isTyping, isFinished } = useGameState();
  const { gamemodeSettings, setGameModeSettings } = useGameSettings();
  const selectionIndicatorRef = useRef<HTMLSpanElement>(null);

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
      if (selectionIndicatorRef.current) {
        // tl.play();
        gsap.to(selectionIndicatorRef.current, {
          height: "10%",
          duration: 0.15,
          ease: "power2.out",
          onComplete: () => {
            gsap.to(selectionIndicatorRef.current, {
              height: "100%",
              duration: 0.15,
              ease: "power2.in",
            });
          },
        });
      }
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
        <span
          className="selection-indicator gradient glow-shadow"
          ref={selectionIndicatorRef}
        ></span>
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
