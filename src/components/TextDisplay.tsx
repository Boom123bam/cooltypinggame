import { memo, useEffect, useRef } from "react";
import Word from "./Word";

const TextDisplay: React.FC<{
  allWords: string[];
  typingWordIndex: number;
  typingCharIndex: number;
}> = ({ allWords, typingWordIndex, typingCharIndex }) => {
  const currentWordRef = useRef<HTMLElement | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const checkScrollRef = useRef(true);

  useEffect(() => {
    if (!checkScrollRef.current) return;

    checkScrollRef.current = false;
    setTimeout(() => {
      checkScrollRef.current = true;
    }, 500);

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
  });

  return (
    <>
      <div className="text-display">
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
