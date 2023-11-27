import { useState, useEffect, useRef, memo } from "react";
import { getRandomWordList } from "../modules/database";
import TextDisplay from "../components/TextDisplay";
import GameCanvas from "../components/GameCanvas";

function TypingGame() {
  const [allWords, setallWords] = useState<string[]>([]);
  const [typingState, setTypingState] = useState({
    totalTypingCharIndex: 0,
    typingWordIndex: 0,
    typingCharIndex: 0,
    typoFlag: false,
  });

  const [updateKey, setUpdateKey] = useState(false);
  const lastKeyRef = useRef("");
  const updatingWordsRef = useRef(false);

  const handleKeyDown = (e: KeyboardEvent) => {
    lastKeyRef.current = e.key;
    setUpdateKey(!updateKey);
  };

  const updateWords = async () => {
    updatingWordsRef.current = true;
    const wordList = await getRandomWordList(50);
    setallWords(allWords.concat(wordList));
    updatingWordsRef.current = false;
  };
  useEffect(() => {
    // Add event listener when the component mounts
    document.addEventListener("keypress", handleKeyDown, {
      once: true,
    });

    updateWords();
  }, []);

  const stringToType = allWords.join(" ");

  // key press listener
  useEffect(() => {
    if (!lastKeyRef.current) return;
    // update state according to char typed
    if (
      stringToType[typingState.totalTypingCharIndex] ==
        lastKeyRef.current ||
      lastKeyRef.current == "Enter"
    ) {
      const goNextWord =
        typingState.typingCharIndex ==
        allWords[typingState.typingWordIndex].length;

      if (goNextWord) {
        setTypingState((currentTypingState) => ({
          ...currentTypingState,
          typingWordIndex: currentTypingState.typingWordIndex + 1,
          totalTypingCharIndex:
            currentTypingState.totalTypingCharIndex + 1,
          typingCharIndex: 0,
        }));
      } else {
        setTypingState((currentTypingState) => ({
          ...currentTypingState,
          totalTypingCharIndex:
            currentTypingState.totalTypingCharIndex + 1,
          typingCharIndex: currentTypingState.typingCharIndex + 1,
        }));
      }
    } else {
      // handle typo
      setTypingState((currentTypingState) => ({
        ...currentTypingState,
        typoFlag: !currentTypingState.typoFlag,
      }));
    }

    document.addEventListener("keypress", handleKeyDown, {
      once: true,
    });
  }, [updateKey]);

  useEffect(() => {
    // fetch words almost all words typed
    if (updatingWordsRef.current) return;
    if (typingState.typingWordIndex > allWords.length - 15) {
      updateWords();
    }
  }, [typingState.typingWordIndex]);

  return (
    <>
      <TextDisplay
        allWords={allWords}
        typingWordIndex={typingState.typingWordIndex}
        typingCharIndex={typingState.typingCharIndex}
        typoFlag={typingState.typoFlag}
      />
      <GameCanvasMemo
        stringToType={stringToType}
        currentIndex={typingState.totalTypingCharIndex}
      />
    </>
  );
}

const GameCanvasMemo = memo(GameCanvas);
export default TypingGame;
