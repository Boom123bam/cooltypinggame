import { memo, useEffect, useRef, useState } from "react";
import Word from "./Word";

const TextDisplay: React.FC<{
  allWords: string[];
  typingWordIndex: number;
  typingCharIndex: number;
}> = ({ allWords, typingWordIndex, typingCharIndex }) => {
  const currentWordRef = useRef<HTMLElement | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [showCursor, setShowCursor] = useState(true);
  const cursorTimeoutRef = useRef<number | null>(null);

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
    if (cursorTimeoutRef.current)
      clearTimeout(cursorTimeoutRef.current);
    setShowCursor(true);

    cursorTimeoutRef.current = setTimeout(() => {
      setShowCursor((current) => !current);
      cursorTimeoutRef.current = null;
    }, 500);
  }, [typingCharIndex]);

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
        <div className="scroller" ref={scrollerRef}>
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
