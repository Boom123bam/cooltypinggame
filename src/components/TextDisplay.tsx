import { memo, useEffect, useRef, useState } from "react";
import Word from "./Word";
import { useGameSettings } from "../hooks/zustand/useGameSettings";
import { useGameState } from "../hooks/zustand/useGameState";

const TextDisplay: React.FC<{
  allWords: string[];
  typingWordIndex: number;
  typingCharIndex: number;
  typoFlag: boolean;
}> = ({ allWords, typingWordIndex, typingCharIndex, typoFlag }) => {
  const currentWordRef = useRef<HTMLElement | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [showCursor, setShowCursor] = useState(true);
  const cursorTimeoutRef = useRef<number | null>(null);
  const lastTypoFlagRef = useRef(false); // prevent typo on inintal render
  const { gamemodeSettings } = useGameSettings();
  const { isFinished } = useGameState();

  function resetGame() {
    if (!scrollerRef.current) return;
    scrollerRef.current.classList.remove("typo");
    scrollerRef.current.style.setProperty("--depth", "0px");
  }

  useEffect(() => {
    if (isFinished) return;
    resetGame();
  }, [gamemodeSettings, isFinished]);

  // make cursor flash
  useEffect(() => {
    if (cursorTimeoutRef.current) return;
    cursorTimeoutRef.current = setTimeout(() => {
      setShowCursor((current) => !current);
      cursorTimeoutRef.current = null;
    }, 500);
  }, [showCursor]);

  // set cursor to show on letter type
  useEffect(() => {
    if (!scrollerRef.current) return;
    scrollerRef.current.classList.remove("typo");
    if (cursorTimeoutRef.current)
      clearTimeout(cursorTimeoutRef.current);
    setShowCursor(true);

    cursorTimeoutRef.current = setTimeout(() => {
      setShowCursor((current) => !current);
      cursorTimeoutRef.current = null;
    }, 500);
  }, [typingCharIndex, typoFlag]);

  // set cursor to red on typo
  useEffect(() => {
    if (typoFlag == lastTypoFlagRef.current) return;
    lastTypoFlagRef.current = typoFlag;
    if (!scrollerRef.current) return;
    scrollerRef.current.classList.add("typo");
  }, [typoFlag]);

  useEffect(() => {
    // update scroll
    if (currentWordRef.current && scrollerRef.current) {
      const scrollerTop =
        scrollerRef.current.getBoundingClientRect().top;

      const wordTop =
        currentWordRef.current.getBoundingClientRect().top;

      scrollerRef.current.style.setProperty(
        "--depth",
        `${scrollerTop - wordTop}px`
      );
    }
  }, [typingWordIndex]);

  return (
    <>
      <div
        className={`text-display${showCursor ? " show-cursor" : ""}`}
      >
        <div className={`scroller`} ref={scrollerRef}>
          {allWords.map((word, i) => (
            <WordMemo
              key={i}
              word={word}
              isTyped={i < typingWordIndex}
              isTyping={i == typingWordIndex}
              currentCharIndex={
                i == typingWordIndex ? typingCharIndex : -1
              }
              ref={i == typingWordIndex ? currentWordRef : null}
            />
          ))}
        </div>
      </div>
    </>
  );
};

const WordMemo = memo(Word);

export default TextDisplay;
