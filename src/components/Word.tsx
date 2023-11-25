const Word: React.FC<{
  word: string;
  isTyped: boolean;
  isTyping: boolean;
  currentCharIndex: number; // -1 if none
}> = ({ word, isTyped, isTyping, currentCharIndex }) => {
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
};

export default Word;
