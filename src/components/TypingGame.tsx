import { useState, useEffect, useRef, memo } from "react";
import { getRandomWordList } from "../utils/getWords";
import TextDisplay from "../components/TextDisplay";
import GameCanvas from "../components/GameCanvas";
import { useLastKey } from "../hooks/zustand/useLastKey";
import { useGameSettings } from "../hooks/zustand/useGameSettings";
import { useGameState } from "../hooks/zustand/useGameState";
import { useStats } from "../hooks/zustand/useStats";
import timer from "../utils/timer";
import { allowAutoType } from "../constants";

function TypingGame() {
  const { setIsTyping, isTyping, setIsFinished, isFinished } =
    useGameState();
  const { gamemodeSettings } = useGameSettings();
  const { lastKeyPressed, lastKeyUpdateFlag } = useLastKey();
  const { setStats } = useStats();

  const [allWords, setallWords] = useState<string[]>([]);
  const [typingState, setTypingState] = useState({
    totalTypingCharIndex: 0,
    typingWordIndex: 0,
    typingCharIndex: 0,
    typoFlag: false,
  });
  const charsTypedRef = useRef(0);
  const stringToType = allWords.join(" ");

  const startTimeRef = useRef(0);
  const countDownRef = useRef<timer>();
  const [timeLeft, setTimeLeft] = useState<number>(10);

  const updatingWordsRef = useRef(false);
  const didMount = useRef(false);

  const numWrongChars = useRef(0);
  const lastWrongCharIndex = useRef(-1);

  const updateWords = async (amount: number, append = true) => {
    updatingWordsRef.current = true;
    const wordList = await getRandomWordList(amount, "English_1k");
    setallWords(append ? allWords.concat(wordList) : wordList);
    updatingWordsRef.current = false;
  };

  charsTypedRef.current = typingState.typingCharIndex;

  function resetGame() {
    setallWords([]);
    setIsTyping(false);
    setTypingState({
      totalTypingCharIndex: 0,
      typingWordIndex: 0,
      typingCharIndex: 0,
      typoFlag: typingState.typoFlag,
    });
    countDownRef.current?.stop();
    if (gamemodeSettings.gamemode == "time" && gamemodeSettings.value)
      setTimeLeft(gamemodeSettings.value);
    numWrongChars.current = 0;
    lastWrongCharIndex.current = -1;
  }

  function handleNewWord() {
    if (gamemodeSettings.gamemode == "words") return;

    // infinite and time gamemode: fetch words when almost all words typed
    if (updatingWordsRef.current) return;
    if (typingState.typingWordIndex > allWords.length - 15) {
      updateWords(50);
    }
  }

  function handleStart() {
    if (
      gamemodeSettings.gamemode == "time" &&
      gamemodeSettings.value &&
      countDownRef.current
    )
      countDownRef.current.start(gamemodeSettings.value);
    else startTimeRef.current = Date.now();
  }

  function handleFinish() {
    updateStats();
  }

  function handleCorrectKey() {
    // correct key

    if (
      gamemodeSettings.gamemode == "words" &&
      stringToType.length - 1 == typingState.totalTypingCharIndex
    ) {
      // finish
      setIsFinished(true);
      return;
    }

    const goNextWord =
      typingState.typingCharIndex ==
      allWords[typingState.typingWordIndex].length;

    const nextTypingWordIndex = goNextWord
      ? typingState.typingWordIndex + 1
      : typingState.typingWordIndex;

    const nextTypingCharIndex = goNextWord
      ? 0
      : typingState.typingCharIndex + 1;

    const nextTotalTypingCharIndex =
      typingState.totalTypingCharIndex + 1;

    setTypingState((currentTypingState) => ({
      ...currentTypingState,
      typingWordIndex: nextTypingWordIndex,
      typingCharIndex: nextTypingCharIndex,
      totalTypingCharIndex: nextTotalTypingCharIndex,
    }));

    if (goNextWord) {
      handleNewWord();
    }
  }

  function handleWrongKey() {
    setTypingState((currentTypingState) => ({
      ...currentTypingState,
      typoFlag: !currentTypingState.typoFlag,
    }));
    if (
      lastWrongCharIndex.current != typingState.totalTypingCharIndex
    ) {
      numWrongChars.current++;
      lastWrongCharIndex.current = typingState.totalTypingCharIndex;
    }
  }

  function updateStats() {
    const totalTimeTaken =
      gamemodeSettings.gamemode == "time" && gamemodeSettings.value
        ? gamemodeSettings.value
        : (Date.now() - startTimeRef.current) / 1000;

    const charsTyped = typingState.totalTypingCharIndex + 1; // total index doesnt update for last character
    const errors = numWrongChars.current;

    const totalWords = charsTyped / 5; // Assume average word length of 5 chars

    // Calculate WPM and accuracy
    const wpm = Math.round(totalWords / (totalTimeTaken / 60));
    const accuracy = Math.round(
      ((charsTyped - errors) / charsTyped) * 100
    ); // Percentage

    setStats(wpm, accuracy);
  }

  // On mount
  useEffect(() => {
    if (didMount.current) return;
    // instantiate timer
    countDownRef.current = new timer({
      onChange: (timeLeft) => setTimeLeft(timeLeft),
      onEnd: () => setIsFinished(true),
    });
    return () => {
      didMount.current = true;
    };
  }, []);

  // On settings change or restart, reset
  useEffect(() => {
    if (isFinished) return;

    resetGame();

    if (
      gamemodeSettings.gamemode == "words" &&
      gamemodeSettings.value
    )
      updateWords(gamemodeSettings.value, false);
    // infinite and time gamemode, use continuous fetch
    else updateWords(50, false);

    if (
      gamemodeSettings.gamemode == "time" &&
      gamemodeSettings.value
    ) {
      setTimeLeft(gamemodeSettings.value);
    }
  }, [gamemodeSettings, isFinished]);

  useEffect(() => {
    if (isFinished) handleFinish();
  }, [isFinished]);

  // On key press
  useEffect(() => {
    if (!lastKeyPressed || isFinished) return;
    const { totalTypingCharIndex } = typingState;

    if (totalTypingCharIndex == 0 && numWrongChars.current == 0) {
      handleStart();
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
      (allowAutoType && lastKeyPressed == " ")
    ) {
      handleCorrectKey();
    } else {
      handleWrongKey();
    }
  }, [lastKeyUpdateFlag]);

  return (
    <>
      <div className={`typing-game-wrapper`}>
        <div
          className="text-display-wrapper"
          onClick={() => document.getElementById("input")?.focus()}
        >
          {gamemodeSettings.gamemode == "time" && (
            <div className="timer">{timeLeft}</div>
          )}
          <TextDisplay
            allWords={allWords}
            typingWordIndex={typingState.typingWordIndex}
            typingCharIndex={typingState.typingCharIndex}
            typoFlag={typingState.typoFlag}
          />
        </div>
        <GameCanvasMemo
          stringToType={stringToType}
          currentIndex={typingState.totalTypingCharIndex}
        />
      </div>
    </>
  );
}

const GameCanvasMemo = memo(GameCanvas);
export default TypingGame;
