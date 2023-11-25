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
      const chars = word.split("");
      if (charIndexRelativeToWord == null) {
        return chars.map((char) => (
          <span className="char">{char}</span>
        ));
      } else
        return chars.map((char, index) => (
          <span
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
        <span
          className={`char empty${
            isTyping && currentCharIndex == -1 ? " typing" : ""
          }`}
        >
          {" "}
        </span>
        {isTyping
          ? createSpans(word, currentCharIndex)
          : createSpans(word)}
      </span>
    );
  }
);

export default Word;
