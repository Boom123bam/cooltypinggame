import "./App.css";
import KeyListener from "./components/KeyListener";
import ModeSelector from "./components/ModeSelector";
import Stats from "./components/Stats";
import TypingGame from "./components/TypingGame";
import { useGameState } from "./hooks/zustand/useGameState";

function App() {
  const { isFinished } = useGameState();
  return (
    <>
      <ModeSelector />

      <TypingGame />
      {isFinished && <Stats />}

      <KeyListener />
    </>
  );
}

export default App;
