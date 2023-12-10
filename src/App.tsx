import "./App.css";
import KeyListener from "./components/KeyListener";
import GameModeSelector from "./components/GameModeSelector";
import Stats from "./components/Stats";
import TypingGame from "./components/TypingGame";
import { useGameState } from "./hooks/zustand/useGameState";
import Footer from "./components/Footer";

function App() {
  const { isFinished } = useGameState();
  return (
    <>
      <GameModeSelector />

      <Footer />

      <TypingGame />
      {isFinished && <Stats />}

      <KeyListener />
    </>
  );
}

export default App;
