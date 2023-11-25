import { useState, useEffect, useRef } from "react";
import { getRandomWordList } from "./modules/database";
import TextDisplay from "./components/TextDisplay";
import "./App.css";
import GameCanvas from "./components/GameCanvas";

function App() {
  const [allWords, setallWords] = useState<string[]>([]);
  const [typingState, setTypingState] = useState({
    totalTypingCharIndex: 0,
    typingWordIndex: 0,
    typingCharIndex: 0,
  });

  const [updateKey, setUpdateKey] = useState(false);
  const lastKeyRef = useRef("");

  const handleKeyDown = (e: KeyboardEvent) => {
    lastKeyRef.current = e.key;
    setUpdateKey(!updateKey);
  };

  useEffect(() => {
    // Add event listener when the component mounts
    document.addEventListener("keydown", handleKeyDown, {
      once: true,
    });

    const updateStringToType = async () => {
      const wordList = await getRandomWordList(10);
      setallWords(allWords.concat(wordList));
    };
    updateStringToType();
  }, []);

  const stringToType = allWords.join(" ");

  // key press listener
  useEffect(() => {
    if (
      stringToType[typingState.totalTypingCharIndex] ==
      lastKeyRef.current
    ) {
      const goNextWord =
        typingState.typingCharIndex ==
        allWords[typingState.typingWordIndex].length;

      if (goNextWord) {
        setTypingState((currentTypingState) => ({
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
    }

    document.addEventListener("keydown", handleKeyDown, {
      once: true,
    });
  }, [updateKey]);

  return (
    <>
      <TextDisplay
        allWords={allWords}
        currentIndex={typingState.totalTypingCharIndex}
      />
      <GameCanvas
        stringToType={stringToType}
        currentIndex={typingState.totalTypingCharIndex}
      />
    </>
  );
}

export default App;
