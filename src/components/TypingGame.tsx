import { useState, useEffect, useRef, memo } from "react";
import { getRandomWordList } from "../utils/getWords";
import TextDisplay from "../components/TextDisplay";
import GameCanvas from "../components/GameCanvas";
import { useLastKey } from "../hooks/zustand/useLastKey";
import { useGameSettings } from "../hooks/zustand/useGameSettings";
import { useGameState } from "../hooks/zustand/useGameState";
import { useStats } from "../hooks/zustand/useStats";
import timer from "../utils/timer";

function TypingGame() {
  const { setIsTyping, isTyping, setIsFinished, isFinished } =
    useGameState();
  const { modeSettings } = useGameSettings();
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
      typoFlag: false,
    });
    countDownRef.current?.stop();
    if (modeSettings.mode == "time" && modeSettings.value)
      setTimeLeft(modeSettings.value);
    numWrongChars.current = 0;
    lastWrongCharIndex.current = -1;
  }

  function handleNewWord() {
    if (modeSettings.mode == "words") return;

    // infinite and time mode: fetch words when almost all words typed
    if (updatingWordsRef.current) return;
    if (typingState.typingWordIndex > allWords.length - 15) {
      updateWords(50);
    }
  }

  function handleStart() {
    if (
      modeSettings.mode == "time" &&
      modeSettings.value &&
      countDownRef.current
    )
      countDownRef.current.start(modeSettings.value);
    else startTimeRef.current = Date.now();
  }

  function handleFinish() {
    updateStats();
  }

  function handleCorrectKey() {
    // correct key

    if (
      modeSettings.mode == "words" &&
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
      modeSettings.mode == "time" && modeSettings.value
        ? modeSettings.value
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
    if (!didMount.current) return;

    // instantiate timer
    countDownRef.current = new timer({
      onChange: (timeLeft) => setTimeLeft(timeLeft),
      onEnd: () => setIsFinished(true),
    });
  }, []);

  // On settings change or restart, reset
  useEffect(() => {
    if (!didMount.current) return;
    if (isFinished) return;

    resetGame();

    if (modeSettings.mode == "words" && modeSettings.value)
      updateWords(modeSettings.value, false);
    // infinite and time mode, use continuous fetch
    else updateWords(50, false);

    if (modeSettings.mode == "time" && modeSettings.value) {
      setTimeLeft(modeSettings.value);
    }
  }, [modeSettings, isFinished]);

  useEffect(() => {
    if (isFinished) handleFinish();
  }, [isFinished]);

  // On key press
  useEffect(() => {
    if (!lastKeyPressed || isFinished) return;
    const { totalTypingCharIndex } = typingState;

    if (totalTypingCharIndex == 0) {
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
      stringToType[totalTypingCharIndex] == lastKeyPressed
      // || lastKeyPressed == "Enter"
    ) {
      handleCorrectKey();
    } else {
      handleWrongKey();
    }
  }, [lastKeyUpdateFlag]);

  useEffect(() => {
    didMount.current = true;
  }, []);

  return (
    <>
      <div className={`typing-game-wrapper`}>
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
