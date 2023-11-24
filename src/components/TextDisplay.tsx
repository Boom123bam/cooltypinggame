const TextDisplay: React.FC<{
  allWords: string[];
  currentIndex: number;
}> = ({ allWords, currentIndex }) => {
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

  const { typingWordIndex, charIndexRelativeToWord } =
    findWordAndIndex(allWords, currentIndex);
  console.log(currentIndex, typingWordIndex, charIndexRelativeToWord);

  return (
    <>
      <div className="text-display">
        {allWords.map((word, i) => (
          <>
            <span
              className={`word ${
                i < typingWordIndex
                  ? "typed"
                  : i == typingWordIndex
                  ? "typing"
                  : "to-type"
              }`}
            >
              <span
                className={`char empty${
                  typingWordIndex == i &&
                  charIndexRelativeToWord == -1
                    ? " typing"
                    : ""
                }`}
              >
                {" "}
              </span>
              {i == typingWordIndex
                ? createSpans(word, charIndexRelativeToWord)
                : createSpans(word)}
            </span>
          </>
        ))}
      </div>
    </>
  );
};

export default TextDisplay;
