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
  const { setIsTyping, isTyping, setPage, page } = useGameState();
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

  const countDownRef = useRef<timer>();
  const [timeLeft, setTimeLeft] = useState<number>(10);

  const updatingWordsRef = useRef(false);
  const didMount = useRef(false);
  const stringToType = allWords.join(" ");

  const numWrongChars = useRef(0);
  const lastWrongCharIndex = useRef(-1);

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
  }

  function handleFinish() {
    updateStats();
    setPage("results");
  }

  function handleCorrectKey() {
    // correct key

    if (
      modeSettings.mode == "words" &&
      stringToType.length - 1 == typingState.totalTypingCharIndex
    ) {
      // finish
      handleFinish();
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
    const wpm = 10;
    const accuracy = 98;
    setStats(wpm, accuracy);
  }

  // On mount
  useEffect(() => {
    if (!didMount.current) return;

    // instantiate timer
    countDownRef.current = new timer({
      onChange: (timeLeft) => setTimeLeft(timeLeft),
      onEnd: handleFinish,
    });
  }, []);

  // On settings change or page reset, reset
  useEffect(() => {
    if (!didMount.current) return;
    if (page != "game") return;

    resetGame();

    if (modeSettings.mode == "words" && modeSettings.value)
      updateWords(modeSettings.value, false);
    // infinite and time mode, use continuous fetch
    else updateWords(50, false);

    if (modeSettings.mode == "time" && modeSettings.value) {
      setTimeLeft(modeSettings.value);
    }
  }, [modeSettings, page]);

  // On key press
  useEffect(() => {
    if (!lastKeyPressed || page == "results") return;
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
      stringToType[totalTypingCharIndex] == lastKeyPressed ||
      lastKeyPressed == "Enter"
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
