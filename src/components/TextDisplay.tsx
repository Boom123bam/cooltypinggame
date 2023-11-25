import { useEffect, useRef } from "react";
import Word from "./Word";

const TextDisplay: React.FC<{
  allWords: string[];
  currentIndex: number;
}> = ({ allWords, currentIndex }) => {
  const currentWordRef = useRef<HTMLElement | null>(null);
  const scrollerRef = useRef<HTMLElement | null>(null);
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

  function findWordAndIndex(words: string[], totalCharIndex: number) {
    let currentCharIndex = 0;

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const wordLength = word.length;

      // Check if the totalCharIndex falls within the current word
      if (totalCharIndex < currentCharIndex + wordLength) {
        const charIndexRelativeToWord =
          totalCharIndex - currentCharIndex;
        return { typingWordIndex: i, charIndexRelativeToWord };
      }

      // Move to the next word
      currentCharIndex += wordLength + 1; // Assuming a space between words
    }

    // If the totalCharIndex is beyond the last word, return the last word's index
    return {
      typingWordIndex: words.length - 1,
      charIndexRelativeToWord: totalCharIndex - currentCharIndex,
    };
  }

  const { typingWordIndex, charIndexRelativeToWord } =
    findWordAndIndex(allWords, currentIndex);

  return (
    <>
      <div className="text-display">
        <div className="scroller" ref={scrollerRef}>
          {allWords.map((word, i) => (
            <>
              <Word
                word={word}
                isTyped={i < typingWordIndex}
                isTyping={i == typingWordIndex}
                currentCharIndex={
                  i == typingWordIndex ? charIndexRelativeToWord : -1
                }
                ref={i == typingWordIndex ? currentWordRef : null}
              />
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default TextDisplay;
