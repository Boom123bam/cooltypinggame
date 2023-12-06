import "./App.css";
import KeyListener from "./components/KeyListener";
import ModeSelector from "./components/ModeSelector";
import Stats from "./components/Stats";
import TypingGame from "./components/TypingGame";
import { useGameState } from "./stores/gameState";

function App() {
  const { page } = useGameState();
  return (
    <>
      {page == "game" && <ModeSelector />}

      <TypingGame />
      {page == "results" && <Stats />}

      <KeyListener />
    </>
  );
}

export default App;
