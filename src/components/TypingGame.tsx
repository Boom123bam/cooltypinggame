import { useState, useEffect, useRef, memo } from "react";
import { getRandomWordList } from "../modules/database";
import TextDisplay from "../components/TextDisplay";
import GameCanvas from "../components/GameCanvas";
import {
  useGameSettings,
  useGameState,
  useLastKey,
} from "../stores/gameState";
import timer from "../modules/timer";
import { TypingGameProps } from "../types/types";

function TypingGame({ show }: TypingGameProps) {
  const { setIsTyping, isTyping, setPage } = useGameState();
  const { modeSettings } = useGameSettings();
  const { lastKeyPressed, lastKeyUpdateFlag } = useLastKey();

  const [allWords, setallWords] = useState<string[]>([]);
  const [typingState, setTypingState] = useState({
    totalTypingCharIndex: 0,
    typingWordIndex: 0,
    typingCharIndex: 0,
    typoFlag: false,
  });

  const countDownRef = useRef<timer>();
  const [timeLeft, setTimeLeft] = useState<number>(10);

  const updatingWordsRef = useRef(false);
  const didMount = useRef(false);
  const stringToType = allWords.join(" ");

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

  // On mount
  useEffect(() => {
    if (!didMount.current) return;

    // instantiate timer
    countDownRef.current = new timer(
      (timeLeft) => setTimeLeft(timeLeft),
      () => setPage("results")
    );
  }, []);

  // On settings change
  useEffect(() => {
    if (!didMount.current) return;

    resetGame();

    if (modeSettings.mode == "words" && modeSettings.value)
      updateWords(modeSettings.value, false);
    // infinite and time mode, use continuous fetch
    else updateWords(50, false);

    if (modeSettings.mode == "time" && modeSettings.value) {
      setTimeLeft(modeSettings.value);
    }
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
    if (!lastKeyPressed) return;
    const { totalTypingCharIndex, typingCharIndex, typingWordIndex } =
      typingState;

    if (
      totalTypingCharIndex == 0 &&
      modeSettings.mode == "time" &&
      modeSettings.value &&
      countDownRef.current
    ) {
      countDownRef.current.start(modeSettings.value);
    }

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
      stringToType[totalTypingCharIndex] == lastKeyPressed ||
      lastKeyPressed == "Enter"
    ) {
      // correct key

      if (
        modeSettings.mode == "words" &&
        stringToType.length - 1 == totalTypingCharIndex
      ) {
        // finish
        setPage("results");
        return;
      }

      const goNextWord =
        typingCharIndex == allWords[typingWordIndex].length;

      if (goNextWord) {
        setTypingState((currentTypingState) => ({
          ...currentTypingState,
          typingWordIndex: currentTypingState.typingWordIndex + 1,
          totalTypingCharIndex: totalTypingCharIndex + 1,
          typingCharIndex: 0,
        }));
      } else {
        setTypingState((currentTypingState) => ({
          ...currentTypingState,
          totalTypingCharIndex: totalTypingCharIndex + 1,
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
  }, [lastKeyUpdateFlag]);

  useEffect(() => {
    didMount.current = true;
  }, []);

  return (
    <>
      <div
        className={`typing-game-wrapper ${show ? "show" : "hide"}`}
      >
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
        {timeLeft}
      </div>
    </>
  );
}

const GameCanvasMemo = memo(GameCanvas);
export default TypingGame;
