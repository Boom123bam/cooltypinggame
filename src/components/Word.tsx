import { forwardRef } from "react";

interface WordProps {
  word: string;
  isTyped: boolean;
  isTyping: boolean;
  currentCharIndex: number;
}

const Word = forwardRef<HTMLSpanElement | null, WordProps>(
  function Word({ word, isTyped, isTyping, currentCharIndex }, ref) {
    function createSpans(
      word: string,
      charIndexRelativeToWord: number | null = null
    ) {
      const chars = (word + " ").split("");
      if (charIndexRelativeToWord == null) {
        return chars.map((char, i) => (
          <span className="char" key={i}>
            {char}
          </span>
        ));
      } else
        return chars.map((char, index) => (
          <span
            key={index}
            className={`char 
            ${
              index < charIndexRelativeToWord
                ? "typed"
                : index == charIndexRelativeToWord
                ? "typing"
                : "to-type"
            }`}
          >
            {char}
          </span>
        ));
    }

    return (
      <span
        ref={ref}
        className={`word ${
          isTyped ? "typed" : isTyping ? "typing" : "not-typed"
        }`}
      >
        {isTyping
          ? createSpans(word, currentCharIndex)
          : createSpans(word)}
      </span>
    );
  }
);

export default Word;
