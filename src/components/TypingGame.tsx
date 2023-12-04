import { useState, useEffect, useRef, memo } from "react";
import { getRandomWordList } from "../modules/database";
import TextDisplay from "../components/TextDisplay";
import GameCanvas from "../components/GameCanvas";
import { useGameSettings, useGameState } from "../stores/gameState";

function TypingGame() {
  const [allWords, setallWords] = useState<string[]>([]);
  const { setIsTyping, isTyping, setPage } = useGameState();
  const { modeSettings } = useGameSettings();
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
  const stringToType = allWords.join(" ");

  const handleKeyDown = (e: KeyboardEvent) => {
    lastKeyRef.current = e.key;
    setUpdateKey(!updateKey);
  };

  const updateWords = async (amount: number, append = true) => {
    updatingWordsRef.current = true;
    const wordList = await getRandomWordList(amount, "English_1k");
    setallWords(append ? allWords.concat(wordList) : wordList);
    updatingWordsRef.current = false;
  };

  function resetGame() {
    setallWords([]);
    setIsTyping(false);
    setTypingState({
      totalTypingCharIndex: 0,
      typingWordIndex: 0,
      typingCharIndex: 0,
      typoFlag: false,
    });
  }

  useEffect(() => {
    // Add event listener when the component mounts
    document.addEventListener("keypress", handleKeyDown, {
      once: true,
    });
  }, []);

  // On settings change
  useEffect(() => {
    if (!didMount.current) return;

    resetGame();

    if (modeSettings.mode == "words" && modeSettings.value)
      updateWords(modeSettings.value, false);
    // infinite and time mode, use continuous fetch
    else updateWords(50, false);
  }, [modeSettings]);

  // On each new word
  useEffect(() => {
    if (modeSettings.mode == "words") return;

    // infinite and time mode: fetch words when almost all words typed
    if (updatingWordsRef.current) return;
    if (typingState.typingWordIndex > allWords.length - 15) {
      updateWords(50);
    }
  }, [typingState.typingWordIndex]);

  // On key press
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
      // correct key

      if (
        modeSettings.mode == "words" &&
        stringToType.length - 1 == typingState.totalTypingCharIndex
      ) {
        // finish
        setPage("results");
        return;
      }

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
