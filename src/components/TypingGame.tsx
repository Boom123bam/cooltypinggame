import { useState, useEffect, useRef, memo } from "react";
import { getRandomWordList } from "../modules/database";
import TextDisplay from "../components/TextDisplay";
import GameCanvas from "../components/GameCanvas";
import { useGameSettings, useGameState } from "../stores/gameState";

function TypingGame() {
  const [allWords, setallWords] = useState<string[]>([]);
  const { setIsTyping, isTyping } = useGameState();
  const { selectedMode } = useGameSettings();
  const [typingState, setTypingState] = useState({
    totalTypingCharIndex: 0,
    typingWordIndex: 0,
    typingCharIndex: 0,
    typoFlag: false,
  });

  const [updateKey, setUpdateKey] = useState(false);
  const lastKeyRef = useRef("");
  const updatingWordsRef = useRef(false);
  const didMount = useRef(false);

  const handleKeyDown = (e: KeyboardEvent) => {
    lastKeyRef.current = e.key;
    setUpdateKey(!updateKey);
  };

  const updateWords = async (amount = 50) => {
    updatingWordsRef.current = true;
    const wordList = await getRandomWordList(amount, "English_1k");
    setallWords(allWords.concat(wordList));
    updatingWordsRef.current = false;
  };

  useEffect(() => {
    // Add event listener when the component mounts
    document.addEventListener("keypress", handleKeyDown, {
      once: true,
    });
  }, []);

  useEffect(() => {
    if (!didMount.current) return;

    if (selectedMode.mode == "words" && selectedMode.value)
      updateWords(selectedMode.value);
    // infinite and time mode, use continuous fetch
    else updateWords();
  }, [selectedMode]);

  const stringToType = allWords.join(" ");

  // key press listener
  useEffect(() => {
    if (!lastKeyRef.current) return;

    if (!isTyping) {
      setIsTyping(true);
      document.addEventListener(
        "mousemove",
        () => {
          setIsTyping(false);
        },
        {
          once: true,
        }
      );
    }
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

  // infinite and time mode: fetch words when almost all words typed
  useEffect(() => {
    if (selectedMode.mode == "time") return;
    if (updatingWordsRef.current) return;
    if (typingState.typingWordIndex > allWords.length - 15) {
      updateWords();
    }
  }, [typingState.typingWordIndex]);

  useEffect(() => {
    didMount.current = true;
  }, []);

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
