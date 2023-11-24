import { useState, useEffect, useRef } from "react";
import { getRandomWordList } from "./modules/database";
import WordDisplayer from "./components/WordDisplayer";
import "./App.css";
import GameCanvas from "./components/GameCanvas";

function App() {
  const [stringToType, setStringToType] = useState("");
  const [typingWordIndex, setTypingWordIndex] = useState(0);
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
      setStringToType(stringToType + wordList.join(" "));
    };
    updateStringToType();
  }, []);

  // key press listener
  useEffect(() => {
    if (stringToType[typingWordIndex] == lastKeyRef.current) {
      // if (lastKeyRef.current == " ") {
      //   // clear typed word
      //   setStringToType(stringToType.slice(typingWordIndex + 1));
      //   setTypingWordIndex(0);
      // } else {
      //   setTypingWordIndex(typingWordIndex + 1);
      // }
      setTypingWordIndex(typingWordIndex + 1);
    }

    document.addEventListener("keydown", handleKeyDown, {
      once: true,
    });
  }, [updateKey]);

  return (
    <>
      <WordDisplayer
        stringToType={stringToType}
        currentIndex={typingWordIndex}
      />
      <GameCanvas
        stringToType={stringToType}
        currentIndex={typingWordIndex}
      />
    </>
  );
}

export default App;
